import { supabase } from './supabase';
import { GenerationOptions } from '../types';

export async function saveGeneration(
  userId: string,
  imageUrl: string,
  options: GenerationOptions,
  creditsSpent: number
) {
  const { error } = await supabase
    .from('generations')
    .insert({
      user_id: userId,
      prompt: options.prompt,
      style: options.style,
      size: options.size,
      model: options.model,
      image_url: imageUrl,
      credits_spent: creditsSpent
    });

  if (error) throw error;
}

export async function updateUserCredits(userId: string, creditsSpent: number) {
  const { data, error } = await supabase
    .rpc('decrement_credits', { user_id: userId, amount: creditsSpent });

  if (error) throw error;
  return data;
}

export async function getUserCredits(userId: string): Promise<number> {
  const { data, error } = await supabase
    .from('users')
    .select('credits')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data.credits;
}