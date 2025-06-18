import { useState } from "react";
import { Dialog, Button } from "@radix-ui/themes";
import type { ReactNode } from "react";
import Image from "next/image";

type ImageData = {
  webp_url: string | null;
  webp_medium_url: string | null;
  original_url: string | null;
  original_medium_url: string | null;
};

type FieldDefinition = {
  type: string;
  label: string;
  render: ({ value, onChange }: { value: ImageData; onChange: (data: ImageData) => void; }) => ReactNode;
};

const useImageSelector = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [apiResponse, setApiResponse] = useState<any>(null);

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

  return { loading, apiResponse, fetchImages };
};

const ImageSelector = ({ value, onChange }: {
  value: ImageData;
  onChange: (data: ImageData) => void;
}) => {
  const { loading, apiResponse, fetchImages } = useImageSelector();

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button onClick={fetchImages}>
          {loading ? "Loading..." : "Select Image"}
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>Select Image</Dialog.Title>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem' }}>
          {loading ? (
            <div>Loading...</div>
          ) : apiResponse?.images?.map((image: any, index: number) => (
            <div
              key={index}
              style={{
                cursor: 'pointer',
                border: '1px solid #ccc',
                padding: '0.5rem',
                borderRadius: '4px',
                position: 'relative',
                height: '150px'
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
              <Image
                src={image.original_thumbnail_url}
                alt={`Preview ${index + 1}`}
                fill
                style={{ objectFit: 'cover', borderRadius: '4px' }}
                sizes="(max-width: 150px) 100vw, 150px"
              />
            </div>
          ))}
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export const imageFields: FieldDefinition = {
  type: "custom",
  label: "Select Image",
  render: ({ value, onChange }) => <ImageSelector value={value} onChange={onChange} />,
};