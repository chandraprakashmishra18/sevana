import { useState } from 'react';
import Pill from '../../../Components/Common/Pill';
import Button from '../../../Components/Common/Button';
import OverviewTab    from './tabs/OverviewTab';
import AuthoritiesTab from './tabs/AuthoritiesTab';
import SkillsTab      from './tabs/SkillsTab';
import CasesTab       from './tabs/CasesTab';
import ActivityTab    from './tabs/ActivityTab';
import JanPramanTab   from './tabs/JanPramanTab';

const V = { vBg:'#0D1410',vBgCard:'#131A15',vBgCard2:'#192019',vText:'#E8F0E9',vTextSoft:'#5A7A60',vBorder:'#1E3024',vGreen:'#4ADE80',vAmber:'#FBBF24',vGold:'#F59E0B',vPurple:'#C084FC' };

const TABS = [
  {id:'overview',    label:'Overview',    icon:'🏠'},
  {id:'authorities', label:'Authorities', icon:'🛡️'},
  {id:'skills',      label:'Skills',      icon:'⚡'},
  {id:'cases',       label:'Cases',       icon:'🚨'},
  {id:'activity',    label:'Activity',    icon:'📋'},
  {id:'janpraman',   label:'Jan Praman',  icon:'🏛️'},
];

export default function VolunteerProfile({ v, children }) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div style={{ background:V.vBg, minHeight:'100vh' }}>
      {/* Hero */}
      <div style={{ background:`linear-gradient(160deg,#0A1F0F 0%,#111A12 60%,${V.vBg} 100%)`, padding:'16px 16px 0', borderBottom:`1px solid ${V.vBorder}` }}>
        {/* Profile row */}
        <div style={{ display:'flex', gap:14, alignItems:'flex-start', marginBottom:14 }}>
          <div style={{ position:'relative', flexShrink:0 }}>
            <div style={{ width:68, height:68, borderRadius:22, background:'#0F2518', border:`2px solid ${V.vGreen}40`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:32 }}>{v.avatar}</div>
            <div style={{ position:'absolute', bottom:4, right:4, width:11, height:11, borderRadius:6, background:V.vGreen, border:`2px solid ${V.vBg}`, animation:'pulse 2s infinite' }}/>
          </div>
          <div style={{ flex:1 }}>
            <div style={{ display:'flex', gap:7, alignItems:'center', flexWrap:'wrap' }}>
              <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:19, fontWeight:900, color:V.vText }}>{v.name}</p>
              {v.verified && <Pill color={V.vGreen} bg="#0F2518" style={{ fontSize:8.5 }}>✓ Verified</Pill>}
            </div>
            <p style={{ fontSize:11.5, color:V.vTextSoft, marginTop:2 }}>{v.handle} · {v.area}</p>
            <div style={{ display:'flex', gap:6, marginTop:7, flexWrap:'wrap' }}>
              <Pill color={V.vGold} bg="#1A1200">{v.tier}</Pill>
              <Pill color={V.vAmber} bg="#1A1200">🔥 {v.streak}d</Pill>
              <Pill color={V.vGreen} bg="#0F2518">#{v.rank.ward} Ward</Pill>
            </div>
          </div>
        </div>
        <p style={{ fontSize:12.5, color:'#9DB8A0', lineHeight:1.6, marginBottom:14 }}>{v.bio}</p>
        {/* Stats strip */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:1, marginBottom:14 }}>
          {[{val:v.xp.toLocaleString(),lbl:'Total XP',c:V.vGreen},{val:v.stats.rescues,lbl:'Rescues',c:V.vAmber},{val:v.stats.drivesOrganised,lbl:'Drives led',c:V.vPurple}].map(s=>(
            <div key={s.lbl} style={{ textAlign:'center', padding:'10px 4px', background:'#192019' }}>
              <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:18, fontWeight:900, color:s.c }}>{s.val}</p>
              <p style={{ fontSize:9.5, color:V.vTextSoft, marginTop:1 }}>{s.lbl}</p>
            </div>
          ))}
        </div>
        {/* The profile toggle (slot for parent to inject) */}
        {children}
        {/* Tab bar */}
        <div style={{ display:'flex', overflowX:'auto', marginLeft:-16, marginRight:-16 }}>
          {TABS.map(t=>(
            <button key={t.id} onClick={()=>setActiveTab(t.id)} style={{ flex:'0 0 auto', padding:'9px 14px', background:'transparent', border:'none', borderBottom:`2px solid ${activeTab===t.id?V.vGreen:'transparent'}`, color:activeTab===t.id?V.vGreen:'#5A7A60', fontWeight:activeTab===t.id?700:500, fontSize:11.5, cursor:'pointer', transition:'all .15s', whiteSpace:'nowrap', display:'flex', alignItems:'center', gap:4 }}>
              <span style={{ fontSize:13 }}>{t.icon}</span>{t.label}
            </button>
          ))}
        </div>
      </div>
      {/* Content */}
      <div style={{ padding:'16px 16px 100px' }}>
        {activeTab==='overview'    && <OverviewTab    v={v}/>}
        {activeTab==='authorities' && <AuthoritiesTab v={v}/>}
        {activeTab==='skills'      && <SkillsTab      v={v}/>}
        {activeTab==='cases'       && <CasesTab       v={v}/>}
        {activeTab==='activity'    && <ActivityTab    v={v}/>}
        {activeTab==='janpraman'   && <JanPramanTab   v={v}/>}
      </div>
    </div>
  );
}