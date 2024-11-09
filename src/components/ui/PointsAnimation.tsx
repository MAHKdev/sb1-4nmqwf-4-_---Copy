import { motion } from 'framer-motion';

interface PointsAnimationProps {
  oldPoints: number;
  newPoints: number;
}

export function PointsAnimation({ oldPoints, newPoints }: PointsAnimationProps) {
  const isDecrease = newPoints < oldPoints;

  return (
    <div className="flex items-center gap-4 justify-center my-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-3xl font-bold opacity-50 line-through"
      >
        {oldPoints}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`text-4xl font-bold ${isDecrease ? 'text-error' : 'text-success'}`}
      >
        {newPoints}
      </motion.div>
    </div>
  );
}