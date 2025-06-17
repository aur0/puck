import type { Config } from "@measured/puck";

export const config: Config = {
  components: {
    Hero: {
      fields: {
        items: { type: "slot" },  // Slot for all hero content components
      },
      defaultProps: {
        items: [
          {
            type: "Header",
            props: { 
              spans: ["WHEN IN DOUBT", "JUST USE AN IMAGE"],
            },
          },
          {
            type: "Paragraph",
            props: { text: "This is a simple hero section built with Puck." },
          },
          {
            type: "Button",
            props: {
              color: "#0070f3",
              hoverColor: "#005bb5",
              label: "Get Started",
            },
          },
        ],
      },
      render: ({ items: Items }) => {
        return (
          <section className="hero">
            <div className="hero-content">
              <Items />
            </div>
          </section>
        );
      },
    },

    Header: {
      fields: {
        spans: { type: "array", items: { type: "text" } },
      },
      defaultProps: {
        spans: ["WHEN IN DOUBT", "JUST USE AN IMAGE"]
      },
      render: ({ spans = ["WHEN IN DOUBT", "JUST USE AN IMAGE"] }) => (
        <h1 className="main-heading">
          {spans.map((text, index) => (
            <span key={index}>{text}</span>
          ))}
        </h1>
      ),
    },

    Paragraph: {
      fields: {
        text: { type: "textarea" },
      },
      render: ({ text }) => <p style={{ margin: 0 }}>{text}</p>,
    },

    Image: {
      fields: {
        src: { type: "text" },
      },
      render: ({ src }) => (
        <img src={src} style={{ borderRadius: 8 }} />
      ),
    },

    Button: {
      fields: {
        color: { type: "text" },
        hoverColor: { type: "text" },
        label: { type: "text" },
      },
      defaultProps: {
        label: "Button",
      },
      render: ({ color, hoverColor, label }) => {
        return (
          <button
            style={{
              backgroundColor: color,
              color: "#fff",
              border: "none",
              padding: "0.75rem 1.5rem",
              borderRadius: 4,
              cursor: "pointer",
              transition: "background-color 0.2s",
              fontWeight: "bold",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = hoverColor || color;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = color;
            }}
          >
            {label}
          </button>
        );
      },
    },
  },
};

export default config;
