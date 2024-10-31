import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Header } from '../components/Header';
import { StyleSelector } from '../components/StyleSelector';
import { GenerationOptions } from '../components/GenerationOptions';
import { CreditCostDisplay } from '../components/CreditCostDisplay';
import { creditCosts, INITIAL_CREDITS } from '../config/pricing';
import { styleOptions } from '../config/styles';
import { GenerationOptions as GenerationOptionsType, Size, Model } from '../types';
import { generateIcon } from '../lib/openai';
import { saveGeneration, updateUserCredits, getUserCredits } from '../lib/database';
import toast from 'react-hot-toast';

function IconGenerator() {
  const { user } = useAuth();
  const [credits, setCredits] = useState(INITIAL_CREDITS);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<GenerationOptionsType>({
    style: '',
    size: '256x256',
    model: 'dall-e-2',
    prompt: ''
  });
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      getUserCredits(user.id).then(setCredits);
    }
  }, [user]);

  const getCreditCost = () => {
    if (!options.model || !options.size) return 0;
    return creditCosts[options.model][options.size];
  };

  const isOptionDisabled = (cost: number) => {
    return cost > credits || (options.size === '1024x1024' && credits < INITIAL_CREDITS);
  };

  const handleGenerate = async () => {
    if (!options.style) {
      toast.error('Please select a style first');
      return;
    }

    if (!options.prompt.trim()) {
      toast.error('Please describe your icon');
      return;
    }

    const cost = getCreditCost();
    if (cost > credits) {
      toast.error('Insufficient credits');
      return;
    }

    setLoading(true);
    const selectedStyle = styleOptions.find(s => s.id === options.style);
    const fullPrompt = `Create an icon with ${selectedStyle?.prompt}. The icon should be ${options.prompt}`;

    try {
      const imageUrl = await generateIcon(fullPrompt, options.size, options.model);
      setGeneratedImage(imageUrl);
      
      await saveGeneration(user!.id, imageUrl, options, cost);
      const newCredits = await updateUserCredits(user!.id, cost);
      
      setCredits(newCredits);
      toast.success('Icon generated successfully!');
    } catch (error) {
      toast.error('Failed to generate icon');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <Header credits={credits} userEmail={user?.email} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <StyleSelector
            selectedStyle={options.style}
            onStyleSelect={(style) => setOptions({ ...options, style })}
          />
          
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-300">
              Describe your icon
            </label>
            <textarea
              value={options.prompt}
              onChange={(e) => setOptions({ ...options, prompt: e.target.value })}
              className="w-full h-24 bg-gray-800 border border-gray-700 rounded-lg p-2 text-white resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Describe what you want in your icon..."
            />
          </div>
          
          <GenerationOptions
            size={options.size}
            model={options.model}
            onSizeChange={(size) => setOptions({ ...options, size })}
            onModelChange={(model) => setOptions({ ...options, model })}
          />
          
          <CreditCostDisplay
            cost={getCreditCost()}
            isDisabled={isOptionDisabled(getCreditCost())}
            isPremiumSize={options.size === '1024x1024'}
            onGenerate={handleGenerate}
            loading={loading}
          />

          {generatedImage && (
            <div className="mt-8 animate-fade-in">
              <h2 className="text-xl font-semibold mb-4">Generated Icon</h2>
              <div className="bg-gray-800 p-4 rounded-lg">
                <img
                  src={generatedImage}
                  alt="Generated icon"
                  className="mx-auto max-w-full h-auto rounded-lg shadow-lg"
                />
                <div className="mt-4 flex justify-center">
                  <a
                    href={generatedImage}
                    download="icon.png"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors flex items-center gap-2"
                  >
                    Download Icon
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default IconGenerator;