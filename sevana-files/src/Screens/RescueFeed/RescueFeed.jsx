import { useState } from "react";
import { T } from "../../Styles/Theme";
import { REPORTS } from "../../Data/Reports";
import { LOST_FOUND } from "../../Data/LostFound";
import Card from "../../Components/Common/Card";
import Pill from "../../Components/Common/Pill";
import Button from "../../Components/Common/Button";
import Divider from "../../Components/Common/Divider";
import { sev } from "../../Utils/Severity";
import { status } from "../../Utils/Status";
import EmptyState from "../../Components/Common/EmptyState";
import LostFoundScreen from "./LostFoundScreen";
import ReportDetail from "./ReportDetail";

// ── Main Feed ─────────────────────────────────────────────────────────────────
export default function RescueFeed({ onXP }) {
  const [view, setView] = useState("active");
  const [selected, setSelected] = useState(null);
  const [lostTab, setLostTab] = useState(false);

  if (lostTab)
    return <LostFoundScreen onBack={() => setLostTab(false)} onXP={onXP} />;
  if (selected)
    return (
      <ReportDetail
        report={REPORTS.find((r) => r.id === selected)}
        onBack={() => setSelected(null)}
        onXP={onXP}
      />
    );

  const reports =
    view === "active"
      ? REPORTS.filter((r) => r.status !== "resolved")
      : REPORTS.filter((r) => r.status === "resolved");

  return (
    <div className="fu" style={{ paddingBottom: 80 }}>
      <div
        style={{
          background: `linear-gradient(135deg,${T.green},${T.greenMid})`,
          padding: "18px 14px 22px",
          borderRadius: "0 0 22px 22px",
          marginBottom: 14,
        }}
      >
        <h1
          style={{
            fontFamily: "'Outfit',sans-serif",
            fontSize: 19,
            fontWeight: 800,
            color: "#fff",
          }}
        >
          Rescue Feed 🗺️
        </h1>
        <p
          style={{
            fontSize: 11.5,
            color: "rgba(255,255,255,0.75)",
            marginTop: 3,
          }}
        >
          Active reports near you
        </p>
        <div style={{ display: "flex", gap: 9, marginTop: 14 }}>
          <button
            onClick={() => setLostTab(true)}
            style={{
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: 10,
              padding: "7px 13px",
              color: "#fff",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            🔍 Lost &amp; Found
          </button>
          <button
            style={{
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: 10,
              padding: "7px 13px",
              color: "#fff",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            📅 Feeder Log
          </button>
        </div>
      </div>

      <div style={{ padding: "0 14px" }}>
        {/* Tab toggle */}
        <div
          style={{
            display: "flex",
            background: T.bgCard2,
            borderRadius: 11,
            padding: 4,
            marginBottom: 14,
          }}
        >
          {["active", "resolved"].map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              style={{
                flex: 1,
                padding: "7px",
                borderRadius: 8,
                background: view === v ? T.bgCard : "transparent",
                border: "none",
                fontWeight: 600,
                fontSize: 12,
                color: view === v ? T.text : T.textSoft,
                cursor: "pointer",
                transition: "all .15s",
              }}
            >
              {v === "active"
                ? `🚨 Active (${REPORTS.filter((r) => r.status !== "resolved").length})`
                : "✅ Resolved"}
            </button>
          ))}
        </div>

        {reports.length === 0 ? (
          <EmptyState
            title={
              view === "active"
                ? "No active rescue reports"
                : "No resolved reports"
            }
            subtitle={
              view === "active"
                ? "New rescue reports will appear here."
                : "Resolved rescues will appear here."
            }
          />
        ) : (
          reports.map((r) => {
            const sv = sev(r.severity);
            const st = status(r.status);
            return (
              <Card
                key={r.id}
                onClick={() => setSelected(r.id)}
                style={{ marginBottom: 10 }}
              >
                <div style={{ display: "flex", gap: 11 }}>
                  <div
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 13,
                      background: sv.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 26,
                      flexShrink: 0,
                    }}
                  >
                    {r.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: 3,
                      }}
                    >
                      <p
                        style={{
                          fontWeight: 700,
                          fontSize: 13.5,
                          color: T.text,
                        }}
                      >
                        {r.animal} in distress
                      </p>
                      <Pill color={sv.color} bg={sv.bg}>
                        {sv.label}
                      </Pill>
                    </div>
                    <p style={{ fontSize: 11, color: T.textSoft }}>
                      📍 {r.addr} · {r.time}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        gap: 6,
                        flexWrap: "wrap",
                        marginTop: 6,
                      }}
                    >
                      <Pill bg={T.bgCard2} color={T.textSoft}>
                        📍 {r.distance}
                      </Pill>

                      <Pill bg={T.greenLt} color={T.green}>
                        🐾 {r.type}
                      </Pill>
                    </div>

                    <p
                      style={{
                        fontSize: 12,
                        color: T.textMid,
                        marginTop: 4,
                        lineHeight: 1.4,
                      }}
                    >
                      {r.desc.slice(0, 65)}...
                    </p>
                    <div
                      style={{
                        display: "flex",
                        gap: 8,
                        marginTop: 7,
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <Pill color={st.color} bg={st.bg}>
                        {st.label}
                      </Pill>
                      <span style={{ fontSize: 11, color: T.textSoft }}>
                        👥{r.resp}
                      </span>
                      <span style={{ fontSize: 11, color: T.textSoft }}>
                        ❤️{r.up}
                      </span>
                      {r.wishlist.some((w) => !w.claimed) && (
                        <Pill color={T.gold} bg={T.goldLt}>
                          🎒 Needs items
                        </Pill>
                      )}
                      <span
                        style={{
                          marginLeft: "auto",
                          fontSize: 11,
                          color: T.green,
                          fontWeight: 600,
                        }}
                      >
                        Open →
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
