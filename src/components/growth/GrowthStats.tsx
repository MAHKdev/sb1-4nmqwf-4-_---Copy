'use client';

import { Child, GrowthEntry } from '@/types';
import { differenceInDays, differenceInMonths, differenceInYears, format, parseISO } from 'date-fns';
import { Scale, Calendar, TrendingUp, Ruler } from 'lucide-react';

interface GrowthStatsProps {
  child: Child;
}

export function GrowthStats({ child }: GrowthStatsProps) {
  // Sort entries by date, most recent first
  const sortedEntries = [...child.growthData].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const latestEntry = sortedEntries[0];
  const previousEntry = sortedEntries[1];

  // Calculate age
  const birthDate = parseISO(child.birthDate);
  const today = new Date();
  const ageYears = differenceInYears(today, birthDate);
  const ageMonths = differenceInMonths(today, birthDate) % 12;
  const ageDays = differenceInDays(today, birthDate) % 30;

  // Calculate height change
  const heightChange = latestEntry && previousEntry
    ? latestEntry.height - previousEntry.height
    : 0;

  const heightChangeText = heightChange === 0
    ? 'No change'
    : `${heightChange > 0 ? '+' : ''}${heightChange.toFixed(1)} cm`;

  // Calculate weight change
  const weightChange = latestEntry && previousEntry
    ? latestEntry.weight - previousEntry.weight
    : 0;

  const weightChangeText = weightChange === 0
    ? 'No change'
    : `${weightChange > 0 ? '+' : ''}${weightChange.toFixed(1)} kg`;

  // Calculate growth rate (cm per month)
  const growthRate = latestEntry && previousEntry
    ? (heightChange / Math.max(1, differenceInMonths(parseISO(latestEntry.date), parseISO(previousEntry.date))))
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Current Age */}
      <div className="card bg-base-200">
        <div className="card-body">
          <h3 className="card-title text-lg flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Current Age
          </h3>
          <div className="mt-2">
            <div className="text-3xl font-bold">{ageYears}</div>
            <div className="text-sm opacity-70">
              {ageYears} years, {ageMonths} months, {ageDays} days
            </div>
            <div className="text-xs opacity-50 mt-1">
              Born {format(birthDate, 'PPP')}
            </div>
          </div>
        </div>
      </div>

      {/* Current Height */}
      <div className="card bg-base-200">
        <div className="card-body">
          <h3 className="card-title text-lg flex items-center gap-2">
            <Ruler className="w-5 h-5 text-primary" />
            Current Height
          </h3>
          <div className="mt-2">
            <div className="text-3xl font-bold">
              {latestEntry?.height || '--'}
              <span className="text-base ml-1">cm</span>
            </div>
            <div className="text-sm opacity-70">
              {heightChangeText} since last measurement
            </div>
            <div className="text-xs opacity-50 mt-1">
              Last measured: {latestEntry ? format(parseISO(latestEntry.date), 'PP') : '--'}
            </div>
          </div>
        </div>
      </div>

      {/* Current Weight */}
      <div className="card bg-base-200">
        <div className="card-body">
          <h3 className="card-title text-lg flex items-center gap-2">
            <Scale className="w-5 h-5 text-secondary" />
            Current Weight
          </h3>
          <div className="mt-2">
            <div className="text-3xl font-bold">
              {latestEntry?.weight || '--'}
              <span className="text-base ml-1">kg</span>
            </div>
            <div className="text-sm opacity-70">
              {weightChangeText} since last measurement
            </div>
            <div className="text-xs opacity-50 mt-1">
              Last measured: {latestEntry ? format(parseISO(latestEntry.date), 'PP') : '--'}
            </div>
          </div>
        </div>
      </div>

      {/* Growth Rate */}
      <div className="card bg-base-200">
        <div className="card-body">
          <h3 className="card-title text-lg flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-accent" />
            Growth Rate
          </h3>
          <div className="mt-2">
            {latestEntry && previousEntry ? (
              <>
                <div className="text-3xl font-bold">
                  {Math.abs(growthRate).toFixed(1)}
                  <span className="text-base ml-1">cm/month</span>
                </div>
                <div className="text-sm opacity-70">
                  Average growth rate
                </div>
                <div className="text-xs opacity-50 mt-1">
                  Based on last {differenceInMonths(parseISO(latestEntry.date), parseISO(previousEntry.date))} months
                </div>
              </>
            ) : (
              <div className="text-sm opacity-70">
                Need more measurements
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}