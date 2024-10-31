import { CreditCost } from '../types';

export const INITIAL_CREDITS = 5;

export const creditCosts: CreditCost = {
  'dall-e-2': {
    '256x256': 1,
    '512x512': 2,
    '1024x1024': 4
  },
  'dall-e-3': {
    '256x256': 2,
    '512x512': 3,
    '1024x1024': 5
  }
};