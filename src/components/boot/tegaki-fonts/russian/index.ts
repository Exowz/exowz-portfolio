import glyphData from './glyphData.json';
import glyphDataById from './glyphDataById.json';

const fontUrl = '/fonts/tegaki/russian/tegaki-russian.ttf';

const russianHandwriting = {
  version: 0,
  family: 'TegakiRussian',
  lineCap: 'round',
  fontUrl,
  fontFaceCSS: `@font-face { font-family: 'TegakiRussian'; src: url(${fontUrl}); }`,
  unitsPerEm: 1000,
  ascender: 960,
  descender: -300,
  glyphData,
  glyphDataById,
  features: ['calt', 'frac', 'liga', 'locl'],
} as const;

export default russianHandwriting;
