import type { Config } from "@measured/puck";
import Link from 'next/link';

export const config: Config = {
  components: {
    HeadingBlock: {
      fields: {
        heading: {
          type: "text",
          label: "Heading Text",
          placeholder: "Enter heading text"
        },
        textAlign: {
          type: "radio",
          label: "Text Alignment",
          options: [
            { label: "Left", value: "text-left" },
            { label: "Center", value: "text-center" },
            { label: "Right", value: "text-right" }
          ]
        },
        solutions: {
          type: "array",
          arrayFields: {
            title: { type: "text" },
            description: { type: "text" },
            logoUrl: { type: "text" },
            logoAlt: { type: "text" },
            backgroundColor: { 
              type: "text",
              placeholder: "#000000"
            }
          },
          defaultItemProps: {
            title: "Shopify",
            description: "Join thousands of Shopify users bringing their stores to life with Rombo.",
            logoUrl: "https://cdn.sanity.io/images/xrq4swux/production/ea11cf5ade02dbf180e5a8c277a281141d58d6f4-110x124.svg?fit=max&auto=format",
            logoAlt: "shopify logo",
            backgroundColor: "#008837"
          },
          getItemSummary: (item) => item.title,
          min: 2,
          max: 3
        }
      },
      defaultProps: {
        heading: "SOLUTIONS",
        textAlign: "text-center",
        solutions: [
          {
            title: "Shopify",
            description: "Join thousands of Shopify users bringing their stores to life with Rombo.",
            logoUrl: "https://cdn.sanity.io/images/xrq4swux/production/ea11cf5ade02dbf180e5a8c277a281141d58d6f4-110x124.svg?fit=max&auto=format",
            logoAlt: "shopify logo",
            backgroundColor: "#008837"
          },
          {
            title: "TailwindCSS",
            description: "Add intricate animations to your frontend in no time at all.",
            logoUrl: "https://cdn.sanity.io/images/xrq4swux/production/49f386e7cb98664a6645577735448c1062daeb57-54x33.svg?fit=max&auto=format",
            logoAlt: "tailwind logo",
            backgroundColor: "#00b48a"
          },
          {
            title: "Figma",
            description: "Add interactivity to your designs without leaving the Figma canvas.",
            logoUrl: "https://cdn.sanity.io/images/xrq4swux/production/8ba9090052032bc90e8cfa9a83583fdf69c7d96b-413x620.svg?fit=max&auto=format",
            logoAlt: "figma logo",
            backgroundColor: "#333333"
          }
        ]
      },
      render: ({ heading, solutions, textAlign }) => {
        // Ensure solutions is always an array
        const solutionsArray = Array.isArray(solutions) ? solutions : [];
        
        return (
          <main className="mx-auto max-w-4xl overflow-x-hidden px-8 py-4">
            <h2 className={`motion-preset-fade flex-wrap pb-6 text-xl font-bold opacity-70 motion-delay-[700ms] ${textAlign}`}>{heading}</h2>
            <div className="mt-10 flex flex-col gap-10 sm:flex-row sm:gap-4">
              {solutionsArray.map((solution, index) => (
                <div 
                  key={index}
                  className="motion motion-preset-slide-left flex-1 rounded-2xl p-4 motion-delay-[1000ms] motion-ease-spring-bouncier"
                  style={{ 
                    backgroundColor: solution.backgroundColor,
                    animationDelay: `${1000 + (index * 300)}ms`
                  }}
                >
                  <img 
                    alt={solution.logoAlt} 
                    className="-mt-12 mb-4 size-20 bg-blend-exclusion" 
                    src={solution.logoUrl}
                  />
                  <h3 className="mb-2 text-2xl font-bold">{solution.title}</h3>
                  <p className="text-sm opacity-80">{solution.description}</p>
                </div>
              ))}
            </div>
          </main>
        );
      }
    }
  }
};

export default config;