'use client';

import { useState } from 'react';

export default function ImageUploader({ onUpload }) {
  const [imageURL, setImageURL] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
      setImageURL(data.url);
      if (onUpload) onUpload(data.url, data.public_id);
    } else {
      alert(data.error || 'Upload failed!');
    }

    setLoading(false);
  };

  return (
    <div className="">
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="w-full mb-2 border rounded p-2"
      />

      {loading && <p className="text-sm text-gray-500">Uploading...</p>}

      {imageURL && (
        <div className="mt-2 flex align-middle gap-3">
          <p className="text-sm text-gray-600 ">Uploaded Preview:</p>
          <a href={imageURL} target='blank' className="text-sm text-blue-600 break-words">{imageURL}</a>
         
        </div>
      )}
    </div>
  );
}
