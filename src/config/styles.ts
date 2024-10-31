import { StyleOption } from '../types';
import { 
  Palette, 
  //Box3d, 
  PenTool, 
  Minimize2, 
  Brush, 
  Layers, 
  Sparkles, 
  Shapes 
} from 'lucide-react';

export const styleOptions: StyleOption[] = [
  {
    id: 'flat',
    name: 'Flat Design',
    description: 'Clean, minimal icons with solid colors',
    icon: Minimize2,
    prompt: 'flat design style, minimal, clean lines, solid colors'
  },
  {
    id: 'outline',
    name: 'Outline',
    description: 'Elegant line-based icons',
    icon: PenTool,
    prompt: 'outline style, thin lines, minimalist, stroke-based'
  },
  {
    id: 'gradient',
    name: 'Gradient',
    description: 'Modern icons with smooth color transitions',
    icon: Palette,
    prompt: 'smooth gradient colors, modern, sleek'
  },
  {
    id: 'hand-drawn',
    name: 'Hand Drawn',
    description: 'Artistic hand-drawn style icons',
    icon: Brush,
    prompt: 'hand-drawn style, sketchy, artistic, organic lines'
  },
  {
    id: 'isometric',
    name: 'Isometric',
    description: '45-degree angle isometric icons',
    icon: Layers,
    prompt: 'isometric perspective, 45-degree angle, geometric'
  },
  {
    id: 'glassmorphic',
    name: 'Glassmorphic',
    description: 'Modern frosted glass effect',
    icon: Sparkles,
    prompt: 'glassmorphic style, frosted glass effect, transparent'
  },
  {
    id: 'geometric',
    name: 'Geometric',
    description: 'Icons based on basic shapes',
    icon: Shapes,
    prompt: 'geometric shapes, abstract, mathematical precision'
  }
];