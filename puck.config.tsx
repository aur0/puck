import type { Config } from "@measured/puck";
import Link from 'next/link';
import { FieldLabel } from "@measured/puck";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { HexColorPicker, HexColorInput } from 'react-colorful';

import { colord, extend } from 'colord';
import a11yPlugin from 'colord/plugins/a11y';

// Extend colord with the a11y plugin
extend([a11yPlugin]);

const ColorPicker = React.memo(({ label, value, onChange }: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const debouncedOnChange = useCallback(
    (color: string) => {
      clearTimeout(debouncedOnChange.timeout);
      debouncedOnChange.timeout = setTimeout(() => onChange(color), 200);
    },
    [onChange]
  ) as { (color: string): void; timeout?: ReturnType<typeof setTimeout> };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => 
      pickerRef.current && !pickerRef.current.contains(event.target as Node) && setIsOpen(false);

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={pickerRef} className="relative">
      <FieldLabel label={label}></FieldLabel>
      <div className="flex items-center gap-2">
        <div 
          className="min-w-8 min-h-8 rounded-full cursor-pointer border-1 border-gray-300"
          style={{ backgroundColor: value }}
          onClick={() => setIsOpen(!isOpen)}
        />
        <HexColorInput
          color={value}
          onChange={debouncedOnChange}
          className="border rounded px-2 py-1"
          prefixed
          alpha
        />
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 z-50">
          <HexColorPicker
            color={value}
            onChange={debouncedOnChange}
          />
        </div>
      )}
    </div>
  );
});

export const config: Config = {
  root: {
    fields: {
      title: { type: "text" },
      description: { type: "textarea" },
      primaryColor: {
        type: "custom",
        label: "Primary Color",
        render: ({ field, value, onChange }) => (
          <ColorPicker
            label={field.label}
            value={value}
            onChange={onChange}
          />
        ),
      },
      secondaryColor: {
        type: "custom",
        label: "Secondary Color",
        render: ({ field, value, onChange }) => (
          <ColorPicker
            label={field.label}
            value={value}
            onChange={onChange}
          />
        ),
      },
      accentColor: {
        type: "custom",
        label: "Accent Color",
        render: ({ field, value, onChange }) => (
          <ColorPicker
            label={field.label}
            value={value}
            onChange={onChange}
          />
        ),
      },
      backgroundColor: {
        type: "custom",
        label: "Background Color",
        render: ({ field, value, onChange }) => (
          <ColorPicker
            label={field.label}
            value={value}
            onChange={onChange}
          />
        ),
      },
      surfaceColor: {
        type: "custom",
        label: "Surface Color",
        render: ({ field, value, onChange }) => (
          <ColorPicker
            label={field.label}
            value={value}
            onChange={onChange}
          />
        ),
      },
      textPrimary: {
        type: "custom",
        label: "Text Primary",
        render: ({ field, value, onChange }) => (
          <ColorPicker
            label={field.label}
            value={value}
            onChange={onChange}
          />
        ),
      },
    },
    defaultProps: {
      title: "DashboardUI",
      description: "Lorem ipsum",
      primaryColor: "#007bff", // Default blue color for buttons
      secondaryColor: "#6c757d", // Default gray color for secondary elements
      accentColor: "#FF0000", // Default hex value
      backgroundColor: "#ffffff", // Default hex value
      surfaceColor: "#F3F4F6", // Default hex value
      textPrimary: "#FF0000", // Default hex value
    },
    render: ({ children, textPrimary, primaryColor, secondaryColor }) => {
      // Calculate luminance
      const luminance = colord(primaryColor).luminance();
      
      // Choose text color based on luminance
      const buttonTextColor = luminance > 0.7 ? '#22392C' : '#ffffff';
      
      return (
        <div>
          <style>
            {`
              .text-primary {
                color: ${textPrimary};
              }
              .button-primary {
                background-color: ${primaryColor};
                color: ${buttonTextColor};
                transition: background-color 0.2s ease;
              }
              .button-primary:hover {
                background-color: ${colord(primaryColor).lighten(0.1).toHex()};
              }
              .text-secondary {
                color: ${secondaryColor};
              }
            `}
          </style>
          {children}
        </div>
      );
    },    
  },
  components: {
    
    
    HeroSection1: {
      fields: {
        heading: {
          type: "text",
          label: "Heading Text",
          placeholder: "Enter heading text"
        },
        description: {
          type: "text",
          label: "Description Text",
          placeholder: "Enter description text"
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
        buttonLabel: {
          type: "text",
          label: "Button Label",
          placeholder: "Enter button label"
        },
        buttonUrl: {
          type: "text",
          label: "Button URL",
          placeholder: "Enter button URL"
        }
      },
      defaultProps: {
        heading: "Your Free Guide to Discover the Wild Beauty of the Lake District",
        description: "Wander through breathtaking landscapes, timeless villages, and peaceful lakes — your Lake District adventure starts here.",
        backgroundImage: null,
        buttonLabel: "GET YOUR GUIDE",
        buttonUrl: "#get-started"
      },
      render: ({ heading, description, backgroundImage, buttonLabel, buttonUrl }) => {
        return (
          <div className="w-full h-screen relative flex items-center justify-center text-center p-4">
            {backgroundImage && (
              <picture className="absolute top-0 left-0 w-full h-full z-[-1]">
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
                  className="w-full h-full object-cover object-center"
                />
              </picture>
            )}
            <div className="flex flex-col items-center gap-5">
              <h1 className="motion-opacity-in-0 motion-preset-slide-down motion-delay-200 motion-duration-500 text-primary text-4xl font-bold max-w-2xl">
                {heading}
              </h1>
              <p className="motion-opacity-in-0 motion-preset-slide-down motion-delay-400 motion-duration-500 text-primary text-xl max-w-3xl">
                {description}
              </p>
              <div className="motion-opacity-in-0 motion-preset-slide-down motion-delay-600 motion-duration-500">
                {buttonLabel && buttonUrl && (
                  <Link href={buttonUrl}>
                    <button
                      className="px-6 py-3 rounded-lg text-base cursor-pointer transition-colors duration-200 button-primary"
                    >
                      {buttonLabel}
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        );
      },
    },

   
    
  }
};

export default config;