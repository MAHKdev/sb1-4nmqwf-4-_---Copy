'use client';

import React from 'react';
import { Contract } from '../types';
import { useAppStore } from '../store/useAppStore';

interface ChoreFormProps {
  initialData?: Omit<Contract, 'id' | 'lastCompleted'>;
  onSubmit: (data: Omit<Contract, 'id' | 'childId' | 'lastCompleted'> & { childId?: string }) => void;
  onClose?: () => void;
  onCancel?: () => void; // Add onCancel if missing
}

export function ChoreForm({ initialData, onSubmit, onClose }: ChoreFormProps) {
  const { children } = useAppStore();
  const [formData, setFormData] = React.useState({
    task: initialData?.task || '',
    points: initialData?.points || 5,
    frequency: initialData?.frequency || 'daily',
    childId: initialData?.childId || '',
    isOptional: initialData?.isOptional || false,
    isCollective: initialData?.isCollective || false,
    scheduledDay: initialData?.scheduledDay || 0,
    mandatory: initialData?.mandatory || false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      childId: formData.childId || undefined,
    });
  };

  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold mb-6">
        {initialData ? 'Edit' : 'Add'} Chore
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Task Name</span>
          </label>
          <input
            type="text"
            value={formData.task}
            onChange={e => setFormData(prev => ({ ...prev, task: e.target.value }))}
            className="input input-bordered"
            required
          />
        </div>
        
        <div className="form-control">
          <label className="label">
            <span className="label-text">Points</span>
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
            onChange={e => setFormData(prev => ({ ...prev, frequency: e.target.value as 'daily' | 'weekly' | 'monthly' }))}
            className="select select-bordered"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        {formData.frequency === 'weekly' && (
          <div className="form-control">
            <label className="label">
              <span className="label-text">Scheduled Day</span>
            </label>
            <select
              value={formData.scheduledDay}
              onChange={e => setFormData(prev => ({ ...prev, scheduledDay: parseInt(e.target.value) }))}
              className="select select-bordered"
            >
              <option value="1">Monday</option>
              <option value="2">Tuesday</option>
              <option value="3">Wednesday</option>
              <option value="4">Thursday</option>
              <option value="5">Friday</option>
              <option value="6">Saturday</option>
              <option value="0">Sunday</option>
            </select>
          </div>
        )}

        {formData.frequency === 'monthly' && (
          <div className="form-control">
            <label className="label">
              <span className="label-text">Day of Month</span>
            </label>
            <select
              value={formData.scheduledDay}
              onChange={e => setFormData(prev => ({ ...prev, scheduledDay: parseInt(e.target.value) }))}
              className="select select-bordered"
            >
              {Array.from({ length: 31 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Optional Chore</span>
            <input
              type="checkbox"
              checked={formData.isOptional}
              onChange={e => setFormData(prev => ({ ...prev, isOptional: e.target.checked }))}
              className="checkbox"
            />
          </label>
        </div>

        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Collective Chore</span>
            <input
              type="checkbox"
              checked={formData.isCollective}
              onChange={e => setFormData(prev => ({ ...prev, isCollective: e.target.checked }))}
              className="checkbox"
            />
          </label>
        </div>

        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Mandatory</span>
            <input
              type="checkbox"
              checked={formData.mandatory}
              onChange={e => setFormData(prev => ({ ...prev, mandatory: e.target.checked }))}
              className="checkbox"
            />
          </label>
        </div>

        {!formData.isCollective && (
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
              <span className="label-text-alt">Leave empty to make this chore available to all children</span>
            </label>
          </div>
        )}

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
            {initialData ? 'Update' : 'Add'} Chore
          </button>
        </div>
      </form>
    </div>
  );
}