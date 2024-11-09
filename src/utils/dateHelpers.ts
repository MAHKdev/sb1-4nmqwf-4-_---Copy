export function isTaskAvailable(lastDate: string | undefined, frequency: 'daily' | 'weekly' | 'monthly'): boolean {
  if (!lastDate) return true;
  
  const last = new Date(lastDate);
  const now = new Date();
  
  // Reset time parts to compare only dates
  last.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);
  
  if (frequency === 'daily') {
    return last.getTime() < now.getTime();
  }
  
  // For weekly tasks, check if it's been 7 days
  const diffTime = Math.abs(now.getTime() - last.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays >= 7;
}