import glyphData from './glyphData.json';

// Ma Shan Zheng (马善政) handwriting, subset to the boot greeting "你好世界".
// Stroke data from hanzi-writer (proper CJK stroke order) via the tegaki PR
// (KurtGokhan/tegaki#53). Char-keyed glyphData → the renderer uses its
// character lookup path (no glyphDataById), so it animates correctly.
const fontUrl = '/fonts/tegaki/ma-shan-zheng/ma-shan-zheng.ttf';

const maShanZheng = {
  version: 0,
  family: 'Ma Shan Zheng',
  lineCap: 'round',
  fontUrl,
  fontFaceCSS: `@font-face { font-family: 'Ma Shan Zheng'; src: url(${fontUrl}); }`,
  unitsPerEm: 1000,
  ascender: 880,
  descender: -120,
  glyphData,
} as const;

export default maShanZheng;
