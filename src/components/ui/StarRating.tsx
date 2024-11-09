'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface StarRatingProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  onChange?: (value: number) => void;
}

export function StarRating({
  value,
  max = 5,
  size = 'md',
  onChange,
}: StarRatingProps) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, i) => (
        <motion.button
          key={i}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onChange?.(i + 1)}
          className={`${sizes[size]} ${
            i < value ? 'text-warning' : 'text-base-300'
          } transition-colors`}
        >
          <Star className="w-full h-full fill-current" />
        </motion.button>
      ))}
    </div>
  );
}