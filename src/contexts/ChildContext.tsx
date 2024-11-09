'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialChildren } from '../data';
import { Child, GrowthEntry } from '../types';

interface ChildContextType {
  children: Child[];
  activeChild: Child | null;
  setActiveChild: (child: Child) => void;
  updateChildPoints: (childId: string, points: number) => void;
  updateChild: (childId: string, updates: Partial<Child>) => void;
  addChild: (child: Omit<Child, 'id' | 'points' | 'growthData'>) => void;
  updateChildGrowth: (childId: string, entry: GrowthEntry) => void;
}

const ChildContext = createContext<ChildContextType | null>(null);

export function ChildProvider({ children }: { children: React.ReactNode }) {
  const [childrenState, setChildren] = useState<Child[]>(initialChildren);
  const [activeChild, setActiveChild] = useState<Child | null>(initialChildren[0]);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedChildren = localStorage.getItem('children');
    const savedActiveChildId = localStorage.getItem('activeChildId');
    
    if (savedChildren) {
      const parsedChildren = JSON.parse(savedChildren);
      setChildren(parsedChildren);
      
      if (savedActiveChildId) {
        const activeChild = parsedChildren.find((c: Child) => c.id === savedActiveChildId);
        if (activeChild) {
          setActiveChild(activeChild);
        }
      }
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('children', JSON.stringify(childrenState));
    if (activeChild) {
      localStorage.setItem('activeChildId', activeChild.id);
    }
  }, [childrenState, activeChild]);

  const updateChildPoints = (childId: string, points: number) => {
    setChildren(prev =>
      prev.map(child =>
        child.id === childId
          ? { ...child, points: Math.max(0, child.points + points) }
          : child
      )
    );
  };

  const updateChild = (childId: string, updates: Partial<Child>) => {
    setChildren(prev =>
      prev.map(child =>
        child.id === childId ? { ...child, ...updates } : child
      )
    );
    
    if (activeChild?.id === childId) {
      setActiveChild(prev => prev ? { ...prev, ...updates } : prev);
    }
  };

  const addChild = (child: Omit<Child, 'id' | 'points' | 'growthData'>) => {
    const newChild: Child = {
      ...child,
      id: Date.now().toString(),
      points: 0,
      growthData: []
    };
    
    setChildren(prev => [...prev, newChild]);
    setActiveChild(newChild);
  };

  const updateChildGrowth = (childId: string, entry: GrowthEntry) => {
    setChildren(prev =>
      prev.map(child =>
        child.id === childId
          ? { ...child, growthData: [...child.growthData, entry].sort((a, b) => 
              new Date(a.date).getTime() - new Date(b.date).getTime()
            )}
          : child
      )
    );
  };

  return (
    <ChildContext.Provider value={{
      children: childrenState,
      activeChild,
      setActiveChild,
      updateChildPoints,
      updateChild,
      addChild,
      updateChildGrowth
    }}>
      {children}
    </ChildContext.Provider>
  );
}

export const useChild = () => {
  const context = useContext(ChildContext);
  if (!context) {
    throw new Error('useChild must be used within a ChildProvider');
  }
  return context;
};