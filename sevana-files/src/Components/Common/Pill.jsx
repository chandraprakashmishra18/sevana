export default function Pill({ children, color='#0A5C44', bg, style={} }) {
  return (
    <span style={{
      display:'inline-flex', alignItems:'center', gap:3, fontSize:10.5,
      fontWeight:700, padding:'2px 8px', borderRadius:20,
      background: bg || color+'18', color, letterSpacing:'.03em',
      border:`1px solid ${color}25`, ...style,
    }}>{children}</span>
  );
}