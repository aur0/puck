import type { Config } from "@measured/puck";
import Link from 'next/link';
import { FieldLabel } from "@measured/puck";

export const config: Config = {
  root: {
    fields: {
      title: { type: "text" },
      description: { type: "textarea" },
      primary: { type: "text" }, // New field for hex
    },
    defaultProps: {
      title: "DashboardUI",
      description: "Lorem ipsum",
      primary: "#FF0000", // Default hex value
    },
    render: ({ children, primary }) => {
      return (
        <div>
          <style>
            {`
              .text-primary {
                color: ${primary};
              }
              .bg-primary {
                background-color: ${primary};
              }
              .bg-primary-10 {
                background-color: ${primary}10;
              }
            `}
          </style>
          {children}
        </div>
      );
    },    
  },
  components: {
    Navbar1: {
      fields: {
        navItems: {
          type: "array",
          label: "Navigation Items",
          arrayFields: {
            label: {
              type: "text",
              label: "Item Label",
            },
            url: {
              type: "text",
              label: "Item URL",
            },
            delay: {
              type: "number",
              label: "Animation Delay (ms)",
            },
          },
          defaultItemProps: {
            label: "Menu Item",
            url: "#",
            delay: 550,
          },
          min: 1,
          max: 5,
          getItemSummary: (item) => item.label || "Menu Item",
        },
      },
      defaultProps: {
        navItems: [
          {
            label: "Products",
            url: "https://rombo.co/",
            delay: 400,
          },
          {
            label: "Learn More",
            url: "https://rombo.co/",
            delay: 450,
          },
          {
            label: "Contact Us",
            url: "https://rombo.co/",
            delay: 500,
          },
        ],
      },
      render: ({ navItems }) => {
        const safeNavItems = Array.isArray(navItems) ? navItems : [];
        return (
          <header className="fixed top-0 left-0 w-full z-[1000] flex items-center justify-between p-4 bg-white">
            <a href="https://rombo.co/" className="motion-preset-slide-down text-2xl font-black">Rombo</a>
            <nav className="mr-4 flex gap-6 font-semibold">
              {safeNavItems.map((item, index) => (
                <Link
                  key={`nav-item-${item.label}-${index}`}
                  href={item.url}
                  className={`motion-preset-rebound-down motion-delay-[${item.delay}ms]`} 
                  style={{ textDecoration: 'none' }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </header>
        );
      },
    },

    
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
              <h1 className="motion-opacity-in-0 motion-preset-slide-down motion-delay-200 motion-duration-500 text-primary" style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{headingText}</h1>
              <p className="motion-opacity-in-0 motion-preset-slide-down motion-delay-400 motion-duration-500" style={{ fontSize: '1.25rem', maxWidth: '600px' }}>{descriptionText}</p>
              <div className="motion-opacity-in-0 motion-preset-slide-down motion-delay-600 motion-duration-500" style={{ display: 'flex', gap: '1rem' }}>
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

    HeroSection2: {
      fields: {
        header: {
          type: "text",
          label: "Header Text",
        },
        paragraph: {
          type: "text",
          label: "Paragraph Text",
        },
        imagePath: {
          type: "text",
          label: "Image Path",
        },
        imageAlt: {
          type: "text",
          label: "Image Alt Text",
        },
      },
      defaultProps: {
        header: "Your Heading",
        paragraph: "This is a paragraph with supporting information.",
        imagePath: "/your-image-path.jpg",
        imageAlt: "Descriptive alt"
      },
      render: ({ header, paragraph, imagePath, imageAlt }) => {
        return (
          <section className="overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2 sm:items-stretch">
            <div className="p-8 md:p-12 lg:px-16 lg:py-24">
              <div className="mx-auto max-w-xl flex flex-col justify-center h-full">
                <div className="intersect-once intersect:motion-preset-slide-right intersect:opacity-100 opacity-0 transition-opacity duration-500">
                  <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">{header}</h2>
                </div>

                <div className="intersect-once intersect:motion-preset-slide-right intersect:opacity-100 opacity-0 transition-opacity duration-500 mt-4 md:mt-8">
                  <p className="text-gray-500">{paragraph}</p>
                </div>

                <div className="mt-4 md:mt-8">
                  <button
                    className="inline-block rounded-sm bg-emerald-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-emerald-700 focus:ring-3 focus:ring-yellow-400 focus:outline-hidden"
                  >
                    Get Started Today
                  </button>
                </div>
              </div>
            </div>

            <div className="intersect-once intersect:motion-preset-slide-left intersect:opacity-100 opacity-0 transition-opacity duration-500">
              <img
                src={imagePath}
                alt={imageAlt}
                className="w-full h-full object-cover"
              />
            </div>
          </section>
        );
      },
    },


    HeadingBlock: {
      fields: {
        header: {
          type: "text",
          label: "Header Text",
        },
        paragraph: {
          type: "text",
          label: "Paragraph Text",
        },
        imagePath: {
          type: "text",
          label: "Image Path",
        },
        imageAlt: {
          type: "text",
          label: "Image Alt Text",
        },
        textMotion: {
          type: "select",
          label: "Text Motion Direction",
          options: [
            { label: "Slide Right", value: "intersect:motion-preset-slide-right" },
            { label: "Slide Left", value: "intersect:motion-preset-slide-left" },
            { label: "Slide Up", value: "intersect:motion-preset-slide-up" },
            { label: "Slide Down", value: "intersect:motion-preset-slide-down" },
            { label: "fade", value: "intersect:motion-preset-fade" },
          ],
        },
        imageMotion: {
          type: "select",
          label: "Image Motion Direction",
          options: [
            { label: "Slide Right", value: "intersect:motion-preset-slide-right" },
            { label: "Slide Left", value: "intersect:motion-preset-slide-left" },
            { label: "Slide Up", value: "intersect:motion-preset-slide-up" },
            { label: "Slide Down", value: "intersect:motion-preset-slide-down" },
            { label: "fade", value: "intersect:motion-preset-fade" },
          ],
        },
      },
      defaultProps: {
        header: "Your Heading",
        paragraph: "This is a paragraph with supporting information.",
        imagePath: "/your-image-path.jpg",
        imageAlt: "Descriptive alt",
        textMotion: "intersect:motion-preset-slide-right",
        imageMotion: "intersect:motion-preset-slide-left",
      },
      render: ({ header, paragraph, imagePath, imageAlt, textMotion, imageMotion, puck }) => {
        return (
          <section className="overflow-hidden bg-gray-50 md:grid md:grid-cols-2 md:items-stretch">
            <div className="p-8 md:p-12 lg:px-16 lg:py-24">
              <div className="mx-auto max-w-xl flex flex-col justify-center h-full">
                <div className={`intersect-once ${textMotion} intersect:opacity-100 opacity-0 transition-opacity duration-500 delay-200`}>
                  <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">{header}</h2>
                </div>
    
                <div className={`intersect-once ${textMotion} intersect:opacity-100 opacity-0 transition-opacity duration-500 mt-4 md:mt-8 delay-400`}>
                  <p style={{ color: puck?.metadata?.colorPrimary }}>
                    {paragraph}
                  </p>
                </div>
              </div>
            </div>
    
            <div className={`intersect-once ${imageMotion} intersect:opacity-100 opacity-0 transition-opacity duration-500 m-4 md:m-8 lg:m-16 xl:m-24 2xl:m-32`}>
              <img
                src={imagePath}
                alt={imageAlt}
                className="w-full h-auto object-cover rounded-2xl"
              />
            </div>
          </section>
        );
      },
    },
    
  }
};

export default config;