import Pill from '../../../../Components/Common/Pill';
import ProgressBar from '../../../../Components/Common/ProgressBar';

const V = { vBgCard:'#131A15',vBgCard2:'#192019',vBorder:'#1E3024',vBorderMd:'#2A4A32',vText:'#E8F0E9',vTextMid:'#9DB8A0',vTextSoft:'#5A7A60',vGreen:'#4ADE80',vAmber:'#FBBF24',vRed:'#F87171',vBlue:'#60A5FA',vPurple:'#C084FC',vGold:'#F59E0B',vTeal:'#2DD4BF' };
const SLabel = ({children})=><p style={{fontSize:9.5,fontWeight:700,letterSpacing:'.1em',color:V.vTextSoft,textTransform:'uppercase',marginBottom:10}}>{children}</p>;

export default function ActivityTab({ v }) {
  return (
    <div className="fu" style={{display:'flex',flexDirection:'column',gap:14}}>
      <div>
        {v.activity.map((a,i)=>(
          <div key={i} className="si" style={{display:'flex',gap:12,animationDelay:`${i*.05}s`}}>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
              <div style={{width:36,height:36,borderRadius:18,background:a.color+'18',border:`1px solid ${a.color}30`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:16,flexShrink:0}}>{a.icon}</div>
              {i<v.activity.length-1&&<div style={{width:1.5,flex:1,background:V.vBorder,margin:'3px 0'}}/>}
            </div>
            <div style={{flex:1,paddingBottom:14}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:3}}>
                <p style={{fontSize:11,color:V.vTextSoft}}>{a.date}</p>
                <Pill color={a.color} bg={V.vBgCard2} style={{fontSize:9}}>{a.xp}</Pill>
              </div>
              <p style={{fontSize:12.5,color:V.vText,lineHeight:1.5}}>{a.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{background:V.vBgCard,border:`1px solid ${V.vBorder}`,borderRadius:14,padding:14}}>
        <SLabel>XP BY MODULE</SLabel>
        <div style={{display:'flex',flexDirection:'column',gap:9}}>
          {[['Animal Rescue',12400,V.vRed,50],['Community Drives',6200,V.vPurple,25],['Civic Reporting',3100,V.vBlue,12.5],['Donations & Aid',2480,V.vTeal,10],['Cruelty & Legal',620,V.vGold,2.5]].map(([l,x,c,p])=>(
            <div key={l}><div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}><span style={{fontSize:11.5,color:V.vTextMid}}>{l}</span><span style={{fontSize:11.5,color:c,fontWeight:700}}>{x.toLocaleString()} XP</span></div><ProgressBar pct={p} color={c} height={5} dark /></div>
          ))}
        </div>
      </div>
    </div>
  );
}