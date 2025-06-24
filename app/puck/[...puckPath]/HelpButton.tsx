'use client'

import { useState } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import theme from '@/theme.json';

export function HelpButton() {
  const [isOpen, setIsOpen] = useState(false);
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
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transition-colors"
      >
        Settings
      </button>

      {/* Dialog */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/50" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="max-w-md w-full bg-white rounded-lg p-6 shadow-xl">
            <DialogTitle className="text-lg font-bold mb-4">
              Theme Settings
            </DialogTitle>
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
                  <div className="flex flex-col gap-2">
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
                    <button
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                      Close
                    </button>
                  </div>
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
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
