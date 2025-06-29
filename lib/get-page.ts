import { Data } from "@measured/puck";
import { createClient } from '../utils/supabase/server';

export const getPage = async (path: string): Promise<Data | null> => {
  const supabase = await createClient();
  
  // Get current user
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    console.error('Authentication error:', authError);
    return null;
  }

  const { data, error } = await supabase
    .from('pages')
    .select('data')
    .eq('path', path)
    .eq('project_id', process.env.PROJECT_ID)
    .eq('user_id', user.id)
    .single();

  if (error) {
    console.error('Error fetching page:', error);
    return null;
  }

  return data?.data as Data | null;
};
