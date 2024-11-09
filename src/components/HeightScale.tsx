import { GrowthEntry } from '../types';

interface HeightScaleProps {
  entries: GrowthEntry[];
  maxHeight: number;
}

export function HeightScale({ entries, maxHeight }: HeightScaleProps) {
  const scaleHeight = 500; // pixels
  const pixelsPerCm = scaleHeight / maxHeight;

  return (
    <div className="relative w-20 h-[500px] bg-base-200 rounded-box mx-auto">
      {/* Scale markings */}
      {Array.from({ length: Math.ceil(maxHeight / 10) }, (_, i) => i * 10).map(mark => (
        <div
          key={mark}
          className="absolute left-0 w-full border-t border-base-content"
          style={{ bottom: `${mark * pixelsPerCm}px` }}
        >
          <span className="absolute -left-8 -top-2 text-xs">{mark}cm</span>
        </div>
      ))}

      {/* Height markers */}
      {entries.map(entry => (
        <div
          key={entry.id}
          className="absolute left-4 w-12 h-1 bg-primary"
          style={{ bottom: `${entry.height * pixelsPerCm}px` }}
        >
          <div className="absolute left-full ml-2 -top-3 whitespace-nowrap text-xs">
            <span className="font-bold">{entry.height}cm</span>
            <span className="ml-2 text-base-content/70">{entry.date}</span>
          </div>
        </div>
      ))}
    </div>
  );
}