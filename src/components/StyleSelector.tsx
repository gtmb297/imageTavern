import React from 'react';
import { styleOptions } from '../config/styles';
import { StyleOption } from '../types';

type StyleSelectorProps = {
  selectedStyle: string;
  onStyleSelect: (style: string) => void;
};

export function StyleSelector({ selectedStyle, onStyleSelect }: StyleSelectorProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Choose Style</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {styleOptions.map((style: StyleOption) => {
          const Icon = style.icon;
          return (
            <button
              key={style.id}
              onClick={() => onStyleSelect(style.id)}
              className={`p-4 rounded-lg border transition-all ${
                selectedStyle === style.id
                  ? 'border-blue-500 bg-blue-500/20'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              <Icon className="w-6 h-6 mb-2" />
              <h3 className="font-medium">{style.name}</h3>
              <p className="text-sm text-gray-400">{style.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}