import glyphData from './glyphData.json';
import glyphDataById from './glyphDataById.json';

const fontUrl = '/fonts/tegaki/hindi/tegaki-hindi.ttf';

const hindiHandwriting = {
  version: 0,
  family: 'TegakiHindi',
  lineCap: 'round',
  fontUrl,
  fontFaceCSS: `@font-face { font-family: 'TegakiHindi'; src: url(${fontUrl}); }`,
  unitsPerEm: 1000,
  ascender: 1063,
  descender: -531,
  glyphData,
  glyphDataById,
  features: ['liga', 'abvs', 'akhn', 'blwf', 'blws', 'half', 'haln', 'nukt', 'pres', 'psts', 'rkrf', 'rphf', 'vatu'],
} as const;

export default hindiHandwriting;
