// ─── SEVANA DESIGN TOKENS ────────────────────────────────────────────────────

export const T = {
  // Light theme backgrounds
  bg:        '#F5F0E8',
  bgCard:    '#FFFDF9',
  bgCard2:   '#F0EBE0',
  bgCard3:   '#E8E2D8',

  // Volunteer dark theme backgrounds
  vBg:       '#0D1410',
  vBgCard:   '#131A15',
  vBgCard2:  '#192019',
  vBgCard3:  '#1F2820',

  // Brand greens (light theme)
  green:     '#0A5C44',
  greenMid:  '#1A7A5A',
  greenLt:   '#D4EDE5',
  greenDk:   '#4ADE80',

  // Accents (light theme)
  amber:     '#E8821A',
  amberLt:   '#FDF0E0',
  red:       '#C93B3B',
  redLt:     '#FDEAEA',
  blue:      '#1A5FA5',
  blueLt:    '#E5F0FB',
  purple:    '#6B3FA0',
  purpleLt:  '#F0E8FB',
  gold:      '#C49B2A',
  goldLt:    '#FDF6DC',
  teal:      '#0D9488',
  tealLt:    '#E0F2F1',

  // Volunteer bright accents (on dark bg)
  vGreen:    '#4ADE80',
  vAmber:    '#FBBF24',
  vRed:      '#F87171',
  vBlue:     '#60A5FA',
  vPurple:   '#C084FC',
  vGold:     '#F59E0B',
  vTeal:     '#2DD4BF',

  // Text (light theme)
  text:      '#1A1A14',
  textMid:   '#4A4740',
  textSoft:  '#8A8478',

  // Text (dark volunteer theme)
  vText:     '#E8F0E9',
  vTextMid:  '#9DB8A0',
  vTextSoft: '#5A7A60',

  // Borders
  border:    '#DED8CC',
  borderLt:  '#EDE8DF',
  vBorder:   '#1E3024',
  vBorderMd: '#2A4A32',
};

// Tier progression — index 0-based, level 1-5
// TIERS[i] where i = tier.level (1..5), so TIERS[tier.level] gives the NEXT tier
export const TIERS = [
  null,                                                         // [0] placeholder
  { level:1, name:'Seva Seedling',  minXP:0,     icon:'🌱' },  // [1]
  { level:2, name:'Seva Volunteer', minXP:501,   icon:'🌿' },  // [2]
  { level:3, name:'Seva Guardian',  minXP:2001,  icon:'🛡️' },  // [3]
  { level:4, name:'Seva Champion',  minXP:8001,  icon:'⚡' },  // [4]
  { level:5, name:'Seva Legend',    minXP:25001, icon:'🌟' },  // [5]
];

// Returns current tier object for a given XP value
export const getTier = (xp) =>
  [...TIERS].filter(Boolean).reverse().find(t => xp >= t.minXP) || TIERS[1];

// Returns next tier (or current if already Legend)
export const getNextTier = (xp) => {
  const current = getTier(xp);
  return TIERS[current.level + 1] || TIERS[5];
};
