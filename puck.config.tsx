import type { Config } from "@measured/puck";

type Props = {
  HeadingBlock: { title: string };
  ImageBlock: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
};

export const config: Config<Props> = {
  components: {
    HeadingBlock: {
      fields: {
        title: { type: "text" },
      },
      defaultProps: {
        title: "Heading",
      },
      render: ({ title }) => (
        <div style={{ padding: 64 }}>
          <h1>{title}</h1>
        </div>
      ),
    },
    ImageBlock: {
      fields: {
        url: {
          type: "text",
          label: "Image URL",
          placeholder: "Enter image URL"
        },
        alt: {
          type: "text",
          label: "Alt Text",
          placeholder: "Describe the image"
        },
        width: {
          type: "number",
          label: "Width (px)",
          defaultValue: 800
        },
        height: {
          type: "number",
          label: "Height (px)",
          defaultValue: 600
        }
      },
      defaultProps: {
        url: "",
        alt: "",
        width: 800,
        height: 600
      },
      render: ({ url, alt, width, height }) => (
        <div style={{ padding: 32 }}>
          <img 
            src={url}
            alt={alt}
            width={width}
            height={height}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      )
    }
  },
};

export default config;
