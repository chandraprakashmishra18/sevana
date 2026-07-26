import { useState, useRef } from "react";
import { T } from "../../Styles/Theme";
import Button from "../../Components/Common/Button";
import Card from "../../Components/Common/Card";

import { uploadPhoto, createReport } from "../../api/animalApi";

import { getCurrentLocation } from "../../Utils/location";

const ANIMALS = [
  { id: "dog", l: "Dog", i: "🐕" },
  { id: "cat", l: "Cat", i: "🐈" },
  { id: "bird", l: "Bird", i: "🦜" },
  { id: "cow", l: "Cow", i: "🐄" },
  { id: "monkey", l: "Monkey", i: "🐒" },
  { id: "other", l: "Other", i: "🐾" },
];

const SEVS = [
  {
    id: "critical",
    l: "Critical",
    sub: "Life threatening",
    c: "#C93B3B",
    bg: T.redLt,
    i: "🚨",
  },
  {
    id: "moderate",
    l: "Moderate",
    sub: "Needs treatment",
    c: "#E8821A",
    bg: T.amberLt,
    i: "🩹",
  },
  {
    id: "low",
    l: "Low",
    sub: "Scared / trapped",
    c: "#1A5FA5",
    bg: T.blueLt,
    i: "😰",
  },
];

const BEHS = [
  { id: "calm", l: "Calm", i: "😊" },
  { id: "scared", l: "Scared", i: "😨" },
  { id: "aggressive", l: "Aggressive", i: "⚠️" },
];

const STEPS = ["Photo", "Animal", "Location", "Submit"];

export default function ReportScreen() {
  const fileInputRef = useRef(null);

  const [step, setStep] = useState(0);

  const [photo, setPhoto] = useState(null);

  const [photoFile, setPhotoFile] = useState(null);

  const [animal, setAnimal] = useState("");

  const [severity, setSeverity] = useState("");

  const [behavior, setBehavior] = useState("");

  const [desc, setDesc] = useState("");

  const [done, setDone] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [reportId, setReportId] = useState("");

  const [xpAwarded, setXpAwarded] = useState(0);
  const [location, setLocation] = useState(null);

  const reset = () => {
    setStep(0);

    if (photo) {
      URL.revokeObjectURL(photo);
    }

    setPhoto(null);

    setPhotoFile(null);

    setAnimal("");

    setSeverity("");

    setBehavior("");

    setDesc("");

    setDone(false);

    setLoading(false);

    setError("");

    setReportId("");

    setXpAwarded(0);

    // Clear previous GPS location
    setLocation(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const openCamera = async () => {
    try {
      if (!location) {
        const gps = await getCurrentLocation();
        setLocation(gps);
      }
    } catch (e) {
      console.error(e);
    }

    fileInputRef.current?.click();
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Image should be less than 10 MB.");
      return;
    }

    setError("");

    setPhotoFile(file);

    setPhoto(URL.createObjectURL(file));
  };

  const submit = async () => {
    if (loading) return;

    try {
      setLoading(true);

      setError("");

      if (!photoFile) {
        throw new Error("Please select a photo.");
      }

      if (!animal || !severity || !behavior) {
        throw new Error("Please complete all required fields.");
      }

      const upload = await uploadPhoto(photoFile);

      const gps = location || (await getCurrentLocation());

      const payload = {
        species: animal,

        severity,

        behavior,

        description: desc,

        photo_url: upload.url,

        lat: gps.lat,

        lng: gps.lng,

        address_label: "Current Location",
      };

      const res = await createReport(payload);

      setReportId(res.report?.id || "");

      setXpAwarded(res.xpAwarded ?? 0);

      setDone(true);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          err.message ||
          "Unable to submit report.",
      );
    } finally {
      setLoading(false);
    }
  };
  if (done)
    return (
      <div
        className="fu"
        style={{
          padding: "36px 16px 80px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 64,
            marginBottom: 12,
          }}
        >
          ✅
        </div>

        <h2
          style={{
            fontFamily: "'Outfit',sans-serif",
            fontSize: 24,
            fontWeight: 900,
            color: T.green,
          }}
        >
          Report Submitted Successfully!
        </h2>

        <p
          style={{
            fontSize: 13,
            color: T.textMid,
            marginTop: 10,
            lineHeight: 1.6,
          }}
        >
          Your report has been sent to nearby volunteers.
        </p>

        <Card
          style={{
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 12,
            }}
          >
            <strong>Report ID</strong>

            <span>{reportId || "Pending"}</span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <strong>XP Earned</strong>

            <span
              style={{
                color: T.green,
                fontWeight: 700,
              }}
            >
              +{xpAwarded}
            </span>
          </div>
        </Card>

        <div
          style={{
            background: T.greenLt,
            borderRadius: 14,
            padding: 16,
            marginBottom: 18,
          }}
        >
          <div
            style={{
              fontWeight: 700,
              color: T.green,
              marginBottom: 8,
            }}
          >
            Nearby volunteers have been notified.
          </div>

          <div
            style={{
              fontSize: 12,
              color: T.textSoft,
            }}
          >
            You can monitor this report from the Rescue Feed.
          </div>
        </div>

        <Button
          variant="primary"
          size="lg"
          style={{
            width: "100%",
          }}
          onClick={reset}
        >
          Report Another Animal
        </Button>
      </div>
    );
  return (
    <div className="fu" style={{ paddingBottom: 80 }}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        style={{ display: "none" }}
        onChange={handlePhotoChange}
      />
      {/* Header */}
      <div
        style={{
          background: `linear-gradient(135deg,${T.red},${T.amber})`,
          padding: "16px 16px 22px",
          borderRadius: "0 0 22px 22px",
          marginBottom: 18,
          boxShadow: "0 6px 24px rgba(201,59,59,0.3)",
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
          Report Animal in Distress
        </h1>
        <p
          style={{
            color: "rgba(255,255,255,0.75)",
            fontSize: 11.5,
            marginTop: 3,
          }}
        >
          Complete in under 90 seconds
        </p>
        <div style={{ display: "flex", gap: 5, marginTop: 14 }}>
          {STEPS.map((s, i) => (
            <div key={s} style={{ flex: 1 }}>
              <div
                style={{
                  height: 5,
                  borderRadius: 3,
                  background: i <= step ? "#fff" : "rgba(255,255,255,0.3)",
                  transition: "background .3s",
                }}
              />
              <p
                style={{
                  fontSize: 9,
                  color: i <= step ? "#fff" : "rgba(255,255,255,0.45)",
                  fontWeight: i === step ? 700 : 400,
                  letterSpacing: ".08em",
                  marginTop: 3,
                }}
              >
                {s.toUpperCase()}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "0 14px" }}>
        {/* ── Step 0: Photo ── */}
        {step === 0 && (
          <div className="fu">
            <p
              style={{
                fontFamily: "'Outfit',sans-serif",
                fontSize: 16,
                fontWeight: 700,
                color: T.text,
                marginBottom: 12,
              }}
            >
              Capture the Animal
            </p>
            {!photo ? (
              <div>
                <div
                  onClick={openCamera}
                  style={{
                    background: T.bgCard2,
                    borderRadius: 18,
                    border: `2px dashed ${T.border}`,
                    height: 200,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all .2s",
                    marginBottom: 10,
                    boxShadow: "inset 0 2px 8px rgba(10,30,20,0.05)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = T.green;
                    e.currentTarget.style.background = T.greenLt;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = T.border;
                    e.currentTarget.style.background = T.bgCard2;
                  }}
                >
                  <span style={{ fontSize: 44 }}>📷</span>
                  <p
                    style={{
                      fontWeight: 600,
                      color: T.text,
                      marginTop: 10,
                      fontSize: 14,
                    }}
                  >
                    Tap to take photo
                  </p>
                  <p
                    style={{ fontSize: 11.5, color: T.textSoft, marginTop: 3 }}
                  >
                    Single tap to capture
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="md"
                  style={{ width: "100%" }}
                  onClick={openCamera}
                >
                  Upload from Gallery
                </Button>
              </div>
            ) : (
              <div>
                <div
                  style={{
                    background: T.greenLt,
                    borderRadius: 18,
                    height: 200,
                    position: "relative",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    border: `2px solid ${T.green}50`,
                    boxShadow: `0 0 0 3px ${T.green}18`,
                    marginBottom: 10,
                  }}
                >
                  <span style={{ fontSize: 52 }}>🐾</span>
                  <img
                    src={photo}
                    alt="Animal"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: 18,
                      position: "absolute",
                      inset: 0,
                    }}
                  />

                  <div
                    style={{
                      position: "absolute",
                      bottom: 10,
                      left: 10,
                      background: "rgba(0,0,0,.6)",
                      color: "#fff",
                      padding: "4px 10px",
                      borderRadius: 8,
                      fontSize: 11,
                    }}
                  >
                    Image Selected ✓
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      bottom: 10,
                      right: 10,
                      background: T.green,
                      borderRadius: 8,
                      padding: "3px 9px",
                      color: "#fff",
                      fontSize: 10.5,
                      fontWeight: 600,
                    }}
                  >
                    📍 GPS locked
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <Button
                    variant="ghost"
                    size="sm"
                    style={{ flex: 1 }}
                    onClick={() => {
                      // Free the preview image from memory
                      if (photo) {
                        URL.revokeObjectURL(photo);
                      }

                      // Clear image preview
                      setPhoto(null);

                      // Clear selected file
                      setPhotoFile(null);

                      // Reset the hidden file input so the same image can be selected again
                      if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                      }

                      // Open the camera/gallery again
                      openCamera();
                    }}
                  >
                    Retake
                  </Button>

                  <Button
                    variant="primary"
                    size="sm"
                    style={{ flex: 2 }}
                    onClick={() => setStep(1)}
                  >
                    Use this photo →
                  </Button>
                </div>
              </div>
            )}
            <div
              style={{
                background: T.amberLt,
                borderRadius: 11,
                padding: "9px 12px",
                fontSize: 11.5,
                color: T.amber,
                display: "flex",
                gap: 7,
                marginTop: 10,
              }}
            >
              <span>💡</span>
              <span>
                GPS starts acquiring as soon as you open this screen — ready by
                step 3.
              </span>
            </div>
          </div>
        )}

        {/* ── Step 1: Animal + severity + behavior ── */}
        {step === 1 && (
          <div className="fu">
            <p
              style={{
                fontFamily: "'Outfit',sans-serif",
                fontSize: 16,
                fontWeight: 700,
                color: T.text,
                marginBottom: 10,
              }}
            >
              Animal & Condition
            </p>

            <p
              style={{
                fontSize: 12.5,
                fontWeight: 600,
                color: T.text,
                marginBottom: 8,
              }}
            >
              Type of animal
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gap: 7,
                marginBottom: 18,
              }}
            >
              {ANIMALS.map((a) => (
                <div
                  key={a.id}
                  onClick={() => setAnimal(a.id)}
                  style={{
                    background: animal === a.id ? T.greenLt : T.bgCard,
                    border: `2px solid ${animal === a.id ? T.green : T.borderLt}`,
                    borderRadius: 14,
                    padding: "11px 6px",
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "all .15s",
                    boxShadow:
                      animal === a.id ? `0 0 0 3px ${T.green}20` : "none",
                  }}
                >
                  <span style={{ fontSize: 24 }}>{a.i}</span>
                  <p
                    style={{
                      fontSize: 10.5,
                      fontWeight: 600,
                      color: animal === a.id ? T.green : T.textMid,
                      marginTop: 4,
                    }}
                  >
                    {a.l}
                  </p>
                </div>
              ))}
            </div>

            <p
              style={{
                fontSize: 12.5,
                fontWeight: 600,
                color: T.text,
                marginBottom: 8,
              }}
            >
              How serious?
            </p>
            {SEVS.map((s) => (
              <div
                key={s.id}
                onClick={() => setSeverity(s.id)}
                style={{
                  background: severity === s.id ? s.bg : T.bgCard,
                  border: `2px solid ${severity === s.id ? s.c : T.borderLt}`,
                  borderLeft: `3px solid ${s.c}`,
                  borderRadius: 14,
                  padding: "12px 13px",
                  marginBottom: 7,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 11,
                  transition: "all .15s",
                  boxShadow: severity === s.id ? `0 3px 14px ${s.c}22` : "none",
                }}
              >
                <span style={{ fontSize: 22 }}>{s.i}</span>
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontWeight: 700,
                      fontSize: 13,
                      color: severity === s.id ? s.c : T.text,
                    }}
                  >
                    {s.l}
                  </p>
                  <p style={{ fontSize: 11, color: T.textSoft }}>{s.sub}</p>
                </div>
                {severity === s.id && (
                  <span style={{ color: s.c, fontSize: 16 }}>✓</span>
                )}
              </div>
            ))}

            <p
              style={{
                fontSize: 12.5,
                fontWeight: 600,
                color: T.text,
                margin: "14px 0 8px",
              }}
            >
              Animal behaviour
            </p>
            <div style={{ display: "flex", gap: 7 }}>
              {BEHS.map((b) => (
                <div
                  key={b.id}
                  onClick={() => setBehavior(b.id)}
                  style={{
                    flex: 1,
                    background: behavior === b.id ? T.greenLt : T.bgCard,
                    border: `2px solid ${behavior === b.id ? T.green : T.borderLt}`,
                    borderRadius: 11,
                    padding: "10px 5px",
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "all .15s",
                  }}
                >
                  <span style={{ fontSize: 20 }}>{b.i}</span>
                  <p
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      color: behavior === b.id ? T.green : T.textMid,
                      marginTop: 4,
                    }}
                  >
                    {b.l}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 8, marginTop: 18 }}>
              <Button
                variant="ghost"
                size="md"
                style={{ flex: 1 }}
                onClick={() => setStep(0)}
              >
                ← Back
              </Button>
              <Button
                variant="primary"
                size="md"
                style={{ flex: 2 }}
                onClick={() => {
                  if (animal && severity && behavior) setStep(2);
                }}
                disabled={!animal || !severity || !behavior}
              >
                Next →
              </Button>
            </div>
          </div>
        )}

        {/* ── Step 2: Location ── */}
        {step === 2 && (
          <div className="fu">
            <p
              style={{
                fontFamily: "'Outfit',sans-serif",
                fontSize: 16,
                fontWeight: 700,
                color: T.text,
                marginBottom: 12,
              }}
            >
              Location & Details
            </p>
            <div
              style={{
                background: `linear-gradient(145deg,${T.greenLt},#E8F5F0)`,
                borderRadius: 14,
                height: 150,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 12,
                border: `1px solid ${T.green}20`,
                position: "relative",
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  background: T.red,
                  animation: "pulse 1.5s infinite",
                }}
              />
              <p
                style={{
                  fontSize: 12.5,
                  fontWeight: 600,
                  color: T.green,
                  marginTop: 10,
                }}
              >
                {location
                  ? `📍 ${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}`
                  : "Fetching GPS..."}
              </p>
              <p style={{ fontSize: 11, color: T.textSoft, marginTop: 3 }}>
                Live GPS Location
              </p>
              <div
                style={{
                  position: "absolute",
                  top: 8,
                  right: 10,
                  background: "#fff",
                  borderRadius: 7,
                  padding: "3px 8px",
                  fontSize: 10.5,
                  fontWeight: 600,
                  color: T.green,
                  border: `1px solid ${T.green}30`,
                }}
              >
                {location ? "GPS ✓" : "..."}
              </div>
            </div>
            <p
              style={{
                fontSize: 12.5,
                fontWeight: 600,
                color: T.text,
                marginBottom: 7,
              }}
            >
              Add details{" "}
              <span style={{ fontWeight: 400, color: T.textSoft }}>
                (optional)
              </span>
            </p>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder='"Near the red gate, under white Maruti..."'
              style={{
                width: "100%",
                border: `1.5px solid ${T.border}`,
                borderRadius: 11,
                padding: "11px 13px",
                fontSize: 12.5,
                color: T.text,
                background: T.bgCard,
                resize: "none",
                height: 88,
                outline: "none",
                lineHeight: 1.5,
              }}
            />
            <div
              style={{
                background: T.blueLt,
                borderRadius: 11,
                padding: "9px 12px",
                fontSize: 11.5,
                color: T.blue,
                display: "flex",
                gap: 7,
                margin: "10px 0",
              }}
            >
              <span>ℹ️</span>
              <span>
                Description is optional. Photo + severity + location is enough
                for dispatch.
              </span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <Button
                variant="ghost"
                size="md"
                style={{ flex: 1 }}
                onClick={() => setStep(1)}
              >
                ← Back
              </Button>
              <Button
                variant="primary"
                size="md"
                style={{ flex: 2 }}
                onClick={() => setStep(3)}
              >
                Review →
              </Button>
            </div>
          </div>
        )}

        {/* ── Step 3: Review ── */}
        {step === 3 && (
          <div className="fu">
            <p
              style={{
                fontFamily: "'Outfit',sans-serif",
                fontSize: 16,
                fontWeight: 700,
                color: T.text,
                marginBottom: 12,
              }}
            >
              Review & Submit
            </p>
            <Card style={{ marginBottom: 14 }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 8,
                }}
              >
                {[
                  ["Photo", photo ? "✓ Captured" : "✗ Missing", !!photo],
                  [
                    "Animal",
                    ANIMALS.find((a) => a.id === animal)?.l || "—",
                    !!animal,
                  ],
                  [
                    "Severity",
                    SEVS.find((s) => s.id === severity)?.l || "—",
                    !!severity,
                  ],
                  [
                    "Behaviour",
                    BEHS.find((b) => b.id === behavior)?.l || "—",
                    !!behavior,
                  ],
                  [
                    "Location",
                    location
                      ? `${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}`
                      : "Unavailable",
                    !!location,
                  ],
                  [
                    "Note",
                    desc ? desc.slice(0, 18) + "..." : "Not added",
                    true,
                  ],
                ].map(([k, v, ok]) => (
                  <div
                    key={k}
                    style={{
                      background: T.bgCard2,
                      borderRadius: 9,
                      padding: "9px 10px",
                    }}
                  >
                    <p
                      style={{
                        fontSize: 9.5,
                        color: T.textSoft,
                        fontWeight: 600,
                        letterSpacing: ".04em",
                      }}
                    >
                      {k.toUpperCase()}
                    </p>
                    <p
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: ok ? T.text : T.red,
                        marginTop: 2,
                      }}
                    >
                      {v}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
            <div
              style={{
                background: T.goldLt,
                borderRadius: 12,
                padding: "12px 13px",
                display: "flex",
                alignItems: "center",
                gap: 9,
                marginBottom: 14,
                border: `1px solid ${T.gold}40`,
              }}
            >
              <span style={{ fontSize: 22 }}>✨</span>
              <div>
                <p style={{ fontWeight: 700, fontSize: 13, color: T.gold }}>
                  You'll earn +30 XP
                </p>
                <p style={{ fontSize: 11.5, color: T.textSoft }}>
                  3 volunteers will be alerted nearby
                </p>
              </div>
            </div>
            {error && (
              <div
                style={{
                  background: T.redLt,
                  color: T.red,
                  padding: 12,
                  borderRadius: 10,
                  marginBottom: 12,
                  fontSize: 12,
                }}
              >
                {error}
              </div>
            )}
            <div style={{ display: "flex", gap: 8 }}>
              <Button
                variant="ghost"
                size="md"
                style={{ flex: 1, border: `1.5px solid ${T.borderLt}` }}
                onClick={() => setStep(2)}
              >
                ← Back
              </Button>
              <Button
                variant="danger"
                size="md"
                style={{
                  flex: 2,
                  background: `linear-gradient(120deg,${T.red},${T.amber})`,
                  border: "none",
                  boxShadow: "0 4px 16px rgba(201,59,59,0.3)",
                }}
                disabled={loading}
                onClick={submit}
              >
                {loading ? "Submitting..." : "🚨 Submit Report"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
