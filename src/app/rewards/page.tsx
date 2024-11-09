import { RewardsScreen } from '@/components/screens/RewardsScreen';
import { Suspense } from 'react';

export default function RewardsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RewardsScreen />
    </Suspense>
  );
}