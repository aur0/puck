import { Data } from "@measured/puck";
import { createClient } from '../utils/supabase/server';

export const getPage = async (path: string): Promise<Data | null> => {
  try {
    const supabase = await createClient();
    
    // First try to get the page without authentication check
    const { data, error: fetchError } = await supabase
      .from('pages')
      .select('data')
      .eq('path', path)
      .eq('project_id', process.env.PROJECT_ID)
      .single();

    if (fetchError) {
      console.error('Error fetching page:', fetchError);
      return null;
    }

    return data?.data as Data | null;
  } catch (error) {
    console.error('Error in getPage:', error);
    return null;
  }
};
