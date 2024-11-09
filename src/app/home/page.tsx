import { HomeScreen } from '@/components/screens/HomeScreen';
import { Suspense } from 'react';

export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeScreen />
    </Suspense>
  );
}