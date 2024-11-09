// Height prediction based on parent heights (Khamis-Roche method simplified)
export function predictAdultHeight(
  gender: 'male' | 'female',
  fatherHeight?: number,
  motherHeight?: number
): number | null {
  if (!fatherHeight || !motherHeight) return null;

  if (gender === 'male') {
    // Boys: (Father's height + (Mother's height + 13)) / 2
    return (fatherHeight + (motherHeight + 13)) / 2;
  } else {
    // Girls: (Mother's height + (Father's height - 13)) / 2
    return (motherHeight + (fatherHeight - 13)) / 2;
  }
}

export function calculateHeightPercentile(
  currentHeight: number,
  ageInMonths: number,
  gender: 'male' | 'female',
  whoData: any[]
): number {
  const ageData = whoData.find(d => d.months === Math.floor(ageInMonths));
  if (!ageData) return 50; // Default to 50th percentile if no data

  const genderData = gender === 'male' ? ageData.heightBoys : ageData.heightGirls;
  
  if (currentHeight <= genderData.p3) return 3;
  if (currentHeight >= genderData.p97) return 97;
  
  // Approximate percentile between p3 and p97
  const range = genderData.p97 - genderData.p3;
  const position = currentHeight - genderData.p3;
  return Math.round((position / range) * 94 + 3);
}

export function scaleWHOData(
  whoData: any[],
  predictedHeight: number,
  gender: 'male' | 'female'
): any[] {
  // Get the standard adult height from WHO data (last entry)
  const standardAdultHeight = whoData[whoData.length - 1][
    gender === 'male' ? 'heightBoys' : 'heightGirls'
  ].p50;

  // Calculate scaling factor
  const scaleFactor = predictedHeight / standardAdultHeight;

  // Scale all height values
  return whoData.map(entry => ({
    ...entry,
    [`height${gender === 'male' ? 'Boys' : 'Girls'}`]: {
      p3: entry[`height${gender === 'male' ? 'Boys' : 'Girls'}`].p3 * scaleFactor,
      p50: entry[`height${gender === 'male' ? 'Boys' : 'Girls'}`].p50 * scaleFactor,
      p97: entry[`height${gender === 'male' ? 'Boys' : 'Girls'}`].p97 * scaleFactor,
    }
  }));
}