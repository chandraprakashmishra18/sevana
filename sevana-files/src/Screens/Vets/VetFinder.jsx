import { useState } from 'react';
import { T } from '../../Styles/Theme';
import { VETS, HELPLINES } from '../../Data/Vets';
import Card from '../../Components/Common/Card';
import Pill from '../../Components/Common/Pill';
import Button from '../../Components/Common/Button';
import Divider from '../../Components/Common/Divider';

export default function VetFinder() {
  const [selected,  setSelected]  = useState(null);
  const [onlyOpen,  setOnlyOpen]  = useState(false);
  const [calling,   setCalling]   = useState(null);
  const [search,    setSearch]    = useState('');

  const handleCall = (id) => {
    setCalling(id);
    setTimeout(() => setCalling(null), 2200);
  };

  const list = VETS.filter(v => {
    const matchOpen   = onlyOpen ? v.open : true;
    const matchSearch = search.trim() === '' || v.name.toLowerCase().includes(search.toLowerCase()) || v.spec.toLowerCase().includes(search.toLowerCase());
    return matchOpen && matchSearch;
  });

  return (
    <div className="fu" style={{ paddingBottom: 80 }}>
      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg,${T.blue},${T.blue}BB)`,
        padding: '18px 14px 24px', borderRadius: '0 0 22px 22px', marginBottom: 14,
      }}>
        <h1 style={{ fontFamily:"'Outfit',sans-serif", fontSize: 19, fontWeight: 800, color: '#fff' }}>
          Vet &amp; Animal Services 🏥
        </h1>
        <p style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.75)', marginTop: 3 }}>Verified clinics near you</p>
        <div style={{
          background: 'rgba(255,255,255,0.15)', borderRadius: 11, padding: '9px 13px',
          marginTop: 13, display: 'flex', gap: 7,
        }}>
          <span style={{ fontSize: 15, color: 'rgba(255,255,255,0.8)' }}>🔍</span>
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search clinics or specialty..."
            style={{ flex: 1, background: 'none', border: 'none', color: '#fff', fontSize: 12.5, outline: 'none' }}
          />
        </div>
      </div>

      <div style={{ padding: '0 14px' }}>
        {/* Filters */}
        <div style={{ display: 'flex', gap: 7, marginBottom: 14, flexWrap: 'wrap' }}>
          {['All', 'Open Now', 'Emergency', 'Verified'].map(f => (
            <button key={f} onClick={() => { if (f === 'Open Now') setOnlyOpen(p => !p); }} style={{
              padding: '5px 11px', borderRadius: 20,
              border: `1.5px solid ${f === 'Open Now' && onlyOpen ? T.green : T.border}`,
              background: f === 'Open Now' && onlyOpen ? T.greenLt : T.bgCard,
              fontSize: 11, color: f === 'Open Now' && onlyOpen ? T.green : T.textMid,
              cursor: 'pointer', fontWeight: 500, whiteSpace: 'nowrap',
            }}>{f}</button>
          ))}
        </div>

        {/* Ambulance CTA */}
        <div style={{
          background: `linear-gradient(120deg,${T.redLt},${T.amberLt})`,
          borderRadius: 14, padding: '12px 14px', marginBottom: 14,
          border: `1.5px solid ${T.red}30`, display: 'flex', gap: 12, alignItems: 'center',
        }}>
          <span style={{ fontSize: 32 }}>🚑</span>
          <div style={{ flex: 1 }}>
            <p style={{ fontWeight: 800, fontFamily:"'Outfit',sans-serif", fontSize: 14, color: T.red }}>Animal Ambulance</p>
            <p style={{ fontSize: 11.5, color: T.textSoft, marginTop: 2 }}>24×7 emergency · Avg arrival 12 min</p>
          </div>
          <Button variant="danger" size="sm">Call Now</Button>
        </div>

        {/* Vet list */}
        {list.length === 0 && (
          <div style={{ textAlign: 'center', padding: '30px 0', color: T.textSoft, fontSize: 13 }}>
            No results found 🔍
          </div>
        )}
        {list.map(v => (
          <Card key={v.id} style={{ marginBottom: 9 }} onClick={() => setSelected(selected === v.id ? null : v.id)}>
            <div style={{ display: 'flex', gap: 11 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 11,
                background: v.open ? T.greenLt : T.bgCard2,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0,
              }}>🏥</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 13, color: T.text }}>
                      {v.name} {v.verified && <span style={{ color: T.green }}>✓</span>}
                    </p>
                    <p style={{ fontSize: 11, color: T.textSoft, marginTop: 1 }}>📍 {v.dist} · ⭐ {v.rating}</p>
                    <p style={{ fontSize: 11, color: T.textMid, marginTop: 1 }}>{v.spec}</p>
                  </div>
                  <Pill color={v.open ? T.green : T.textSoft} bg={v.open ? T.greenLt : T.bgCard2}>
                    {v.open ? 'Open' : 'Closed'}
                  </Pill>
                </div>

                {selected === v.id && (
                  <div className="fu" style={{ marginTop: 11 }}>
                    <div style={{ height: 1, background: T.borderLt, margin: '8px 0' }} />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7, marginBottom: 10 }}>
                      <div style={{ background: T.bgCard2, borderRadius: 9, padding: '8px 10px' }}>
                        <p style={{ fontSize: 9.5, color: T.textSoft, fontWeight: 600 }}>WAIT TIME</p>
                        <p style={{ fontSize: 13, fontWeight: 700, color: T.text, marginTop: 2 }}>{v.wait}</p>
                      </div>
                      <div style={{ background: T.bgCard2, borderRadius: 9, padding: '8px 10px' }}>
                        <p style={{ fontSize: 9.5, color: T.textSoft, fontWeight: 600 }}>PHONE</p>
                        <p style={{ fontSize: 12.5, fontWeight: 700, color: T.blue, marginTop: 2 }}>{v.phone}</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 7 }}>
                      <Button variant="primary" size="sm" style={{ flex: 1 }} onClick={() => handleCall(v.id)}>
                        {calling === v.id ? '📞 Calling...' : '📞 Call'}
                      </Button>
                      <Button variant="ghost" size="sm" style={{ flex: 1 }}>🗺️ Navigate</Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}

        <Divider />

        {/* Helplines */}
        <p style={{ fontFamily:"'Outfit',sans-serif", fontSize: 15, fontWeight: 700, color: T.text, marginBottom: 10 }}>
          Emergency Helplines
        </p>
        {HELPLINES.map(h => (
          <Card key={h.name} style={{ marginBottom: 7, padding: '11px 13px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
              <span style={{ fontSize: 20 }}>{h.icon}</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 600, fontSize: 12.5, color: T.text }}>{h.name}</p>
                <p style={{ fontSize: 12, color: T.blue, fontWeight: 600 }}>{h.num}</p>
              </div>
              <Button variant="soft" size="sm">Call</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}