import { useState } from 'react';
import Card from '../../../../Components/Common/Card';
import Button from '../../../../Components/Common/Button';
import Pill from '../../../../Components/Common/Pill';
import ProgressBar from '../../../../Components/Common/ProgressBar';

const V = { vBgCard:'#131A15',vBgCard2:'#192019',vBgCard3:'#1F2820',vText:'#E8F0E9',vTextMid:'#9DB8A0',vTextSoft:'#5A7A60',vBorder:'#1E3024',vBorderMd:'#2A4A32',vGreen:'#4ADE80',vAmber:'#FBBF24',vRed:'#F87171',vBlue:'#60A5FA',vPurple:'#C084FC',vGold:'#F59E0B',vTeal:'#2DD4BF' };
const stC = { in_progress:V.vAmber, open:V.vRed, resolved:V.vGreen };
const SLabel = ({children,color=V.vTextSoft})=><p style={{fontSize:9.5,fontWeight:700,letterSpacing:'.1em',color,textTransform:'uppercase',marginBottom:10}}>{children}</p>;

export default function CasesTab({ v }) {
  const [expanded, setExpanded] = useState(null);
  return (
    <div className="fu" style={{display:'flex',flexDirection:'column',gap:14}}>
      <div>
        <SLabel color={V.vRed}>ACTIVE RESCUE CASES ({v.activeCases.length})</SLabel>
        {v.activeCases.map(c=>(
          <div key={c.id} onClick={()=>setExpanded(expanded===c.id?null:c.id)} style={{background:c.status==='in_progress'?'#1C1700':'#1C0808',border:`1px solid ${stC[c.status]}25`,borderRadius:14,padding:13,marginBottom:9,cursor:'pointer'}}>
            <div style={{display:'flex',gap:11,alignItems:'flex-start'}}>
              <div style={{width:44,height:44,borderRadius:12,background:V.vBgCard2,display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,flexShrink:0}}>{c.animal}</div>
              <div style={{flex:1}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}><p style={{fontWeight:700,fontSize:13.5,color:V.vText}}>{c.title}</p><Pill color={stC[c.status]} bg={V.vBgCard3} style={{fontSize:9}}>{c.status.replace('_',' ')}</Pill></div>
                <p style={{fontSize:11.5,color:V.vTextSoft}}>Case {c.id} · {c.since}</p>
                <Pill color={V.vPurple} bg={V.vBgCard3} style={{fontSize:9,marginTop:6}}>{c.role}</Pill>
              </div>
            </div>
            {expanded===c.id&&<div className="fu" style={{marginTop:12,borderTop:`1px solid ${V.vBorder}`,paddingTop:12,display:'flex',gap:8,flexWrap:'wrap'}}>
              <Button variant="vSoft" size="sm">📋 View Thread</Button>
              <Button variant="vGhost" size="sm">🔄 Add Update</Button>
              <Button variant="vGhost" size="sm">✅ Mark Resolved</Button>
            </div>}
          </div>
        ))}
      </div>

      <div>
        <SLabel color={V.vPurple}>UPCOMING DRIVES ({v.upcomingDrives.length})</SLabel>
        {v.upcomingDrives.map(d=>(
          <div key={d.id} style={{background:'#150D22',border:`1px solid ${V.vPurple}25`,borderRadius:14,padding:13,marginBottom:9}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:8}}><div><p style={{fontWeight:700,fontSize:13.5,color:V.vText}}>{d.title}</p><p style={{fontSize:11.5,color:V.vTextSoft,marginTop:2}}>📅 {d.date}</p></div><Pill color={V.vPurple} bg={V.vBgCard3} style={{fontSize:9}}>{d.role}</Pill></div>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:5}}><span style={{fontSize:11.5,color:V.vTextMid}}>Volunteers</span><span style={{fontSize:11.5,color:V.vPurple,fontWeight:700}}>{d.volunteers}/{d.max}</span></div>
            <ProgressBar pct={(d.volunteers/d.max)*100} color={V.vPurple} height={5} dark/>
            <div style={{display:'flex',gap:8,marginTop:10}}><Button variant="vGhost" size="sm" style={{flex:1,borderColor:`${V.vPurple}40`,color:V.vPurple}}>Manage Drive</Button><Button variant="vGhost" size="sm" style={{flex:1}}>View Details</Button></div>
          </div>
        ))}
      </div>

      <div style={{background:V.vBgCard,border:`1px solid ${V.vBorder}`,borderRadius:14,padding:14}}>
        <SLabel>VOLUNTEER QUICK ACTIONS</SLabel>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
          {[{icon:'🐾',l:'New Rescue Report',c:V.vRed,bg:'#1C0808'},{icon:'📢',l:'Create Drive',c:V.vPurple,bg:'#150D22'},{icon:'🖐️',l:'Raise Hand',c:V.vAmber,bg:'#1A1200'},{icon:'⚖️',l:'File Cruelty Report',c:V.vGold,bg:'#1A1200'},{icon:'🔏',l:'Validate Donation',c:V.vTeal,bg:'#081816'},{icon:'🏠',l:'Review Foster App',c:V.vBlue,bg:'#081425'}].map(a=>(
            <div key={a.l} style={{background:a.bg,border:`1px solid ${a.c}25`,borderRadius:12,padding:'11px 10px',cursor:'pointer',display:'flex',alignItems:'center',gap:9}} onMouseEnter={e=>e.currentTarget.style.borderColor=a.c+'50'} onMouseLeave={e=>e.currentTarget.style.borderColor=a.c+'25'}>
              <span style={{fontSize:20}}>{a.icon}</span><p style={{fontSize:11.5,fontWeight:600,color:V.vText,lineHeight:1.3}}>{a.l}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}