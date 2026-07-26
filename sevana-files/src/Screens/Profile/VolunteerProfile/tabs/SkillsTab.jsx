import { useState } from 'react';
import Card from '../../../../Components/Common/Card';
import Button from '../../../../Components/Common/Button';
import Pill from '../../../../Components/Common/Pill';
import ProgressBar from '../../../../Components/Common/ProgressBar';

const V = { vBgCard:'#131A15',vBgCard2:'#192019',vBgCard3:'#1F2820',vText:'#E8F0E9',vTextMid:'#9DB8A0',vTextSoft:'#5A7A60',vBorder:'#1E3024',vBorderMd:'#2A4A32',vGreen:'#4ADE80',vAmber:'#FBBF24',vBlue:'#60A5FA',vPurple:'#C084FC',vTeal:'#2DD4BF',vGold:'#F59E0B' };
const SLabel = ({children})=><p style={{fontSize:9.5,fontWeight:700,letterSpacing:'.1em',color:V.vTextSoft,textTransform:'uppercase',marginBottom:10}}>{children}</p>;
const levelColor = { Expert:V.vGold, Certified:V.vGreen, Active:V.vTeal, Training:V.vAmber };

export default function SkillsTab({ v }) {
  const [adding, setAdding] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="fu" style={{display:'flex',flexDirection:'column',gap:14}}>
      <div style={{background:`linear-gradient(135deg,#150D22,${V.vBgCard})`,border:`1px solid #C084FC25`,borderRadius:16,padding:16,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div><p style={{fontFamily:"'Outfit',sans-serif",fontSize:16,fontWeight:800,color:V.vText}}>Skill Registry</p><p style={{fontSize:11.5,color:V.vTextSoft,marginTop:2}}>Verified rescue and volunteer competencies</p></div>
        <Pill color={V.vPurple} bg="#150D22">{v.skills.filter(s=>s.verified).length} Verified</Pill>
      </div>

      <div><SLabel>SKILLS & CERTIFICATIONS</SLabel>
        <div style={{display:'flex',flexDirection:'column',gap:8}}>
          {v.skills.map((s,i)=>(
            <div key={s.id} className="si" style={{animationDelay:`${i*.05}s`,background:V.vBgCard,border:`1px solid ${V.vBorder}`,borderRadius:13,padding:'12px 13px'}}>
              <div style={{display:'flex',gap:11,alignItems:'center'}}>
                <div style={{width:40,height:40,borderRadius:12,background:s.verified?'#0F2518':V.vBgCard2,border:`1px solid ${s.verified?V.vGreen+'30':V.vBorder}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,flexShrink:0}}>{s.icon}</div>
                <div style={{flex:1}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <p style={{fontWeight:700,fontSize:13,color:V.vText}}>{s.label}</p>
                    <Pill color={levelColor[s.level]||V.vTextSoft} bg={V.vBgCard3} style={{fontSize:9}}>{s.level}</Pill>
                  </div>
                  <div style={{display:'flex',gap:6,marginTop:5,alignItems:'center'}}>
                    {s.verified?<><div style={{width:5,height:5,borderRadius:3,background:V.vGreen}}/><span style={{fontSize:10.5,color:V.vGreen,fontWeight:600}}>Platform verified</span></>:<><div style={{width:5,height:5,borderRadius:3,background:V.vAmber}}/><span style={{fontSize:10.5,color:V.vAmber,fontWeight:600}}>Pending verification</span></>}
                  </div>
                </div>
                {s.verified&&<span style={{fontSize:16}}>✅</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{background:V.vBgCard,border:`1px solid ${V.vBorder}`,borderRadius:14,padding:14}}>
        <SLabel>PROFICIENCY BREAKDOWN</SLabel>
        <div style={{display:'flex',flexDirection:'column',gap:9}}>
          {[['Animal Rescue',94,V.vGreen],['Community Leadership',86,V.vPurple],['Medical First Aid',42,V.vAmber],['Civic Reporting',78,V.vBlue],['Donor Coordination',65,V.vTeal]].map(([l,p,c])=>(
            <div key={l}><div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}><span style={{fontSize:12,color:V.vTextMid}}>{l}</span><span style={{fontSize:12,color:c,fontWeight:700}}>{p}%</span></div><ProgressBar pct={p} color={c} height={6} dark /></div>
          ))}
        </div>
      </div>

      {!adding?<Button variant="vSoft" size="md" onClick={()=>setAdding(true)} style={{width:'100%'}}>+ Request New Skill Verification</Button>
      :submitted?(<div style={{background:'#0F2518',border:`1px solid ${V.vGreen}30`,borderRadius:14,padding:20,textAlign:'center'}}><span style={{fontSize:36}}>📋</span><p style={{fontWeight:700,color:V.vGreen,fontSize:14,marginTop:10}}>Skill Request Submitted!</p><p style={{fontSize:12,color:V.vTextSoft,marginTop:5}}>Review within 3–5 working days.</p><Button variant="vGhost" size="sm" style={{marginTop:12}} onClick={()=>{setAdding(false);setSubmitted(false);setNewSkill('');}}>Done</Button></div>)
      :(<div style={{background:V.vBgCard,border:`1px solid ${V.vGreen}25`,borderRadius:14,padding:14}}><p style={{fontWeight:700,fontSize:13,color:V.vText,marginBottom:10}}>Request Skill Verification</p><input value={newSkill} onChange={e=>setNewSkill(e.target.value)} placeholder="e.g. Vet First Responder, NSS Unit Leader..." style={{width:'100%',background:V.vBgCard2,border:`1.5px solid ${V.vBorderMd}`,borderRadius:10,padding:'10px 12px',fontSize:12.5,color:V.vText,outline:'none',marginBottom:9}}/><div style={{display:'flex',gap:8}}><Button variant="vGhost" size="sm" style={{flex:1}} onClick={()=>setAdding(false)}>Cancel</Button><Button variant="vPrimary" size="sm" style={{flex:2}} onClick={()=>setSubmitted(true)} disabled={!newSkill.trim()}>Submit Request</Button></div></div>)}
    </div>
  );
}