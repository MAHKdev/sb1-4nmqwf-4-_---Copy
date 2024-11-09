'use client';

interface RadialProgressProps {
  value: number;
  max: number;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  showLabel?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function RadialProgress({
  value,
  max,
  size = 'md',
  color = 'primary',
  showLabel = true,
  className = '',
  children,
}: RadialProgressProps) {
  const percentage = Math.min(100, (value / max) * 100);

  const sizes = {
    sm: 'w-12 h-12 text-xs',
    md: 'w-16 h-16 text-sm',
    lg: 'w-24 h-24 text-lg',
  };

  return (
    <div
      className={`radial-progress text-${color} ${sizes[size]} ${className}`}
      style={{
        '--value': percentage,
        '--size': size === 'lg' ? '6rem' : '4rem',
        '--thickness': size === 'lg' ? '4px' : '3px',
      } as any}
      role="progressbar"
    >
      {showLabel ? `${Math.round(percentage)}%` : children}
    </div>
  );
}