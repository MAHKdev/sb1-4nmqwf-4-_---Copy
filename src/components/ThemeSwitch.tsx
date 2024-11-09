'use client';

import { useTheme } from 'next-themes';
import { Palette, Wand2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Modal } from './ui/Modal';

import toast, { Toaster } from 'react-hot-toast';

const themes = [
  { name: 'kiddo', icon: '🎨', label: 'Kiddo', description: 'Fun and playful theme for kids' },
  { name: 'cyberpunk', icon: '🌟', label: 'Cyberpunk', description: 'Neon-futuristic style' },
  { name: 'aqua', icon: '🌊', label: 'Aqua', description: 'Refreshing ocean colors' },
  { name: 'dark', icon: '🌙', label: 'Dark', description: 'Easy on the eyes' },
  { name: 'cupcake', icon: '🧁', label: 'Cupcake', description: 'Sweet pastel colors' },
  { name: 'garden', icon: '🌸', label: 'Garden', description: 'Natural and fresh' },
  { name: 'retro', icon: '🎮', label: 'Retro', description: 'Classic nostalgic style' },
];

export function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    toast(`Theme changed to ${themes.find(t => t.name === newTheme)?.label}`, {
      icon: (
        <div className="animate-spin-once">
          <Wand2 className="w-5 h-5 text-primary" />
        </div>
      ),
    });
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="btn btn-ghost btn-circle"
      >
        <Palette className="w-5 h-5" />
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Palette className="w-6 h-6" />
            Choose Theme
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {themes.map(({ name, icon, label, description }) => (
              <button
                key={name}
                onClick={() => handleThemeChange(name)}
                className={`card bg-base-200 hover:bg-base-300 transition-colors p-6 text-left ${
                  theme === name ? 'ring-2 ring-primary' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{icon}</span>
                  <div>
                    <h3 className="font-bold text-lg">{label}</h3>
                    <p className="text-sm opacity-70">{description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setIsOpen(false)}
              className="btn btn-ghost"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}