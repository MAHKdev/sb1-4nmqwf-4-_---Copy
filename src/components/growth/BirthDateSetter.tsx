'use client';

import { DatePicker } from '../ui/DatePicker';
import { subYears } from 'date-fns';
import { Child } from '@/types';
import { X } from 'lucide-react';

interface BirthDateSetterProps {
  child: Child;
  onSave: (date: Date) => void;
  onCancel: () => void;
}

export function BirthDateSetter({ child, onSave, onCancel }: BirthDateSetterProps) {
  const maxDate = new Date();
  const minDate = subYears(maxDate, 18); // Limit to children under 18

  return (
    <div className="fixed inset-0 bg-base-100 z-50 flex flex-col touch-none">
      {/* Header */}
      <div className="px-4 py-3 border-b border-base-200 flex items-center justify-between">
        <h1 className="text-xl font-bold">Set Birth Date</h1>
        <button 
          onClick={onCancel}
          className="btn btn-ghost btn-sm btn-circle"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Content - No Scrolling */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-xs space-y-6">
          {/* Avatar and Name */}
          <div className="text-center">
            <div className="avatar">
              <div className="w-20 h-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={child.avatar}
                  alt={child.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <h2 className="mt-4 text-xl font-semibold">{child.name}</h2>
            <p className="mt-2 text-sm opacity-70">
              When was {child.name} born?
            </p>
          </div>

          {/* Date Picker */}
          <div className="bg-base-200 rounded-box p-4">
            <DatePicker
              maxDate={maxDate}
              minDate={minDate}
              required
              onSelect={(date) => date && onSave(date)}
              placeholder="Select birth date"
            />
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-base-200">
        <button
          onClick={onCancel}
          className="btn btn-ghost w-full"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}