import glyphData from './glyphData.json';
import glyphDataById from './glyphDataById.json';

const fontUrl = '/fonts/tegaki/korean/tegaki-korean.ttf';

const koreanHandwriting = {
  version: 0,
  family: 'TegakiKorean',
  lineCap: 'round',
  fontUrl,
  fontFaceCSS: `@font-face { font-family: 'TegakiKorean'; src: url(${fontUrl}); }`,
  unitsPerEm: 1000,
  ascender: 760,
  descender: -240,
  glyphData,
  glyphDataById,
  features: ['fwid'],
} as const;

export default koreanHandwriting;
