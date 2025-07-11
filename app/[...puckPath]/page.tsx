/**
 * This file implements a catch-all route that renders the user-facing pages
 * generated by Puck. For any route visited (with exception of other hardcoded
 * pages in /app), it will check your database (via `getPage`) for a Puck page
 * and render it using <Render>.
 */

import { Client } from "./client";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getPage } from "../../lib/get-page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ puckPath: string[] }>;
}): Promise<Metadata> {
  const { puckPath = [] } = await params;
  const path = `/${puckPath.join("/")}`;
  const data = await getPage(path);

  return {
    title: data?.root?.props?.title || `Page: ${path}`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ puckPath: string[] }>;
}) {
  const { puckPath = [] } = await params;
  const path = `/${puckPath.join("/")}`;
  const data = await getPage(path);

  if (!data) {
    return notFound();
  }

  return <Client data={data} />;
}

// Force Next.js to produce static pages
export const dynamic = "force-static";
