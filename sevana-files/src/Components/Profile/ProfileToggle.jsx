import { T } from '../../Styles/Theme';

export default function ProfileToggle({ mode, onToggle }) {
  const isVol = mode === 'volunteer';
  return (
    <div style={{
      display:'flex', alignItems:'center', gap:0,
      background: isVol ? '#1F2820' : T.bgCard2,
      borderRadius:50, padding:4,
      border:`1.5px solid ${isVol ? '#2A4A32' : T.border}`,
      transition:'all .3s',
    }}>
      {[
        { id:'user',      label:'👤 User',      color:T.green,  bg:T.bgCard, activeBg:T.greenLt },
        { id:'volunteer', label:'🦸 Volunteer',  color:'#4ADE80', bg:'#131A15', activeBg:'#0F2518' },
      ].map(opt => {
        const active = mode === opt.id;
        return (
          <button key={opt.id} onClick={() => !active && onToggle()} style={{
            padding:'7px 16px', borderRadius:46, border:'none', cursor:'pointer',
            fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:12.5,
            letterSpacing:'.02em', transition:'all .25s',
            background: active ? opt.activeBg : 'transparent',
            color: active ? opt.color : isVol ? '#5A7A60' : T.textSoft,
            boxShadow: active ? '0 2px 8px rgba(0,0,0,0.12)' : 'none',
          }}>
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}