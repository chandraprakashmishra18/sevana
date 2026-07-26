import { T } from '../../Styles/Theme';

const SIZES = {
  sm: { fontSize:11.5, padding:'6px 13px', borderRadius:8 },
  md: { fontSize:13,   padding:'10px 18px',borderRadius:10 },
  lg: { fontSize:14.5, padding:'13px 24px',borderRadius:12 },
};

const VARIANTS = {
  primary: { background:`linear-gradient(135deg,${T.green},${T.greenMid})`, color:'#fff' },
  ghost:   { background:'transparent', color:T.green, border:`1.5px solid ${T.border}` },
  danger:  { background:T.redLt,   color:T.red,   border:`1px solid ${T.red}25` },
  amber:   { background:T.amberLt, color:T.amber, border:`1px solid ${T.amber}25` },
  soft:    { background:T.greenLt, color:T.green, border:`1px solid ${T.border}` },
  // volunteer dark variants
  vPrimary:{ background:`linear-gradient(135deg,#4ADE80,#22C55E)`, color:'#0D1410' },
  vGhost:  { background:'transparent', color:'#4ADE80', border:'1.5px solid #2A4A32' },
  vSoft:   { background:'#0F2518', color:'#4ADE80', border:'1px solid #2A4A32' },
};

export default function Button({ children, onClick, variant='primary', size='md', style={}, disabled=false }) {
  return (
    <button onClick={disabled ? undefined : onClick} style={{
      fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, border:'none',
      cursor: disabled?'not-allowed':'pointer', transition:'all .15s',
      opacity: disabled?.4:1, letterSpacing:'0.02em',
      ...SIZES[size], ...VARIANTS[variant], ...style,
    }}>
      {children}
    </button>
  );
}