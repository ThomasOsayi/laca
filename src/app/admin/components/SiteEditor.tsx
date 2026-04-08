"use client";

import { useState, useEffect } from "react";
import { useSiteDoc, saveSiteDoc } from "@/lib/hooks";

export default function SiteEditor() {
  const { data, loading } = useSiteDoc("content");
  const [tab, setTab] = useState<"hero" | "president" | "mission">("hero");
  const [hero, setHero] = useState({
    tagline: "",
    titleLine1: "",
    titleLine2: "",
    description: "",
    stats: [
      { number: "", label: "" },
      { number: "", label: "" },
      { number: "", label: "" },
    ],
    badge: "",
    image: "",
  });
  const [president, setPresident] = useState({
    name: "",
    title: "",
    photo: "",
    paragraphs: ["", "", ""],
    signature: "",
  });
  const [mission, setMission] = useState({
    heading: "",
    quote: "",
    paragraphs: ["", "", ""],
  });
  const [copyrightYear, setCopyrightYear] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

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
      setPresident({
        ...president,
        paragraphs: president.paragraphs.filter((_, i) => i !== index),
      });
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
      setMission({
        ...mission,
        paragraphs: mission.paragraphs.filter((_, i) => i !== index),
      });
    }
  };

  if (loading) return <div style={{ padding: 40, color: "#8B92A0" }}>Loading...</div>;

  return (
    <>
      <div className="topbar">
        <h1>Site Content</h1>
        <div className="topbar-actions">
          {saved && (
            <span style={{ fontSize: 13, color: "#38A169", fontWeight: 500 }}>
              Saved!
            </span>
          )}
          <button className="btn-save" onClick={save} disabled={saving}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 16, height: 16 }}>
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
              <polyline points="17 21 17 13 7 13 7 21" />
              <polyline points="7 3 7 8 15 8" />
            </svg>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      <div className="tabs">
        <div className={`tab ${tab === "hero" ? "active" : ""}`} onClick={() => setTab("hero")}>
          Homepage Hero
        </div>
        <div className={`tab ${tab === "president" ? "active" : ""}`} onClick={() => setTab("president")}>
          President&apos;s Note
        </div>
        <div className={`tab ${tab === "mission" ? "active" : ""}`} onClick={() => setTab("mission")}>
          Mission Statement
        </div>
      </div>

      {/* HERO TAB */}
      {tab === "hero" && (
        <>
          <div className="admin-card">
            <div className="admin-card-header">
              <h3>Homepage Hero</h3>
            </div>

            <div className="field">
              <label>Tagline</label>
              <input
                type="text"
                value={hero.tagline}
                onChange={(e) => setHero({ ...hero, tagline: e.target.value })}
              />
            </div>

            <div className="field-row">
              <div className="field">
                <label>Heading Line 1</label>
                <input
                  type="text"
                  value={hero.titleLine1}
                  onChange={(e) => setHero({ ...hero, titleLine1: e.target.value })}
                />
              </div>
              <div className="field">
                <label>Heading Line 2 (italic)</label>
                <input
                  type="text"
                  value={hero.titleLine2}
                  onChange={(e) => setHero({ ...hero, titleLine2: e.target.value })}
                />
              </div>
            </div>

            <div className="field">
              <label>Description</label>
              <textarea
                value={hero.description}
                onChange={(e) => setHero({ ...hero, description: e.target.value })}
              />
            </div>

            <div className="field">
              <label>Badge Text</label>
              <input
                type="text"
                value={hero.badge}
                onChange={(e) => setHero({ ...hero, badge: e.target.value })}
              />
              <div className="field-hint">Displayed on the hero image (e.g. &quot;Established Mid-1980s&quot;)</div>
            </div>

            <div className="field">
              <label>Hero Image URL</label>
              <input
                type="text"
                value={hero.image}
                onChange={(e) => setHero({ ...hero, image: e.target.value })}
                placeholder="https://... (leave blank for default)"
              />
              <div className="field-hint">Recommended: 800x900px</div>
            </div>
          </div>

          <div className="admin-card">
            <div className="admin-card-header">
              <h3>Hero Stats</h3>
              <span>3 stat blocks below the hero image</span>
            </div>

            <div className="field-row-3">
              {hero.stats.map((stat, i) => (
                <div className="field" key={i}>
                  <label>Stat {i + 1} Number</label>
                  <input
                    type="text"
                    value={stat.number}
                    onChange={(e) => updateStat(i, "number", e.target.value)}
                    placeholder="e.g. 350"
                  />
                </div>
              ))}
            </div>
            <div className="field-row-3">
              {hero.stats.map((stat, i) => (
                <div className="field" key={i}>
                  <label>Stat {i + 1} Label</label>
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) => updateStat(i, "label", e.target.value)}
                    placeholder="e.g. Hospitality Experts"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="admin-card">
            <div className="admin-card-header">
              <h3>Copyright Year</h3>
            </div>
            <div className="field">
              <label>Footer Copyright Year</label>
              <input
                type="text"
                value={copyrightYear}
                onChange={(e) => setCopyrightYear(e.target.value)}
              />
              <div className="field-hint">Displayed in the footer across all pages</div>
            </div>
          </div>
        </>
      )}

      {/* PRESIDENT TAB */}
      {tab === "president" && (
        <div className="admin-card">
          <div className="admin-card-header">
            <h3>President&apos;s Note</h3>
            <span>Displayed on the About page</span>
          </div>

          <div className="field-row">
            <div className="field">
              <label>President Name</label>
              <input
                type="text"
                value={president.name}
                onChange={(e) => setPresident({ ...president, name: e.target.value })}
              />
            </div>
            <div className="field">
              <label>Title</label>
              <input
                type="text"
                value={president.title}
                onChange={(e) => setPresident({ ...president, title: e.target.value })}
              />
            </div>
          </div>

          <div className="field">
            <label>Photo URL</label>
            <input
              type="text"
              value={president.photo}
              onChange={(e) => setPresident({ ...president, photo: e.target.value })}
              placeholder="https://... (leave blank for default)"
            />
          </div>

          {president.photo && (
            <div style={{ marginBottom: 20 }}>
              <img
                src={president.photo}
                alt="Preview"
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "1px solid rgba(26,39,68,0.08)",
                }}
              />
            </div>
          )}

          {president.paragraphs.map((para, index) => (
            <div key={index} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 16 }}>
              <div className="field" style={{ flex: 1, marginBottom: 0 }}>
                <label>Paragraph {index + 1}</label>
                <textarea
                  value={para}
                  onChange={(e) => updatePresidentParagraph(index, e.target.value)}
                  style={{ minHeight: 80 }}
                />
              </div>
              {president.paragraphs.length > 1 && (
                <button
                  className="btn-icon danger"
                  onClick={() => removePresidentParagraph(index)}
                  style={{ marginTop: 28 }}
                  title="Remove"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
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
            <input
              type="text"
              value={president.signature}
              onChange={(e) => setPresident({ ...president, signature: e.target.value })}
            />
            <div className="field-hint">e.g. &quot;In Service Through Friendship,&quot;</div>
          </div>
        </div>
      )}

      {/* MISSION TAB */}
      {tab === "mission" && (
        <div className="admin-card">
          <div className="admin-card-header">
            <h3>Mission Statement</h3>
            <span>Displayed on the About page</span>
          </div>

          <div className="field">
            <label>Section Heading</label>
            <input
              type="text"
              value={mission.heading}
              onChange={(e) => setMission({ ...mission, heading: e.target.value })}
            />
            <div className="field-hint">e.g. &quot;Concierge, The Original Influencer&quot;</div>
          </div>

          <div className="field">
            <label>Official Mission Quote</label>
            <textarea
              value={mission.quote}
              onChange={(e) => setMission({ ...mission, quote: e.target.value })}
              style={{ minHeight: 120 }}
            />
            <div className="field-hint">The official LACA mission statement displayed in the quote block</div>
          </div>

          {mission.paragraphs.map((para, index) => (
            <div key={index} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 16 }}>
              <div className="field" style={{ flex: 1, marginBottom: 0 }}>
                <label>Body Paragraph {index + 1}</label>
                <textarea
                  value={para}
                  onChange={(e) => updateMissionParagraph(index, e.target.value)}
                  style={{ minHeight: 80 }}
                />
              </div>
              {mission.paragraphs.length > 1 && (
                <button
                  className="btn-icon danger"
                  onClick={() => removeMissionParagraph(index)}
                  style={{ marginTop: 28 }}
                  title="Remove"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
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
        </div>
      )}
    </>
  );
}