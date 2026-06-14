import glyphData from './glyphData.json';
import glyphDataById from './glyphDataById.json';

const fontUrl = '/fonts/tegaki/japanese/tegaki-japanese.ttf';

const japaneseHandwriting = {
  version: 0,
  family: 'TegakiJapanese',
  lineCap: 'round',
  fontUrl,
  fontFaceCSS: `@font-face { font-family: 'TegakiJapanese'; src: url(${fontUrl}); }`,
  unitsPerEm: 1000,
  ascender: 1160,
  descender: -288,
  glyphData,
  glyphDataById,
  features: ['ccmp', 'frac', 'liga', 'locl', 'pnum', 'tnum', 'vert', 'vrt2'],
} as const;

export default japaneseHandwriting;
