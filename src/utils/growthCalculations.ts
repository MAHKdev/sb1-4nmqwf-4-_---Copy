export function calculateAdultHeight(
  gender: 'male' | 'female' | 'neutral',
  fatherHeight: number,
  motherHeight: number
): number {
  // Using the Khamis-Roche Method for height prediction
  if (gender === 'male') {
    return Math.round((fatherHeight + (motherHeight * 13/12)) / 2);
  } else if (gender === 'female') {
    return Math.round(((fatherHeight * 13/14) + motherHeight) / 2);
  } else {
    // For neutral gender, take the average of both calculations
    const maleHeight = (fatherHeight + (motherHeight * 13/12)) / 2;
    const femaleHeight = ((fatherHeight * 13/14) + motherHeight) / 2;
    return Math.round((maleHeight + femaleHeight) / 2);
  }
}