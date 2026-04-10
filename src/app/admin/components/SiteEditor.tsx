"use client";

import { useState, useEffect } from "react";
import { useSiteDoc, saveSiteDoc } from "@/lib/hooks";
import AdminModal from "./AdminModal";
import ImageUpload from "./ImageUpload";

export default function SiteEditor() {
  const { data, loading } = useSiteDoc("content");
  const [tab, setTab] = useState<"hero" | "president" | "mission">("hero");
  const [hero, setHero] = useState({
    tagline: "", titleLine1: "", titleLine2: "", description: "",
    stats: [{ number: "", label: "" }, { number: "", label: "" }, { number: "", label: "" }],
    badge: "", image: "",
  });
  const [president, setPresident] = useState({
    name: "", title: "", photo: "", paragraphs: ["", "", ""], signature: "",
  });
  const [mission, setMission] = useState({
    heading: "", quote: "", paragraphs: ["", "", ""],
  });
  const [copyrightYear, setCopyrightYear] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [heroModalOpen, setHeroModalOpen] = useState(false);
  const [statsModalOpen, setStatsModalOpen] = useState(false);
  const [presidentModalOpen, setPresidentModalOpen] = useState(false);
  const [missionModalOpen, setMissionModalOpen] = useState(false);

  useEffect(() => {
    if (!data) return;
    if (data.hero) setHero(data.hero);
    if (data.president) setPresident(data.president);
    if (data.mission) setMission(data.mission);
    if (data.copyrightYear) setCopyrightYear(data.copyrightYear);
  }, [data]);

  const save = async () => {
    setSaving(true);
    await saveSiteDoc("content", { hero, president, mission, copyrightYear });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateStat = (index: number, field: "number" | "label", value: string) => {
    const updated = [...hero.stats];
    updated[index] = { ...updated[index], [field]: value };
    setHero({ ...hero, stats: updated });
  };

  // President paragraph helpers
  const updatePresidentParagraph = (index: number, value: string) => {
    const updated = [...president.paragraphs];
    updated[index] = value;
    setPresident({ ...president, paragraphs: updated });
  };
  const addPresidentParagraph = () => {
    setPresident({ ...president, paragraphs: [...president.paragraphs, ""] });
  };
  const removePresidentParagraph = (index: number) => {
    if (president.paragraphs.length <= 1) return;
    if (confirm("Remove this paragraph?")) {
      setPresident({ ...president, paragraphs: president.paragraphs.filter((_, i) => i !== index) });
    }
  };
  const movePresidentParagraph = (index: number, direction: -1 | 1) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= president.paragraphs.length) return;
    const updated = [...president.paragraphs];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    setPresident({ ...president, paragraphs: updated });
  };

  // Mission paragraph helpers
  const updateMissionParagraph = (index: number, value: string) => {
    const updated = [...mission.paragraphs];
    updated[index] = value;
    setMission({ ...mission, paragraphs: updated });
  };
  const addMissionParagraph = () => {
    setMission({ ...mission, paragraphs: [...mission.paragraphs, ""] });
  };
  const removeMissionParagraph = (index: number) => {
    if (mission.paragraphs.length <= 1) return;
    if (confirm("Remove this paragraph?")) {
      setMission({ ...mission, paragraphs: mission.paragraphs.filter((_, i) => i !== index) });
    }
  };
  const moveMissionParagraph = (index: number, direction: -1 | 1) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= mission.paragraphs.length) return;
    const updated = [...mission.paragraphs];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    setMission({ ...mission, paragraphs: updated });
  };

  // Reusable paragraph row for modals
  const ParagraphRow = ({ label, value, onChange, onMoveUp, onMoveDown, onDelete, canDelete }: {
    label: string; value: string; onChange: (v: string) => void;
    onMoveUp: () => void; onMoveDown: () => void; onDelete: () => void; canDelete: boolean;
  }) => (
    <div style={{
      display: "flex", gap: 0, marginBottom: 12, background: "white",
      border: "1px solid rgba(26,39,68,0.1)", borderRadius: 8, overflow: "hidden",
    }}>
      {/* Drag grip */}
      <div style={{
        width: 28, background: "rgba(26,39,68,0.02)", display: "flex",
        alignItems: "center", justifyContent: "center", flexShrink: 0,
        borderRight: "1px solid rgba(26,39,68,0.06)", cursor: "grab",
      }}>
        <svg viewBox="0 0 24 24" fill="#8B92A0" style={{ width: 12, height: 12, opacity: 0.5 }}>
          <circle cx="9" cy="5" r="1.5" /><circle cx="15" cy="5" r="1.5" />
          <circle cx="9" cy="12" r="1.5" /><circle cx="15" cy="12" r="1.5" />
          <circle cx="9" cy="19" r="1.5" /><circle cx="15" cy="19" r="1.5" />
        </svg>
      </div>
      <div style={{ flex: 1, padding: "14px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <label style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" as const, color: "#5A6478", marginBottom: 0 }}>{label}</label>
          <div style={{ display: "flex", gap: 4 }}>
            <button className="btn-icon-sm" onClick={onMoveUp} title="Move up">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 12, height: 12 }}>
                <polyline points="18 15 12 9 6 15" />
              </svg>
            </button>
            <button className="btn-icon-sm" onClick={onMoveDown} title="Move down">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 12, height: 12 }}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {canDelete && (
              <button className="btn-icon-sm danger" onClick={onDelete} title="Remove">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 12, height: 12 }}>
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
              </button>
            )}
          </div>
        </div>
        <textarea value={value} onChange={(e) => onChange(e.target.value)} style={{ minHeight: 80 }} />
      </div>
    </div>
  );

  // Status helpers
  const presidentNeedsPhoto = !president.photo;

  if (loading) return <div style={{ padding: 40, color: "#8B92A0" }}>Loading...</div>;

  return (
    <>
      <div className="topbar">
        <h1>Site Content</h1>
        <div className="topbar-actions">
          {saved && <span style={{ fontSize: 13, color: "#38A169", fontWeight: 500 }}>Saved!</span>}
          <button className="btn-save" onClick={save} disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Tabs with status labels */}
      <div className="tabs">
        <div className={`tab ${tab === "hero" ? "active" : ""}`} onClick={() => setTab("hero")}>
          Homepage Hero
          <span style={{
            fontSize: 9, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const,
            padding: "2px 8px", borderRadius: 100, marginLeft: 8,
            background: "#F0FFF4", color: "#38A169",
          }}>All set</span>
        </div>
        <div className={`tab ${tab === "president" ? "active" : ""}`} onClick={() => setTab("president")}>
          President&apos;s Note
          <span style={{
            fontSize: 9, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const,
            padding: "2px 8px", borderRadius: 100, marginLeft: 8,
            background: presidentNeedsPhoto ? "#FFFBEB" : "#F0FFF4",
            color: presidentNeedsPhoto ? "#D69E2E" : "#38A169",
          }}>{presidentNeedsPhoto ? "Missing photo" : "All set"}</span>
        </div>
        <div className={`tab ${tab === "mission" ? "active" : ""}`} onClick={() => setTab("mission")}>
          Mission Statement
          <span style={{
            fontSize: 9, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const,
            padding: "2px 8px", borderRadius: 100, marginLeft: 8,
            background: "#F0FFF4", color: "#38A169",
          }}>All set</span>
        </div>
      </div>

      {/* ===== HERO TAB ===== */}
      {tab === "hero" && (
        <>
          <div className="card">
            <div className="card-header">
              <div style={{ display: "flex", alignItems: "center" }}>
                <h3>Homepage Hero</h3>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 5,
                  fontSize: 10, fontWeight: 500, color: "#8B92A0",
                  background: "#FAF8F3", padding: "3px 10px", borderRadius: 100, marginLeft: 12,
                }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2" style={{ width: 10, height: 10 }}>
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                  Homepage
                </span>
              </div>
              <button className="btn-edit-sm" onClick={() => setHeroModalOpen(true)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                Edit
              </button>
            </div>
            <div className="card-body">
              {/* Live heading preview */}
              <div style={{
                padding: 32, background: "linear-gradient(135deg, #1A2744 0%, #243555 100%)",
                borderRadius: 8, marginBottom: 20, position: "relative", overflow: "hidden",
              }}>
                <div style={{
                  position: "absolute", top: 12, right: 16,
                  fontSize: 8, fontWeight: 700, letterSpacing: "0.15em", color: "rgba(255,255,255,0.2)",
                }}>LIVE PREVIEW</div>
                <div style={{
                  display: "flex", alignItems: "center", gap: 10,
                  fontSize: 10, fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase" as const,
                  color: "#C9A84C", marginBottom: 16,
                }}>
                  <span style={{ width: 24, height: 1.5, background: "#C9A84C" }} />
                  {hero.tagline || "Tagline"}
                </div>
                <div style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 38, color: "white", fontWeight: 400, lineHeight: 1.1, marginBottom: 20,
                }}>
                  {hero.titleLine1 || "Heading Line 1"}{" "}
                  <em style={{ color: "#E2C97E" }}>{hero.titleLine2 || "Line 2"}</em>
                </div>
                <div style={{
                  fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.75,
                  fontWeight: 300, maxWidth: 520,
                }}>
                  {hero.description || "Description text will appear here."}
                </div>
              </div>

              {/* Meta cards */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div style={{
                  display: "flex", gap: 12, alignItems: "center",
                  padding: "14px 16px", background: "#FAF8F3",
                  border: "1px solid rgba(26,39,68,0.08)", borderRadius: 8,
                }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%", background: "#F5ECD5",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" style={{ width: 14, height: 14 }}>
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#C9A84C", marginBottom: 1 }}>Badge</div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: hero.badge ? "#1A2744" : "#8B92A0", fontStyle: hero.badge ? "normal" : "italic" }}>
                      {hero.badge || "Not set"}
                    </div>
                  </div>
                </div>
                <div style={{
                  display: "flex", gap: 12, alignItems: "center",
                  padding: "14px 16px", background: "#FAF8F3",
                  border: "1px solid rgba(26,39,68,0.08)", borderRadius: 8,
                }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%",
                    background: hero.image ? "#F5ECD5" : "#FFFBEB",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke={hero.image ? "#C9A84C" : "#D69E2E"} strokeWidth="1.5" style={{ width: 14, height: 14 }}>
                      <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#C9A84C", marginBottom: 1 }}>Hero Image</div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: hero.image ? "#1A2744" : "#D69E2E" }}>
                      {hero.image ? "Custom image set" : "Using default — upload recommended"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Modal */}
          <AdminModal
            title="Edit Homepage Hero"
            subtitle="Main hero section on the homepage"
            open={heroModalOpen}
            onClose={() => setHeroModalOpen(false)}
            onSave={save}
            width={700}
          >
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              fontSize: 11, color: "#8B92A0", padding: "6px 14px",
              background: "#FAF8F3", borderRadius: 100, marginBottom: 20,
            }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2" style={{ width: 12, height: 12 }}>
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              Appears on: Homepage hero section
            </div>
            <div style={{ padding: 20, background: "#FAF8F3", borderRadius: 8, marginBottom: 20 }}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#C9A84C", marginBottom: 16 }}>Hero Text</div>
              <div className="field">
                <label>Tagline</label>
                <input type="text" value={hero.tagline} onChange={(e) => setHero({ ...hero, tagline: e.target.value })} />
                <div className="field-hint">Small text above the heading</div>
              </div>
              <div className="field-row">
                <div className="field"><label>Heading Line 1</label><input type="text" value={hero.titleLine1} onChange={(e) => setHero({ ...hero, titleLine1: e.target.value })} /></div>
                <div className="field"><label>Heading Line 2 (Italic)</label><input type="text" value={hero.titleLine2} onChange={(e) => setHero({ ...hero, titleLine2: e.target.value })} /></div>
              </div>
              <div className="field" style={{ marginBottom: 0 }}>
                <label>Description</label>
                <textarea value={hero.description} onChange={(e) => setHero({ ...hero, description: e.target.value })} />
              </div>
            </div>
            <div style={{ padding: 20, background: "#FAF8F3", borderRadius: 8, marginBottom: 20 }}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#C9A84C", marginBottom: 16 }}>Badge</div>
              <div className="field" style={{ marginBottom: 0 }}>
                <label>Badge Text</label>
                <input type="text" value={hero.badge} onChange={(e) => setHero({ ...hero, badge: e.target.value })} />
                <div className="field-hint">Overlay badge on the hero image</div>
              </div>
            </div>
            <div style={{ padding: 20, background: "#FAF8F3", borderRadius: 8 }}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#C9A84C", marginBottom: 16 }}>Hero Image</div>
              <ImageUpload value={hero.image} onChange={(url) => setHero({ ...hero, image: url })} folder="site" label="" recommendedSize="800x900px" />
            </div>
          </AdminModal>

          {/* Stats */}
          <div className="card">
            <div className="card-header">
              <div style={{ display: "flex", alignItems: "center" }}>
                <h3>Homepage Stats</h3>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 5,
                  fontSize: 10, fontWeight: 500, color: "#8B92A0",
                  background: "#FAF8F3", padding: "3px 10px", borderRadius: 100, marginLeft: 12,
                }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2" style={{ width: 10, height: 10 }}>
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                  Below hero
                </span>
              </div>
              <button className="btn-edit-sm" onClick={() => setStatsModalOpen(true)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                Edit
              </button>
            </div>
            <div className="card-body">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                {hero.stats.map((stat, i) => (
                  <div key={i} style={{ textAlign: "center", padding: 16, background: "#FAF8F3", borderRadius: 8 }}>
                    <div style={{ fontSize: 24, fontWeight: 600, color: "#C9A84C", lineHeight: 1, marginBottom: 4 }}>{stat.number || "—"}</div>
                    <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#8B92A0" }}>{stat.label || "Not set"}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Modal */}
          <AdminModal
            title="Edit Homepage Stats"
            subtitle="The 3 numbers displayed below the hero"
            open={statsModalOpen}
            onClose={() => setStatsModalOpen(false)}
            onSave={save}
            width={600}
          >
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              fontSize: 11, color: "#8B92A0", padding: "6px 14px",
              background: "#FAF8F3", borderRadius: 100, marginBottom: 20,
            }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2" style={{ width: 12, height: 12 }}>
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              Appears on: Homepage, directly below the hero image
            </div>
            {hero.stats.map((stat, i) => (
              <div key={i} style={{ padding: 20, background: "#FAF8F3", borderRadius: 8, marginBottom: 16 }}>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#C9A84C", marginBottom: 12 }}>Stat {i + 1}</div>
                <div className="field-row">
                  <div className="field" style={{ marginBottom: 0 }}><label>Number</label><input type="text" value={stat.number} onChange={(e) => updateStat(i, "number", e.target.value)} placeholder="e.g. 350" /></div>
                  <div className="field" style={{ marginBottom: 0 }}><label>Label</label><input type="text" value={stat.label} onChange={(e) => updateStat(i, "label", e.target.value)} placeholder="e.g. Hospitality Experts" /></div>
                </div>
              </div>
            ))}
          </AdminModal>

          {/* Footer Copyright */}
          <div className="card">
            <div className="card-header"><h3>Footer Copyright</h3></div>
            <div className="card-body">
              <div style={{
                display: "flex", alignItems: "center", gap: 16,
                padding: "16px 20px", background: "#FAF8F3", borderRadius: 8,
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: "50%", background: "#F5ECD5",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" style={{ width: 16, height: 16 }}>
                    <circle cx="12" cy="12" r="10" /><path d="M14.83 14.83a4 4 0 1 1 0-5.66" />
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "#5A6478" }}>Copyright Year</div>
                  <div style={{ fontSize: 11, color: "#8B92A0", marginTop: 2 }}>Displayed in the footer across all pages</div>
                </div>
                <input
                  type="text"
                  value={copyrightYear}
                  onChange={(e) => setCopyrightYear(e.target.value)}
                  style={{
                    width: 80, padding: "8px 12px",
                    border: "1px solid rgba(26,39,68,0.15)", borderRadius: 4,
                    fontFamily: "inherit", fontSize: 16, fontWeight: 600,
                    color: "#1A2744", textAlign: "center", outline: "none",
                  }}
                />
              </div>
            </div>
          </div>
        </>
      )}

      {/* ===== PRESIDENT TAB ===== */}
      {tab === "president" && (
        <>
          {/* Needs attention banner */}
          {presidentNeedsPhoto && (
            <div style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "14px 20px", background: "#FFFBEB",
              border: "1px solid rgba(214,158,46,0.2)", borderRadius: 8,
              marginBottom: 24, fontSize: 12, color: "#92600A",
            }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#D69E2E" strokeWidth="2" style={{ width: 16, height: 16, flexShrink: 0 }}>
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <span><strong>Missing president photo.</strong> Upload a headshot in Edit to complete this section.</span>
            </div>
          )}

          <div className="card">
            <div className="card-header">
              <div style={{ display: "flex", alignItems: "center" }}>
                <h3>President&apos;s Note</h3>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 5,
                  fontSize: 10, fontWeight: 500, color: "#8B92A0",
                  background: "#FAF8F3", padding: "3px 10px", borderRadius: 100, marginLeft: 12,
                }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2" style={{ width: 10, height: 10 }}>
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </svg>
                  About page
                </span>
              </div>
              <button className="btn-edit-sm" onClick={() => setPresidentModalOpen(true)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                Edit
              </button>
            </div>
            <div className="card-body">
              {/* President info bar */}
              <div style={{
                display: "flex", gap: 20, alignItems: "center", marginBottom: 24,
                padding: 20, background: "#FAF8F3", borderRadius: 8,
              }}>
                <div style={{
                  width: 64, height: 64, borderRadius: "50%", background: "#F5ECD5",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, overflow: "hidden",
                  fontSize: 22, fontWeight: 600, color: "#C9A84C",
                }}>
                  {president.photo ? (
                    <img src={president.photo} alt={president.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    president.name ? president.name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase() : "?"
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 18, fontWeight: 600, color: "#1A2744" }}>{president.name || "Not set"}</div>
                  <div style={{ fontSize: 13, color: "#8B92A0", marginTop: 2 }}>{president.title || "No title"}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#8B92A0", marginBottom: 4 }}>Signature</div>
                  <div style={{ fontSize: 14, color: "#1A2744", fontStyle: "italic" }}>
                    {president.signature || <span style={{ color: "#8B92A0", fontStyle: "normal" }}>Not set</span>}
                  </div>
                </div>
              </div>

              {/* Paragraphs */}
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#8B92A0", marginBottom: 16 }}>
                Letter Content ({president.paragraphs.filter((p) => p).length} paragraphs)
              </div>
              {president.paragraphs.filter((p) => p).length === 0 ? (
                <div className="empty-state"><h4>No content yet</h4><p>Click Edit to add the president&apos;s letter.</p></div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {president.paragraphs.filter((p) => p).map((para, i) => (
                    <div key={i} style={{
                      padding: 20, background: "white", border: "1px solid rgba(26,39,68,0.08)",
                      borderRadius: 8, position: "relative",
                    }}>
                      <div style={{
                        position: "absolute", top: 12, right: 16,
                        fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const,
                        color: "#C9A84C", background: "#F5ECD5", padding: "2px 8px", borderRadius: 100,
                      }}>P{i + 1}</div>
                      <div style={{ fontSize: 14, color: "#5A6478", lineHeight: 1.75, paddingRight: 48 }}>{para}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* President Modal */}
          <AdminModal
            title="Edit President's Note"
            subtitle="President's letter on the About page"
            open={presidentModalOpen}
            onClose={() => setPresidentModalOpen(false)}
            onSave={save}
            width={720}
          >
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              fontSize: 11, color: "#8B92A0", padding: "6px 14px",
              background: "#FAF8F3", borderRadius: 100, marginBottom: 20,
            }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2" style={{ width: 12, height: 12 }}>
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
              Appears on: About page → President&apos;s Note section
            </div>

            {/* Photo + Details combined */}
            <div style={{ padding: 20, background: "#FAF8F3", borderRadius: 8, marginBottom: 20 }}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#C9A84C", marginBottom: 16 }}>President</div>
              <div style={{ marginBottom: 16 }}>
                <ImageUpload value={president.photo} onChange={(url) => setPresident({ ...president, photo: url })} folder="site" label="" previewStyle="circle" recommendedSize="400x400px" />
              </div>
              <div className="field-row">
                <div className="field"><label>Name</label><input type="text" value={president.name} onChange={(e) => setPresident({ ...president, name: e.target.value })} /></div>
                <div className="field"><label>Title</label><input type="text" value={president.title} onChange={(e) => setPresident({ ...president, title: e.target.value })} /></div>
              </div>
              <div className="field" style={{ marginBottom: 0 }}>
                <label>Signature Line</label>
                <input type="text" value={president.signature} onChange={(e) => setPresident({ ...president, signature: e.target.value })} />
                <div className="field-hint">Displayed at the end of the president&apos;s letter</div>
              </div>
            </div>

            {/* Letter content with grips */}
            <div style={{ padding: 20, background: "#FAF8F3", borderRadius: 8 }}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#C9A84C", marginBottom: 16 }}>Letter Content</div>
              {president.paragraphs.map((para, index) => (
                <ParagraphRow
                  key={index}
                  label={`Paragraph ${index + 1}`}
                  value={para}
                  onChange={(v) => updatePresidentParagraph(index, v)}
                  onMoveUp={() => movePresidentParagraph(index, -1)}
                  onMoveDown={() => movePresidentParagraph(index, 1)}
                  onDelete={() => removePresidentParagraph(index)}
                  canDelete={president.paragraphs.length > 1}
                />
              ))}
              <button className="btn-add" onClick={addPresidentParagraph} style={{ marginTop: 4 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
                  <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Add Paragraph
              </button>
            </div>
          </AdminModal>
        </>
      )}

      {/* ===== MISSION TAB ===== */}
      {tab === "mission" && (
        <>
          <div className="card">
            <div className="card-header">
              <div style={{ display: "flex", alignItems: "center" }}>
                <h3>Mission Statement</h3>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 5,
                  fontSize: 10, fontWeight: 500, color: "#8B92A0",
                  background: "#FAF8F3", padding: "3px 10px", borderRadius: 100, marginLeft: 12,
                }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2" style={{ width: 10, height: 10 }}>
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </svg>
                  About page
                </span>
              </div>
              <button className="btn-edit-sm" onClick={() => setMissionModalOpen(true)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                Edit
              </button>
            </div>
            <div className="card-body">
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#8B92A0", marginBottom: 6 }}>Section Heading</div>
                <div style={{ fontSize: 22, fontWeight: 500, color: "#1A2744", fontStyle: "italic", fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                  {mission.heading || <span style={{ color: "#8B92A0", fontStyle: "normal", fontSize: 14, fontFamily: "inherit" }}>Not set</span>}
                </div>
              </div>

              <div style={{
                padding: 24, background: "#FAF8F3", borderRadius: 8,
                borderLeft: "3px solid #C9A84C", marginBottom: 24,
              }}>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#8B92A0", marginBottom: 10 }}>Official Mission Quote</div>
                <div style={{ fontSize: 15, color: "#1A2744", lineHeight: 1.75, fontStyle: "italic" }}>
                  {mission.quote || <span style={{ color: "#8B92A0", fontStyle: "normal" }}>No quote set</span>}
                </div>
              </div>

              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#8B92A0", marginBottom: 16 }}>
                Body Content ({mission.paragraphs.filter((p) => p).length} paragraphs)
              </div>
              {mission.paragraphs.filter((p) => p).length === 0 ? (
                <div className="empty-state"><h4>No content yet</h4><p>Click Edit to add mission statement paragraphs.</p></div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {mission.paragraphs.filter((p) => p).map((para, i) => (
                    <div key={i} style={{
                      padding: 20, background: "white", border: "1px solid rgba(26,39,68,0.08)",
                      borderRadius: 8, position: "relative",
                    }}>
                      <div style={{
                        position: "absolute", top: 12, right: 16,
                        fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const,
                        color: "#C9A84C", background: "#F5ECD5", padding: "2px 8px", borderRadius: 100,
                      }}>P{i + 1}</div>
                      <div style={{ fontSize: 14, color: "#5A6478", lineHeight: 1.75, paddingRight: 48 }}>{para}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mission Modal */}
          <AdminModal
            title="Edit Mission Statement"
            subtitle="Mission section on the About page"
            open={missionModalOpen}
            onClose={() => setMissionModalOpen(false)}
            onSave={save}
            width={720}
          >
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              fontSize: 11, color: "#8B92A0", padding: "6px 14px",
              background: "#FAF8F3", borderRadius: 100, marginBottom: 20,
            }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2" style={{ width: 12, height: 12 }}>
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
              Appears on: About page → Mission section
            </div>

            {/* Heading + Quote combined */}
            <div style={{ padding: 20, background: "#FAF8F3", borderRadius: 8, marginBottom: 20 }}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#C9A84C", marginBottom: 16 }}>Section Header &amp; Quote</div>
              <div className="field">
                <label>Section Heading</label>
                <input type="text" value={mission.heading} onChange={(e) => setMission({ ...mission, heading: e.target.value })} />
                <div className="field-hint">The heading above the mission text</div>
              </div>
              <div className="field" style={{ marginBottom: 0 }}>
                <label>Official Mission Quote</label>
                <textarea value={mission.quote} onChange={(e) => setMission({ ...mission, quote: e.target.value })} style={{ minHeight: 100 }} />
                <div className="field-hint">Displayed in the gold-bordered quote block</div>
              </div>
            </div>

            {/* Body paragraphs with grips */}
            <div style={{ padding: 20, background: "#FAF8F3", borderRadius: 8 }}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#C9A84C", marginBottom: 16 }}>Body Content</div>
              {mission.paragraphs.map((para, index) => (
                <ParagraphRow
                  key={index}
                  label={`Paragraph ${index + 1}`}
                  value={para}
                  onChange={(v) => updateMissionParagraph(index, v)}
                  onMoveUp={() => moveMissionParagraph(index, -1)}
                  onMoveDown={() => moveMissionParagraph(index, 1)}
                  onDelete={() => removeMissionParagraph(index)}
                  canDelete={mission.paragraphs.length > 1}
                />
              ))}
              <button className="btn-add" onClick={addMissionParagraph} style={{ marginTop: 4 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
                  <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Add Paragraph
              </button>
            </div>
          </AdminModal>
        </>
      )}
    </>
  );
}