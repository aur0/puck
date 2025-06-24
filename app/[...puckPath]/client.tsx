"use client";

import type { Data } from "@measured/puck";
import { Render } from "@measured/puck";
import config from "../../puck.config";

export function Client({ data, theme }: { data: Data; theme: any }) {
  return <Render config={config} data={data} metadata={theme} />;
}
