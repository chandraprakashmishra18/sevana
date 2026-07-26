import Card from '../../../../Components/Common/Card';
import Button from '../../../../Components/Common/Button';
import Pill from '../../../../Components/Common/Pill';

const V = { vBgCard:'#131A15',vBgCard2:'#192019',vBgCard3:'#1F2820',vText:'#E8F0E9',vTextMid:'#9DB8A0',vTextSoft:'#5A7A60',vBorder:'#1E3024',vBorderMd:'#2A4A32',vAmber:'#FBBF24',vBlue:'#60A5FA' };
const SLabel = ({children,color=V.vTextSoft})=><p style={{fontSize:9.5,fontWeight:700,letterSpacing:'.1em',color,textTransform:'uppercase',marginBottom:10}}>{children}</p>;

export default function AuthoritiesTab({ v }) {
  const active = v.authorities.filter(a=>a.active);
  const locked = v.authorities.filter(a=>!a.active);
  return (
    <div className="fu" style={{display:'flex',flexDirection:'column',gap:14}}>
      <div style={{background:V.vBgCard2,border:`1px solid ${V.vBorderMd}`,borderRadius:16,padding:16}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
          <div><p style={{fontFamily:"'Outfit',sans-serif",fontSize:16,fontWeight:800,color:V.vText}}>Volunteer Authorities</p><p style={{fontSize:11.5,color:V.vTextSoft,marginTop:2}}>Permissions earned by tier & verified skills</p></div>
          <Pill color="#4ADE80" bg="#0F2518">{active.length} Active</Pill>
        </div>
        <div style={{padding:'10px 12px',background:V.vBgCard3,borderRadius:10,fontSize:11.5,color:V.vTextSoft,lineHeight:1.6,border:`1px solid ${V.vBorder}`}}>
          <strong style={{color:V.vAmber}}>⚠ Authority Note:</strong> These permissions are earned through verified tier progression and skill certification. Misuse triggers automatic review.
        </div>
      </div>

      <div><SLabel color="#4ADE80">ACTIVE AUTHORITIES ({active.length})</SLabel>
        <div style={{display:'flex',flexDirection:'column',gap:8}}>
          {active.map((a,i)=>(
            <div key={a.id} className="si" style={{animationDelay:`${i*.06}s`,background:a.bg,border:`1px solid ${a.color}25`,borderRadius:14,padding:'13px 14px'}}>
              <div style={{display:'flex',gap:12,alignItems:'flex-start'}}>
                <div style={{width:40,height:40,borderRadius:12,background:`${a.color}18`,border:`1px solid ${a.color}30`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,flexShrink:0}}>{a.icon}</div>
                <div style={{flex:1}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:4}}>
                    <p style={{fontWeight:700,fontSize:13.5,color:V.vText}}>{a.label}</p>
                    <Pill color={a.color} bg={a.bg} style={{fontSize:9}}>{a.tier}</Pill>
                  </div>
                  <p style={{fontSize:11.5,color:V.vTextMid,lineHeight:1.5}}>{a.desc}</p>
                  <div style={{display:'flex',alignItems:'center',gap:6,marginTop:6}}>
                    <div style={{width:6,height:6,borderRadius:3,background:a.color,animation:'pulse 2s infinite'}}/>
                    <span style={{fontSize:10.5,color:a.color,fontWeight:600}}>Enabled</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div><SLabel>LOCKED ({locked.length})</SLabel>
        <div style={{display:'flex',flexDirection:'column',gap:7}}>
          {locked.map(a=>(
            <div key={a.id} style={{background:V.vBgCard2,borderRadius:14,border:`1px solid ${V.vBorder}`,padding:'12px 14px',opacity:.5}}>
              <div style={{display:'flex',gap:10,alignItems:'center'}}>
                <div style={{width:38,height:38,borderRadius:11,background:V.vBgCard3,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,filter:'grayscale(1)'}}>{a.icon}</div>
                <div style={{flex:1}}>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:2}}>
                    <p style={{fontWeight:700,fontSize:13,color:V.vTextSoft}}>{a.label}</p>
                    <Pill color={V.vTextSoft} bg={V.vBgCard3} style={{fontSize:9}}>🔒 {a.tier}</Pill>
                  </div>
                  <p style={{fontSize:11,color:V.vTextSoft,lineHeight:1.4}}>{a.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{background:'#081425',border:`1px solid ${V.vBlue}25`,borderRadius:14,padding:14}}>
        <p style={{fontWeight:700,fontSize:13,color:V.vBlue,marginBottom:6}}>📋 Request Additional Authority</p>
        <p style={{fontSize:11.5,color:V.vTextSoft,lineHeight:1.5,marginBottom:10}}>Some authorities require manual review by the platform team or an institutional partner.</p>
        <Button variant="vGhost" size="sm" style={{borderColor:`${V.vBlue}40`,color:V.vBlue,border:`1.5px solid ${V.vBlue}40`}}>Submit Authority Request</Button>
      </div>
    </div>
  );
}