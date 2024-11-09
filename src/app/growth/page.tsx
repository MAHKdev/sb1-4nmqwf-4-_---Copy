import { GrowthScreen } from '@/components/screens/GrowthScreen';
import { Suspense } from 'react';

export default function GrowthPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GrowthScreen />
    </Suspense>
  );
}