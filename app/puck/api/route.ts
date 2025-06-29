import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  const { path, data } = await request.json();
  const projectId = process.env.PROJECT_ID;

  // Try to update existing page
  const { error: updateError } = await supabase
    .from('pages')
    .update({ data })
    .eq('path', path)
    .eq('project_id', projectId)
    .eq('user_id', user.id)
    .single();

  // If update failed, try to insert new page
  if (updateError) {
    await supabase
      .from('pages')
      .insert({
        path,
        data,
        project_id: projectId,
        user_id: user.id
      })
      .select()
      .single();
  }

  revalidatePath(path);
  return NextResponse.json({ status: "ok" });
}
