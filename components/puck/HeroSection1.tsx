import { Section, Container } from "@radix-ui/themes";

export const HeroSection1 = {
  HeroSection1: {
    label: "Hero Section 1",
    fields: {
      children: { type: "slot", label: "Hero Content" },
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
      }
    },
    defaultProps: {
      children: [
        {
          type: "Heading",
          props: {
            text: "Welcome to our site!",
            size: "8",
            as: "h1",
            align: "center",
            weight: "bold",
          },
        },
        {
          type: "Text",
          props: {
            size: "4",
            children: "This is a great place to get started.",
            align: "center",
          },
        },
        {
          type: "Flexbox",
          props: {
            mode: "content",
            flexDirection: "row",
            justifyContent: "center",
            gap: "1rem",
            alignItems: "stretch",
            spacing: [
              { top: "2rem", bottom: "0rem", left: "0rem", right: "0rem" },
              { top: "0rem", bottom: "0rem", left: "0rem", right: "0rem" },
            ],
            items: [
              {
                type: "Button",
                props: {
                  label: "Get Started",
                  href: "#get-started",
                  variant: "solid",
                  size: "3",
                  color: "indigo",
                },
              },
              {
                type: "Button",
                props: {
                  label: "Learn More",
                  href: "#learn-more",
                  variant: "outline",
                  size: "3",
                  color: "indigo",
                },
              },
            ],
          },
        },
      ],
      backgroundImage: null
    },
    render: ({ children: Children, backgroundImage }) => {
      const backgroundStyle = {
        backgroundColor: "var(--gray-a2)",
        borderRadius: "var(--radius-3)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden"
      };

      return (
        <Section size="3" py="9" style={backgroundStyle}>
          {backgroundImage && (
            <picture 
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
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
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block"
                }}
                alt="Background"
                loading="lazy"
              />
            </picture>
          )}
          <Container size="3">
            <Children />
          </Container>
        </Section>
      );
    }
  },
};