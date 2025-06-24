"use client";

import type { Data } from "@measured/puck";
import { Puck } from "@measured/puck";
import config from "../../../puck.config";

// Define the Theme type based on your theme.json structure
interface Theme {
  colorPrimary: string;
  colorSecondary: string;
}

export function Client({ path, data, theme }: { path: string; data: Partial<Data>; theme: Theme }) {
  return (
    <Puck
      config={config}
      data={data}
      metadata={theme}
      onPublish={async (data) => {
        await fetch("/puck/api", {
          method: "post",
          body: JSON.stringify({ data, path }),
        });
      }}
    />
  );
}