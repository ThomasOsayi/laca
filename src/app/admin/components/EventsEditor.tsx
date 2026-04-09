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

interface ExpoForm {
  name: string;
  year: string;
  venue: string;
  date: string;
  time: string;
  description: string;
  attendeeCount: string;
  vendorCount: string;
  yearsRunning: string;
  image: string;
}

interface GalaForm {
  name: string;
  description: string;
  image: string;
}

const emptyExpo: ExpoForm = {
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
};

function str(v: unknown): string {
  return v == null ? "" : String(v);
}

function toExpoForm(raw: unknown): ExpoForm {
  const o =
    raw && typeof raw === "object" && !Array.isArray(raw)
      ? (raw as Record<string, unknown>)
      : {};
  return {
    name: str(o.name),
    year: str(o.year),
    venue: str(o.venue),
    date: str(o.date),
    time: str(o.time),
    description: str(o.description),
    attendeeCount: str(o.attendeeCount),
    vendorCount: str(o.vendorCount),
    yearsRunning: str(o.yearsRunning),
    image: str(o.image),
  };
}

function toGalaForm(raw: unknown): GalaForm {
  const o =
    raw && typeof raw === "object" && !Array.isArray(raw)
      ? (raw as Record<string, unknown>)
      : {};
  return {
    name: str(o.name),
    description: str(o.description),
    image: str(o.image),
  };
}

function toMeetings(raw: unknown): Meeting[] {
  if (!Array.isArray(raw)) return [];
  return raw.map((item, i) => {
    const o =
      item && typeof item === "object" && !Array.isArray(item)
        ? (item as Record<string, unknown>)
        : {};
    return {
      id: str(o.id) || String(i),
      title: str(o.title),
      description: str(o.description),
      tag: str(o.tag),
    };
  });
}

export default function EventsEditor() {
  const { data, loading } = useSiteDoc("events");
  const [tab, setTab] = useState<"expo" | "gala" | "meetings">("expo");
  const [expo, setExpo] = useState<ExpoForm>(emptyExpo);
  const [gala, setGala] = useState<GalaForm>({ name: "", description: "", image: "" });
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Modal states
  const [expoModalOpen, setExpoModalOpen] = useState(false);
  const [galaModalOpen, setGalaModalOpen] = useState(false);
  const [editingMeetingId, setEditingMeetingId] = useState<string | null>(null);

  useEffect(() => {
    if (!data) return;
    if (data.expo) setExpo(toExpoForm(data.expo));
    if (data.gala) setGala(toGalaForm(data.gala));
    if (data.meetings) setMeetings(toMeetings(data.meetings));
  }, [data]);

  const save = async () => {
    setSaving(true);
    await saveSiteDoc("events", { expo, gala, meetings });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateMeeting = (id: string, field: keyof Meeting, value: string) => {
    setMeetings(meetings.map((m) => (m.id === id ? { ...m, [field]: value } : m)));
  };

  const addMeeting = () => {
    const newMeeting: Meeting = { id: Date.now().toString(), title: "", description: "", tag: "" };
    setMeetings([...meetings, newMeeting]);
    setEditingMeetingId(newMeeting.id);
  };

  const removeMeeting = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
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
            <span style={{ fontSize: 13, color: "#38A169", fontWeight: 500 }}>Saved!</span>
          )}
          <button className="btn-save" onClick={save} disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      <div className="tabs">
        <div className={`tab ${tab === "expo" ? "active" : ""}`} onClick={() => setTab("expo")}>Expo / Trade Show</div>
        <div className={`tab ${tab === "gala" ? "active" : ""}`} onClick={() => setTab("gala")}>Winter Gala</div>
        <div className={`tab ${tab === "meetings" ? "active" : ""}`} onClick={() => setTab("meetings")}>Monthly Meetings</div>
      </div>

      {/* ===== EXPO TAB ===== */}
      {tab === "expo" && (
        <>
          <div className="card">
            <div className="card-header">
              <h3>Annual Expo &amp; Trade Show</h3>
              <button className="btn-edit-sm" onClick={() => setExpoModalOpen(true)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                Edit
              </button>
            </div>
            <div className="card-body">
              <div className="summary-grid">
                <div className="summary-item">
                  <div className="summary-label">Event Name</div>
                  <div className="summary-value">{expo.name || <span className="empty">Not set</span>}</div>
                </div>
                <div className="summary-item">
                  <div className="summary-label">Year</div>
                  <div className="summary-value">{expo.year || <span className="empty">Not set</span>}</div>
                </div>
                <div className="summary-item">
                  <div className="summary-label">Venue</div>
                  <div className="summary-value">{expo.venue || <span className="empty">Not set</span>}</div>
                </div>
                <div className="summary-item">
                  <div className="summary-label">Date</div>
                  <div className={`summary-value ${!expo.date || expo.date === "TBA" ? "empty" : ""}`}>{expo.date || "TBA"}</div>
                </div>
                <div className="summary-item">
                  <div className="summary-label">Attendees</div>
                  <div className="summary-value">{expo.attendeeCount || <span className="empty">Not set</span>}</div>
                </div>
                <div className="summary-item">
                  <div className="summary-label">Vendors</div>
                  <div className="summary-value">{expo.vendorCount || <span className="empty">Not set</span>}</div>
                </div>
              </div>
            </div>
          </div>

          <AdminModal
            title="Edit Expo Details"
            subtitle="Annual Expo & Hospitality Trade Show"
            open={expoModalOpen}
            onClose={() => setExpoModalOpen(false)}
            width={680}
          >
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
            <ImageUpload
              value={expo.image}
              onChange={(url) => setExpo({ ...expo, image: url })}
              folder="events"
              label="Expo Image"
              recommendedSize="800x600px"
            />
          </AdminModal>
        </>
      )}

      {/* ===== GALA TAB ===== */}
      {tab === "gala" && (
        <>
          <div className="card">
            <div className="card-header">
              <h3>Winter Gala</h3>
              <button className="btn-edit-sm" onClick={() => setGalaModalOpen(true)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                Edit
              </button>
            </div>
            <div className="card-body">
              <div className="summary-grid">
                <div className="summary-item">
                  <div className="summary-label">Event Name</div>
                  <div className="summary-value">{gala.name || <span className="empty">Not set</span>}</div>
                </div>
                <div className="summary-item" style={{ gridColumn: "span 2" }}>
                  <div className="summary-label">Description</div>
                  <div className="summary-value">
                    {gala.description ? (gala.description.length > 120 ? gala.description.substring(0, 120) + "..." : gala.description) : <span className="empty">Not set</span>}
                  </div>
                </div>
                <div className="summary-item">
                  <div className="summary-label">Gala Image</div>
                  <div className={`summary-value ${!gala.image ? "empty" : ""}`}>{gala.image ? "Custom image set" : "Using default"}</div>
                </div>
              </div>
            </div>
          </div>

          <AdminModal
            title="Edit Gala Details"
            subtitle="Annual Winter Gala & Celebration"
            open={galaModalOpen}
            onClose={() => setGalaModalOpen(false)}
          >
            <div className="field">
              <label>Event Name</label>
              <input type="text" value={gala.name} onChange={(e) => setGala({ ...gala, name: e.target.value })} />
            </div>
            <div className="field">
              <label>Description</label>
              <textarea value={gala.description} onChange={(e) => setGala({ ...gala, description: e.target.value })} />
            </div>
            <ImageUpload
              value={gala.image}
              onChange={(url) => setGala({ ...gala, image: url })}
              folder="events"
              label="Gala Image"
              recommendedSize="800x600px"
            />
          </AdminModal>
        </>
      )}

      {/* ===== MEETINGS TAB ===== */}
      {tab === "meetings" && (
        <>
          <div className="card">
            <div className="card-header">
              <div style={{ display: "flex", alignItems: "center" }}>
                <h3>Meeting Types</h3>
                <span className="count">{meetings.length}</span>
              </div>
            </div>

            {meetings.length === 0 ? (
              <div className="empty-state">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <h4>No meeting types yet</h4>
                <p>Add your first meeting type below.</p>
              </div>
            ) : (
              <div className="member-list">
                {meetings.map((meeting) => (
                  <div
                    className="member-row"
                    key={meeting.id}
                    onClick={() => setEditingMeetingId(meeting.id)}
                    style={{ justifyContent: "space-between" }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h4 style={{ fontSize: 14, fontWeight: 600, color: "#1A2744", marginBottom: 2 }}>
                        {meeting.title || "Untitled Meeting"}
                      </h4>
                      <p style={{ fontSize: 12, color: "#8B92A0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {meeting.description || "No description"}
                      </p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      {meeting.tag && (
                        <span style={{
                          fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const,
                          color: "#C9A84C", background: "#F5ECD5", padding: "4px 10px", borderRadius: 100, whiteSpace: "nowrap",
                        }}>
                          {meeting.tag}
                        </span>
                      )}
                      <button
                        className="btn-icon-sm danger"
                        onClick={(e) => removeMeeting(meeting.id, e)}
                        title="Remove"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="btn-add-row" onClick={addMeeting}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add Meeting Type
            </div>
          </div>

          <AdminModal
            title="Edit Meeting Type"
            subtitle={editingMeeting ? editingMeeting.title || "New Meeting" : ""}
            open={!!editingMeeting}
            onClose={() => setEditingMeetingId(null)}
          >
            {editingMeeting && (
              <>
                <div className="field-row">
                  <div className="field">
                    <label>Title</label>
                    <input
                      type="text"
                      value={editingMeeting.title}
                      onChange={(e) => updateMeeting(editingMeeting.id, "title", e.target.value)}
                      placeholder="e.g. Monthly Member Meetings"
                    />
                  </div>
                  <div className="field">
                    <label>Tag / Badge</label>
                    <input
                      type="text"
                      value={editingMeeting.tag}
                      onChange={(e) => updateMeeting(editingMeeting.id, "tag", e.target.value)}
                      placeholder="e.g. 35-50 Attendees"
                    />
                  </div>
                </div>
                <div className="field">
                  <label>Description</label>
                  <textarea
                    value={editingMeeting.description}
                    onChange={(e) => updateMeeting(editingMeeting.id, "description", e.target.value)}
                  />
                </div>
              </>
            )}
          </AdminModal>
        </>
      )}
    </>
  );
}