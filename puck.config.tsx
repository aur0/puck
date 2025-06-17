import React, { useState, useEffect } from "react";
import { FieldLabel } from "@measured/puck";
import { Dialog, Button, Inset, Flex } from "@radix-ui/themes";

const config = {
  components: {
    Example: {
      fields: {
        image: {
          type: "custom",
          label: "Select Image",
          render: ({ value, onChange }) => {
            const [loading, setLoading] = useState(false);
            const [apiResponse, setApiResponse] = useState(null);

            const fetchImages = async () => {
              setLoading(true);
              try {
                const res = await fetch('/api/get-images');
                const data = await res.json();
                setApiResponse(data);
              } catch (err) {
                console.error('Error:', err);
                setApiResponse({ error: err.message });
              } finally {
                setLoading(false);
              }
            };

            return (
              <Dialog.Root>
                <Dialog.Trigger>
                  <Button onClick={fetchImages}>
                    View Images
                  </Button>
                </Dialog.Trigger>
                <Dialog.Content>
                  <Dialog.Title>Select Image</Dialog.Title>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem' }}>
                    {loading ? (
                      <p>Loading...</p>
                    ) : apiResponse?.images?.map((image, index) => (
                      <div 
                        key={index}
                        style={{ 
                          cursor: 'pointer',
                          border: '1px solid #ccc',
                          padding: '0.5rem',
                          borderRadius: '4px'
                        }}
                        onClick={() => {
                          onChange({
                            webp_url: image.webp_url,
                            webp_medium_url: image.webp_medium_url,
                            original_url: image.original_url,
                            original_medium_url: image.original_medium_url
                          });
                        }}
                      >
                        <img 
                          src={image.original_thumbnail_url} 
                          alt={`Preview ${index + 1}`}
                          style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
                        />
                      </div>
                    ))}
                  </div>
                </Dialog.Content>
              </Dialog.Root>
            );
          },
        },
      },
      defaultProps: {
        image: {
          webp_url: null,
          webp_medium_url: null,
          original_url: null,
          original_medium_url: null
        }
      },
      render: ({ image }) => {
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
  },
};

export default config;
