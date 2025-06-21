import type { Config } from "@measured/puck";

export const config: Config = {
  components: {
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
    }
    
  },
};

export default config;