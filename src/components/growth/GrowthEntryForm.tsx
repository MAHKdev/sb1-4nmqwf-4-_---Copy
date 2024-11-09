'use client';

import { DatePicker } from '../ui/DatePicker';
import { GrowthEntry } from '@/types';
import { useState } from 'react';

interface GrowthEntryFormProps {
  onSubmit: (entry: Omit<GrowthEntry, 'id'>) => void;
  onClose: () => void;
  initialData?: GrowthEntry;
}

export function GrowthEntryForm({ onSubmit, onClose, initialData }: GrowthEntryFormProps) {
  const [formData, setFormData] = useState({
    date: initialData ? new Date(initialData.date) : new Date(),
    height: initialData?.height || '',
    weight: initialData?.weight || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      date: formData.date.toISOString(),
      height: Number(formData.height),
      weight: Number(formData.weight),
    });
  };

  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold mb-6">
        {initialData ? 'Edit' : 'Add'} Growth Entry
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <DatePicker
          date={formData.date}
          onSelect={(date) => date && setFormData(prev => ({ ...prev, date }))}
          label="Measurement Date"
          maxDate={new Date()}
          required
        />

        <div className="form-control">
          <label className="label">
            <span className="label-text">Height (cm)</span>
          </label>
          <input
            type="number"
            value={formData.height}
            onChange={e => setFormData(prev => ({ ...prev, height: e.target.value }))}
            className="input input-bordered"
            min="1"
            step="0.1"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Weight (kg)</span>
          </label>
          <input
            type="number"
            value={formData.weight}
            onChange={e => setFormData(prev => ({ ...prev, weight: e.target.value }))}
            className="input input-bordered"
            min="1"
            step="0.1"
            required
          />
        </div>

        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="btn">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {initialData ? 'Update' : 'Add'} Entry
          </button>
        </div>
      </form>
    </div>
  );
}