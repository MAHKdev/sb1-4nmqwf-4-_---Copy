'use client';

import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

interface AchievementBadgeProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  color?: string;
}

export function AchievementBadge({ 
  title, 
  description, 
  icon = <Award />,
  color = 'primary'
}: AchievementBadgeProps) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`achievement card bg-${color} text-${color}-content p-4`}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 bg-${color}-focus rounded-full`}>
          {icon}
        </div>
        <div>
          <h3 className="font-bold">{title}</h3>
          <p className="text-sm opacity-90">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}