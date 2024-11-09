'use client';

import { format, eachDayOfInterval, subDays, isSameDay, isToday } from 'date-fns';
import { useAppStore } from '../store/useAppStore';
import { motion } from 'framer-motion';

interface DayPerformance {
  date: Date;
  hasCompletedTask: boolean;
  hasPenalty: boolean;
}

export function PerformanceCalendar() {
  const { activeChild, activityLog } = useAppStore();

  if (!activeChild) return null;

  const getDayPerformance = (date: Date): DayPerformance => {
    const dayActivities = activityLog.filter(
      log => log.childId === activeChild.id && isSameDay(new Date(log.timestamp), date)
    );

    return {
      date,
      hasCompletedTask: dayActivities.some(activity => activity.type === 'chore'),
      hasPenalty: dayActivities.some(activity => activity.type === 'penalty'),
    };
  };

  // Get last 7 days for mobile view
  const lastDays = eachDayOfInterval({
    start: subDays(new Date(), 6),
    end: new Date(),
  }).map(date => getDayPerformance(date));

  const getColorClass = (performance: DayPerformance) => {
    if (performance.hasPenalty) return 'bg-error';
    if (performance.hasCompletedTask) return 'bg-success';
    if (isSameDay(performance.date, new Date())) return 'bg-base-300 border-2 border-primary';
    return 'bg-base-300';
  };

  return (
    <div className="card bg-base-100">
      <div className="card-body">
        <h3 className="card-title text-lg mb-4">Streak Calendar</h3>
        <div className="grid grid-cols-7 gap-2">
          {lastDays.map((day, index) => (
            <motion.div
              key={day.date.toISOString()}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              className="flex flex-col items-center gap-1"
            >
              <span className="text-xs font-medium opacity-70">
                {format(day.date, 'EEE')}
              </span>
              <div className="relative w-full">
                <div
                  className={`pt-[100%] rounded-lg ${getColorClass(day)} relative`}
                >
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">
                    {format(day.date, 'd')}
                  </span>
                </div>
                {isToday(day.date) && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <span className="text-[10px] font-bold text-primary">TODAY</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-between text-xs mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-success" />
            <span>Completed Tasks</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-error" />
            <span>Penalty</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-base-300" />
            <span>No Activity</span>
          </div>
        </div>
      </div>
    </div>
  );
}