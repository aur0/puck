import type { Config } from "@measured/puck";
import { useState } from "react";
import { Dialog, Button, Text, Heading, Box, Container, Section } from "@radix-ui/themes";
import { typographyFields } from "./components/fields/typography";
import { imageFields } from "./components/fields/images";

type Props = {
  HeadingBlock: { title: string };
  ImageBlock: {
    image: {
      webp_url: string | null;
      webp_medium_url: string | null;
      original_url: string | null;
      original_medium_url: string | null;
    }
  };
};

type ContainerSize = "1" | "2" | "3" | "4";

export const config: Config<Props> = {
  components: {
    Hero: {
      fields: {
        content: {
          type: "slot",
        },
        containerSize: {
          type: "select",
          options: [
            { label: "Small (448px)", value: "1" },
            { label: "Medium (688px)", value: "2" },
            { label: "Large (880px)", value: "3" },
            { label: "X-Large (1136px)", value: "4" },
          ],
          defaultValue: "4"
        },
        padding: {
          type: "select",
          options: [
            { label: "None", value: "0" },
            { label: "Small", value: "2" },
            { label: "Medium", value: "4" },
            { label: "Large", value: "6" },
            { label: "X-Large", value: "8" },
          ],
          defaultValue: "4"
        },
        margin: {
          type: "select",
          options: [
            { label: "None", value: "0" },
            { label: "Small", value: "2" },
            { label: "Medium", value: "4" },
            { label: "Large", value: "6" },
            { label: "X-Large", value: "8" },
          ],
          defaultValue: "4"
        },
        image: imageFields,
      },
      defaultProps: {
        content: [
          {
            type: "HeadingBlock",
            props: {
              text: "Welcome to Our Site",
            },
          },
          {
            type: "SubheadingBlock",
            props: {
              text: "We build beautiful experiences.",
            },
          },
          {
            type: "ButtonBlock",
            props: {
              label: "Get Started",
              url: "#get-started",
            },
          },
        ],
        containerSize: "4",
        padding: "4",
        image: {
          webp_url: null,
          webp_medium_url: null,
          original_url: null,
          original_medium_url: null
        }
      },
      render: ({ content: Content, containerSize, padding, image }) => {
        const maxWidths = {
          "1": "448px",
          "2": "688px",
          "3": "880px",
          "4": "1136px"
        };

        return (
          <Box
            style={{
              position: "relative",
              width: "100%",
              height: "100%"
            }}
          >
            <Section
              size="4"
              style={{
                padding: padding,
                position: "relative",
                zIndex: 1
              }}
            >
              <Box
                style={{
                  maxWidth: maxWidths[containerSize],
                  margin: "0 auto",
                  width: "100%"
                }}
              >
                <Content />
              </Box>
            </Section>
            {image?.webp_url || image?.original_url ? (
              <picture
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  zIndex: 0,
                  pointerEvents: 'none'
                }}
              >
                <source
                  media="(max-width: 768px)"
                  srcSet={image?.webp_medium_url || image?.original_medium_url}
                  type="image/webp"
                />
                <source
                  media="(max-width: 768px)"
                  srcSet={image?.original_medium_url}
                />
                <source
                  srcSet={image?.webp_url || image?.original_url}
                  type="image/webp"
                />
                <img
                  src={image?.original_url}
                  alt="Hero background"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 0
                  }}
                />
              </picture>
            ) : null}
          </Box>
        );
      },
    },

    HeadingBlock: {
      fields: {
        text: { type: "text" },
        as: {
          type: "select",
          options: [
            { label: "h1", value: "h1" },
            { label: "h2", value: "h2" },
            { label: "h3", value: "h3" },
            { label: "h4", value: "h4" },
            { label: "h5", value: "h5" },
            { label: "h6", value: "h6" }
          ],
          defaultValue: "h1"
        },
        ...typographyFields
      },
      render: ({ text, as, size, weight, align, color, highContrast, truncate, wrap }) => (
        <Heading
          as={as}
          size={size}
          weight={weight}
          align={align}
          color={color}
          highContrast={highContrast}
          truncate={truncate}
          wrap={wrap}
        >
          {text}
        </Heading>
      ),
    },

    SubheadingBlock: {
      fields: {
        text: { type: "text" },
        ...typographyFields
      },
      render: ({ text, size, weight, align, color, highContrast, truncate, wrap }) => (
        <Container size="4">
          <Text
            as="div"
            size={size}
            weight={weight}
            align={align}
            color={color}
            highContrast={highContrast}
            truncate={truncate}
            wrap={wrap}
          >
            {text}
          </Text>
        </Container>
      ),
    },

    ButtonBlock: {
      fields: {
        label: { type: "text" },
        url: { type: "text" },
      },
      render: ({ label, url }) => (
        <Button asChild>
          <a href={url}>{label}</a>
        </Button>
      ),
    },

    ImageBlock: {
      fields: {
        image: imageFields,
      },
      defaultProps: {
        image: {
          webp_url: null,
          webp_medium_url: null,
          original_url: null,
          original_medium_url: null
        }
      },
      render: ({ image }: Props["ImageBlock"]) => {
        return (
          <picture>
            <source
              media="(max-width: 768px)"
              srcSet={image?.webp_medium_url || image?.original_medium_url}
              type="image/webp"
            />
            <source
              media="(max-width: 768px)"
              srcSet={image?.original_medium_url}
            />
            <source
              srcSet={image?.webp_url || image?.original_url}
              type="image/webp"
            />
            <img
              src={image?.original_url}
              alt="Selected image"
              style={{ width: '100%', height: 'auto' }}
            />
          </picture>
        );
      },
    },

    SimpleImageBlock: {
      fields: {
        url: { type: "text" },
        altText: { type: "text" },
        width: { 
          type: "number",
          defaultValue: 100
        },
        height: { 
          type: "number",
          defaultValue: 100
        }
      },
      defaultProps: {
        url: "",
        altText: "",
        width: 100,
        height: 100
      },
      render: ({ url, altText, width, height }) => (
        <img
          src={url}
          alt={altText}
          width={width}
          height={height}
          style={{ maxWidth: "100%", height: "auto" }}
        />
      ),
    },
  },
};

export default config;