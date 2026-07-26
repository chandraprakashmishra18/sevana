import { useState } from 'react';
import { T } from '../../Styles/Theme';
import Button from '../../Components/Common/Button';

const REQUIREMENTS = [
  { icon:'📸', label:'10+ reports filed',        met:true  },
  { icon:'✅', label:'5+ reports resolved',       met:true  },
  { icon:'📅', label:'Active for 30+ days',       met:true  },
  { icon:'📋', label:'Profile fully completed',   met:true  },
  { icon:'🤝', label:'Community pledge accepted', met:false },
];

const PLEDGE_LINES = [
  'I will respond to Raise Hand alerts whenever I am able.',
  'I will file accurate, photo-verified reports only.',
  'I will use my volunteer authorities responsibly.',
  'I will not misuse the platform for personal gain.',
  'I understand that misuse leads to authority revocation.',
];

export default function UpgradeModal({ onConfirm, onClose }) {
  const [step,    setStep]    = useState(0); // 0=checklist  1=pledge  2=success
  const [pledged, setPledged] = useState(false);
  const allMet = REQUIREMENTS.every(r => r.met) || true; // demo: always allow

  return (
    <div style={{
      position:'fixed', inset:0, background:'rgba(0,0,0,0.7)',
      display:'flex', alignItems:'flex-end', justifyContent:'center', zIndex:300,
    }} onClick={e => { if(e.target === e.currentTarget) onClose(); }}>

      <div className="fu" style={{
        background:T.bgCard, borderRadius:'22px 22px 0 0',
        padding:'20px 18px 36px', width:'100%', maxWidth:430,
        border:`1px solid ${T.border}`, borderBottom:'none',
        boxShadow:'0 -8px 40px rgba(0,0,0,0.18)',
      }}>

        {/* ── Step 0: Requirements checklist ── */}
        {step === 0 && (
          <div className="fu">
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:18 }}>
              <div>
                <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:18, fontWeight:800, color:T.text }}>
                  Become a Volunteer 🦸
                </p>
                <p style={{ fontSize:12, color:T.textSoft, marginTop:3 }}>
                  Unlock authorities, skill verification and Jan Praman
                </p>
              </div>
              <button onClick={onClose} style={{ background:T.bgCard2, border:`1px solid ${T.border}`, borderRadius:8, padding:'5px 10px', color:T.textSoft, cursor:'pointer', fontSize:14 }}>✕</button>
            </div>

            <p style={{ fontSize:11, fontWeight:700, color:T.textSoft, letterSpacing:'.08em', marginBottom:10 }}>
              REQUIREMENTS
            </p>
            <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:18 }}>
              {REQUIREMENTS.map(r => (
                <div key={r.label} style={{
                  display:'flex', alignItems:'center', gap:12, padding:'10px 12px',
                  background: r.met ? T.greenLt : T.bgCard2,
                  border:`1px solid ${r.met ? T.green+'30' : T.border}`,
                  borderRadius:11,
                }}>
                  <span style={{ fontSize:20 }}>{r.icon}</span>
                  <p style={{ flex:1, fontSize:13, fontWeight:500, color: r.met ? T.text : T.textSoft }}>{r.label}</p>
                  <span style={{ fontSize:16 }}>{r.met ? '✅' : '⏳'}</span>
                </div>
              ))}
            </div>

            <div style={{
              background:T.amberLt, borderRadius:11, padding:'10px 12px',
              fontSize:11.5, color:T.amber, lineHeight:1.55, marginBottom:18,
              border:`1px solid ${T.amber}30`,
            }}>
              💡 Volunteer mode gives you additional authorities but does <strong>not</strong> change your public identity. You can switch back to User mode at any time.
            </div>

            <Button variant="primary" size="lg" style={{ width:'100%' }}
              onClick={() => setStep(1)} disabled={!allMet}>
              Continue to Pledge →
            </Button>
          </div>
        )}

        {/* ── Step 1: Pledge ── */}
        {step === 1 && (
          <div className="fu">
            <div style={{ display:'flex', gap:10, alignItems:'center', marginBottom:18 }}>
              <button onClick={() => setStep(0)} style={{ background:T.bgCard2, border:`1px solid ${T.border}`, borderRadius:8, padding:'5px 10px', color:T.textSoft, cursor:'pointer', fontSize:13 }}>←</button>
              <div>
                <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:17, fontWeight:800, color:T.text }}>Volunteer Pledge</p>
                <p style={{ fontSize:12, color:T.textSoft, marginTop:2 }}>Read and accept to continue</p>
              </div>
            </div>

            <div style={{
              background:T.bgCard2, borderRadius:13, padding:'14px 14px',
              border:`1px solid ${T.border}`, marginBottom:16,
            }}>
              <p style={{ fontSize:11, fontWeight:700, color:T.textSoft, letterSpacing:'.08em', marginBottom:10 }}>AS A SEVANA VOLUNTEER, I PLEDGE THAT:</p>
              <div style={{ display:'flex', flexDirection:'column', gap:9 }}>
                {PLEDGE_LINES.map((line, i) => (
                  <div key={i} style={{ display:'flex', gap:10, alignItems:'flex-start' }}>
                    <div style={{
                      width:20, height:20, borderRadius:10, background:T.green,
                      display:'flex', alignItems:'center', justifyContent:'center',
                      flexShrink:0, marginTop:1,
                    }}>
                      <span style={{ fontSize:10, color:'#fff', fontWeight:700 }}>{i+1}</span>
                    </div>
                    <p style={{ fontSize:12.5, color:T.textMid, lineHeight:1.5, flex:1 }}>{line}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Accept checkbox */}
            <div onClick={() => setPledged(p => !p)} style={{
              display:'flex', gap:12, alignItems:'center', padding:'12px 14px',
              background: pledged ? T.greenLt : T.bgCard2,
              border:`2px solid ${pledged ? T.green : T.border}`,
              borderRadius:12, cursor:'pointer', marginBottom:16, transition:'all .2s',
            }}>
              <div style={{
                width:22, height:22, borderRadius:6,
                background: pledged ? T.green : 'transparent',
                border:`2px solid ${pledged ? T.green : T.border}`,
                display:'flex', alignItems:'center', justifyContent:'center',
                transition:'all .2s', flexShrink:0,
              }}>
                {pledged && <span style={{ color:'#fff', fontSize:13, fontWeight:700 }}>✓</span>}
              </div>
              <p style={{ fontSize:13, fontWeight:600, color: pledged ? T.green : T.textMid }}>
                I accept the Volunteer Pledge
              </p>
            </div>

            <Button variant="primary" size="lg" style={{ width:'100%' }}
              onClick={() => { setStep(2); setTimeout(onConfirm, 1600); }}
              disabled={!pledged}>
              Activate Volunteer Mode 🦸
            </Button>
          </div>
        )}

        {/* ── Step 2: Success ── */}
        {step === 2 && (
          <div className="fu" style={{ textAlign:'center', padding:'20px 0' }}>
            <div style={{ fontSize:64, marginBottom:12 }}>🦸</div>
            <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:22, fontWeight:800, color:T.green }}>
              Volunteer Activated!
            </p>
            <p style={{ fontSize:13.5, color:T.textMid, marginTop:8, lineHeight:1.6 }}>
              Welcome to Sevana Volunteer mode.<br/>Your new authorities are now active.
            </p>
            <div style={{
              background:T.goldLt, borderRadius:14, padding:14, margin:'18px 0',
              border:`1px solid ${T.gold}40`,
            }}>
              <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:20, fontWeight:800, color:T.gold }}>
                +500 XP Activation Bonus! 🎉
              </p>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:7 }}>
              {['🛡️ 7 Volunteer Authorities unlocked', '⚡ Skill Registry now active', '🏛️ Jan Praman profile available'].map((a, i) => (
                <div key={i} style={{
                  background:T.greenLt, borderRadius:10, padding:'9px 12px',
                  fontSize:12.5, color:T.green, fontWeight:600,
                  border:`1px solid ${T.green}30`, textAlign:'left',
                }}>{a}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
