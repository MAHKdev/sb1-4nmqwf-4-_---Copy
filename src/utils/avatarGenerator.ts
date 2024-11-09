import { createAvatar } from '@dicebear/avatars';
import * as avatarStyle from '@dicebear/avatars-avataaars-sprites';

type Gender = 'male' | 'female' | 'neutral';

const hairStyles = {
  male: [
    'ShortHairShortFlat',
    'ShortHairShortWaved',
    'ShortHairShortCurly',
    'ShortHairDreads',
    'ShortHairFrizzle',
    'ShortHairTheCaesar',
  ],
  female: [
    'LongHairStraight',
    'LongHairCurly',
    'LongHairBob',
    'LongHairBigHair',
    'LongHairMiaWallace',
    'LongHairStraight2',
  ],
  neutral: [
    'ShortHairShortFlat',
    'ShortHairShortWaved',
    'LongHairStraight',
    'LongHairCurly',
    'ShortHairDreads',
    'LongHairBob',
  ],
};

export function generateRandomAvatar(gender : Gender = 'neutral'): string {
  const getRandomItem = <T>(array: T[]): T => array[Math.floor(Math.random() * array.length)];

  const svg = createAvatar(avatarStyle, {
    seed: Math.random().toString(),
    dataUri: true,
    gender: gender === 'neutral' ? getRandomItem(['male', 'female']) : gender,
    style: {
      backgroundColor: getRandomItem(['b6e3f4', 'c0aede', 'ffd5dc', 'ffdfbf', 'baffc9']),
    } as any,
    topType: getRandomItem(hairStyles[gender]),
    accessoriesType: Math.random() > 0.7 ? getRandomItem(['Round', 'Sunglasses', 'Wayfarers']) : 'Blank',
    hairColor: getRandomItem(['Auburn', 'Black', 'Blonde', 'BlondeGolden', 'Brown', 'BrownDark', 'PastelPink', 'Platinum', 'Red', 'SilverGray']) as any,
    facialHairType: gender === 'male' && Math.random() > 0.5 
      ? getRandomItem(['BeardLight', 'BeardMedium', 'BeardMajestic', 'MoustacheFancy', 'MoustacheMagnum'])
      : 'Blank',
    clotheType: getRandomItem([
      'BlazerShirt',
      'BlazerSweater',
      'CollarSweater',
      'GraphicShirt',
      'Hoodie',
      'Overall',
      'ShirtCrewNeck',
      'ShirtScoopNeck',
    ]),
    clotheColor: getRandomItem([
      'Blue01',
      'Blue02',
      'Blue03',
      'Gray01',
      'Gray02',
      'Heather',
      'PastelBlue',
      'PastelGreen',
      'PastelOrange',
      'PastelRed',
      'PastelYellow',
      'Pink',
      'Red',
    ]),
    eyeType: getRandomItem([
      'Default',
      'Happy',
      'Wink',
      'WinkWacky',
      'Side',
      'Surprised',
      'Squint',
      'Hearts',
    ]),
    eyebrowType: getRandomItem([
      'Default',
      'DefaultNatural',
      'RaisedExcited',
      'UnibrowNatural',
      'UpDown',
      'SadConcerned',
    ]),
    mouthType: getRandomItem([
      'Default',
      'Smile',
      'Twinkle',
      'Tongue',
      'Serious',
      'ScreamOpen',
      'Eating',
      'Grimace',
    ]),
    skinColor: getRandomItem([
      'Tanned',
      'Yellow',
      'Pale',
      'Light',
      'Brown',
      'DarkBrown',
      'Black',
    ]),
  } as any);

  return svg;
}