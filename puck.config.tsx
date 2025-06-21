import type { Config } from "@measured/puck";
import type { CSSProperties } from 'react';

import { Box, Heading, Text, Button, Flex } from '@radix-ui/themes';

export const config: Config = {
    components: {
    HeroSection1: {
      fields: {
        headingText: {
          type: "text",
          label: "Heading Text",
        },
        descriptionText: {
          type: "text",
          label: "Description Text",
        },
        backgroundImage: {
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
          placeholder: "Select a background image"
        },
        buttons: {
          type: "array",
          label: "Buttons",
          arrayFields: {
            label: {
              type: "text",
              label: "Button Label",
            },
            url: {
              type: "text",
              label: "Button URL",
            },
            variant: {
              type: "select",
              label: "Button Variant",
              options: [
                { value: "solid", label: "Solid" },
                { value: "outline", label: "Outline" },
                { value: "soft", label: "Soft" },
                { value: "classic", label: "Classic" },
                { value: "surface", label: "Surface" },
                { value: "ghost", label: "Ghost" }
              ],
            },
          },
          defaultItemProps: {
            label: "Click me",
            url: "#",
            variant: "solid",
          },
          min: 1,
          max: 2,
          getItemSummary: (item) => item.label || "Button",
        },
      },
      defaultProps: {
        headingText: "Everything starts with a Box",
        descriptionText:
          "Use Radix's Box component to structure your layouts with full control and great defaults.",
        backgroundImage: null,
        buttons: [
          {
            label: "Get Started",
            url: "#get-started",
            variant: "solid",
          },
          {
            label: "Learn More",
            url: "#learn-more",
            variant: "outline",
          },
        ],
      },
      render: ({ headingText, descriptionText, backgroundImage, buttons }) => {
        const safeButtons = Array.isArray(buttons) ? buttons : [];
        
        const boxStyle: CSSProperties = {
          display: 'flex' as const,
          alignItems: 'center' as const,
          justifyContent: 'center' as const,
          backgroundColor: 'var(--gray-a2)',
          position: 'relative' as const,
          height: '100vh'
        };
        
        const pictureStyle: CSSProperties = {
          position: 'absolute' as const,
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1
        };
        
        const imgStyle: CSSProperties = {
          width: '100%',
          height: '100%',
          objectFit: 'cover' as const,
          objectPosition: 'center'
        };
        
        return (
          <Box style={boxStyle}>
            {backgroundImage && (
              <picture style={pictureStyle}>
                <source 
                  srcSet={`https://cdn.warrenwebsites.co.uk/${backgroundImage.project_id}/${backgroundImage.filename.replace(/\.[^.]+$/, '')}-medium.webp`}
                  media="(max-width: 768px)"
                  type="image/webp"
                />
                <source 
                  srcSet={`https://cdn.warrenwebsites.co.uk/${backgroundImage.project_id}/${backgroundImage.filename.replace(/(\.[^.]+)$/, '-medium$1')}`}
                  media="(max-width: 768px)"
                />
                <source 
                  srcSet={`https://cdn.warrenwebsites.co.uk/${backgroundImage.project_id}/${backgroundImage.filename.replace(/\.[^.]+$/, '.webp')}`}
                  type="image/webp"
                />
                <img
                  src={`https://cdn.warrenwebsites.co.uk/${backgroundImage.project_id}/${backgroundImage.filename}`}
                  alt="Hero background"
                  style={imgStyle}
                />
              </picture>
            )}
            <Flex direction="column" align="center" gap="5">
              <Heading size="8">{headingText}</Heading>
              <Text size="4">
                {descriptionText}
              </Text>
              <Flex gap="3">
                {buttons && buttons.map((button, index) => (
                  <Button key={`button-${button.label}-${index}`} size="3" variant={button.variant} href={button.url}>
                    {button.label}
                  </Button>
                ))}
              </Flex>
            </Flex>
          </Box>
        );
      },
    },
  },
};

export default config;
