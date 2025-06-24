"use client";

import type { Data } from "@measured/puck";
import { Puck } from "@measured/puck";
import config from "../../../puck.config";
import themeData from "../../../theme.json";
import { HelpButton } from './HelpButton';

const metadata = {
  theme: themeData,
};

export function Client({ path, data }: { path: string; data: Partial<Data> }) {
  return (
    <>
      <div className="puck-editor">
        <Puck
          config={config}
          data={data}
          metadata={metadata}
          onPublish={async (data) => {
            await fetch("/puck/api", {
              method: "post",
              body: JSON.stringify({ data, path }),
            });
          }}
        />
      </div>
      
      <HelpButton />
    </>
  );
}