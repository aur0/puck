"use client";

import { useEffect, useRef } from 'react';
import type { Data } from "@measured/puck";
import { Puck } from "@measured/puck";
import config from "../../../puck.config";

export function Client({ path, data }: { path: string; data: Partial<Data> }) {
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const drawerItem = document.querySelector('#«r0» > div > div > div._PuckLayout-leftSideBar_dnlfp_115 > div._SidebarSection_8boj8_1._SidebarSection--noBorderTop_8boj8_20 > div._SidebarSection-content_8boj8_24 > div > div > div > div > div > div > div:nth-child(2) > div > div > div > div');
      if (drawerItem) {
        // Create tooltip element using Tailwind classes
        const tooltip = document.createElement('div');
        tooltip.className = 'absolute z-50 opacity-0 transition-opacity duration-200 pointer-events-none';
        tooltip.innerHTML = `
          <div class="bg-white p-3 rounded-lg shadow-md flex gap-3 items-center">
            <img src="https://via.placeholder.com/200x100" alt="Placeholder" class="w-50 h-20 object-cover rounded-md" />
            <div class="font-medium text-gray-700">Hero Section 1</div>
          </div>
        `;
        document.body.appendChild(tooltip);

        const handleMouseEnter = (e: MouseEvent) => {
          const rect = drawerItem.getBoundingClientRect();
          tooltip.style.left = `${rect.left + rect.width/2}px`;
          tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
          tooltip.style.opacity = '1';
        };

        const handleMouseLeave = () => {
          tooltip.style.opacity = '0';
        };

        drawerItem.addEventListener('mouseenter', handleMouseEnter);
        drawerItem.addEventListener('mouseleave', handleMouseLeave);
        observer.disconnect();

        // Cleanup function
        return () => {
          drawerItem.removeEventListener('mouseenter', handleMouseEnter);
          drawerItem.removeEventListener('mouseleave', handleMouseLeave);
          tooltip.remove();
        };
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }, []);

  return (
    <Puck
      config={config}
      data={data}
      onPublish={async (data) => {
        await fetch("/puck/api", {
          method: "post",
          body: JSON.stringify({ data, path }),
        });
      }}
    />
  );
}