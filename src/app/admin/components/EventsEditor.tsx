"use client";

import { useState, useEffect } from "react";
import { useSiteDoc, saveSiteDoc } from "@/lib/hooks";

interface Meeting {
  id: string;
  title: string;
  description: string;
  tag: string;
}

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
    setMeetings([
      ...meetings,
      {
        id: Date.now().toString(),
        title: "",
        description: "",
        tag: "",
      },
    ]);
  };

  const removeMeeting = (id: string) => {
    if (confirm("Remove this meeting type?")) {
      setMeetings(meetings.filter((m) => m.id !== id));
    }
  };

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
        <div
          className={`tab ${tab === "expo" ? "active" : ""}`}
          onClick={() => setTab("expo")}
        >
          Expo / Trade Show
        </div>
        <div
          className={`tab ${tab === "gala" ? "active" : ""}`}
          onClick={() => setTab("gala")}
        >
          Winter Gala
        </div>
        <div
          className={`tab ${tab === "meetings" ? "active" : ""}`}
          onClick={() => setTab("meetings")}
        >
          Monthly Meetings
        </div>
      </div>

      {/* EXPO TAB */}
      {tab === "expo" && (
        <div className="admin-card">
          <div className="admin-card-header">
            <h3>Annual Expo &amp; Trade Show</h3>
            <span className="event-badge" style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#C9A84C", background: "#F5ECD5", padding: "4px 10px", borderRadius: 100 }}>
              Premier Event
            </span>
          </div>

          <div className="field-row">
            <div className="field">
              <label>Event Name</label>
              <input
                type="text"
                value={expo.name}
                onChange={(e) => setExpo({ ...expo, name: e.target.value })}
              />
            </div>
            <div className="field">
              <label>Year</label>
              <input
                type="text"
                value={expo.year}
                onChange={(e) => setExpo({ ...expo, year: e.target.value })}
              />
            </div>
          </div>

          <div className="field-row-3">
            <div className="field">
              <label>Venue</label>
              <input
                type="text"
                value={expo.venue}
                onChange={(e) => setExpo({ ...expo, venue: e.target.value })}
              />
            </div>
            <div className="field">
              <label>Date</label>
              <input
                type="text"
                value={expo.date}
                onChange={(e) => setExpo({ ...expo, date: e.target.value })}
                placeholder="e.g. September 15, 2025"
              />
            </div>
            <div className="field">
              <label>Time</label>
              <input
                type="text"
                value={expo.time}
                onChange={(e) => setExpo({ ...expo, time: e.target.value })}
              />
            </div>
          </div>

          <div className="field">
            <label>Description</label>
            <textarea
              value={expo.description}
              onChange={(e) => setExpo({ ...expo, description: e.target.value })}
            />
          </div>

          <div className="field-row-3">
            <div className="field">
              <label>Attendee Count</label>
              <input
                type="text"
                value={expo.attendeeCount}
                onChange={(e) => setExpo({ ...expo, attendeeCount: e.target.value })}
              />
            </div>
            <div className="field">
              <label>Vendor Count</label>
              <input
                type="text"
                value={expo.vendorCount}
                onChange={(e) => setExpo({ ...expo, vendorCount: e.target.value })}
              />
            </div>
            <div className="field">
              <label>Years Running</label>
              <input
                type="text"
                value={expo.yearsRunning}
                onChange={(e) => setExpo({ ...expo, yearsRunning: e.target.value })}
              />
            </div>
          </div>

          <div className="field">
            <label>Expo Image URL</label>
            <input
              type="text"
              value={expo.image}
              onChange={(e) => setExpo({ ...expo, image: e.target.value })}
              placeholder="https://... (leave blank for default)"
            />
            <div className="field-hint">Recommended: 800x600px</div>
          </div>
        </div>
      )}

      {/* GALA TAB */}
      {tab === "gala" && (
        <div className="admin-card">
          <div className="admin-card-header">
            <h3>Winter Gala</h3>
          </div>

          <div className="field">
            <label>Event Name</label>
            <input
              type="text"
              value={gala.name}
              onChange={(e) => setGala({ ...gala, name: e.target.value })}
            />
          </div>

          <div className="field">
            <label>Description</label>
            <textarea
              value={gala.description}
              onChange={(e) => setGala({ ...gala, description: e.target.value })}
            />
          </div>

          <div className="field">
            <label>Gala Image URL</label>
            <input
              type="text"
              value={gala.image}
              onChange={(e) => setGala({ ...gala, image: e.target.value })}
              placeholder="https://... (leave blank for default)"
            />
            <div className="field-hint">Recommended: 800x600px</div>
          </div>
        </div>
      )}

      {/* MEETINGS TAB */}
      {tab === "meetings" && (
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
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <h4 style={{ fontSize: 14, fontWeight: 600, color: "#1A2744" }}>
                  {meeting.title || "Untitled Meeting"}
                </h4>
                <button
                  className="btn-icon danger"
                  onClick={() => removeMeeting(meeting.id)}
                  title="Remove"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                </button>
              </div>

              <div className="field-row">
                <div className="field">
                  <label>Title</label>
                  <input
                    type="text"
                    value={meeting.title}
                    onChange={(e) => updateMeeting(meeting.id, "title", e.target.value)}
                  />
                </div>
                <div className="field">
                  <label>Tag / Badge</label>
                  <input
                    type="text"
                    value={meeting.tag}
                    onChange={(e) => updateMeeting(meeting.id, "tag", e.target.value)}
                    placeholder="e.g. 35-50 Attendees"
                  />
                </div>
              </div>

              <div className="field">
                <label>Description</label>
                <textarea
                  value={meeting.description}
                  onChange={(e) => updateMeeting(meeting.id, "description", e.target.value)}
                />
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
      )}
    </>
  );
}