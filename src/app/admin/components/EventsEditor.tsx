"use client";

import { useState, useEffect } from "react";
import { useSiteDoc, saveSiteDoc } from "@/lib/hooks";
import AdminModal from "./AdminModal";
import ImageUpload from "./ImageUpload";

interface Meeting {
  id: string;
  title: string;
  description: string;
  tag: string;
}

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

export default function EventsEditor() {
  const { data, loading } = useSiteDoc("events");
  const [tab, setTab] = useState<"expo" | "gala" | "meetings">("expo");
  const [expo, setExpo] = useState({
    name: "",
    year: "",
    venue: "",
    date: "",
    time: "",
    description: "",
    attendeeCount: "",
    vendorCount: "",
    yearsRunning: "",
    image: "",
  });
  const [gala, setGala] = useState({
    name: "",
    description: "",
    image: "",
  });
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [expoModal, setExpoModal] = useState(false);
  const [galaModal, setGalaModal] = useState(false);
  const [editingMeetingId, setEditingMeetingId] = useState<string | null>(null);

  useEffect(() => {
    if (!data) return;
    if (data.expo) setExpo(data.expo);
    if (data.gala) setGala(data.gala);
    if (data.meetings) setMeetings(data.meetings);
  }, [data]);

  const save = async () => {
    setSaving(true);
    await saveSiteDoc("events", { expo, gala, meetings });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateMeeting = (id: string, field: keyof Meeting, value: string) => {
    setMeetings(
      meetings.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  const addMeeting = () => {
    const newMeeting = {
      id: Date.now().toString(),
      title: "",
      description: "",
      tag: "",
    };
    setMeetings([...meetings, newMeeting]);
    setEditingMeetingId(newMeeting.id);
  };

  const removeMeeting = (id: string) => {
    if (confirm("Remove this meeting type?")) {
      setMeetings(meetings.filter((m) => m.id !== id));
      if (editingMeetingId === id) setEditingMeetingId(null);
    }
  };

  const editingMeeting = meetings.find((m) => m.id === editingMeetingId);

  if (loading) return <div style={{ padding: 40, color: "#8B92A0" }}>Loading...</div>;

  return (
    <>
      <div className="topbar">
        <h1>Events</h1>
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
        <div className={`tab ${tab === "expo" ? "active" : ""}`} onClick={() => setTab("expo")}>
          Expo / Trade Show
        </div>
        <div className={`tab ${tab === "gala" ? "active" : ""}`} onClick={() => setTab("gala")}>
          Winter Gala
        </div>
        <div className={`tab ${tab === "meetings" ? "active" : ""}`} onClick={() => setTab("meetings")}>
          Monthly Meetings
        </div>
      </div>

      {/* EXPO TAB */}
      {tab === "expo" && (
        <>
          <div className="admin-card">
            <div className="admin-card-header">
              <h3>Annual Expo &amp; Trade Show</h3>
              <EditBtn onClick={() => setExpoModal(true)} />
            </div>
            <div style={{ display: "grid", gap: 12 }}>
              <SummaryField label="Event Name" value={expo.name} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                <SummaryField label="Venue" value={expo.venue} />
                <SummaryField label="Date" value={expo.date ? `${expo.year} ${expo.date}` : expo.year} />
                <SummaryField label="Time" value={expo.time} />
              </div>
              <SummaryField label="Description" value={expo.description} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                <SummaryField label="Attendees" value={expo.attendeeCount} />
                <SummaryField label="Vendors" value={expo.vendorCount} />
                <SummaryField label="Years Running" value={expo.yearsRunning} />
              </div>
            </div>
          </div>

          <AdminModal title="Edit Expo Details" open={expoModal} onClose={() => setExpoModal(false)} width={720}>
            <div className="field-row">
              <div className="field">
                <label>Event Name</label>
                <input type="text" value={expo.name} onChange={(e) => setExpo({ ...expo, name: e.target.value })} />
              </div>
              <div className="field">
                <label>Year</label>
                <input type="text" value={expo.year} onChange={(e) => setExpo({ ...expo, year: e.target.value })} />
              </div>
            </div>
            <div className="field-row-3">
              <div className="field">
                <label>Venue</label>
                <input type="text" value={expo.venue} onChange={(e) => setExpo({ ...expo, venue: e.target.value })} />
              </div>
              <div className="field">
                <label>Date</label>
                <input type="text" value={expo.date} onChange={(e) => setExpo({ ...expo, date: e.target.value })} placeholder="e.g. September 15, 2025" />
              </div>
              <div className="field">
                <label>Time</label>
                <input type="text" value={expo.time} onChange={(e) => setExpo({ ...expo, time: e.target.value })} />
              </div>
            </div>
            <div className="field">
              <label>Description</label>
              <textarea value={expo.description} onChange={(e) => setExpo({ ...expo, description: e.target.value })} />
            </div>
            <div className="field-row-3">
              <div className="field">
                <label>Attendee Count</label>
                <input type="text" value={expo.attendeeCount} onChange={(e) => setExpo({ ...expo, attendeeCount: e.target.value })} />
              </div>
              <div className="field">
                <label>Vendor Count</label>
                <input type="text" value={expo.vendorCount} onChange={(e) => setExpo({ ...expo, vendorCount: e.target.value })} />
              </div>
              <div className="field">
                <label>Years Running</label>
                <input type="text" value={expo.yearsRunning} onChange={(e) => setExpo({ ...expo, yearsRunning: e.target.value })} />
              </div>
            </div>
            <ImageUpload value={expo.image} onChange={(url) => setExpo({ ...expo, image: url })} folder="events" label="Expo Image" recommendedSize="800x600px" />
            <div className="admin-modal-actions">
              <button className="btn-preview" onClick={() => setExpoModal(false)}>Cancel</button>
              <button className="btn-save" onClick={() => setExpoModal(false)}>Save &amp; Close</button>
            </div>
          </AdminModal>
        </>
      )}

      {/* GALA TAB */}
      {tab === "gala" && (
        <>
          <div className="admin-card">
            <div className="admin-card-header">
              <h3>Winter Gala</h3>
              <EditBtn onClick={() => setGalaModal(true)} />
            </div>
            <div style={{ display: "grid", gap: 12 }}>
              <SummaryField label="Event Name" value={gala.name} />
              <SummaryField label="Description" value={gala.description} />
            </div>
          </div>

          <AdminModal title="Edit Gala Details" open={galaModal} onClose={() => setGalaModal(false)}>
            <div className="field">
              <label>Event Name</label>
              <input type="text" value={gala.name} onChange={(e) => setGala({ ...gala, name: e.target.value })} />
            </div>
            <div className="field">
              <label>Description</label>
              <textarea value={gala.description} onChange={(e) => setGala({ ...gala, description: e.target.value })} />
            </div>
            <ImageUpload value={gala.image} onChange={(url) => setGala({ ...gala, image: url })} folder="events" label="Gala Image" recommendedSize="800x600px" />
            <div className="admin-modal-actions">
              <button className="btn-preview" onClick={() => setGalaModal(false)}>Cancel</button>
              <button className="btn-save" onClick={() => setGalaModal(false)}>Save &amp; Close</button>
            </div>
          </AdminModal>
        </>
      )}

      {/* MEETINGS TAB */}
      {tab === "meetings" && (
        <>
          <div className="admin-card">
            <div className="admin-card-header">
              <h3>Meeting Types</h3>
              <span>{meetings.length} types</span>
            </div>

            {meetings.map((meeting) => (
              <div
                key={meeting.id}
                style={{
                  padding: 24,
                  background: "#FAF8F3",
                  border: "1px solid rgba(26,39,68,0.08)",
                  borderRadius: 8,
                  marginBottom: 16,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <h4 style={{ fontSize: 14, fontWeight: 600, color: "#1A2744" }}>
                      {meeting.title || "Untitled Meeting"}
                    </h4>
                    {meeting.tag && (
                      <span style={{ fontSize: 11, color: "#8B92A0", marginTop: 2, display: "block" }}>{meeting.tag}</span>
                    )}
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button className="btn-icon" onClick={() => setEditingMeetingId(meeting.id)} title="Edit">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
                        <path d="M12 20h9" />
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                      </svg>
                    </button>
                    <button className="btn-icon danger" onClick={() => removeMeeting(meeting.id)} title="Remove">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <button className="btn-add" onClick={addMeeting}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 16, height: 16 }}>
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add Meeting Type
            </button>
          </div>

          <AdminModal
            title="Edit Meeting Type"
            subtitle={editingMeeting?.title || "New Meeting"}
            open={!!editingMeeting}
            onClose={() => setEditingMeetingId(null)}
          >
            {editingMeeting && (
              <>
                <div className="field-row">
                  <div className="field">
                    <label>Title</label>
                    <input type="text" value={editingMeeting.title} onChange={(e) => updateMeeting(editingMeeting.id, "title", e.target.value)} />
                  </div>
                  <div className="field">
                    <label>Tag / Badge</label>
                    <input type="text" value={editingMeeting.tag} onChange={(e) => updateMeeting(editingMeeting.id, "tag", e.target.value)} placeholder="e.g. 35-50 Attendees" />
                  </div>
                </div>
                <div className="field">
                  <label>Description</label>
                  <textarea value={editingMeeting.description} onChange={(e) => updateMeeting(editingMeeting.id, "description", e.target.value)} />
                </div>
                <div className="admin-modal-actions">
                  <button className="btn-preview" onClick={() => setEditingMeetingId(null)}>Cancel</button>
                  <button className="btn-save" onClick={() => setEditingMeetingId(null)}>Save &amp; Close</button>
                </div>
              </>
            )}
          </AdminModal>
        </>
      )}
    </>
  );
}
