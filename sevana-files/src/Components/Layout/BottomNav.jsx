import { T } from '../../Styles/Theme';

const TABS = [
  {id:'home',   icon:'🏠', label:'Home'},
  {id:'report', icon:'📸', label:'Report'},
  {id:'feed',   icon:'🗺️', label:'Rescues'},
  {id:'vets',   icon:'🏥', label:'Vets'},
  {id:'profile',icon:'👤', label:'Profile'},
];

export default function BottomNav({ active, onSelect }) {
  return (
    <nav style={{
      position:'fixed', bottom:0, left:'50%', transform:'translateX(-50%)',
      width:'100%', maxWidth:430, background:'rgba(255,253,249,0.97)',
      backdropFilter:'blur(20px) saturate(180%)',
      borderTop:'1px solid rgba(237,232,223,0.8)',
      display:'flex', zIndex:100,
      boxShadow:'0 -2px 24px rgba(10,30,20,0.10)',
    }}>
      {TABS.map(t => (
        <button key={t.id} onClick={() => onSelect(t.id)} style={{
          flex:1, padding:'10px 4px 8px', background:'none', border:'none',
          display:'flex', flexDirection:'column', alignItems:'center', gap:2, cursor:'pointer',
          transition:'opacity .15s',
        }}>
          <span style={{ fontSize: active===t.id ? 20 : 17, transition:'font-size .15s' }}>{t.icon}</span>
          <span style={{
            fontSize:9, fontWeight:active===t.id ? 700 : 500,
            color:active===t.id ? T.green : '#B0A898',
            letterSpacing:'.04em', transition:'color .15s',
          }}>{t.label.toUpperCase()}</span>
          {active===t.id && <div style={{ width:4, height:4, borderRadius:2, background:T.green, marginTop:1 }} />}
        </button>
      ))}
    </nav>
  );
}