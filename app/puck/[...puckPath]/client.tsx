"use client";

import type { Data } from "@measured/puck";
import { Puck } from "@measured/puck";
import config from "../../../puck.config";
import { useEffect } from "react";
import { Theme } from "@radix-ui/themes";

const overrides = {
  iframe: ({ children }) => {
    return (
      <div>
        <Theme accentColor="crimson" grayColor="sand" radius="large" scaling="95%">
          {children}
        </Theme>
      </div>
    );
  },
};

export function Client({ path, data }: { path: string; data: Partial<Data> }) {
  return (
    <Puck
      config={config}
      data={data}
      overrides={overrides}
      onPublish={async (data) => {
        await fetch("/puck/api", {
          method: "post",
          body: JSON.stringify({ data, path }),
        });
      }}
    />
  );
}
