'use client';

import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { Calendar, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { Contract } from '@/types';

export default function CalendarPage() {
  const { children, contracts } = useAppStore();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showDaily, setShowDaily] = useState(true);
  const [showWeekly, setShowWeekly] = useState(true);
  const [showMonthly, setShowMonthly] = useState(true);

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const getChoresForDay = (date: Date, childId?: string): Contract[] => {
    return contracts.filter((chore) => {
      // Filter based on visibility settings
      if (chore.frequency === 'daily' && !showDaily) return false;
      if (chore.frequency === 'weekly' && !showWeekly) return false;
      if (chore.frequency === 'monthly' && !showMonthly) return false;

      // Check if the chore should appear on this day
      const isCorrectDay = 
        chore.frequency === 'daily' ||
        (chore.frequency === 'weekly' && chore.scheduledDay === date.getDay()) ||
        (chore.frequency === 'monthly' && chore.scheduledDay === date.getDate());

      if (!isCorrectDay) return false;

      // Handle collective chores - only show in the first child's row
      if (chore.isCollective) {
        return children[0].id === childId;
      }

      // Handle individual chores
      if (chore.childId) {
        return chore.childId === childId;
      }

      // For unassigned non-collective chores, show for all children
      return true;
    });
  };

  const getChoreCardClass = (chore: Contract) => {
    if (chore.isCollective) return 'bg-primary/10 border-l-4 border-primary';
    if (chore.frequency === 'daily') return 'bg-base-200';
    if (chore.frequency === 'weekly') return 'bg-secondary/10';
    if (chore.frequency === 'monthly') return 'bg-accent/10';
    return 'bg-base-200';
  };

  const previousWeek = () => {
    setCurrentDate((prev) => addDays(prev, -7));
  };

  const nextWeek = () => {
    setCurrentDate((prev) => addDays(prev, 7));
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Calendar className="w-6 h-6" />
          Chore Schedule
        </h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button onClick={previousWeek} className="btn btn-circle btn-sm">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-medium">
              {format(weekStart, 'MMM d')} - {format(addDays(weekStart, 6), 'MMM d, yyyy')}
            </span>
            <button onClick={nextWeek} className="btn btn-circle btn-sm">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <Filter className="w-5 h-5" />
            </label>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={showDaily}
                    onChange={(e) => setShowDaily(e.target.checked)}
                    className="checkbox checkbox-sm"
                  />
                  Daily Chores
                </label>
              </li>
              <li>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={showWeekly}
                    onChange={(e) => setShowWeekly(e.target.checked)}
                    className="checkbox checkbox-sm"
                  />
                  Weekly Chores
                </label>
              </li>
              <li>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={showMonthly}
                    onChange={(e) => setShowMonthly(e.target.checked)}
                    className="checkbox checkbox-sm"
                  />
                  Monthly Chores
                </label>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <div className="badge badge-ghost gap-2">
          <div className="w-2 h-2 rounded-full bg-base-200"></div>
          Daily
        </div>
        <div className="badge badge-ghost gap-2">
          <div className="w-2 h-2 rounded-full bg-secondary/10"></div>
          Weekly
        </div>
        <div className="badge badge-ghost gap-2">
          <div className="w-2 h-2 rounded-full bg-accent/10"></div>
          Monthly
        </div>
        <div className="badge badge-ghost gap-2">
          <div className="w-2 h-2 rounded-full bg-primary/10"></div>
          Collective
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th className="bg-base-200">Child</th>
              {weekDays.map((day) => (
                <th
                  key={day.toISOString()}
                  className={`bg-base-200 text-center ${
                    isSameDay(day, new Date()) ? 'text-primary font-bold' : ''
                  }`}
                >
                  <div>{format(day, 'EEE')}</div>
                  <div className="text-sm opacity-70">{format(day, 'MMM d')}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {children.map((child) => (
              <tr key={child.id}>
                <td className="bg-base-200">
                  <div className="flex items-center gap-2">
                    <div className="avatar">
                      <div className="w-8 h-8 rounded-full">
                        <img src={child.avatar} alt={child.name} />
                      </div>
                    </div>
                    <span>{child.name}</span>
                  </div>
                </td>
                {weekDays.map((day) => {
                  const dayChores = getChoresForDay(day, child.id);
                  return (
                    <td
                      key={day.toISOString()}
                      className={`align-top p-2 ${
                        isSameDay(day, new Date()) ? 'bg-base-200/50' : ''
                      }`}
                    >
                      {dayChores.map((chore) => (
                        <div
                          key={chore.id}
                          className={`card ${getChoreCardClass(chore)} p-2 mb-2 text-sm`}
                        >
                          <div className="font-medium">{chore.task}</div>
                          <div className="text-xs opacity-70">
                            {chore.points} points
                            {chore.isOptional && ' • Optional'}
                            {chore.mandatory && ' • Required'}
                            {chore.isCollective && ' • Collective'}
                            {!chore.childId && !chore.isCollective && ' • Anyone'}
                          </div>
                        </div>
                      ))}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}