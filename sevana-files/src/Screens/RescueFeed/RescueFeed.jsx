import { useState } from 'react';
import { T } from '../../Styles/Theme';
import { REPORTS }    from '../../Data/Reports';
import { LOST_FOUND } from '../../Data/LostFound';
import Card from '../../Components/Common/Card';
import Pill from '../../Components/Common/Pill';
import Button from '../../Components/Common/Button';
import Divider from '../../Components/Common/Divider';
import { sev }    from '../../Utils/Severity';
import { status } from '../../Utils/Status';

// ── Thread view ───────────────────────────────────────────────────────────────
function ReportDetail({ report, onBack, onXP }) {
  const [wTab,   setWTab]   = useState(false);
  const [raised, setRaised] = useState(false);
  const [raising,setRaising]= useState(false);
  const [claimed,setClaimed]= useState({});
  const sv = sev(report.severity);
  const st = status(report.status);

  const doRaise = () => {
    setRaising(true);
    setTimeout(() => { setRaising(false); setRaised(true); onXP(150); }, 1200);
  };

  return (
    <div className="fu" style={{ paddingBottom: 80 }}>
      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg,${sv.color},${sv.color}BB)`,
        padding: '14px 14px 20px', borderRadius: '0 0 22px 22px', marginBottom: 14,
      }}>
        <button onClick={onBack} style={{
          background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: 8,
          padding: '5px 10px', color: '#fff', cursor: 'pointer', fontSize: 13, marginBottom: 10,
        }}>← Back</button>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <span style={{ fontSize: 32 }}>{report.icon}</span>
          <div>
            <p style={{ fontFamily:"'Outfit',sans-serif", fontSize: 17, fontWeight: 800, color: '#fff' }}>
              {report.animal} in distress
            </p>
            <p style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.75)' }}>📍 {report.loc} · {report.time}</p>
          </div>
        </div>
      </div>

      <div style={{ padding: '0 14px' }}>
        <div style={{ display: 'flex', gap: 7, marginBottom: 12 }}>
          <Pill color={sv.color} bg={sv.bg}>{sv.label}</Pill>
          <Pill color={st.color} bg={st.bg}>{st.label}</Pill>
          <Pill color={T.textSoft} bg={T.bgCard2}>👥 {report.resp}</Pill>
        </div>
        <p style={{ fontSize: 13, color: T.textMid, lineHeight: 1.6, marginBottom: 14 }}>{report.desc}</p>

        {/* Sub-tabs */}
        <div style={{ display: 'flex', background: T.bgCard2, borderRadius: 11, padding: 4, marginBottom: 14 }}>
          {['Timeline', 'Wishlist 🎒'].map((t, i) => (
            <button key={t} onClick={() => setWTab(i === 1)} style={{
              flex: 1, padding: '7px', borderRadius: 8,
              background: wTab === (i === 1) ? T.bgCard : 'transparent',
              border: 'none', fontWeight: 600, fontSize: 12,
              color: wTab === (i === 1) ? T.text : T.textSoft, cursor: 'pointer', transition: 'all .15s',
            }}>{t}</button>
          ))}
        </div>

        {/* Timeline */}
        {!wTab && (
          <div>
            <p style={{ fontWeight: 700, fontSize: 13, color: T.text, marginBottom: 11 }}>🔄 Rescue Thread</p>
            {report.thread.map((t, i) => (
              <div key={i} className="si" style={{ display: 'flex', gap: 9, animationDelay: `${i * .07}s` }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{
                    width: 30, height: 30, borderRadius: 15, background: T.greenLt,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 13, flexShrink: 0, fontWeight: 700, color: T.green,
                  }}>{t.who[0]}</div>
                  {i < report.thread.length - 1 && <div style={{ width: 2, flex: 1, background: T.borderLt, margin: '3px 0' }} />}
                </div>
                <div style={{ flex: 1, paddingBottom: 10 }}>
                  <div style={{ display: 'flex', gap: 7, alignItems: 'center', marginBottom: 3 }}>
                    <p style={{ fontWeight: 700, fontSize: 12, color: T.text }}>{t.who}</p>
                    <Pill color={T.green} bg={T.greenLt} style={{ fontSize: 8.5 }}>{t.role}</Pill>
                    <p style={{ fontSize: 10.5, color: T.textSoft, marginLeft: 'auto' }}>{t.time}</p>
                  </div>
                  <div style={{
                    background: T.bgCard2, borderRadius: 9, borderTopLeftRadius: 3,
                    padding: '9px 11px', fontSize: 12.5, color: T.textMid, lineHeight: 1.5,
                  }}>{t.msg}</div>
                </div>
              </div>
            ))}
            {report.status === 'open' && (
              <div style={{
                background: T.bgCard2, borderRadius: 12, padding: '10px 12px',
                display: 'flex', gap: 9, alignItems: 'center',
              }}>
                <input placeholder="Add an update..." style={{ flex: 1, background: 'none', border: 'none', fontSize: 12.5, color: T.text, outline: 'none' }} />
                <button style={{
                  background: T.green, color: '#fff', border: 'none',
                  borderRadius: 8, padding: '5px 10px', fontSize: 11.5, fontWeight: 600, cursor: 'pointer',
                }}>Send</button>
              </div>
            )}
          </div>
        )}

        {/* Wishlist */}
        {wTab && (
          <div>
            <p style={{ fontWeight: 700, fontSize: 13, color: T.text, marginBottom: 4 }}>Rescue Resource Wishlist</p>
            <p style={{ fontSize: 12, color: T.textSoft, marginBottom: 11 }}>Claim an item to donate it. +40 XP each.</p>
            {report.wishlist.map((w, i) => {
              const key = `${report.id}_${i}`;
              const done = claimed[key] || w.claimed;
              return (
                <div key={i} style={{
                  background: done ? T.greenLt : T.bgCard,
                  border: `1.5px solid ${done ? T.green : T.borderLt}`,
                  borderRadius: 11, padding: '11px 13px', marginBottom: 7,
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <p style={{ fontSize: 12.5, fontWeight: 600, color: T.text }}>{w.item}</p>
                  {done
                    ? <Pill color={T.green} bg={T.greenLt}>Claimed ✓</Pill>
                    : <Button variant="soft" size="sm" onClick={() => { setClaimed(p => ({ ...p, [key]: true })); onXP(40); }}>Claim +40 XP</Button>
                  }
                </div>
              );
            })}
          </div>
        )}

        {/* Raise Hand */}
        {report.status !== 'resolved' && (
          <div style={{ marginTop: 14 }}>
            {!raised
              ? <Button variant="danger" size="lg" style={{ width: '100%', background: `linear-gradient(120deg,${T.red},${T.amber})`, border: 'none' }} onClick={doRaise}>
                  <span className={raising ? 'rh' : ''} style={{ display: 'inline-block', marginRight: 7 }}>🖐️</span>
                  {raising ? 'Alerting nearby people...' : 'Raise Hand — Get Help Now'}
                </Button>
              : <div style={{ background: T.greenLt, borderRadius: 12, padding: 13, textAlign: 'center', border: `1.5px solid ${T.green}40` }}>
                  <p style={{ fontWeight: 700, color: T.green, fontSize: 13.5 }}>🖐️ Hand Raised! +150 XP</p>
                  <p style={{ fontSize: 11.5, color: T.textSoft, marginTop: 3 }}>8 people near you have been alerted</p>
                </div>
            }
          </div>
        )}
      </div>
    </div>
  );
}

// ── Lost & Found sub-screen ───────────────────────────────────────────────────
function LostFoundScreen({ onBack, onXP }) {
  const [newPost,   setNewPost]   = useState(false);
  const [postDone,  setPostDone]  = useState(false);
  const [lostType,  setLostType]  = useState('lost');
  const [desc,      setDesc]      = useState('');

  return (
    <div className="fu" style={{ paddingBottom: 80 }}>
      <div style={{
        background: `linear-gradient(135deg,${T.purple},${T.purple}BB)`,
        padding: '16px 14px 22px', borderRadius: '0 0 22px 22px', marginBottom: 14,
      }}>
        <button onClick={onBack} style={{
          background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: 8,
          padding: '5px 10px', color: '#fff', cursor: 'pointer', fontSize: 13, marginBottom: 10,
        }}>← Back</button>
        <h1 style={{ fontFamily:"'Outfit',sans-serif", fontSize: 19, fontWeight: 800, color: '#fff' }}>Lost & Found 🔍</h1>
        <p style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.75)', marginTop: 3 }}>Reuniting animals with their families</p>
      </div>

      <div style={{ padding: '0 14px' }}>
        {postDone ? (
          <div style={{ textAlign: 'center', padding: '30px 0' }}>
            <span style={{ fontSize: 48 }}>🎉</span>
            <h2 style={{ fontFamily:"'Outfit',sans-serif", fontSize: 20, fontWeight: 800, color: T.green, marginTop: 10 }}>Listing Posted!</h2>
            <p style={{ color: T.gold, fontWeight: 700, fontSize: 16, marginTop: 8 }}>+20 XP earned ✨</p>
            <Button variant="primary" style={{ marginTop: 18 }}
              onClick={() => { setPostDone(false); setNewPost(false); setDesc(''); }}>
              Back to listings
            </Button>
          </div>
        ) : (
          <>
            {!newPost ? (
              <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                <Button variant="primary" size="md" style={{ flex: 1 }} onClick={() => setNewPost(true)}>+ Lost Animal</Button>
                <Button variant="ghost"   size="md" style={{ flex: 1 }} onClick={() => setNewPost(true)}>+ Found Animal</Button>
              </div>
            ) : (
              <Card style={{ marginBottom: 14, border: `1.5px solid ${T.purple}30` }}>
                <p style={{ fontWeight: 700, fontSize: 13, color: T.text, marginBottom: 10 }}>Post a listing</p>
                <div style={{ display: 'flex', gap: 7, marginBottom: 9 }}>
                  {['lost', 'found'].map(t => (
                    <div key={t} onClick={() => setLostType(t)} style={{
                      flex: 1, padding: '8px', borderRadius: 10,
                      border: `2px solid ${lostType === t ? T.purple : T.borderLt}`,
                      background: lostType === t ? T.purpleLt : T.bgCard,
                      textAlign: 'center', cursor: 'pointer', fontSize: 12.5,
                      fontWeight: 600, color: lostType === t ? T.purple : T.textMid,
                    }}>
                      {t === 'lost' ? '🔍 Lost' : '✅ Found'}
                    </div>
                  ))}
                </div>
                <textarea value={desc} onChange={e => setDesc(e.target.value)}
                  placeholder="Animal type, breed, colour, area, contact..."
                  style={{
                    width: '100%', border: `1.5px solid ${T.border}`, borderRadius: 10,
                    padding: '10px', fontSize: 12.5, color: T.text, resize: 'none', height: 72, outline: 'none',
                  }} />
                <div style={{ display: 'flex', gap: 7, marginTop: 9 }}>
                  <Button variant="ghost" size="sm" style={{ flex: 1 }} onClick={() => setNewPost(false)}>Cancel</Button>
                  <Button variant="primary" size="sm" style={{ flex: 2 }}
                    onClick={() => { setPostDone(true); onXP(20); }}>
                    Post +20 XP
                  </Button>
                </div>
              </Card>
            )}

            {LOST_FOUND.map(l => (
              <Card key={l.id} style={{ marginBottom: 9 }}>
                <div style={{ display: 'flex', gap: 11 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 13,
                    background: l.type === 'lost' ? T.redLt : T.greenLt,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0,
                  }}>{l.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                      <p style={{ fontWeight: 700, fontSize: 13, color: T.text }}>{l.animal} — {l.breed}</p>
                      <Pill bg={l.type === 'lost' ? T.redLt : T.greenLt}
                            color={l.type === 'lost' ? T.red : T.green}>
                        {l.type === 'lost' ? 'Lost' : 'Found'}
                      </Pill>
                    </div>
                    <p style={{ fontSize: 11, color: T.textSoft }}>📍 {l.area} · {l.posted}</p>
                    <p style={{ fontSize: 12, color: T.textMid, marginTop: 4, lineHeight: 1.4 }}>{l.desc}</p>
                    <p style={{ fontSize: 12, color: T.blue, marginTop: 5, fontWeight: 600 }}>📞 {l.contact}</p>
                  </div>
                </div>
              </Card>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

// ── Main Feed ─────────────────────────────────────────────────────────────────
export default function RescueFeed({ onXP }) {
  const [view,     setView]    = useState('active');
  const [selected, setSelected]= useState(null);
  const [lostTab,  setLostTab] = useState(false);

  if (lostTab)  return <LostFoundScreen onBack={() => setLostTab(false)} onXP={onXP} />;
  if (selected) return <ReportDetail report={REPORTS.find(r => r.id === selected)} onBack={() => setSelected(null)} onXP={onXP} />;

  const reports = view === 'active'
    ? REPORTS.filter(r => r.status !== 'resolved')
    : REPORTS.filter(r => r.status === 'resolved');

  return (
    <div className="fu" style={{ paddingBottom: 80 }}>
      <div style={{
        background: `linear-gradient(135deg,${T.green},${T.greenMid})`,
        padding: '18px 14px 22px', borderRadius: '0 0 22px 22px', marginBottom: 14,
      }}>
        <h1 style={{ fontFamily:"'Outfit',sans-serif", fontSize: 19, fontWeight: 800, color: '#fff' }}>Rescue Feed 🗺️</h1>
        <p style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.75)', marginTop: 3 }}>Active reports near you</p>
        <div style={{ display: 'flex', gap: 9, marginTop: 14 }}>
          <button onClick={() => setLostTab(true)} style={{
            background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: 10, padding: '7px 13px', color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer',
          }}>🔍 Lost &amp; Found</button>
          <button style={{
            background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: 10, padding: '7px 13px', color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer',
          }}>📅 Feeder Log</button>
        </div>
      </div>

      <div style={{ padding: '0 14px' }}>
        {/* Tab toggle */}
        <div style={{ display: 'flex', background: T.bgCard2, borderRadius: 11, padding: 4, marginBottom: 14 }}>
          {['active', 'resolved'].map(v => (
            <button key={v} onClick={() => setView(v)} style={{
              flex: 1, padding: '7px', borderRadius: 8,
              background: view === v ? T.bgCard : 'transparent',
              border: 'none', fontWeight: 600, fontSize: 12,
              color: view === v ? T.text : T.textSoft, cursor: 'pointer', transition: 'all .15s',
            }}>
              {v === 'active'
                ? `🚨 Active (${REPORTS.filter(r => r.status !== 'resolved').length})`
                : '✅ Resolved'}
            </button>
          ))}
        </div>

        {reports.map(r => {
          const sv = sev(r.severity);
          const st = status(r.status);
          return (
            <Card key={r.id} onClick={() => setSelected(r.id)} style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', gap: 11 }}>
                <div style={{
                  width: 50, height: 50, borderRadius: 13, background: sv.bg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0,
                }}>{r.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 3 }}>
                    <p style={{ fontWeight: 700, fontSize: 13.5, color: T.text }}>{r.animal} in distress</p>
                    <Pill color={sv.color} bg={sv.bg}>{sv.label}</Pill>
                  </div>
                  <p style={{ fontSize: 11, color: T.textSoft }}>📍 {r.addr} · {r.time}</p>
                  <p style={{ fontSize: 12, color: T.textMid, marginTop: 4, lineHeight: 1.4 }}>{r.desc.slice(0, 65)}...</p>
                  <div style={{ display: 'flex', gap: 8, marginTop: 7, alignItems: 'center', flexWrap: 'wrap' }}>
                    <Pill color={st.color} bg={st.bg}>{st.label}</Pill>
                    <span style={{ fontSize: 11, color: T.textSoft }}>👥{r.resp}</span>
                    <span style={{ fontSize: 11, color: T.textSoft }}>❤️{r.up}</span>
                    {r.wishlist.some(w => !w.claimed) && <Pill color={T.gold} bg={T.goldLt}>🎒 Needs items</Pill>}
                    <span style={{ marginLeft: 'auto', fontSize: 11, color: T.green, fontWeight: 600 }}>Open →</span>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}