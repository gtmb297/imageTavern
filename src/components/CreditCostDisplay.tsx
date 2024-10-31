import React from 'react';
import { AlertCircle, Loader2 } from 'lucide-react';

type CreditCostDisplayProps = {
  cost: number;
  isDisabled: boolean;
  isPremiumSize: boolean;
  onGenerate: () => void;
  loading: boolean;
};

export function CreditCostDisplay({
  cost,
  isDisabled,
  isPremiumSize,
  onGenerate,
  loading,
}: CreditCostDisplayProps) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">Cost: {cost} credits</span>
          {isDisabled && (
            <div className="flex items-center text-red-400 text-sm">
              <AlertCircle className="w-4 h-4 mr-1" />
              {isPremiumSize ? 'Premium size requires subscription' : 'Insufficient credits'}
            </div>
          )}
        </div>
        <button
          onClick={onGenerate}
          disabled={isDisabled || loading}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded-lg transition-colors flex items-center gap-2 font-medium disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating...
            </>
          ) : (
            'Generate Icon'
          )}
        </button>
      </div>
    </div>
  );
}