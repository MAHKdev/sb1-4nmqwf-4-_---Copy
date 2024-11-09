'use client';

import React, { useState } from 'react';
import { Pencil, Gift } from 'lucide-react';
import Link from 'next/link';
import { ChildCard } from '../ChildCard';
import { ChildSelector } from '../ChildSelector';
import { useAppStore } from '../../store/useAppStore';
import { ActivityLog } from '../ActivityLog';
import { Modal } from '../ui/Modal';
import { ChildForm } from '../forms/ChildForm';
import { GoalProgress } from '../GoalProgress';
import { PerformanceCalendar } from '../PerformanceCalendar';

export function HomeScreen() {
  const { activeChild, updateChild } = useAppStore();
  const [isEditing, setIsEditing] = useState(false);

  if (!activeChild) return null;

  return (
    <div className="space-y-8">
      <ChildSelector />
      
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{activeChild.name}'s Dashboard</h2>
        <div className="flex gap-2">
          <Link href="/rewards" className="btn btn-primary btn-sm">
            <Gift className="w-4 h-4 mr-2" />
            Spend Points
          </Link>
          <button
            onClick={() => setIsEditing(true)}
            className="btn btn-ghost btn-sm"
          >
            <Pencil className="w-4 h-4" />
          </button>
        </div>
      </div>

      <GoalProgress />
      
      <PerformanceCalendar />
      
      <ChildCard />
      <ActivityLog />

      <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
        <ChildForm
          child={activeChild}
          onSubmit={(data) => {
            updateChild(activeChild.id, data);
            setIsEditing(false);
          }}
          onCancel={() => setIsEditing(false)}
        />
      </Modal>
    </div>
  );
}