import React from 'react';
import { Size, Model } from '../types';

type GenerationOptionsProps = {
  size: Size;
  model: Model;
  onSizeChange: (size: Size) => void;
  onModelChange: (model: Model) => void;
};

export function GenerationOptions({
  size,
  model,
  onSizeChange,
  onModelChange,
}: GenerationOptionsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">AI Model</h2>
        <select
          value={model}
          onChange={(e) => onModelChange(e.target.value as Model)}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2"
        >
          <option value="dall-e-2">DALL-E 2 (1 credit)</option>
          <option value="dall-e-3">DALL-E 3 (2 credits)</option>
        </select>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Size</h2>
        <select
          value={size}
          onChange={(e) => onSizeChange(e.target.value as Size)}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2"
        >
          <option value="256x256">256x256 px</option>
          <option value="512x512">512x512 px</option>
          <option value="1024x1024">1024x1024 px (Premium)</option>
        </select>
      </div>
    </div>
  );
}