import { useState } from "react";

import { T } from "../../Styles/Theme";

import Button from "../../Components/Common/Button";
import Card from "../../Components/Common/Card";
import Pill from "../../Components/Common/Pill";

import { sev } from "../../Utils/Severity";
import { status } from "../../Utils/Status";

// ── Thread view ───────────────────────────────────────────────────────────────
export default function ReportDetail({ report, onBack, onXP }) {
  const [wTab, setWTab] = useState(false);
  const [raised, setRaised] = useState(false);
  const [raising, setRaising] = useState(false);
  const [claimed, setClaimed] = useState({});
  const sv = sev(report.severity);
  const st = status(report.status);

  const doRaise = () => {
    setRaising(true);
    setTimeout(() => {
      setRaising(false);
      setRaised(true);
      onXP(150);
    }, 1200);
  };

  return (
    <div className="fu" style={{ paddingBottom: 80 }}>
      {/* Header */}
      <div
        style={{
          background: `linear-gradient(135deg,${sv.color},${sv.color}BB)`,
          padding: "14px 14px 20px",
          borderRadius: "0 0 22px 22px",
          marginBottom: 14,
        }}
      >
        <button
          onClick={onBack}
          style={{
            background: "rgba(255,255,255,0.2)",
            border: "none",
            borderRadius: 8,
            padding: "5px 10px",
            color: "#fff",
            cursor: "pointer",
            fontSize: 13,
            marginBottom: 10,
          }}
        >
          ← Back
        </button>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <span style={{ fontSize: 32 }}>{report.icon}</span>
          <div>
            <p
              style={{
                fontFamily: "'Outfit',sans-serif",
                fontSize: 17,
                fontWeight: 800,
                color: "#fff",
              }}
            >
              {report.animal} in distress
            </p>
            <p style={{ fontSize: 11.5, color: "rgba(255,255,255,0.75)" }}>
              📍 {report.loc} · {report.time}
            </p>
          </div>
        </div>
      </div>

      <div style={{ padding: "0 14px" }}>
        <div style={{ display: "flex", gap: 7, marginBottom: 12 }}>
          <Pill color={sv.color} bg={sv.bg}>
            {sv.label}
          </Pill>
          <Pill color={st.color} bg={st.bg}>
            {st.label}
          </Pill>
          <Pill color={T.textSoft} bg={T.bgCard2}>
            👥 {report.resp}
          </Pill>
        </div>
        <p
          style={{
            fontSize: 13,
            color: T.textMid,
            lineHeight: 1.6,
            marginBottom: 14,
          }}
        >
          {report.desc}
        </p>

        {/* Sub-tabs */}
        <div
          style={{
            display: "flex",
            background: T.bgCard2,
            borderRadius: 11,
            padding: 4,
            marginBottom: 14,
          }}
        >
          {["Timeline", "Wishlist 🎒"].map((t, i) => (
            <button
              key={t}
              onClick={() => setWTab(i === 1)}
              style={{
                flex: 1,
                padding: "7px",
                borderRadius: 8,
                background: wTab === (i === 1) ? T.bgCard : "transparent",
                border: "none",
                fontWeight: 600,
                fontSize: 12,
                color: wTab === (i === 1) ? T.text : T.textSoft,
                cursor: "pointer",
                transition: "all .15s",
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Timeline */}
        {!wTab && (
          <div>
            <p
              style={{
                fontWeight: 700,
                fontSize: 13,
                color: T.text,
                marginBottom: 11,
              }}
            >
              🔄 Rescue Thread
            </p>
            {report.thread.map((t, i) => (
              <div
                key={i}
                className="si"
                style={{
                  display: "flex",
                  gap: 9,
                  animationDelay: `${i * 0.07}s`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 15,
                      background: T.greenLt,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 13,
                      flexShrink: 0,
                      fontWeight: 700,
                      color: T.green,
                    }}
                  >
                    {t.who[0]}
                  </div>
                  {i < report.thread.length - 1 && (
                    <div
                      style={{
                        width: 2,
                        flex: 1,
                        background: T.borderLt,
                        margin: "3px 0",
                      }}
                    />
                  )}
                </div>
                <div style={{ flex: 1, paddingBottom: 10 }}>
                  <div
                    style={{
                      display: "flex",
                      gap: 7,
                      alignItems: "center",
                      marginBottom: 3,
                    }}
                  >
                    <p style={{ fontWeight: 700, fontSize: 12, color: T.text }}>
                      {t.who}
                    </p>
                    <Pill
                      color={T.green}
                      bg={T.greenLt}
                      style={{ fontSize: 8.5 }}
                    >
                      {t.role}
                    </Pill>
                    <p
                      style={{
                        fontSize: 10.5,
                        color: T.textSoft,
                        marginLeft: "auto",
                      }}
                    >
                      {t.time}
                    </p>
                  </div>
                  <div
                    style={{
                      background: T.bgCard2,
                      borderRadius: 9,
                      borderTopLeftRadius: 3,
                      padding: "9px 11px",
                      fontSize: 12.5,
                      color: T.textMid,
                      lineHeight: 1.5,
                    }}
                  >
                    {t.msg}
                  </div>
                </div>
              </div>
            ))}
            {report.status === "open" && (
              <div
                style={{
                  background: T.bgCard2,
                  borderRadius: 12,
                  padding: "10px 12px",
                  display: "flex",
                  gap: 9,
                  alignItems: "center",
                }}
              >
                <input
                  placeholder="Add an update..."
                  style={{
                    flex: 1,
                    background: "none",
                    border: "none",
                    fontSize: 12.5,
                    color: T.text,
                    outline: "none",
                  }}
                />
                <button
                  style={{
                    background: T.green,
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    padding: "5px 10px",
                    fontSize: 11.5,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Send
                </button>
              </div>
            )}
          </div>
        )}

        {/* Wishlist */}
        {wTab && (
          <div>
            <p
              style={{
                fontWeight: 700,
                fontSize: 13,
                color: T.text,
                marginBottom: 4,
              }}
            >
              Rescue Resource Wishlist
            </p>
            <p style={{ fontSize: 12, color: T.textSoft, marginBottom: 11 }}>
              Claim an item to donate it. +40 XP each.
            </p>
            {report.wishlist.map((w, i) => {
              const key = `${report.id}_${i}`;
              const done = claimed[key] || w.claimed;
              return (
                <div
                  key={i}
                  style={{
                    background: done ? T.greenLt : T.bgCard,
                    border: `1.5px solid ${done ? T.green : T.borderLt}`,
                    borderRadius: 11,
                    padding: "11px 13px",
                    marginBottom: 7,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <p style={{ fontSize: 12.5, fontWeight: 600, color: T.text }}>
                    {w.item}
                  </p>
                  {done ? (
                    <Pill color={T.green} bg={T.greenLt}>
                      Claimed ✓
                    </Pill>
                  ) : (
                    <Button
                      variant="soft"
                      size="sm"
                      onClick={() => {
                        setClaimed((p) => ({ ...p, [key]: true }));
                        onXP(40);
                      }}
                    >
                      Claim +40 XP
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Raise Hand */}
        {report.status !== "resolved" && (
          <div style={{ marginTop: 14 }}>
            {!raised ? (
              <Button
                variant="danger"
                size="lg"
                style={{
                  width: "100%",
                  background: `linear-gradient(120deg,${T.red},${T.amber})`,
                  border: "none",
                }}
                onClick={doRaise}
              >
                <span
                  className={raising ? "rh" : ""}
                  style={{ display: "inline-block", marginRight: 7 }}
                >
                  🖐️
                </span>
                {raising
                  ? "Alerting nearby people..."
                  : "Raise Hand — Get Help Now"}
              </Button>
            ) : (
              <div
                style={{
                  background: T.greenLt,
                  borderRadius: 12,
                  padding: 13,
                  textAlign: "center",
                  border: `1.5px solid ${T.green}40`,
                }}
              >
                <p style={{ fontWeight: 700, color: T.green, fontSize: 13.5 }}>
                  🖐️ Hand Raised! +150 XP
                </p>
                <p style={{ fontSize: 11.5, color: T.textSoft, marginTop: 3 }}>
                  8 people near you have been alerted
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}