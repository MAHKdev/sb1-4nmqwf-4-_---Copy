// WHO Growth Standards (simplified version)
// Heights in cm, weights in kg
// Source: WHO Child Growth Standards

export interface WHOReference {
  months: number;
  heightBoys: {
    p3: number;   // 3rd percentile
    p50: number;  // median
    p97: number;  // 97th percentile
  };
  heightGirls: {
    p3: number;
    p50: number;
    p97: number;
  };
  weightBoys: {
    p3: number;
    p50: number;
    p97: number;
  };
  weightGirls: {
    p3: number;
    p50: number;
    p97: number;
  };
}

export const whoGrowthData: WHOReference[] = [
  {
    months: 24, // 2 years
    heightBoys: { p3: 84.1, p50: 87.8, p97: 91.5 },
    heightGirls: { p3: 82.5, p50: 86.4, p97: 90.3 },
    weightBoys: { p3: 10.2, p50: 12.2, p97: 14.2 },
    weightGirls: { p3: 9.8, p50: 11.8, p97: 13.8 },
  },
  {
    months: 36, // 3 years
    heightBoys: { p3: 91.9, p50: 96.1, p97: 100.3 },
    heightGirls: { p3: 90.4, p50: 95.1, p97: 99.8 },
    weightBoys: { p3: 12.1, p50: 14.3, p97: 16.5 },
    weightGirls: { p3: 11.6, p50: 14.1, p97: 16.6 },
  },
  {
    months: 48, // 4 years
    heightBoys: { p3: 98.9, p50: 103.3, p97: 107.7 },
    heightGirls: { p3: 97.5, p50: 102.7, p97: 107.9 },
    weightBoys: { p3: 13.9, p50: 16.3, p97: 18.7 },
    weightGirls: { p3: 13.4, p50: 16.1, p97: 18.8 },
  },
  {
    months: 60, // 5 years
    heightBoys: { p3: 105.4, p50: 110.0, p97: 114.6 },
    heightGirls: { p3: 104.0, p50: 109.4, p97: 114.8 },
    weightBoys: { p3: 15.6, p50: 18.3, p97: 21.0 },
    weightGirls: { p3: 15.1, p50: 18.2, p97: 21.3 },
  },
  // Add more data points as needed
];