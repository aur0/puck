import type { Config } from "@measured/puck";
import { HeroSection1 } from "./components/puck/HeroSection1";
import { Text as TextConfig } from "./components/puck/Text";
import { Heading as HeadingConfig } from "./components/puck/Heading";
import { Button as ButtonConfig } from "./components/puck/Button";
//import { Flexbox } from "./components/puck/Flexbox";

export const config: Config = {
  components: {
    ...HeroSection1,
    ...TextConfig,
    ...HeadingConfig,
    ...ButtonConfig,
    Flexbox: {
      fields: {
        items: { type: "slot" },
        spacing: {
          type: "array",
          arrayFields: {
            top: { type: "text", label: "Top" },
            bottom: { type: "text", label: "Bottom" },
            left: { type: "text", label: "Left" },
            right: { type: "text", label: "Right" },
          },
          min: 2,
          max: 2,
          defaultItemProps: [
            { top: "0px", bottom: "0px", left: "0px", right: "0px" }, // padding
            { top: "0px", bottom: "0px", left: "0px", right: "0px" }, // margin
          ],
          getItemSummary: (item, index) => (index === 0 ? "Padding" : "Margin"),
        },
        gap: {
          type: "text",
          label: "Gap",
        },
        flexDirection: {
          type: "radio",
          options: [
            { label: "Row", value: "row" },
            { label: "Column", value: "column" },
          ],
        },
        justifyContent: {
          type: "radio",
          options: [
            { label: "Flex Start", value: "flex-start" },
            { label: "Center", value: "center" },
            { label: "Flex End", value: "flex-end" },
            { label: "Space Between", value: "space-between" },
            { label: "Space Around", value: "space-around" },
          ],
        },
        alignItems: {
          type: "radio",
          options: [
            { label: "Stretch", value: "stretch" },
            { label: "Flex Start", value: "flex-start" },
            { label: "Center", value: "center" },
            { label: "Flex End", value: "flex-end" },
            { label: "Baseline", value: "baseline" },
          ],
        },
      },
      defaultProps: {
        spacing: [
          { top: "0px", bottom: "0px", left: "0px", right: "0px" }, // padding
          { top: "0px", bottom: "0px", left: "0px", right: "0px" }, // margin
        ],
        gap: "0px",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "stretch",
      },
      render: ({ items: Items, spacing, gap, flexDirection, justifyContent, alignItems }) => {
        const padding = spacing?.[0] || {};
        const margin = spacing?.[1] || {};
        const style = {
          display: "flex",
          flexDirection,
          justifyContent,
          alignItems,
          gap,
          paddingTop: padding.top,
          paddingBottom: padding.bottom,
          paddingLeft: padding.left,
          paddingRight: padding.right,
          marginTop: margin.top,
          marginBottom: margin.bottom,
          marginLeft: margin.left,
          marginRight: margin.right,
        };
        return <Items style={style} />;
      },
    },
    ImageSelect: {
      fields: {
        image: {
          type: "external",
          fetchList: async () => {
            const response = await fetch('/api/get-images');
            const data = await response.json();
    
            if (!response.ok) {
              throw new Error(data.error || 'Failed to fetch images');
            }
    
            return data.images.map(img => ({
              filename: img.filename,
              thumbnail: img.thumbnail,
              project_id: img.project_id
            }));
          },
          getItemSummary: (item) => item.filename,
    
          // ✨ This renders a React component for each row
          mapRow: (item) => ({
            thumbnail: (
              <img
                src={item.thumbnail}
                alt={item.filename}
                width="40"
                height="40"
                style={{ objectFit: 'cover', borderRadius: '4px' }}
              />
            ),
            filename: item.filename
          }),
    
          // This determines what gets stored in page data
          mapProp: (item) => ({ 
            thumbnail: item.thumbnail,
            filename: item.filename,
            project_id: item.project_id
          }),
    
          showSearch: true,
          placeholder: "Select an image"
        }
      },
      render: ({ image }) => (
        image ? (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <picture>
                <source 
                  srcSet={`https://cdn.warrenwebsites.co.uk/${image.project_id}/${image.filename.replace(/\.[^.]+$/, '')}-medium.webp`}
                  media="(max-width: 768px)"
                  type="image/webp"
                />
                <source 
                  srcSet={`https://cdn.warrenwebsites.co.uk/${image.project_id}/${image.filename.replace(/(\.[^.]+)$/, '-medium$1')}`}
                  media="(max-width: 768px)"
                />
                <source 
                  srcSet={`https://cdn.warrenwebsites.co.uk/${image.project_id}/${image.filename.replace(/\.[^.]+$/, '.webp')}`}
                  type="image/webp"
                />
                <img
                  src={`https://cdn.warrenwebsites.co.uk/${image.project_id}/${image.filename}`}
                  width="50"
                  height="50"
                  style={{ objectFit: 'cover', borderRadius: '4px' }}
                  alt={image.filename}
                />
              </picture>
            </div>
            <div>
              <span>{`https://cdn.warrenwebsites.co.uk/${image.project_id}/${image.filename}`}</span>
            </div>
          </>
        ) : null
      )
    },
    Example: {
      fields: {
        leftColumn: {
          type: "slot",
        },
        rightColumn: {
          type: "slot",
        },
      },
      render: ({ leftColumn: LeftColumn, rightColumn: RightColumn }) => {
        return (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <LeftColumn />
            <RightColumn />
          </div>
        );
      },
    },
    Card: {
      render: ({ text }) => <div>{text}</div>,
    },

  }
};

export default config;
