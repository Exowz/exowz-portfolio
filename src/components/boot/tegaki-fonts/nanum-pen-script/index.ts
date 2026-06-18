import glyphData from './glyphData.json';

// Nanum Pen Script — Tegaki's official Korean handwriting font (on tegaki main,
// not yet in the published 0.18.0), subset to the boot greeting "헬로 월드".
// Char-keyed glyphData → renderer's character lookup path (no glyphDataById).
const fontUrl = '/fonts/tegaki/nanum-pen-script/nanum-pen-script.ttf';

const nanumPenScript = {
  version: 0,
  family: 'Nanum Pen Script',
  lineCap: 'round',
  fontUrl,
  fontFaceCSS: `@font-face { font-family: 'Nanum Pen Script'; src: url(${fontUrl}); }`,
  unitsPerEm: 1000,
  ascender: 800,
  descender: -200,
  glyphData,
} as const;

export default nanumPenScript;
