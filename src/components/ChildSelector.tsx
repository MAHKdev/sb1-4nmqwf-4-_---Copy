'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';
import { ChildForm } from './forms/ChildForm';
import { Modal } from './ui/Modal';

export function ChildSelector() {
  const { children, setActiveChild, activeChild, addChild } = useAppStore();
  const [isAddingChild, setIsAddingChild] = useState(false);

  return (
    <>
      <div className="flex flex-wrap gap-4 items-center">
        {children.map((child) => (
          <motion.button
            key={child.id}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setActiveChild(child)}
            className={`card bg-base-100 shadow-sm cursor-pointer hover:shadow-md transition-shadow
              ${activeChild?.id === child.id ? 'ring-2 ring-primary' : ''}`}
          >
            <div className="card-body p-3">
              <div className="flex items-center gap-3">
                <img
                  src={child.avatar}
                  alt={child.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">{child.name}</h3>
                  <motion.span
                    key={child.points}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    className="text-sm text-primary font-medium"
                  >
                    {child.points} points
                  </motion.span>
                </div>
              </div>
            </div>
          </motion.button>
        ))}

        <button
          onClick={() => setIsAddingChild(true)}
          className="btn btn-ghost btn-sm"
        >
          <Plus className="w-4 h-4" /> Add Child
        </button>
      </div>

      <Modal
        isOpen={isAddingChild}
        onClose={() => setIsAddingChild(false)}
      >
        <ChildForm
          onSubmit={(data) => {
            addChild(data);
            setIsAddingChild(false);
          }}
          onCancel={() => setIsAddingChild(false)}
        />
      </Modal>
    </>
  );
}