import { T } from '../../Styles/Theme';
export default function SectionTitle({ children, sub, dark=false }) {
  return (
    <div style={{ marginBottom:14 }}>
      <h2 style={{ fontFamily:"'Outfit',sans-serif", fontSize:19, fontWeight:700, color: dark?'#E8F0E9':T.text }}>{children}</h2>
      {sub && <p style={{ fontSize:12, color: dark?'#9DB8A0':T.textSoft, marginTop:2 }}>{sub}</p>}
    </div>
  );
}