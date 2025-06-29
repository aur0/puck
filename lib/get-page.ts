import { Data } from "@measured/puck";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const getPage = async (path: string): Promise<Data | null> => {
  try {
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