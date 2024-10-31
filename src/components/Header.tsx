import React from 'react';
import { LogOut, Settings } from 'lucide-react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

type HeaderProps = {
  credits: number;
  userEmail?: string;
};

export function Header({ credits, userEmail }: HeaderProps) {
  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success('Signed out successfully');
    } catch (error) {
      toast.error('Error signing out');
    }
  };

  return (
    <header className="p-4 border-b border-gray-700 bg-gray-800/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            Icon Generator AI
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-700/50 rounded-full">
            <span className="text-sm text-gray-300">Credits:</span>
            <span className="font-semibold text-white">{credits}</span>
          </div>

          {userEmail && (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-300 hidden md:inline">
                {userEmail}
              </span>
              <button
                onClick={handleSignOut}
                className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}