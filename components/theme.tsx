"use client";

import { useState, useEffect } from 'react';

interface ColorPickerProps {
  onColorChange?: (color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ onColorChange }) => {
  const [color, setColor] = useState<string>('');

  useEffect(() => {
    // Fetch initial color from API
    fetch('/api/theme')
      .then(response => response.json())
      .then(data => {
        setColor(data.colorPrimary || '#4b87c3');
      })
      .catch(error => {
        console.error('Error fetching theme:', error);
        setColor('#4b87c3');
      });
  }, []);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setColor(newColor);
    
    try {
      // Update theme via API
      const response = await fetch('/api/theme', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ color: newColor }),
      });

      if (!response.ok) {
        throw new Error('Failed to update theme');
      }

      if (onColorChange) {
        onColorChange(newColor);
      }
    } catch (error) {
      console.error('Error updating theme:', error);
    }
  };

  return (
    <div className="flex items-center gap-4 p-4">
      <label htmlFor="colorPicker" className="text-sm font-medium">
        Primary Color
      </label>
      <input
        type="color"
        id="colorPicker"
        value={color}
        onChange={handleChange}
        className="h-8 w-8 rounded-full"
      />
      <div className="w-8 h-8 rounded-full" style={{ backgroundColor: color }}></div>
    </div>
  );
};