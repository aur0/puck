import type { Config } from "@measured/puck";
import Link from 'next/link';

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

        const variantStyles: Record<string, React.CSSProperties> = {
          solid: { backgroundColor: '#000', color: '#fff', border: 'none' },
          outline: { border: '2px solid #000', background: 'transparent', color: '#000' },
          soft: { backgroundColor: '#f4f4f4', color: '#000', border: 'none' },
          classic: { backgroundColor: '#eee', color: '#333', border: '1px solid #ccc' },
          surface: { backgroundColor: '#fff', color: '#000', border: '1px solid #e0e0e0' },
          ghost: { background: 'transparent', color: '#000', border: 'none' },
        };

        return (
          <div
            style={{
              width: '100%',
              height: '100vh',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '1rem'
            }}
          >
            {backgroundImage && (
              <picture
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  zIndex: -1
                }}
              >
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
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center'
                  }}
                />
              </picture>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
              <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{headingText}</h1>
              <p style={{ fontSize: '1.25rem', maxWidth: '600px' }}>{descriptionText}</p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                {safeButtons.map((button, index) => (
                  <Link key={`button-${button.label}-${index}`} href={button.url}>
                    <button
                      style={{
                        padding: '0.75rem 1.5rem',
                        fontSize: '1rem',
                        borderRadius: '6px',
                        textDecoration: 'none',
                        ...variantStyles[button.variant || 'solid'],
                        cursor: 'pointer'
                      }}
                    >
                      {button.label}
                    </button>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        );
      },
    },
  },
};

export default config;
