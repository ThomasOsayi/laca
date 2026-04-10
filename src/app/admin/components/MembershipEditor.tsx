"use client";

import { useState, useEffect } from "react";
import { useSiteDoc, saveSiteDoc } from "@/lib/hooks";
import AdminModal from "./AdminModal";

export default function MembershipEditor() {
  const { data, loading } = useSiteDoc("membership");
  const [dues, setDues] = useState({ full: "", affiliate: "", sponsor: "" });
  const [deadline, setDeadline] = useState("");
  const [deadlineYear, setDeadlineYear] = useState("");
  const [qualifications, setQualifications] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [duesModalOpen, setDuesModalOpen] = useState(false);
  const [qualsModalOpen, setQualsModalOpen] = useState(false);

  useEffect(() => {
    if (!data) return;
    if (data.dues) setDues(data.dues);
    if (data.deadline) setDeadline(data.deadline);
    if (data.deadlineYear) setDeadlineYear(data.deadlineYear);
    if (data.qualifications) setQualifications(data.qualifications);
  }, [data]);

  const save = async () => {
    setSaving(true);
    await saveSiteDoc("membership", { dues, deadline, deadlineYear, qualifications });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateQual = (index: number, value: string) => {
    const updated = [...qualifications];
    updated[index] = value;
    setQualifications(updated);
  };

  const addQual = () => {
    setQualifications([...qualifications, ""]);
  };

  const removeQual = (index: number) => {
    if (confirm("Remove this qualification?")) {
      setQualifications(qualifications.filter((_, i) => i !== index));
    }
  };

  const moveQual = (index: number, direction: -1 | 1) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= qualifications.length) return;
    const updated = [...qualifications];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    setQualifications(updated);
  };

  if (loading) return <div style={{ padding: 40, color: "#8B92A0" }}>Loading...</div>;

  return (
    <>
      <div className="topbar">
        <h1>Membership</h1>
        <div className="topbar-actions">
          {saved && (
            <span style={{ fontSize: 13, color: "#38A169", fontWeight: 500 }}>Saved!</span>
          )}
          <button className="btn-save" onClick={save} disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Dues & Deadline Summary */}
      <div className="card">
        <div className="card-header">
          <h3>Dues &amp; Deadline</h3>
          <button className="btn-edit-sm" onClick={() => setDuesModalOpen(true)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
            Edit
          </button>
        </div>
        <div className="card-body">
          {/* Dues cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
            {[
              { label: "Full Member", price: dues.full || "$150", featured: true },
              { label: "Affiliate", price: dues.affiliate || "$175", featured: false },
              { label: "General Sponsor", price: dues.sponsor || "$800", featured: false },
            ].map((tier) => (
              <div key={tier.label} style={{
                textAlign: "center", padding: "28px 20px", background: "#FAF8F3",
                border: `1px solid ${tier.featured ? "#C9A84C" : "rgba(26,39,68,0.08)"}`,
                borderRadius: 8, position: "relative",
              }}>
                {tier.featured && (
                  <div style={{
                    position: "absolute", top: -1, left: "50%", transform: "translateX(-50%)",
                    fontSize: 8, fontWeight: 700, letterSpacing: "0.12em",
                    color: "white", background: "#C9A84C",
                    padding: "3px 10px", borderRadius: "0 0 6px 6px",
                  }}>
                    MOST COMMON
                  </div>
                )}
                <div style={{
                  fontSize: 10, fontWeight: 600, letterSpacing: "0.12em",
                  textTransform: "uppercase" as const, color: "#C9A84C", marginBottom: 8,
                }}>
                  {tier.label}
                </div>
                <div style={{ fontSize: 32, fontWeight: 600, color: "#1A2744", lineHeight: 1, marginBottom: 4 }}>
                  {tier.price}
                </div>
                <div style={{ fontSize: 11, color: "#8B92A0", fontWeight: 500 }}>Annual Dues</div>
              </div>
            ))}
          </div>

          {/* Deadline banner */}
          <div style={{
            display: "flex", alignItems: "center", gap: 20,
            padding: "20px 24px", background: "linear-gradient(135deg, #1A2744 0%, #243555 100%)",
            borderRadius: 8, color: "white",
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: "50%",
              background: "rgba(201,168,76,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" style={{ width: 22, height: 22 }}>
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>Application Deadline</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>Renewal year {deadlineYear || "2026"}</div>
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#C9A84C", whiteSpace: "nowrap" }}>
              {deadline || "May 15, 2026"}
            </div>
          </div>
        </div>
      </div>

      {/* Dues Modal */}
      <AdminModal
        title="Edit Dues & Deadline"
        subtitle="Membership pricing and application deadline"
        open={duesModalOpen}
        onClose={() => setDuesModalOpen(false)}
        onSave={save}
        width={560}
      >
        <div style={{ padding: 20, background: "#FAF8F3", borderRadius: 8, marginBottom: 20 }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#C9A84C", marginBottom: 16 }}>
            Annual Dues
          </div>
          <div className="field-row-3">
            <div className="field" style={{ marginBottom: 0 }}>
              <label>Full Member</label>
              <input type="text" value={dues.full} onChange={(e) => setDues({ ...dues, full: e.target.value })} placeholder="$150" />
            </div>
            <div className="field" style={{ marginBottom: 0 }}>
              <label>Affiliate</label>
              <input type="text" value={dues.affiliate} onChange={(e) => setDues({ ...dues, affiliate: e.target.value })} placeholder="$175" />
            </div>
            <div className="field" style={{ marginBottom: 0 }}>
              <label>Sponsor</label>
              <input type="text" value={dues.sponsor} onChange={(e) => setDues({ ...dues, sponsor: e.target.value })} placeholder="$800" />
            </div>
          </div>
        </div>

        <div style={{ padding: 20, background: "#FAF8F3", borderRadius: 8 }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#C9A84C", marginBottom: 16 }}>
            Application Deadline
          </div>
          <div className="field-row">
            <div className="field" style={{ marginBottom: 0 }}>
              <label>Deadline Date</label>
              <input type="text" value={deadline} onChange={(e) => setDeadline(e.target.value)} placeholder="May 15, 2026" />
            </div>
            <div className="field" style={{ marginBottom: 0 }}>
              <label>Renewal Year</label>
              <input type="text" value={deadlineYear} onChange={(e) => setDeadlineYear(e.target.value)} placeholder="2026" />
            </div>
          </div>
        </div>
      </AdminModal>

      {/* Qualifications Summary */}
      <div className="card">
        <div className="card-header">
          <div style={{ display: "flex", alignItems: "center" }}>
            <h3>Full Member Qualifications</h3>
            <span className="count">{qualifications.length}</span>
          </div>
          <button className="btn-edit-sm" onClick={() => setQualsModalOpen(true)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
            Edit
          </button>
        </div>
        <div className="card-body">
          {qualifications.length === 0 ? (
            <div className="empty-state">
              <h4>No qualifications set</h4>
              <p>Click Edit to add membership qualifications.</p>
            </div>
          ) : (
            <div>
              {qualifications.map((qual, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "14px 0",
                  borderBottom: i < qualifications.length - 1 ? "1px solid rgba(26,39,68,0.08)" : "none",
                }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%", background: "#F5ECD5",
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    fontSize: 11, fontWeight: 700, color: "#C9A84C",
                  }}>
                    {i + 1}
                  </div>
                  <span style={{ fontSize: 14, color: "#5A6478", flex: 1 }}>{qual}</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#38A169" strokeWidth="2.5" style={{ width: 16, height: 16, flexShrink: 0 }}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Qualifications Modal */}
      <AdminModal
        title="Edit Qualifications"
        subtitle="Requirements for full membership"
        open={qualsModalOpen}
        onClose={() => setQualsModalOpen(false)}
        onSave={save}
        width={640}
      >
        <div style={{ padding: 20, background: "#FAF8F3", borderRadius: 8 }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#C9A84C", marginBottom: 16 }}>
            Eligibility Requirements
          </div>

          {qualifications.map((qual, index) => (
            <div key={index} style={{
              display: "flex", gap: 12, alignItems: "center",
              padding: "14px 16px", background: "white",
              border: "1px solid rgba(26,39,68,0.1)", borderRadius: 8,
              marginBottom: 10, transition: "all 0.15s",
            }}>
              <div style={{
                width: 24, height: 24, borderRadius: "50%", background: "#F5ECD5",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                fontSize: 10, fontWeight: 700, color: "#C9A84C",
              }}>
                {index + 1}
              </div>
              <input
                type="text"
                value={qual}
                onChange={(e) => updateQual(index, e.target.value)}
                style={{ flex: 1 }}
              />
              <div style={{ display: "flex", gap: 4 }}>
                <button
                  className="btn-icon-sm"
                  onClick={() => moveQual(index, -1)}
                  title="Move up"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 12, height: 12 }}>
                    <polyline points="18 15 12 9 6 15" />
                  </svg>
                </button>
                <button
                  className="btn-icon-sm"
                  onClick={() => moveQual(index, 1)}
                  title="Move down"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 12, height: 12 }}>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                <button
                  className="btn-icon-sm danger"
                  onClick={() => removeQual(index)}
                  title="Remove"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 12, height: 12 }}>
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                </button>
              </div>
            </div>
          ))}

          <button className="btn-add" onClick={addQual} style={{ marginTop: 4 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Qualification
          </button>
        </div>
      </AdminModal>
    </>
  );
}