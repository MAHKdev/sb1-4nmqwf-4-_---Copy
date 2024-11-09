'use client';

import { Child, ParentHeights } from '@/types';
import { useState } from 'react';

interface ParentHeightFormProps {
  child: Child;
  onSubmit: (heights: ParentHeights) => void;
  onClose: () => void;
}

export function ParentHeightForm({ child, onSubmit, onClose }: ParentHeightFormProps) {
  const [formData, setFormData] = useState<ParentHeights>({
    father: child.parentHeights?.father || 170,
    mother: child.parentHeights?.mother || 160,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold mb-6">Parent Heights</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Father's Height (cm)</span>
          </label>
          <input
            type="number"
            value={formData.father}
            onChange={e => setFormData(prev => ({ ...prev, father: Number(e.target.value) }))}
            className="input input-bordered"
            min="140"
            max="220"
            step="0.1"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Mother's Height (cm)</span>
          </label>
          <input
            type="number"
            value={formData.mother}
            onChange={e => setFormData(prev => ({ ...prev, mother: Number(e.target.value) }))}
            className="input input-bordered"
            min="140"
            max="220"
            step="0.1"
            required
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="btn"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}