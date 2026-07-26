import { useEffect, useState } from "react";
import { T } from "../../Styles/Theme";
import { FEEDERS } from "../../Data/Feeders";
import Card from "../../Components/Common/Card";
import Pill from "../../Components/Common/Pill";
import Button from "../../Components/Common/Button";
import Divider from "../../Components/Common/Divider";
import { sev } from "../../Utils/Severity";
import { getReports, getMyStats } from "../../api/animalApi";
import { getCurrentLocation } from "../../Utils/location";

export default function HomeScreen({ onNav, onXP, userData, xp }) {
  const [dismissed, setDismissed] = useState(false);

  const [reports, setReports] = useState([]);
  const [stats, setStats] = useState({
    active: 0,
    vetsNearby: 0,
    myRescues: 0,
  });

  const [loadingReports, setLoadingReports] = useState(true);

  useEffect(() => {
    async function loadReports() {
      try {
        setLoadingReports(true);

        const gps = await getCurrentLocation();

        const data = await getReports({
          lat: gps.lat,
          lng: gps.lng,
        });

        setReports(data.reports || []);

        const statsData = await getMyStats(gps.lat, gps.lng);
        setStats(statsData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingReports(false);
      }
    }

    loadReports();
  }, []);

  return (
    <div className="fu" style={{ paddingBottom: 80 }}>
      {/* ── Header ── */}
      <div
        style={{
          background: `linear-gradient(135deg,${T.green},${T.greenMid})`,
          padding: "18px 16px 26px",
          borderRadius: "0 0 26px 26px",
          marginBottom: 16,
          boxShadow: "0 8px 32px rgba(10,92,68,0.25)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div>
            <p
              style={{
                color: "rgba(255,255,255,0.65)",
                fontSize: 10.5,
                fontWeight: 700,
                letterSpacing: ".1em",
              }}
            >
              SEVANA
            </p>
            <h1
              style={{
                fontFamily: "'Outfit',sans-serif",
                fontSize: 22,
                fontWeight: 900,
                color: "#fff",
                lineHeight: 1.2,
                marginTop: 2,
              }}
            >
              Animal Rescue
              <br />
              Network 🐾
            </h1>
          </div>
          <div
            style={{
              background: "rgba(255,255,255,0.18)",
              borderRadius: 16,
              padding: "8px 14px",
              textAlign: "right",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.25)",
            }}
          >
            <p
              style={{
                color: "rgba(255,255,255,0.75)",
                fontSize: 9.5,
                fontWeight: 700,
                letterSpacing: ".06em",
              }}
            >
              YOUR XP
            </p>
            <p
              style={{
                color: "#fff",
                fontFamily: "'Outfit',sans-serif",
                fontSize: 20,
                fontWeight: 800,
              }}
            >
              {xp.toLocaleString()}
            </p>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 10 }}>
              Seva Volunteer
            </p>
          </div>
        </div>

        {/* Stats strip */}
        <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
          {[
            { n: stats.active, l: "Active", c: "#FF8A65" },
            { n: stats.vetsNearby, l: "Vets Nearby", c: "#81D4FA" },
            { n: stats.myRescues, l: "My Rescues", c: "#A5D6A7" },
          ].map((s) => (
            <div
              key={s.l}
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.14)",
                borderRadius: 12,
                padding: "10px 6px",
                textAlign: "center",
                border: "1px solid rgba(255,255,255,0.18)",
              }}
            >
              <p
                style={{
                  fontFamily: "'Outfit',sans-serif",
                  fontSize: 22,
                  fontWeight: 900,
                  color: s.c,
                }}
              >
                {s.n}
              </p>
              <p
                style={{
                  fontSize: 9,
                  color: "rgba(255,255,255,0.7)",
                  fontWeight: 700,
                  letterSpacing: ".04em",
                }}
              >
                {s.l.toUpperCase()}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "0 14px" }}>
        {/* ── Heatwave alert ── */}
        {!dismissed && (
          <div
            className="si"
            style={{
              background: `linear-gradient(120deg,${T.amberLt},#FFF8EC)`,
              border: `1.5px solid ${T.amber}40`,
              borderRadius: 13,
              padding: "11px 13px",
              marginBottom: 14,
              position: "relative",
              borderLeft: "4px solid #E8821A",
              boxShadow: "0 3px 14px rgba(232,130,26,0.13)",
            }}
          >
            <button
              onClick={() => setDismissed(true)}
              style={{
                position: "absolute",
                top: 7,
                right: 10,
                background: "none",
                border: "none",
                fontSize: 16,
                color: T.textSoft,
                cursor: "pointer",
              }}
            >
              ×
            </button>
            <div style={{ display: "flex", gap: 9, alignItems: "flex-start" }}>
              <span style={{ fontSize: 20 }}>☀️</span>
              <div>
                <p style={{ fontWeight: 700, fontSize: 12.5, color: T.amber }}>
                  Heatwave Alert — Tomorrow 44°C
                </p>
                <p
                  style={{
                    fontSize: 11.5,
                    color: T.textMid,
                    marginTop: 2,
                    lineHeight: 1.5,
                  }}
                >
                  Place water bowls for strays. Keep animals off hot asphalt.
                </p>
                <Button
                  variant="amber"
                  size="sm"
                  style={{ marginTop: 7 }}
                  onClick={() => onXP(20)}
                >
                  Upload Bowl Photo +20 XP
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ── Quick actions ── */}
        <p
          style={{
            fontFamily: "'Outfit',sans-serif",
            fontSize: 17,
            fontWeight: 800,
            color: T.text,
            marginBottom: 10,
          }}
        >
          Quick Actions
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 9,
            marginBottom: 18,
          }}
        >
          {[
            {
              icon: "📸",
              l: "Report Animal",
              sub: "Photo + GPS",
              c: T.green,
              bg: T.greenLt,
              nav: "report",
            },
            {
              icon: "🖐️",
              l: "Raise Hand",
              sub: "Alert nearby",
              c: T.red,
              bg: T.redLt,
              nav: "feed",
            },
            {
              icon: "🏥",
              l: "Find Vet",
              sub: "Nearest clinic",
              c: T.blue,
              bg: T.blueLt,
              nav: "vets",
            },
            {
              icon: "🔍",
              l: "Lost & Found",
              sub: "Missing animals",
              c: T.purple,
              bg: T.purpleLt,
              nav: "feed",
            },
          ].map((a) => (
            <Card
              key={a.l}
              onClick={() => onNav(a.nav)}
              style={{
                background: a.bg,
                border: `1px solid ${a.c}25`,
                padding: "16px 12px",
                boxShadow: "0 3px 16px rgba(10,30,20,0.08)",
                borderRadius: 18,
              }}
            >
              <span style={{ fontSize: 28 }}>{a.icon}</span>
              <p
                style={{
                  fontWeight: 700,
                  fontSize: 13.5,
                  color: T.text,
                  marginTop: 7,
                }}
              >
                {a.l}
              </p>
              <p style={{ fontSize: 11, color: T.textSoft, marginTop: 1 }}>
                {a.sub}
              </p>
            </Card>
          ))}
        </div>

        {/* ── Active reports ── */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <p
            style={{
              fontFamily: "'Outfit',sans-serif",
              fontSize: 17,
              fontWeight: 800,
              color: T.text,
            }}
          >
            Active Near You
          </p>
          <button
            onClick={() => onNav("feed")}
            style={{
              fontSize: 11.5,
              color: T.green,
              fontWeight: 600,
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            View all →
          </button>
        </div>

        {reports.slice(0, 2).map((r) => {
          const sv = sev(r.severity);

          const borderColor =
            r.severity === "critical"
              ? "#C93B3B"
              : r.severity === "moderate"
                ? "#E8821A"
                : "#1A5FA5";

          const animalIcon =
            {
              dog: "🐕",
              cat: "🐈",
              bird: "🦜",
              cow: "🐄",
              monkey: "🐒",
              other: "🐾",
            }[r.species] || "🐾";

          return (
            <Card
              key={r.id}
              onClick={() => onNav("feed")}
              style={{
                marginBottom: 9,
                borderLeft: `3px solid ${borderColor}`,
                boxShadow: "0 2px 14px rgba(10,30,20,0.09)",
              }}
            >
              <div style={{ display: "flex", gap: 11 }}>
                <div
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 12,
                    background: sv.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                    flexShrink: 0,
                  }}
                >
                  {animalIcon}
                </div>

                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <p
                      style={{
                        fontWeight: 700,
                        fontSize: 13,
                        color: T.text,
                      }}
                    >
                      {r.species} in distress
                    </p>

                    <Pill color={sv.color} bg={sv.bg}>
                      {sv.label}
                    </Pill>
                  </div>

                  <p
                    style={{
                      fontSize: 11,
                      color: T.textSoft,
                      marginTop: 1,
                    }}
                  >
                    📍 {r.address_label || "Unknown location"} ·{" "}
                    {new Date(r.created_at).toLocaleDateString()}
                  </p>

                  <p
                    style={{
                      fontSize: 11.5,
                      color: T.textMid,
                      marginTop: 4,
                      lineHeight: 1.4,
                    }}
                  >
                    {(r.description || "").slice(0, 60)}...
                  </p>

                  <p
                    style={{
                      fontSize: 11,
                      color: T.textSoft,
                      marginTop: 5,
                    }}
                  >
                    👥 {r.responder_count} volunteers responding
                  </p>
                </div>
              </div>
            </Card>
          );
        })}

        <Divider />

        {/* ── Feeder network ── */}
        <p
          style={{
            fontFamily: "'Outfit',sans-serif",
            fontSize: 17,
            fontWeight: 800,
            color: T.text,
            marginBottom: 10,
          }}
        >
          Community Feeders 🥣
        </p>
        <div
          style={{
            display: "flex",
            gap: 9,
            overflowX: "auto",
            paddingBottom: 4,
          }}
        >
          {FEEDERS.map((f) => (
            <div
              key={f.id}
              style={{
                flexShrink: 0,
                background: f.today ? T.greenLt : T.bgCard2,
                border: `1px solid ${f.today ? T.green + "30" : T.border}`,
                borderRadius: 16,
                padding: "11px 13px",
                minWidth: 130,
                textAlign: "center",
                boxShadow: "0 2px 12px rgba(10,30,20,0.07)",
                transition: "box-shadow .18s ease, transform .15s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 4px 18px rgba(10,30,20,0.14)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 2px 12px rgba(10,30,20,0.07)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <span style={{ fontSize: 26 }}>{f.icon}</span>
              <p
                style={{
                  fontWeight: 600,
                  fontSize: 12,
                  color: T.text,
                  marginTop: 4,
                }}
              >
                {f.name.split(" ")[0]}
              </p>
              <p style={{ fontSize: 10.5, color: T.textSoft }}>
                {f.area.split(",")[0]}
              </p>
              <p
                style={{
                  fontSize: 11,
                  color: f.today ? T.green : T.red,
                  fontWeight: 600,
                  marginTop: 5,
                }}
              >
                {f.today ? "✓ Fed today" : "⚠ Not yet"}
              </p>
              <p
                style={{
                  fontSize: 10,
                  color: T.gold,
                  fontWeight: 600,
                  marginTop: 2,
                }}
              >
                🔥 {f.streak}d
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
