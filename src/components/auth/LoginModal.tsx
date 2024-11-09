'use client';

import { Award } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { AuthButtons } from './AuthButtons';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 max-w-sm mx-auto">
        <div className="text-center">
          <Award className="mx-auto h-12 w-12 text-primary" />
          <h2 className="mt-6 text-2xl font-bold">Sign in to KidsReward</h2>
          <p className="mt-2 text-sm opacity-70">
            Sign in to sync your data across devices
          </p>
        </div>
        
        <div className="mt-8">
          <AuthButtons 
            onComplete={onClose} 
            mode="modal"
          />
        </div>
      </div>
    </Modal>
  );
}