import { useState } from 'react';
import { T, getTier, getNextTier, TIERS } from '../../Styles/Theme';
import Card         from '../../Components/Common/Card';
import Pill         from '../../Components/Common/Pill';
import Divider      from '../../Components/Common/Divider';
import ProgressBar  from '../../Components/Common/ProgressBar';
import { BADGES }   from '../../Data/Badges';

const SLabel = ({ children }) => (
  <p style={{ fontSize:9.5, fontWeight:700, letterSpacing:'.1em', color:T.textSoft, textTransform:'uppercase', marginBottom:10 }}>
    {children}
  </p>
);

const StatBox = ({ value, label, icon, color = T.green }) => (
  <div style={{ background:T.bgCard2, borderRadius:12, padding:'11px 8px', textAlign:'center', border:`1px solid ${T.borderLt}` }}>
    <span style={{ fontSize:20 }}>{icon}</span>
    <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:20, fontWeight:800, color, marginTop:4 }}>{value}</p>
    <p style={{ fontSize:10, color:T.textSoft, marginTop:2, lineHeight:1.3 }}>{label}</p>
  </div>
);

const LEADERBOARD = [
  { rank:1, name:'Chetna Sharma',  xp:24820, tier:'Seva Champion' },
  { rank:2, name:'Aditya Agarwal', xp:3940,  tier:'Seva Guardian' },
  { rank:3, name:'You',          xp:null,  tier:null, you:true  },
  { rank:4, name:'Priyanshi',    xp:2100,  tier:'Seva Volunteer' },
  { rank:5, name:'Raiyan',    xp:1890,  tier:'Seva Volunteer' },
];

export default function UserProfile({ xp, userData, children }) {
  const [lbScope, setLbScope] = useState('ward');
  const tier     = getTier(xp);
  const nextTier = getNextTier(xp);
  const pct      = Math.min((xp / nextTier.minXP) * 100, 100);

  const board = LEADERBOARD.map(l => l.you ? { ...l, xp, tier: tier.name } : l);

  return (
    <div style={{ background:T.bg, paddingBottom:80 }}>

      {/* ── Hero ── */}
      <div style={{
        background:`linear-gradient(135deg,${T.green},${T.greenMid})`,
        padding:'20px 16px 24px', borderRadius:'0 0 26px 26px',
        marginBottom:16, textAlign:'center',
      }}>
        <div style={{
          width:68, height:68, borderRadius:34,
          background:'rgba(255,255,255,0.2)',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:30, margin:'0 auto 10px',
          border:'3px solid rgba(255,255,255,0.35)',
        }}>
          {userData.avatar || '👤'}
        </div>
        <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:20, fontWeight:900, color:'#fff' }}>{userData.name}</p>
        <p style={{ color:'rgba(255,255,255,0.7)', fontSize:11.5, marginTop:2 }}>{userData.area}</p>
        {userData.bio && (
          <p style={{ color:'rgba(255,255,255,0.65)', fontSize:12, marginTop:6, lineHeight:1.5, maxWidth:300, margin:'8px auto 0' }}>
            {userData.bio}
          </p>
        )}

        {/* XP strip */}
        <div style={{
          background:'rgba(255,255,255,0.12)', borderRadius:14,
          padding:'10px 18px', display:'inline-flex', gap:20, marginTop:14,
        }}>
          {[
            { v: xp.toLocaleString(),               l:'XP'      },
            { v: userData.stats?.rescues   || 7,     l:'Rescues' },
            { v: (userData.stats?.streak   || 12)+'d',l:'Streak' },
          ].map((s, i) => (
            <div key={s.l} style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
              <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:20, fontWeight:900, color:'#fff' }}>{s.v}</p>
              <p style={{ fontSize:9, color:'rgba(255,255,255,0.65)', marginTop:1 }}>{s.l.toUpperCase()}</p>
            </div>
          )).reduce((acc, el, i) => i === 0 ? [el] : [...acc, <div key={`d${i}`} style={{ width:1, height:28, background:'rgba(255,255,255,0.3)' }}/>, el], [])}
        </div>

        {/* Toggle slot */}
        {children}
      </div>

      <div style={{ padding:'0 14px' }}>

        {/* ── Tier progress ── */}
        <Card style={{ marginBottom:14 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:9 }}>
            <div>
              <p style={{ fontWeight:700, fontSize:14, color:T.text }}>{tier.icon} {tier.name}</p>
              <p style={{ fontSize:11.5, color:T.textSoft }}>
                Next: {nextTier.name} · {Math.max(0, nextTier.minXP - xp).toLocaleString()} XP to go
              </p>
            </div>
          </div>
          <ProgressBar pct={pct} color={T.green} height={9} />
          <div style={{ display:'flex', justifyContent:'space-between', marginTop:8 }}>
            {TIERS.filter(Boolean).map((t, i) => (
              <div key={t.name} style={{ textAlign:'center', flex:1 }}>
                <div style={{
                  width:8, height:8, borderRadius:4, margin:'0 auto 3px',
                  background: xp >= t.minXP ? T.green : T.bgCard3,
                  border:`1px solid ${xp >= t.minXP ? T.green : T.border}`,
                }} />
                <p style={{ fontSize:7.5, color: xp >= t.minXP ? T.green : T.textSoft, fontWeight:600 }}>
                  {t.icon}
                </p>
              </div>
            ))}
          </div>
          <p style={{ fontSize:11, color:T.textSoft, marginTop:5 }}>
            {xp.toLocaleString()} / {nextTier.minXP.toLocaleString()} XP
          </p>
        </Card>

        {/* ── Upgrade CTA ── */}
        <Card style={{
          background:`linear-gradient(135deg,${T.greenLt},${T.bgCard})`,
          border:`1.5px solid ${T.green}30`, marginBottom:16, padding:'14px 16px',
        }}>
          <div style={{ display:'flex', gap:12, alignItems:'center' }}>
            <span style={{ fontSize:30 }}>🦸</span>
            <div style={{ flex:1 }}>
              <p style={{ fontWeight:700, fontSize:14, color:T.green }}>Upgrade to Volunteer</p>
              <p style={{ fontSize:12, color:T.textSoft, marginTop:2, lineHeight:1.5 }}>
                Unlock 7 authorities, skill verification, Jan Praman electoral profile and more. Use the toggle above.
              </p>
            </div>
          </div>
        </Card>

        {/* ── Stats ── */}
        <SLabel>MY IMPACT</SLabel>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8, marginBottom:16 }}>
          <StatBox value={userData.stats?.rescues || 7} label="Rescues" icon="🐾" />
          <StatBox value={userData.stats?.drivesAttended || 6} label="Drives" icon="📢" color={T.purple} />
          <StatBox value={(userData.stats?.streak || 12) + 'd'} label="Streak" icon="🔥" color={T.amber} />
          <StatBox value={userData.stats?.reportsTotal || 34} label="Reports" icon="📸" color={T.blue} />
          <StatBox value={'₹' + (userData.stats?.donationAmount || 2400).toLocaleString()} label="Donated" icon="💚" color={T.teal} />
          <StatBox value={userData.stats?.reportsResolved || 21} label="Resolved" icon="✅" color={T.gold} />
        </div>

        {/* ── Recent Activity ── */}
        {userData.activity && (
          <>
            <SLabel>RECENT ACTIVITY</SLabel>
            <div style={{ display:'flex', flexDirection:'column', gap:0, marginBottom:16 }}>
              {userData.activity.map((a, i) => (
                <div key={i} style={{ display:'flex', gap:11 }}>
                  <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
                    <div style={{
                      width:34, height:34, borderRadius:17,
                      background: a.color + '18',
                      border:`1px solid ${a.color}30`,
                      display:'flex', alignItems:'center', justifyContent:'center',
                      fontSize:15, flexShrink:0,
                    }}>{a.icon}</div>
                    {i < userData.activity.length - 1 && (
                      <div style={{ width:1.5, flex:1, background:T.borderLt, margin:'3px 0' }} />
                    )}
                  </div>
                  <div style={{ flex:1, paddingBottom:12 }}>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:3 }}>
                      <p style={{ fontSize:11, color:T.textSoft }}>{a.date}</p>
                      <Pill color={a.color} bg={a.color+'18'} style={{ fontSize:9 }}>{a.xp}</Pill>
                    </div>
                    <p style={{ fontSize:12.5, color:T.textMid, lineHeight:1.45 }}>{a.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── Badges ── */}
        <SLabel>BADGES & ACHIEVEMENTS</SLabel>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8, marginBottom:16 }}>
          {BADGES.map(b => (
            <Card key={b.name} style={{
              textAlign:'center', padding:'11px 7px',
              opacity: b.earned ? 1 : 0.45,
              border:`1.5px solid ${b.earned ? T.gold + '40' : T.borderLt}`,
              background: b.earned ? T.goldLt : T.bgCard2,
            }}>
              <span style={{ fontSize:26 }}>{b.icon}</span>
              <p style={{ fontSize:10.5, fontWeight:700, color: b.earned ? T.gold : T.textSoft, marginTop:5, lineHeight:1.2 }}>{b.name}</p>
              <p style={{ fontSize:9.5, color:T.textSoft, marginTop:2, lineHeight:1.3 }}>{b.desc}</p>
              {!b.earned && <p style={{ fontSize:9, color:T.textSoft, marginTop:3 }}>🔒 Locked</p>}
            </Card>
          ))}
        </div>

        {/* ── Leaderboard ── */}
        <SLabel>LEADERBOARD</SLabel>
        <div style={{ display:'flex', gap:7, marginBottom:12 }}>
          {['ward','city','state','national'].map(s => (
            <button key={s} onClick={() => setLbScope(s)} style={{
              flex:1, padding:'5px 2px', borderRadius:9,
              border:`1.5px solid ${lbScope === s ? T.green : T.border}`,
              background: lbScope === s ? T.greenLt : 'transparent',
              fontSize:10, fontWeight:600,
              color: lbScope === s ? T.green : T.textSoft,
              cursor:'pointer', textTransform:'capitalize',
            }}>{s}</button>
          ))}
        </div>
        {board.map((l, i) => (
          <Card key={i} style={{
            marginBottom:6, padding:'9px 12px',
            background: l.you ? T.greenLt : T.bgCard,
            border:`1.5px solid ${l.you ? T.green + '40' : T.borderLt}`,
          }}>
            <div style={{ display:'flex', gap:9, alignItems:'center' }}>
              <div style={{
                width:26, height:26, borderRadius:13,
                background: l.rank <= 3 ? [T.gold,'#B0B0B0','#CD7F32'][l.rank-1] : T.bgCard2,
                display:'flex', alignItems:'center', justifyContent:'center',
                fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:11,
                color: l.rank <= 3 ? '#fff' : T.textSoft,
              }}>#{l.rank}</div>
              <div style={{ flex:1 }}>
                <p style={{ fontWeight: l.you ? 700 : 500, fontSize:12.5, color: l.you ? T.green : T.text }}>
                  {l.name}{l.you && ' (You)'}
                </p>
                <p style={{ fontSize:10.5, color:T.textSoft }}>{l.tier}</p>
              </div>
              <p style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:13.5, color: l.you ? T.green : T.text }}>
                {l.xp.toLocaleString()}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
