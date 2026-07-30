import { useState } from "react";
import { T } from "../../Styles/Theme";
import { LOST_FOUND } from "../../Data/LostFound";

import Card from "../../Components/Common/Card";
import Button from "../../Components/Common/Button";
import Pill from "../../Components/Common/Pill";
import EmptyState from "../../Components/Common/EmptyState";

export default function LostFoundScreen({ onBack, onXP }) {
  const [newPost, setNewPost] = useState(false);
  const [postDone, setPostDone] = useState(false);
  const [lostType, setLostType] = useState("lost");
  const [desc, setDesc] = useState("");

  return (
    <div className="fu" style={{ paddingBottom: 80 }}>
      <div
        style={{
          background: `linear-gradient(135deg,${T.purple},${T.purple}BB)`,
          padding: "16px 14px 22px",
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
        <h1
          style={{
            fontFamily: "'Outfit',sans-serif",
            fontSize: 19,
            fontWeight: 800,
            color: "#fff",
          }}
        >
          Lost & Found 🔍
        </h1>
        <p
          style={{
            fontSize: 11.5,
            color: "rgba(255,255,255,0.75)",
            marginTop: 3,
          }}
        >
          Reuniting animals with their families
        </p>
      </div>

      <div style={{ padding: "0 14px" }}>
        {postDone ? (
          <div style={{ textAlign: "center", padding: "30px 0" }}>
            <span style={{ fontSize: 48 }}>🎉</span>
            <h2
              style={{
                fontFamily: "'Outfit',sans-serif",
                fontSize: 20,
                fontWeight: 800,
                color: T.green,
                marginTop: 10,
              }}
            >
              Listing Posted!
            </h2>
            <p
              style={{
                color: T.gold,
                fontWeight: 700,
                fontSize: 16,
                marginTop: 8,
              }}
            >
              +20 XP earned ✨
            </p>
            <Button
              variant="primary"
              style={{ marginTop: 18 }}
              onClick={() => {
                setPostDone(false);
                setNewPost(false);
                setDesc("");
              }}
            >
              Back to listings
            </Button>
          </div>
        ) : (
          <>
            {!newPost ? (
              <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                <Button
                  variant="primary"
                  size="md"
                  style={{ flex: 1 }}
                  onClick={() => setNewPost(true)}
                >
                  + Lost Animal
                </Button>
                <Button
                  variant="ghost"
                  size="md"
                  style={{ flex: 1 }}
                  onClick={() => setNewPost(true)}
                >
                  + Found Animal
                </Button>
              </div>
            ) : (
              <Card
                style={{
                  marginBottom: 14,
                  border: `1.5px solid ${T.purple}30`,
                }}
              >
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: 13,
                    color: T.text,
                    marginBottom: 10,
                  }}
                >
                  Post a listing
                </p>
                <div style={{ display: "flex", gap: 7, marginBottom: 9 }}>
                  {["lost", "found"].map((t) => (
                    <div
                      key={t}
                      onClick={() => setLostType(t)}
                      style={{
                        flex: 1,
                        padding: "8px",
                        borderRadius: 10,
                        border: `2px solid ${lostType === t ? T.purple : T.borderLt}`,
                        background: lostType === t ? T.purpleLt : T.bgCard,
                        textAlign: "center",
                        cursor: "pointer",
                        fontSize: 12.5,
                        fontWeight: 600,
                        color: lostType === t ? T.purple : T.textMid,
                      }}
                    >
                      {t === "lost" ? "🔍 Lost" : "✅ Found"}
                    </div>
                  ))}
                </div>
                <textarea
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Animal type, breed, colour, area, contact..."
                  style={{
                    width: "100%",
                    border: `1.5px solid ${T.border}`,
                    borderRadius: 10,
                    padding: "10px",
                    fontSize: 12.5,
                    color: T.text,
                    resize: "none",
                    height: 72,
                    outline: "none",
                  }}
                />
                <div style={{ display: "flex", gap: 7, marginTop: 9 }}>
                  <Button
                    variant="ghost"
                    size="sm"
                    style={{ flex: 1 }}
                    onClick={() => setNewPost(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    style={{ flex: 2 }}
                    onClick={() => {
                      setPostDone(true);
                      onXP(20);
                    }}
                  >
                    Post +20 XP
                  </Button>
                </div>
              </Card>
            )}

            {LOST_FOUND.length === 0 ? (
              <EmptyState
                title="No lost & found reports"
                subtitle="Lost or found animal reports will appear here."
              />
            ) : (
              LOST_FOUND.map((l) => (
                <Card key={l.id} style={{ marginBottom: 9 }}>
                  <div style={{ display: "flex", gap: 11 }}>
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 13,
                        background: l.type === "lost" ? T.redLt : T.greenLt,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 26,
                        flexShrink: 0,
                      }}
                    >
                      {l.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: 3,
                        }}
                      >
                        <p
                          style={{
                            fontWeight: 700,
                            fontSize: 13,
                            color: T.text,
                          }}
                        >
                          {l.animal} — {l.breed}
                        </p>
                        <Pill
                          bg={l.type === "lost" ? T.redLt : T.greenLt}
                          color={l.type === "lost" ? T.red : T.green}
                        >
                          {l.type === "lost" ? "Lost" : "Found"}
                        </Pill>
                      </div>
                      <p style={{ fontSize: 11, color: T.textSoft }}>
                        📍 {l.area} · {l.posted}
                      </p>
                      <p
                        style={{
                          fontSize: 12,
                          color: T.textMid,
                          marginTop: 4,
                          lineHeight: 1.4,
                        }}
                      >
                        {l.desc}
                      </p>
                      <p
                        style={{
                          fontSize: 12,
                          color: T.blue,
                          marginTop: 5,
                          fontWeight: 600,
                        }}
                      >
                        📞 {l.contact}
                      </p>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
}