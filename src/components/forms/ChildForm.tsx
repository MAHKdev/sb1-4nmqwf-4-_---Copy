'use client';

import React, { useState, useEffect } from 'react';
import { Child } from '../../types';
import { generateRandomAvatar } from '../../utils/avatarGenerator';
import { DatePicker } from '../ui/DatePicker';
import { subYears } from 'date-fns';

interface ChildFormProps {
  child?: Child;
  onSubmit: (data: Pick<Child, 'name' | 'avatar' | 'gender' | 'birthDate'>) => void;
  onCancel: () => void;
}

export function ChildForm({ child, onSubmit, onCancel }: ChildFormProps) {
  const [formData, setFormData] = useState({
    name: child?.name || '',
    gender: child?.gender || 'neutral' as 'male' | 'female' | 'neutral',
    birthDate: child?.birthDate ? new Date(child.birthDate) : undefined,
  });

  const [avatar, setAvatar] = useState<string>(child?.avatar || '');

  useEffect(() => {
    // Only generate new avatar if there isn't one already (new child case)
    if (!avatar) {
      setAvatar(generateRandomAvatar(formData.gender));
    }
  }, [formData.gender, avatar]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.birthDate) return;

    onSubmit({
      name: formData.name,
      avatar: avatar,
      gender: formData.gender,
      birthDate: formData.birthDate.toISOString(),
    });
  };

  const regenerateAvatar = () => {
    setAvatar(generateRandomAvatar(formData.gender));
  };

  const maxDate = new Date();
  const minDate = subYears(maxDate, 18); // Limit to children under 18

  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold mb-6">{child ? 'Edit' : 'Add'} Child</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="input input-bordered"
            required
          />
        </div>
        
        <DatePicker
          date={formData.birthDate}
          onSelect={(date) => setFormData(prev => ({ ...prev, birthDate: date }))}
          label="Birth Date"
          maxDate={maxDate}
          minDate={minDate}
          required
        />

        <div className="form-control">
          <label className="label">
            <span className="label-text">Gender (for avatar)</span>
          </label>
          <select
            value={formData.gender}
            onChange={(e) => {
              const newGender = e.target.value as 'male' | 'female' | 'neutral';
              setFormData(prev => ({ ...prev, gender: newGender }));
              // Generate new avatar when gender changes
              setAvatar(generateRandomAvatar(newGender));
            }}
            className="select select-bordered"
          >
            <option value="neutral">Neutral</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Avatar</span>
          </label>
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={avatar}
                alt="Avatar preview"
                className="w-32 h-32 rounded-full bg-base-100"
              />
              <button
                type="button"
                onClick={regenerateAvatar}
                className="btn btn-circle btn-sm absolute -bottom-2 -right-2"
              >
                ↻
              </button>
            </div>
            <p className="text-sm opacity-70">Click the refresh button to generate a new avatar</p>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button type="button" onClick={onCancel} className="btn">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {child ? 'Update' : 'Add'} Child
          </button>
        </div>
      </form>
    </div>
  );
}