'use client';

import React from 'react';
import { Penalty } from '../types';
import { useAppStore } from '../store/useAppStore';

interface PenaltyFormProps {
  initialData?: Omit<Penalty, 'id' | 'lastTriggered'>;
  onSubmit: (data: Omit<Penalty, 'id' | 'childId' | 'lastTriggered'> & { childId?: string }) => void;
  onClose?: () => void;
  onCancel?: () => void;
}

export function PenaltyForm({ initialData, onSubmit, onClose }: PenaltyFormProps) {
  const { children } = useAppStore();
  const [formData, setFormData] = React.useState({
    reason: initialData?.reason || '',
    points: initialData?.points || 5,
    frequency: initialData?.frequency || 'daily',
    childId: initialData?.childId || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      childId: formData.childId || undefined, // Only include childId if selected
    });
  };

  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold mb-6">
        {initialData ? 'Edit' : 'Add'} Penalty
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Reason</span>
          </label>
          <input
            type="text"
            value={formData.reason}
            onChange={e => setFormData(prev => ({ ...prev, reason: e.target.value }))}
            className="input input-bordered"
            required
          />
        </div>
        
        <div className="form-control">
          <label className="label">
            <span className="label-text">Points to Deduct</span>
          </label>
          <input
            type="number"
            min="1"
            value={formData.points}
            onChange={e => setFormData(prev => ({ ...prev, points: parseInt(e.target.value) }))}
            className="input input-bordered"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Frequency</span>
          </label>
          <select
            value={formData.frequency}
            onChange={e => setFormData(prev => ({ ...prev, frequency: e.target.value as 'daily' | 'weekly' }))}
            className="select select-bordered"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Assign to Child (Optional)</span>
          </label>
          <select
            value={formData.childId}
            onChange={e => setFormData(prev => ({ ...prev, childId: e.target.value }))}
            className="select select-bordered"
          >
            <option value="">All Children</option>
            {children.map(child => (
              <option key={child.id} value={child.id}>
                {child.name}
              </option>
            ))}
          </select>
          <label className="label">
            <span className="label-text-alt">Leave empty to make this penalty applicable to all children</span>
          </label>
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="btn"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
          >
            {initialData ? 'Update' : 'Add'} Penalty
          </button>
        </div>
      </form>
    </div>
  );
}