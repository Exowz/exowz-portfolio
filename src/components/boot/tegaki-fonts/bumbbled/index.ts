import glyphData from './glyphData.json';
import glyphDataById from './glyphDataById.json';

const fontUrl = '/fonts/tegaki/bumbbled/Bumbbled.otf';

const bumbbled = {
  version: 0,
  family: 'Bumbbled',
  lineCap: 'round',
  fontUrl,
  fontFaceCSS: `@font-face { font-family: 'Bumbbled'; src: url(${fontUrl}); }`,
  unitsPerEm: 2048,
  ascender: 2493,
  descender: -703,
  glyphData,
  glyphDataById,
  features: ['liga', 'salt'],
} as const;

export default bumbbled;
