import OpenAI from 'openai';
import { Size, Model } from '../types';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function generateIcon(
  prompt: string,
  size: Size,
  model: Model
): Promise<string> {
  try {
    const response = await openai.images.generate({
      model: model === 'dall-e-2' ? 'dall-e-2' : 'dall-e-3',
      prompt,
      n: 1,
      size: size,
      response_format: 'url'
    });

    return response.data[0].url;
  } catch (error) {
    console.error('Error generating image:', error);
    throw new Error('Failed to generate image');
  }
}