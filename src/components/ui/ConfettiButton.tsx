'use client';

import { useState } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export function ConfettiButton({ onClick, children, className = '' }: ConfettiButtonProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    setIsAnimating(true);
    
    // Get click coordinates
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // Trigger confetti
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { x, y },
      colors: ['#4C8BF5', '#FF6B9B', '#2ECC71', '#FFD93D'],
    });

    // Reset animation state
    setTimeout(() => setIsAnimating(false), 1000);

    // Call original onClick handler
    onClick?.();
  };

  return (
    <button
      onClick={handleClick}
      className={`${className} ${isAnimating ? 'animate-bounce-slow' : ''} transition-transform`}
    >
      {children}
    </button>
  );
}