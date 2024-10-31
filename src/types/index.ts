export type StyleOption = {
  id: string;
  name: string;
  description: string;
  icon: string;
  prompt: string;
};

export type Size = '256x256' | '512x512' | '1024x1024';
export type Model = 'dall-e-2' | 'dall-e-3';

export type GenerationOptions = {
  style: string;
  size: Size;
  model: Model;
  prompt: string;
};

export type CreditCost = {
  [key in Model]: {
    [size in Size]: number;
  };
};