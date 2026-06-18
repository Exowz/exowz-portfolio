import glyphData from './glyphData.json';

const fontUrl = '/fonts/tegaki/chinese/tegaki-chinese.ttf';

const chineseHandwriting = {
  version: 0,
  family: 'TegakiChinese',
  lineCap: 'round',
  fontUrl,
  fontFaceCSS: `@font-face { font-family: 'TegakiChinese'; src: url(${fontUrl}); }`,
  unitsPerEm: 1000,
  ascender: 880,
  descender: -120,
  glyphData,
} as const;

export default chineseHandwriting;
