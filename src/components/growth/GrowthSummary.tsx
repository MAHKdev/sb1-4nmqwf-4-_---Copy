'use client';

import { Child } from '@/types';
import { Ruler, Scale } from 'lucide-react';
import { calculateAdultHeight } from '@/utils/growthCalculations';

interface GrowthSummaryProps {
  child: Child;
  onEditParentHeights: () => void;
}

export function GrowthSummary({ child, onEditParentHeights }: GrowthSummaryProps) {
  const predictedHeight = child.parentHeights 
    ? calculateAdultHeight(
      child.gender,
      child.parentHeights?.father ?? 0,
      child.parentHeights?.mother ?? 0
    )
    : null;

  return (
    <div className="card bg-base-200">
      <div className="card-body">
        <div className="flex items-center justify-between">
          <h3 className="card-title text-lg flex items-center gap-2">
            <Ruler className="w-5 h-5 text-primary" />
            Growth Prediction
          </h3>
          <button
            onClick={onEditParentHeights}
            className="btn btn-sm"
          >
            {child.parentHeights ? 'Update' : 'Set'} Parent Heights
          </button>
        </div>

        {child.parentHeights ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <h4 className="font-medium mb-2">Parent Heights</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>Father</span>
                  <span className="font-medium">{child.parentHeights.father} cm</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Mother</span>
                  <span className="font-medium">{child.parentHeights.mother} cm</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Predicted Adult Height</h4>
              <div className="text-3xl font-bold text-primary">
                {predictedHeight} <span className="text-base font-normal">cm</span>
              </div>
              <p className="text-sm opacity-70 mt-1">
                Based on parental heights
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <Scale className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Set parent heights to see growth predictions</p>
          </div>
        )}
      </div>
    </div>
  );
}