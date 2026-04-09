"use client";

import { useState, useEffect } from "react";
import { useSiteDoc, saveSiteDoc } from "@/lib/hooks";
import AdminModal from "./AdminModal";

const SummaryField = ({ label, value }: { label: string; value: string }) => (
  <div>
    <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#8B92A0" }}>{label}</span>
    <p style={{ fontSize: 14, color: "#1A2744", marginTop: 4 }}>{value || "Not set"}</p>
  </div>
);

const EditBtn = ({ onClick }: { onClick: () => void }) => (
  <button className="btn-preview" onClick={onClick}>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 16, height: 16 }}>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
    Edit
  </button>
);

export default function MembershipEditor() {
  const { data, loading } = useSiteDoc("membership");
  const [dues, setDues] = useState({ full: "", affiliate: "", sponsor: "" });
  const [deadline, setDeadline] = useState("");
  const [deadlineYear, setDeadlineYear] = useState("");
  const [qualifications, setQualifications] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [duesModal, setDuesModal] = useState(false);
  const [qualsModal, setQualsModal] = useState(false);

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

      {/* Dues & Deadline Summary */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3>Dues &amp; Deadline</h3>
          <EditBtn onClick={() => setDuesModal(true)} />
        </div>
        <div style={{ display: "grid", gap: 12 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            <SummaryField label="Full Member" value={dues.full} />
            <SummaryField label="Affiliate" value={dues.affiliate} />
            <SummaryField label="General Sponsor" value={dues.sponsor} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <SummaryField label="Application Deadline" value={deadline} />
            <SummaryField label="Deadline Year" value={deadlineYear} />
          </div>
        </div>
      </div>

      <AdminModal title="Edit Dues &amp; Deadline" open={duesModal} onClose={() => setDuesModal(false)}>
        <div className="field-row-3">
          <div className="field">
            <label>Full Member Dues</label>
            <input type="text" value={dues.full} onChange={(e) => setDues({ ...dues, full: e.target.value })} placeholder="$150" />
          </div>
          <div className="field">
            <label>Affiliate Dues</label>
            <input type="text" value={dues.affiliate} onChange={(e) => setDues({ ...dues, affiliate: e.target.value })} placeholder="$175" />
          </div>
          <div className="field">
            <label>General Sponsor Dues</label>
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
        <div className="admin-modal-actions">
          <button className="btn-preview" onClick={() => setDuesModal(false)}>Cancel</button>
          <button className="btn-save" onClick={() => setDuesModal(false)}>Save &amp; Close</button>
        </div>
      </AdminModal>

      {/* Qualifications Summary */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3>Full Member Qualifications</h3>
          <EditBtn onClick={() => setQualsModal(true)} />
        </div>
        <div style={{ display: "grid", gap: 8 }}>
          {qualifications.map((qual, i) => (
            <p key={i} style={{ fontSize: 13, color: "#1A2744", paddingLeft: 12, borderLeft: "2px solid #C9A84C" }}>
              {qual || <span style={{ color: "#8B92A0" }}>Empty qualification</span>}
            </p>
          ))}
          {qualifications.length === 0 && (
            <p style={{ fontSize: 13, color: "#8B92A0" }}>No qualifications added yet.</p>
          )}
        </div>
      </div>

      <AdminModal title="Edit Qualifications" open={qualsModal} onClose={() => setQualsModal(false)}>
        {qualifications.map((qual, index) => (
          <div key={index} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 16 }}>
            <div className="field" style={{ flex: 1, marginBottom: 0 }}>
              <label>Qualification {index + 1}</label>
              <input type="text" value={qual} onChange={(e) => updateQual(index, e.target.value)} />
            </div>
            <button
              className="btn-icon danger"
              onClick={() => removeQual(index)}
              style={{ marginTop: 28 }}
              title="Remove"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
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
        <div className="admin-modal-actions">
          <button className="btn-preview" onClick={() => setQualsModal(false)}>Cancel</button>
          <button className="btn-save" onClick={() => setQualsModal(false)}>Save &amp; Close</button>
        </div>
      </AdminModal>
    </>
  );
}
