import type { Config } from "@measured/puck";
import Image from 'next/image';


export const config: Config = {
  components: {
    
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
          <Image
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