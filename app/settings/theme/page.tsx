"use client";

import { useState } from 'react';
import theme from '@/theme.json';

export default function ThemeSettingsPage() {
  const [color, setColor] = useState(theme.colorPrimary);
  const [newColor, setNewColor] = useState(theme.colorPrimary);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await fetch('/api/theme', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ colorPrimary: newColor }),
      });

      if (!response.ok) {
        throw new Error('Failed to update theme');
      }

      setColor(newColor);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Theme Settings</h1>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Primary Color</label>
          <div className="flex gap-4">
            <input
              type="color"
              value={newColor}
              onChange={(e) => setNewColor(e.target.value)}
              disabled={loading}
              className="w-24 h-24 rounded-lg"
            />
            <button
              onClick={handleSave}
              disabled={loading || newColor === color}
              className={`px-4 py-2 rounded-md ${
                loading || newColor === color
                  ? 'bg-gray-200 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-sm">Current Color:</span>
            <div
              style={{
                backgroundColor: color,
                width: '2rem',
                height: '2rem',
                borderRadius: '4px',
              }}
            />
          </div>
          {error && (
            <p className="mt-2 text-sm text-red-500">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
}