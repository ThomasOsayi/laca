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

  // Modal states
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

  if (loading) return <div style={{ padding: 40, color: "#8B92A0" }}>Loading...</div>;

  return (
    <>
      <div className="topbar">
        <h1>Site Content</h1>
        <div className="topbar-actions">
          {saved && (
            <span style={{ fontSize: 13, color: "#38A169", fontWeight: 500 }}>Saved!</span>
          )}
          <button className="btn-save" onClick={save} disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      <div className="tabs">
        <div className={`tab ${tab === "hero" ? "active" : ""}`} onClick={() => setTab("hero")}>Homepage Hero</div>
        <div className={`tab ${tab === "president" ? "active" : ""}`} onClick={() => setTab("president")}>President&apos;s Note</div>
        <div className={`tab ${tab === "mission" ? "active" : ""}`} onClick={() => setTab("mission")}>Mission Statement</div>
      </div>

      {/* ===== HERO TAB ===== */}
      {tab === "hero" && (
        <>
          {/* Hero summary */}
          <div className="card">
            <div className="card-header">
              <h3>Homepage Hero</h3>
              <button className="btn-edit-sm" onClick={() => setHeroModalOpen(true)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                Edit
              </button>
            </div>
            <div className="card-body">
              <div className="summary-grid">
                <div className="summary-item">
                  <div className="summary-label">Tagline</div>
                  <div className="summary-value">{hero.tagline || <span className="empty">Not set</span>}</div>
                </div>
                <div className="summary-item">
                  <div className="summary-label">Heading</div>
                  <div className="summary-value">{hero.titleLine1} {hero.titleLine2}</div>
                </div>
                <div className="summary-item" style={{ gridColumn: "span 2" }}>
                  <div className="summary-label">Description</div>
                  <div className="summary-value">
                    {hero.description ? (hero.description.length > 140 ? hero.description.substring(0, 140) + "..." : hero.description) : <span className="empty">Not set</span>}
                  </div>
                </div>
                <div className="summary-item">
                  <div className="summary-label">Badge</div>
                  <div className="summary-value">{hero.badge || <span className="empty">Not set</span>}</div>
                </div>
                <div className="summary-item">
                  <div className="summary-label">Hero Image</div>
                  <div className={`summary-value ${!hero.image ? "empty" : ""}`}>{hero.image ? "Custom image set" : "Using default"}</div>
                </div>
              </div>
            </div>
          </div>

          <AdminModal
            title="Edit Homepage Hero"
            subtitle="Update the main hero section on the homepage"
            open={heroModalOpen}
            onClose={() => setHeroModalOpen(false)}
            width={680}
          >
            <div className="field">
              <label>Tagline</label>
              <input type="text" value={hero.tagline} onChange={(e) => setHero({ ...hero, tagline: e.target.value })} />
            </div>
            <div className="field-row">
              <div className="field">
                <label>Heading Line 1</label>
                <input type="text" value={hero.titleLine1} onChange={(e) => setHero({ ...hero, titleLine1: e.target.value })} />
              </div>
              <div className="field">
                <label>Heading Line 2 (italic)</label>
                <input type="text" value={hero.titleLine2} onChange={(e) => setHero({ ...hero, titleLine2: e.target.value })} />
              </div>
            </div>
            <div className="field">
              <label>Description</label>
              <textarea value={hero.description} onChange={(e) => setHero({ ...hero, description: e.target.value })} />
            </div>
            <div className="field">
              <label>Badge Text</label>
              <input type="text" value={hero.badge} onChange={(e) => setHero({ ...hero, badge: e.target.value })} />
              <div className="field-hint">Displayed on the hero image (e.g. &quot;Established Mid-1980s&quot;)</div>
            </div>
            <ImageUpload
              value={hero.image}
              onChange={(url) => setHero({ ...hero, image: url })}
              folder="site"
              label="Hero Image"
              recommendedSize="800x900px"
            />
          </AdminModal>

          {/* Stats summary */}
          <div className="card">
            <div className="card-header">
              <h3>Hero Stats</h3>
              <button className="btn-edit-sm" onClick={() => setStatsModalOpen(true)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                Edit
              </button>
            </div>
            <div className="card-body">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                {hero.stats.map((stat, i) => (
                  <div key={i} style={{ textAlign: "center", padding: 16, background: "#FAF8F3", borderRadius: 8 }}>
                    <div style={{ fontSize: 28, fontWeight: 600, color: "#C9A84C" }}>{stat.number || "—"}</div>
                    <div style={{ fontSize: 11, color: "#8B92A0", textTransform: "uppercase" as const, letterSpacing: "0.08em", marginTop: 4 }}>
                      {stat.label || "Not set"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <AdminModal
            title="Edit Hero Stats"
            subtitle="The 3 numbers displayed below the hero image"
            open={statsModalOpen}
            onClose={() => setStatsModalOpen(false)}
            width={560}
          >
            <div className="field-row-3">
              {hero.stats.map((stat, i) => (
                <div className="field" key={`num-${i}`}>
                  <label>Stat {i + 1} Number</label>
                  <input type="text" value={stat.number} onChange={(e) => updateStat(i, "number", e.target.value)} placeholder="e.g. 350" />
                </div>
              ))}
            </div>
            <div className="field-row-3">
              {hero.stats.map((stat, i) => (
                <div className="field" key={`label-${i}`}>
                  <label>Stat {i + 1} Label</label>
                  <input type="text" value={stat.label} onChange={(e) => updateStat(i, "label", e.target.value)} placeholder="e.g. Hospitality Experts" />
                </div>
              ))}
            </div>
          </AdminModal>

          {/* Copyright */}
          <div className="card">
            <div className="card-header">
              <h3>Copyright Year</h3>
            </div>
            <div className="card-body">
              <div style={{ display: "flex", gap: 12, alignItems: "flex-end" }}>
                <div className="field" style={{ flex: 1, marginBottom: 0 }}>
                  <label>Footer Copyright Year</label>
                  <input type="text" value={copyrightYear} onChange={(e) => setCopyrightYear(e.target.value)} />
                  <div className="field-hint">Displayed in the footer across all pages</div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ===== PRESIDENT TAB ===== */}
      {tab === "president" && (
        <>
          <div className="card">
            <div className="card-header">
              <h3>President&apos;s Note</h3>
              <button className="btn-edit-sm" onClick={() => setPresidentModalOpen(true)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                Edit
              </button>
            </div>
            <div className="card-body">
              <div style={{ display: "flex", gap: 20, alignItems: "flex-start", marginBottom: 24 }}>
                <div style={{
                  width: 56, height: 56, borderRadius: "50%", background: "#F5ECD5",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, overflow: "hidden",
                  fontSize: 20, fontWeight: 600, color: "#C9A84C",
                }}>
                  {president.photo ? (
                    <img src={president.photo} alt={president.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    president.name ? president.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase() : "?"
                  )}
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: "#1A2744" }}>{president.name || "Not set"}</div>
                  <div style={{ fontSize: 13, color: "#8B92A0" }}>{president.title || "No title"}</div>
                </div>
              </div>

              <div style={{ padding: 20, background: "#FAF8F3", borderRadius: 8, marginBottom: 16 }}>
                <div className="summary-label" style={{ marginBottom: 8 }}>Preview</div>
                <div style={{ fontSize: 14, color: "#5A6478", lineHeight: 1.7, fontStyle: "italic" }}>
                  {president.paragraphs[0] ? (president.paragraphs[0].length > 200 ? president.paragraphs[0].substring(0, 200) + "..." : president.paragraphs[0]) : <span className="empty">No content yet</span>}
                </div>
              </div>

              <div className="summary-grid">
                <div className="summary-item">
                  <div className="summary-label">Paragraphs</div>
                  <div className="summary-value">{president.paragraphs.filter(p => p).length}</div>
                </div>
                <div className="summary-item">
                  <div className="summary-label">Signature</div>
                  <div className={`summary-value ${!president.signature ? "empty" : ""}`}>{president.signature || "Not set"}</div>
                </div>
                <div className="summary-item">
                  <div className="summary-label">Photo</div>
                  <div className={`summary-value ${!president.photo ? "empty" : ""}`}>{president.photo ? "Custom photo set" : "Using default"}</div>
                </div>
              </div>
            </div>
          </div>

          <AdminModal
            title="Edit President's Note"
            subtitle="Displayed on the About page"
            open={presidentModalOpen}
            onClose={() => setPresidentModalOpen(false)}
            width={720}
          >
            <ImageUpload
              value={president.photo}
              onChange={(url) => setPresident({ ...president, photo: url })}
              folder="site"
              label="President Photo"
              previewStyle="circle"
              recommendedSize="400x400px"
            />

            <div className="field-row" style={{ marginTop: 24 }}>
              <div className="field">
                <label>President Name</label>
                <input type="text" value={president.name} onChange={(e) => setPresident({ ...president, name: e.target.value })} />
              </div>
              <div className="field">
                <label>Title</label>
                <input type="text" value={president.title} onChange={(e) => setPresident({ ...president, title: e.target.value })} />
              </div>
            </div>

            {president.paragraphs.map((para, index) => (
              <div key={index} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 16 }}>
                <div className="field" style={{ flex: 1, marginBottom: 0 }}>
                  <label>Paragraph {index + 1}</label>
                  <textarea value={para} onChange={(e) => updatePresidentParagraph(index, e.target.value)} style={{ minHeight: 100 }} />
                </div>
                {president.paragraphs.length > 1 && (
                  <button
                    className="btn-icon-sm danger"
                    onClick={() => removePresidentParagraph(index)}
                    style={{ marginTop: 28 }}
                    title="Remove"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 13, height: 13 }}>
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                  </button>
                )}
              </div>
            ))}

            <button className="btn-add" onClick={addPresidentParagraph}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 16, height: 16 }}>
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add Paragraph
            </button>

            <div className="field" style={{ marginTop: 24 }}>
              <label>Signature Line</label>
              <input type="text" value={president.signature} onChange={(e) => setPresident({ ...president, signature: e.target.value })} />
              <div className="field-hint">e.g. &quot;In Service Through Friendship,&quot;</div>
            </div>
          </AdminModal>
        </>
      )}

      {/* ===== MISSION TAB ===== */}
      {tab === "mission" && (
        <>
          <div className="card">
            <div className="card-header">
              <h3>Mission Statement</h3>
              <button className="btn-edit-sm" onClick={() => setMissionModalOpen(true)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                Edit
              </button>
            </div>
            <div className="card-body">
              <div className="summary-grid" style={{ marginBottom: 20 }}>
                <div className="summary-item" style={{ gridColumn: "span 2" }}>
                  <div className="summary-label">Section Heading</div>
                  <div className="summary-value">{mission.heading || <span className="empty">Not set</span>}</div>
                </div>
              </div>

              <div style={{ padding: 20, background: "#FAF8F3", borderRadius: 8, borderLeft: "3px solid #C9A84C", marginBottom: 20 }}>
                <div className="summary-label" style={{ marginBottom: 8 }}>Mission Quote</div>
                <div style={{ fontSize: 14, color: "#5A6478", lineHeight: 1.7, fontStyle: "italic" }}>
                  {mission.quote ? (mission.quote.length > 200 ? mission.quote.substring(0, 200) + "..." : mission.quote) : <span className="empty">No quote set</span>}
                </div>
              </div>

              <div className="summary-grid">
                <div className="summary-item">
                  <div className="summary-label">Body Paragraphs</div>
                  <div className="summary-value">{mission.paragraphs.filter(p => p).length}</div>
                </div>
                <div className="summary-item">
                  <div className="summary-label">First Paragraph</div>
                  <div className="summary-value">
                    {mission.paragraphs[0] ? (mission.paragraphs[0].length > 80 ? mission.paragraphs[0].substring(0, 80) + "..." : mission.paragraphs[0]) : <span className="empty">Not set</span>}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <AdminModal
            title="Edit Mission Statement"
            subtitle="Displayed on the About page"
            open={missionModalOpen}
            onClose={() => setMissionModalOpen(false)}
            width={720}
          >
            <div className="field">
              <label>Section Heading</label>
              <input type="text" value={mission.heading} onChange={(e) => setMission({ ...mission, heading: e.target.value })} />
              <div className="field-hint">e.g. &quot;Concierge, The Original Influencer&quot;</div>
            </div>

            <div className="field">
              <label>Official Mission Quote</label>
              <textarea value={mission.quote} onChange={(e) => setMission({ ...mission, quote: e.target.value })} style={{ minHeight: 120 }} />
              <div className="field-hint">The official LACA mission statement displayed in the quote block</div>
            </div>

            {mission.paragraphs.map((para, index) => (
              <div key={index} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 16 }}>
                <div className="field" style={{ flex: 1, marginBottom: 0 }}>
                  <label>Body Paragraph {index + 1}</label>
                  <textarea value={para} onChange={(e) => updateMissionParagraph(index, e.target.value)} style={{ minHeight: 100 }} />
                </div>
                {mission.paragraphs.length > 1 && (
                  <button
                    className="btn-icon-sm danger"
                    onClick={() => removeMissionParagraph(index)}
                    style={{ marginTop: 28 }}
                    title="Remove"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 13, height: 13 }}>
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                  </button>
                )}
              </div>
            ))}

            <button className="btn-add" onClick={addMissionParagraph}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 16, height: 16 }}>
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add Paragraph
            </button>
          </AdminModal>
        </>
      )}
    </>
  );
}