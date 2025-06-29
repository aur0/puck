import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  
  // Get user from request
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  const payload = await request.json();
  const { path, data } = payload;

  // First try to update existing page
  const { error: updateError } = await supabase
    .from('pages')
    .update({ data })
    .eq('path', path)
    .eq('project_id', process.env.PROJECT_ID)
    .eq('user_id', user.id)
    .single();

  if (updateError) {
    // If update failed (likely because page doesn't exist), try to insert new page
    const { error: insertError } = await supabase
      .from('pages')
      .insert({
        path,
        data,
        project_id: process.env.PROJECT_ID,
        user_id: user.id
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error saving page:', insertError);
      return NextResponse.json(
        { error: "Failed to save page" },
        { status: 500 }
      );
    }
  }

  // Purge Next.js cache
  revalidatePath(path);

  return NextResponse.json({ status: "ok" });
}
