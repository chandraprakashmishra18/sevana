import { useState } from 'react';
import Button from '../../../../Components/Common/Button';
import Pill from '../../../../Components/Common/Pill';
import ProgressBar from '../../../../Components/Common/ProgressBar';

const V = { vBgCard:'#131A15',vBgCard2:'#192019',vBgCard3:'#1F2820',vText:'#E8F0E9',vTextMid:'#9DB8A0',vTextSoft:'#5A7A60',vBorder:'#1E3024',vAmber:'#FBBF24',vGreen:'#4ADE80',vBlue:'#60A5FA',vPurple:'#C084FC',vTeal:'#2DD4BF',vGold:'#F59E0B' };
const SLabel = ()=><p style={{fontSize:9.5,fontWeight:700,letterSpacing:'.1em',color:V.vTextSoft,textTransform:'uppercase',marginBottom:10}}>SCORE COMPONENTS</p>;

export default function JanPramanTab({ v }) {
  const [activated, setActivated] = useState(false);
  const score = 78;
  const components = [
    {label:'Consistency Index',   score:87, weight:'20%', color:V.vGreen,  desc:'Active 10/12 months'},
    {label:'Total Verified XP',   score:82, weight:'30%', color:V.vBlue,   desc:`${v.xp.toLocaleString()} XP across all modules`},
    {label:'Resolution Impact',   score:86, weight:'15%', color:V.vTeal,   desc:'267/312 reports resolved (85.6%)'},
    {label:'Community Leadership',score:90, weight:'10%', color:V.vPurple, desc:'14 drives organised'},
    {label:'Module Breadth',      score:75, weight:'15%', color:V.vAmber,  desc:'Active across 5/5 modules'},
    {label:'Verified Donations',  score:52, weight:'10%', color:V.vGold,   desc:'₹14,800 donated'},
  ];

  return (
    <div className="fu" style={{display:'flex',flexDirection:'column',gap:14}}>
      <div style={{background:`linear-gradient(135deg,#150D22,${V.vBgCard})`,border:`1px solid ${V.vPurple}30`,borderRadius:16,padding:'20px 16px',textAlign:'center'}}>
        <p style={{fontFamily:"'Outfit',sans-serif",fontSize:13,fontWeight:700,color:V.vPurple,letterSpacing:'.12em',marginBottom:6}}>जन प्रमाण</p>
        <p style={{fontSize:11,color:V.vTextSoft,marginBottom:16}}>People's Proof · Civic Trust Score</p>
        <div style={{width:100,height:100,borderRadius:50,background:`conic-gradient(${V.vPurple} ${score*3.6}deg,${V.vBgCard3} 0deg)`,display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto'}}>
          <div style={{width:80,height:80,borderRadius:40,background:V.vBgCard,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
            <p style={{fontFamily:"'Outfit',sans-serif",fontSize:28,fontWeight:900,color:V.vPurple,lineHeight:1}}>{score}</p>
            <p style={{fontSize:9,color:V.vTextSoft,fontWeight:600}}>/ 100</p>
          </div>
        </div>
        <p style={{fontFamily:"'Outfit',sans-serif",fontSize:15,fontWeight:800,color:V.vText,marginTop:14}}>Civic Trust Score</p>
        <p style={{fontSize:11.5,color:V.vTextSoft,marginTop:4}}>Based on {v.joined} — verified civic record</p>
        <Pill color={V.vPurple} bg="#150D22" style={{marginTop:10}}>Eligible for local body elections</Pill>
      </div>

      <div style={{background:V.vBgCard,border:`1px solid ${V.vBorder}`,borderRadius:14,padding:14}}>
        <SLabel/>
        <div style={{display:'flex',flexDirection:'column',gap:10}}>
          {components.map(c=>(
            <div key={c.label}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:4,alignItems:'center'}}>
                <span style={{fontSize:12,color:V.vTextMid,fontWeight:500}}>{c.label}</span>
                <div style={{display:'flex',gap:6,alignItems:'center'}}>
                  <span style={{fontSize:10,color:V.vTextSoft}}>{c.weight}</span>
                  <span style={{fontSize:12.5,color:c.color,fontWeight:700}}>{c.score}</span>
                </div>
              </div>
              <ProgressBar pct={c.score} color={c.color} height={5} dark/>
              <p style={{fontSize:10.5,color:V.vTextSoft,marginTop:3}}>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{background:'#1A1200',border:`1px solid ${V.vAmber}25`,borderRadius:14,padding:14}}>
        <p style={{fontWeight:700,fontSize:12.5,color:V.vAmber,marginBottom:8}}>⚠ Anti-Gaming Protections Active</p>
        {[['Member since',`${v.joined} · Full scoring unlocked ✓`],['Consistency cap','Not applicable — 10/12 months active'],['Election-burst check','No unusual spike detected ✓'],['Profile scope','Ward councillor, RWA, municipal only']].map(([k,val])=>(
          <div key={k} style={{display:'flex',gap:8,marginBottom:5}}><p style={{fontSize:11,color:V.vTextSoft,minWidth:115,flexShrink:0,fontWeight:600}}>{k}</p><p style={{fontSize:11,color:V.vTextMid,lineHeight:1.4}}>{val}</p></div>
        ))}
      </div>

      {!activated?(
        <div style={{background:'#150D22',border:`1px solid ${V.vPurple}30`,borderRadius:14,padding:16}}>
          <p style={{fontWeight:700,fontSize:14,color:V.vText,marginBottom:6}}>Activate Candidate Public Profile</p>
          <p style={{fontSize:12,color:V.vTextSoft,lineHeight:1.6,marginBottom:10}}>Make your Civic Trust Score visible to voters in your ward. Entirely opt-in. No party affiliation. Only your verified civic record.</p>
          <div style={{padding:'10px 12px',background:V.vBgCard3,borderRadius:10,fontSize:11.5,color:V.vTextSoft,marginBottom:12,lineHeight:1.5}}>Once activated, your XP history forming this score is locked until the election period ends.</div>
          <Button size="md" style={{width:'100%',background:`linear-gradient(135deg,${V.vPurple},#9333EA)`,color:'#fff',border:'none'}} onClick={()=>setActivated(true)}>Activate Jan Praman Profile</Button>
        </div>
      ):(
        <div className="pi" style={{background:'#0F2518',border:`1px solid ${V.vGreen}30`,borderRadius:14,padding:16,textAlign:'center'}}>
          <span style={{fontSize:36}}>🏛️</span>
          <p style={{fontFamily:"'Outfit',sans-serif",fontSize:16,fontWeight:800,color:V.vGreen,marginTop:10}}>Jan Praman Activated!</p>
          <p style={{fontSize:12,color:V.vTextSoft,marginTop:6,lineHeight:1.5}}>Your profile is now visible to voters in Sector 12–16, Noida.</p>
          <div style={{display:'flex',gap:8,marginTop:14}}>
            <Button variant="vSoft" size="sm" style={{flex:1}}>📤 Share Profile</Button>
            <Button variant="vGhost" size="sm" style={{flex:1}} onClick={()=>setActivated(false)}>Deactivate</Button>
          </div>
        </div>
      )}
    </div>
  );
}