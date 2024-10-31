import React from 'react';
import { Auth as SupabaseAuth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../lib/supabase';

export function Auth() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Icon Generator AI</h1>
          <p className="text-gray-400">Create beautiful icons with AI</p>
        </div>
        
        <SupabaseAuth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#3B82F6',
                  brandAccent: '#2563EB',
                  inputBackground: '#374151',
                  inputText: 'white',
                  inputPlaceholder: '#9CA3AF',
                  backgroundSecondary: '#1F2937',
                  backgroundPrimary: '#111827',
                }
              }
            },
            style: {
              button: {
                borderRadius: '0.5rem',
                padding: '0.75rem 1rem',
                fontSize: '1rem',
                fontWeight: '500',
              },
              input: {
                borderRadius: '0.5rem',
                padding: '0.75rem 1rem',
                fontSize: '1rem',
              },
              anchor: {
                color: '#60A5FA',
                textDecoration: 'none',
                fontWeight: '500',
                '&:hover': {
                  color: '#3B82F6',
                }
              }
            }
          }}
          providers={['google']}
          redirectTo={`${window.location.origin}/auth/callback`}
          theme="dark"
        />
      </div>
    </div>
  );
}