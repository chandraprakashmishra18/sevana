import Card from '../../../../Components/Common/Card';
import Pill from '../../../../Components/Common/Pill';
import ProgressBar from '../../../../Components/Common/ProgressBar';

const V = { vBg:'#0D1410',vBgCard:'#131A15',vBgCard2:'#192019',vBgCard3:'#1F2820',vGreen:'#4ADE80',vAmber:'#FBBF24',vBlue:'#60A5FA',vPurple:'#C084FC',vGold:'#F59E0B',vTeal:'#2DD4BF',vText:'#E8F0E9',vTextMid:'#9DB8A0',vTextSoft:'#5A7A60',vBorder:'#1E3024',vBorderMd:'#2A4A32' };

const SLabel = ({children,color=V.vTextSoft})=><p style={{fontSize:9.5,fontWeight:700,letterSpacing:'.1em',color,textTransform:'uppercase',marginBottom:10}}>{children}</p>;
const StatBox = ({value,label,icon,color=V.vGreen})=><div style={{background:V.vBgCard2,borderRadius:12,padding:'12px 8px',textAlign:'center',border:`1px solid ${V.vBorder}`}}><span style={{fontSize:20}}>{icon}</span><p style={{fontFamily:"'Outfit',sans-serif",fontSize:20,fontWeight:800,color,marginTop:4}}>{value}</p><p style={{fontSize:10,color:V.vTextSoft,fontWeight:500,marginTop:2,lineHeight:1.3}}>{label}</p></div>;

export default function OverviewTab({ v }) {
  const resRate = Math.round((v.stats.reportsResolved / v.stats.reportsTotal) * 100);
  const tierPct = (v.xp / v.nextTierXP) * 100;

  return (
    <div className="fu" style={{display:'flex',flexDirection:'column',gap:14}}>
      {/* XP + Tier */}
      <div style={{background:`linear-gradient(135deg,${V.vBgCard2},${V.vBgCard})`,border:`1px solid ${V.vGreen}30`,borderRadius:16,padding:16}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:12}}>
          <div><SLabel color={V.vGreen}>TIER PROGRESS</SLabel><p style={{fontFamily:"'Outfit',sans-serif",fontSize:17,fontWeight:800,color:V.vGreen}}>{v.tier}</p><p style={{fontSize:11.5,color:V.vTextSoft,marginTop:2}}>Level {v.tierLevel} · {(v.nextTierXP-v.xp).toLocaleString()} XP to Seva Legend</p></div>
          <div style={{textAlign:'right'}}><p style={{fontFamily:"'Outfit',sans-serif",fontSize:26,fontWeight:900,color:V.vText}}>{v.xp.toLocaleString()}</p><p style={{fontSize:10,color:V.vTextSoft,letterSpacing:'.06em'}}>TOTAL XP</p></div>
        </div>
        <ProgressBar pct={tierPct} color={V.vGreen} height={8} dark />
        <div style={{display:'flex',justifyContent:'space-between',marginTop:8}}>
          {['Seedling','Volunteer','Guardian','Champion','Legend'].map((t,i)=>(
            <div key={t} style={{textAlign:'center',flex:1}}>
              <div style={{width:8,height:8,borderRadius:4,background:i<v.tierLevel?V.vGreen:V.vBgCard3,margin:'0 auto 3px',border:`1px solid ${i<v.tierLevel?V.vGreen:V.vBorderMd}`}}/>
              <p style={{fontSize:7,color:i<v.tierLevel?V.vGreen:V.vTextSoft,fontWeight:600}}>{t.slice(0,4)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Ranks */}
      <div style={{background:V.vBgCard,border:`1px solid ${V.vBorder}`,borderRadius:16,padding:16}}>
        <SLabel>LEADERBOARD RANKS</SLabel>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8}}>
          {[['Ward','#'+v.rank.ward,V.vGold],['City','#'+v.rank.city,V.vGreen],['State','#'+v.rank.state,V.vBlue],['National','#'+v.rank.national,V.vTextSoft]].map(([l,r,c])=>(
            <div key={l} style={{background:V.vBgCard2,borderRadius:10,padding:'10px 6px',textAlign:'center',border:`1px solid ${V.vBorder}`}}>
              <p style={{fontFamily:"'Outfit',sans-serif",fontSize:20,fontWeight:800,color:c}}>{r}</p>
              <p style={{fontSize:10,color:V.vTextSoft,marginTop:2}}>{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8}}>
        <StatBox value={v.stats.reportsTotal} label="Reports Filed" icon="📸" />
        <StatBox value={resRate+'%'} label="Resolution Rate" icon="✅" color={V.vTeal} />
        <StatBox value={v.stats.rescues} label="Rescues Led" icon="🐾" color={V.vAmber} />
        <StatBox value={v.stats.drivesOrganised} label="Drives Led" icon="📢" color={V.vPurple} />
        <StatBox value={v.stats.fosterDays} label="Foster Days" icon="🏠" color={V.vBlue} />
        <StatBox value={'₹'+v.stats.donationAmount.toLocaleString()} label="Aid Donated" icon="💚" color={V.vGold} />
      </div>

      {/* Streak */}
      <div style={{background:`linear-gradient(135deg,#1A1200,${V.vBgCard})`,border:`1px solid ${V.vAmber}30`,borderRadius:16,padding:16,display:'flex',alignItems:'center',gap:14}}>
        <span style={{fontSize:34}}>🔥</span>
        <div style={{flex:1}}><p style={{fontFamily:"'Outfit',sans-serif",fontSize:24,fontWeight:900,color:V.vAmber}}>{v.streak} Day Streak</p><p style={{fontSize:11.5,color:V.vTextSoft,marginTop:2}}>Ward #1 streak holder</p></div>
        <Pill color={V.vAmber} bg="#1A1200">Top 1%</Pill>
      </div>

      {/* Consistency */}
      <div style={{background:V.vBgCard,border:`1px solid ${V.vBorder}`,borderRadius:16,padding:16}}>
        <SLabel>12-MONTH CONSISTENCY</SLabel>
        <div style={{display:'flex',gap:5}}>
          {v.consistencyMonths.map((a,i)=>(
            <div key={i} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:3}}>
              <div style={{width:'100%',height:26,borderRadius:5,background:a?`${V.vGreen}BB`:V.vBgCard3,border:`1px solid ${a?V.vGreen+'40':V.vBorder}`}}/>
              <span style={{fontSize:8,color:V.vTextSoft}}>{['J','F','M','A','M','J','J','A','S','O','N','D'][i]}</span>
            </div>
          ))}
        </div>
        <div style={{display:'flex',justifyContent:'space-between',marginTop:8}}>
          <span style={{fontSize:10.5,color:V.vTextSoft}}>Active: {v.consistencyMonths.filter(Boolean).length}/12 months</span>
          <Pill color={V.vGreen} bg="#0F2518">Highly consistent</Pill>
        </div>
      </div>
    </div>
  );
}