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
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            <div style={{ textAlign: "center", padding: 20, background: "#FAF8F3", borderRadius: 8 }}>
              <div style={{ fontSize: 24, fontWeight: 600, color: "#C9A84C" }}>{dues.full || "$150"}</div>
              <div style={{ fontSize: 11, color: "#8B92A0", textTransform: "uppercase" as const, letterSpacing: "0.08em", marginTop: 6 }}>Full Member</div>
            </div>
            <div style={{ textAlign: "center", padding: 20, background: "#FAF8F3", borderRadius: 8 }}>
              <div style={{ fontSize: 24, fontWeight: 600, color: "#C9A84C" }}>{dues.affiliate || "$175"}</div>
              <div style={{ fontSize: 11, color: "#8B92A0", textTransform: "uppercase" as const, letterSpacing: "0.08em", marginTop: 6 }}>Affiliate</div>
            </div>
            <div style={{ textAlign: "center", padding: 20, background: "#FAF8F3", borderRadius: 8 }}>
              <div style={{ fontSize: 24, fontWeight: 600, color: "#C9A84C" }}>{dues.sponsor || "$800"}</div>
              <div style={{ fontSize: 11, color: "#8B92A0", textTransform: "uppercase" as const, letterSpacing: "0.08em", marginTop: 6 }}>Sponsor</div>
            </div>
            <div style={{ textAlign: "center", padding: 20, background: "#FAF8F3", borderRadius: 8 }}>
              <div style={{ fontSize: 16, fontWeight: 600, color: "#1A2744" }}>{deadline ? deadline.replace(/,?\s*\d{4}$/, "") : "May 15"}</div>
              <div style={{ fontSize: 11, color: "#8B92A0", textTransform: "uppercase" as const, letterSpacing: "0.08em", marginTop: 6 }}>Deadline {deadlineYear || "2026"}</div>
            </div>
          </div>
        </div>
      </div>

      <AdminModal
        title="Edit Dues & Deadline"
        subtitle="Membership pricing and application deadline"
        open={duesModalOpen}
        onClose={() => setDuesModalOpen(false)}
        width={560}
      >
        <div className="field-row-3">
          <div className="field">
            <label>Full Member</label>
            <input type="text" value={dues.full} onChange={(e) => setDues({ ...dues, full: e.target.value })} placeholder="$150" />
          </div>
          <div className="field">
            <label>Affiliate</label>
            <input type="text" value={dues.affiliate} onChange={(e) => setDues({ ...dues, affiliate: e.target.value })} placeholder="$175" />
          </div>
          <div className="field">
            <label>Sponsor</label>
            <input type="text" value={dues.sponsor} onChange={(e) => setDues({ ...dues, sponsor: e.target.value })} placeholder="$800" />
          </div>
        </div>
        <div className="field-row">
          <div className="field">
            <label>Application Deadline</label>
            <input type="text" value={deadline} onChange={(e) => setDeadline(e.target.value)} placeholder="May 15, 2026" />
          </div>
          <div className="field">
            <label>Deadline Year</label>
            <input type="text" value={deadlineYear} onChange={(e) => setDeadlineYear(e.target.value)} placeholder="2026" />
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
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {qualifications.map((qual, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: "50%", border: "1.5px solid #C9A84C",
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1,
                  }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="3" style={{ width: 12, height: 12 }}>
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span style={{ fontSize: 14, color: "#1A2744" }}>{qual}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <AdminModal
        title="Edit Qualifications"
        subtitle="Requirements for full membership"
        open={qualsModalOpen}
        onClose={() => setQualsModalOpen(false)}
        width={640}
      >
        {qualifications.map((qual, index) => (
          <div key={index} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 16 }}>
            <div className="field" style={{ flex: 1, marginBottom: 0 }}>
              <label>Qualification {index + 1}</label>
              <input type="text" value={qual} onChange={(e) => updateQual(index, e.target.value)} />
            </div>
            <button
              className="btn-icon-sm danger"
              onClick={() => removeQual(index)}
              style={{ marginTop: 28 }}
              title="Remove"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 13, height: 13 }}>
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </button>
          </div>
        ))}
        <button className="btn-add" onClick={addQual}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 16, height: 16 }}>
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Qualification
        </button>
      </AdminModal>
    </>
  );
}