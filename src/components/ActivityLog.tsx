'use client';

import React from 'react';
import { format } from 'date-fns';
import { useAppStore } from '../store/useAppStore';

export function ActivityLog() {
  const { activityLog, children } = useAppStore();

  return (
    <div className="card bg-base-200">
      <div className="card-body">
        <h2 className="card-title">Activity History</h2>
        <div className="space-y-4">
          {activityLog.map((activity, index) => {
            const child = children.find((c) => c.id === activity.childId);
            if (!child) return null;

            // Create a unique key using both the activity ID and index
            const uniqueKey = `${activity.id}-${index}`;

            return (
              <div
                key={uniqueKey}
                className={`flex items-center justify-between p-3 rounded-lg bg-base-100
                  ${activity.type === 'penalty' ? 'border-l-4 border-error' : ''}`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <img
                      src={child.avatar}
                      alt={child.name}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="font-medium">{child.name}</span>
                  </div>
                  <p className="text-sm opacity-70">{activity.description}</p>
                  <time className="text-xs opacity-50">
                    {format(new Date(activity.timestamp), 'PPp')}
                  </time>
                </div>
                <span
                  className={`font-medium ${
                    activity.type === 'penalty' ? 'text-error' : 'text-primary'
                  }`}
                >
                  {activity.type === 'penalty' ? '-' : '+'}
                  {activity.points} points
                </span>
              </div>
            );
          })}

          {activityLog.length === 0 && (
            <p className="text-center opacity-50">No activity yet</p>
          )}
        </div>
      </div>
    </div>
  );
}