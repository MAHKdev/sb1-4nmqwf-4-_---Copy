'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number;
  max: number;
  color?: string;
  showLabel?: boolean;
  className?: string;
}

export function ProgressBar({
  value,
  max,
  color = 'primary',
  showLabel = true,
  className = '',
}: ProgressBarProps) {
  const percentage = Math.min(100, (value / max) * 100);

  return (
    <div className={className}>
      <div className="relative h-4 bg-base-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`absolute inset-y-0 left-0 bg-${color}`}
        />
        {showLabel && (
          <div className="absolute inset-0 flex items-center justify-center text-xs font-bold">
            {Math.round(percentage)}%
          </div>
        )}
      </div>
    </div>
  );
}