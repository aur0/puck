/**
 * This file implements a *magic* catch-all route that renders the Puck editor.
 *
 * This route exposes /puck/[...puckPath], but is disabled by middleware.ts. The middleware
 * then rewrites all URL requests ending in `/edit` to this route, allowing you to visit any
 * page in your application and add /edit to the end to spin up a Puck editor.
 *
 * This approach enables public pages to be statically rendered whilst the /puck route can
 * remain dynamic.
 *
 * NB this route is public, and you will need to add authentication
 */

import { redirect } from 'next/navigation'
import { createClient } from '../../../utils/supabase/server'
import "@measured/puck/puck.css";
import { Client } from "./client";
import { Metadata } from "next";
import { getPage } from "../../../lib/get-page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ puckPath: string[] }>;
}): Promise<Metadata> {
  const { puckPath = [] } = await params;
  const path = `/${puckPath.join("/")}`;
  const data = await getPage(path);

  return {
    title: data?.root?.props?.title || `Puck: ${path}`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ puckPath: string[] }>;
}) {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    redirect('/login')
  }

  const { puckPath = [] } = await params;
  const path = `/${puckPath.join("/")}`;
  const data = await getPage(path);

  return <Client path={path} data={data || {}} />;
}

export const dynamic = "force-dynamic";