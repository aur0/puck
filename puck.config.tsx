import type { Config } from "@measured/puck";
import { useState } from "react";
import { Dialog, Button, Text, Heading, Box, Container, Section } from "@radix-ui/themes";
import { typographyFields } from "./components/fields/typography";
import { imageFields } from "./components/fields/images";
import Image from 'next/image';

export const config: Config = {
  components: {
    SimpleTextBlock: {  
      fields: {
        text: { type: "text" },
        ...typographyFields
      },
      render: ({ text, size, weight, align, color, highContrast, truncate, wrap }) => (
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
      ),
    },
    SimpleImageBlock: {
      fields: {
        url: { type: "text" },
        altText: { type: "text" },
        width: { 
          type: "number",
        },
        height: { 
          type: "number",
        }
      },
      defaultProps: {
        url: "",
        altText: "",
        width: 100,
        height: 100
      },
      render: ({ url, altText, width, height }) => (
        <Box>
          <Image
            src={url}
            alt={altText}
            width={width}
            height={height}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </Box>
      ),
    },
  },
};

export default config;