"use client"

import { useState } from 'react';

interface Props {
  onSuccess?: (res: any) => void;
  onError?: (err: string) => void;
}

export default function ImageUploader({ onSuccess, onError }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const res = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || 'Upload failed');
      }

      onSuccess?.(data);
    } catch (e: any) {
      const msg = e?.message || 'Upload error';
      setError(msg);
      onError?.(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
      <input
        type="file"
        accept="image/*"
        onChange={e => {
          setFile(e.target.files?.[0] || null);
          setError(null);
        }}
        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
      />

      <button
        onClick={handleUpload}
        disabled={loading || !file}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Uploading...' : 'Upload'}
      </button>

      {error && <div className="p-4 bg-red-100 text-red-700 rounded">{error}</div>}
    </div>
  );
}
