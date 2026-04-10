"use client";

import { useState, useEffect, type ReactElement } from "react";
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

interface SpecialEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  image: string;
}

const emptyExpo: ExpoForm = {
  name: "", year: "", venue: "", date: "", time: "",
  description: "", attendeeCount: "", vendorCount: "", yearsRunning: "", image: "",
};

function str(v: unknown): string { return v == null ? "" : String(v); }

function toExpoForm(raw: unknown): ExpoForm {
  const o = raw && typeof raw === "object" && !Array.isArray(raw) ? (raw as Record<string, unknown>) : {};
  return {
    name: str(o.name), year: str(o.year), venue: str(o.venue), date: str(o.date),
    time: str(o.time), description: str(o.description), attendeeCount: str(o.attendeeCount),
    vendorCount: str(o.vendorCount), yearsRunning: str(o.yearsRunning), image: str(o.image),
  };
}

function toGalaForm(raw: unknown): GalaForm {
  const o = raw && typeof raw === "object" && !Array.isArray(raw) ? (raw as Record<string, unknown>) : {};
  return { name: str(o.name), description: str(o.description), image: str(o.image) };
}

function toMeetings(raw: unknown): Meeting[] {
  if (!Array.isArray(raw)) return [];
  return raw.map((item, i) => {
    const o = item && typeof item === "object" && !Array.isArray(item) ? (item as Record<string, unknown>) : {};
    return { id: str(o.id) || String(i), title: str(o.title), description: str(o.description), tag: str(o.tag) };
  });
}

function toSpecialEvents(raw: unknown): SpecialEvent[] {
  if (!Array.isArray(raw)) return [];
  return raw.map((item, i) => {
    const o = item && typeof item === "object" && !Array.isArray(item) ? (item as Record<string, unknown>) : {};
    return {
      id: str(o.id) || String(i),
      title: str(o.title),
      date: str(o.date),
      time: str(o.time),
      venue: str(o.venue),
      description: str(o.description),
      image: str(o.image),
    };
  });
}

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
  </svg>
);
const PinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);
const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);
const WarnIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const meetingIcons: Record<string, ReactElement> = {
  default: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 16, height: 16, color: "#C9A84C" }}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
};

export default function EventsEditor() {
  const { data, loading } = useSiteDoc("events");
  const [tab, setTab] = useState<"expo" | "gala" | "meetings" | "special">("expo");
  const [expo, setExpo] = useState<ExpoForm>(emptyExpo);
  const [gala, setGala] = useState<GalaForm>({ name: "", description: "", image: "" });
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [specialEvents, setSpecialEvents] = useState<SpecialEvent[]>([]);
  const [editingSpecialId, setEditingSpecialId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [expoModalOpen, setExpoModalOpen] = useState(false);
  const [galaModalOpen, setGalaModalOpen] = useState(false);
  const [editingMeetingId, setEditingMeetingId] = useState<string | null>(null);

  useEffect(() => {
    if (!data) return;
    if (data.expo) setExpo(toExpoForm(data.expo));
    if (data.gala) setGala(toGalaForm(data.gala));
    if (data.meetings) setMeetings(toMeetings(data.meetings));
    if (data.specialEvents) setSpecialEvents(toSpecialEvents(data.specialEvents));
  }, [data]);

  const save = async () => {
    setSaving(true);
    await saveSiteDoc("events", { expo, gala, meetings, specialEvents });
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

  const addSpecialEvent = () => {
    const newEvent: SpecialEvent = {
      id: Date.now().toString(),
      title: "",
      date: "",
      time: "",
      venue: "",
      description: "",
      image: "",
    };
    setSpecialEvents([...specialEvents, newEvent]);
    setEditingSpecialId(newEvent.id);
  };

  const updateSpecialEvent = (id: string, field: keyof SpecialEvent, value: string) => {
    setSpecialEvents(specialEvents.map((ev) => (ev.id === id ? { ...ev, [field]: value } : ev)));
  };

  const removeSpecialEvent = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Remove this event?")) {
      setSpecialEvents(specialEvents.filter((ev) => ev.id !== id));
      if (editingSpecialId === id) setEditingSpecialId(null);
    }
  };

  const editingSpecial = specialEvents.find((e) => e.id === editingSpecialId);
  const editingMeeting = meetings.find((m) => m.id === editingMeetingId);
  const dateTBA = !expo.date || expo.date === "TBA";

  if (loading) return <div style={{ padding: 40, color: "#8B92A0" }}>Loading...</div>;

  const chipStyle: React.CSSProperties = {
    display: "inline-flex", alignItems: "center", gap: 6,
    padding: "6px 14px", borderRadius: 100, fontSize: 12, fontWeight: 500,
    background: "#FAF8F3", border: "1px solid rgba(26,39,68,0.08)",
  };
  const chipWarnStyle: React.CSSProperties = {
    ...chipStyle,
    background: "#FFFBEB", borderColor: "rgba(214,158,46,0.2)", color: "#D69E2E",
  };

  return (
    <>
      <div className="topbar">
        <h1>Events</h1>
        <div className="topbar-actions">
          {saved && <span style={{ fontSize: 13, color: "#38A169", fontWeight: 500 }}>Saved!</span>}
          <button className="btn-save" onClick={save} disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      <div className="tabs">
        <div className={`tab ${tab === "expo" ? "active" : ""}`} onClick={() => setTab("expo")}>Expo / Trade Show</div>
        <div className={`tab ${tab === "gala" ? "active" : ""}`} onClick={() => setTab("gala")}>Winter Gala</div>
        <div className={`tab ${tab === "meetings" ? "active" : ""}`} onClick={() => setTab("meetings")}>Monthly Meetings</div>
        <div className={`tab ${tab === "special" ? "active" : ""}`} onClick={() => setTab("special")}>Special Events</div>
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
              {/* Image + Info row */}
              <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 24, marginBottom: 24 }}>
                <div style={{
                  width: 200, height: 140, borderRadius: 8, overflow: "hidden",
                  background: "#FAF8F3", border: "1px solid rgba(26,39,68,0.08)",
                }}>
                  {expo.image ? (
                    <img src={expo.image} alt={expo.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, color: "#8B92A0" }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 24, height: 24, opacity: 0.4 }}>
                        <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                      </svg>
                      <span style={{ fontSize: 11, fontWeight: 500 }}>No image</span>
                    </div>
                  )}
                </div>
                <div>
                  <h4 style={{ fontSize: 18, fontWeight: 600, color: "#1A2744", marginBottom: 8 }}>
                    {expo.name || "Untitled Event"}
                  </h4>
                  {expo.description && (
                    <p style={{
                      fontSize: 13, color: "#5A6478", lineHeight: 1.6, marginBottom: 16,
                      display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, overflow: "hidden",
                    }}>
                      {expo.description}
                    </p>
                  )}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                    {expo.year && (
                      <span style={chipStyle}><CalendarIcon /> {expo.year}</span>
                    )}
                    {expo.venue && (
                      <span style={chipStyle}><PinIcon /> {expo.venue}</span>
                    )}
                    {dateTBA ? (
                      <span style={chipWarnStyle}><WarnIcon /> Date TBA</span>
                    ) : (
                      <span style={chipStyle}><CalendarIcon /> {expo.date}</span>
                    )}
                    {expo.time && (
                      <span style={chipStyle}><ClockIcon /> {expo.time}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Stats row */}
              <div style={{
                display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16,
                paddingTop: 24, borderTop: "1px solid rgba(26,39,68,0.08)",
              }}>
                {[
                  { num: expo.yearsRunning || "—", label: "Years Running" },
                  { num: expo.attendeeCount || "—", label: "Attendees" },
                  { num: expo.vendorCount || "—", label: "Vendors" },
                ].map((s, i) => (
                  <div key={i} style={{ textAlign: "center", padding: 16, background: "#FAF8F3", borderRadius: 8 }}>
                    <div style={{ fontSize: 24, fontWeight: 600, color: "#C9A84C", lineHeight: 1, marginBottom: 4 }}>{s.num}</div>
                    <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#8B92A0" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <AdminModal title="Edit Expo Details" subtitle="Annual Expo & Hospitality Trade Show" open={expoModalOpen} onClose={() => setExpoModalOpen(false)} onSave={save} width={680}>
            {/* Event Details */}
            <div style={{ padding: 20, background: "#FAF8F3", borderRadius: 8, marginBottom: 24 }}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#C9A84C", marginBottom: 16 }}>
                Event Details
              </div>
              <div className="field-row">
                <div className="field"><label>Event Name</label><input type="text" value={expo.name} onChange={(e) => setExpo({ ...expo, name: e.target.value })} /></div>
                <div className="field"><label>Year</label><input type="text" value={expo.year} onChange={(e) => setExpo({ ...expo, year: e.target.value })} /></div>
              </div>
              <div className="field-row-3">
                <div className="field" style={{ marginBottom: 0 }}><label>Venue</label><input type="text" value={expo.venue} onChange={(e) => setExpo({ ...expo, venue: e.target.value })} /></div>
                <div className="field" style={{ marginBottom: 0 }}><label>Date</label><input type="text" value={expo.date} onChange={(e) => setExpo({ ...expo, date: e.target.value })} placeholder="e.g. September 15, 2025" /></div>
                <div className="field" style={{ marginBottom: 0 }}><label>Time</label><input type="text" value={expo.time} onChange={(e) => setExpo({ ...expo, time: e.target.value })} /></div>
              </div>
            </div>

            {/* Description */}
            <div style={{ padding: 20, background: "#FAF8F3", borderRadius: 8, marginBottom: 24 }}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#C9A84C", marginBottom: 16 }}>
                Description
              </div>
              <div className="field" style={{ marginBottom: 0 }}>
                <textarea value={expo.description} onChange={(e) => setExpo({ ...expo, description: e.target.value })} style={{ minHeight: 120 }} />
              </div>
            </div>

            {/* Stats */}
            <div style={{ padding: 20, background: "#FAF8F3", borderRadius: 8, marginBottom: 24 }}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#C9A84C", marginBottom: 16 }}>
                Stats
              </div>
              <div className="field-row-3">
                <div className="field" style={{ marginBottom: 0 }}><label>Attendee Count</label><input type="text" value={expo.attendeeCount} onChange={(e) => setExpo({ ...expo, attendeeCount: e.target.value })} placeholder="e.g. 200–350" /></div>
                <div className="field" style={{ marginBottom: 0 }}><label>Vendor Count</label><input type="text" value={expo.vendorCount} onChange={(e) => setExpo({ ...expo, vendorCount: e.target.value })} placeholder="e.g. 45–65" /></div>
                <div className="field" style={{ marginBottom: 0 }}><label>Years Running</label><input type="text" value={expo.yearsRunning} onChange={(e) => setExpo({ ...expo, yearsRunning: e.target.value })} placeholder="e.g. 10+" /></div>
              </div>
            </div>

            {/* Image */}
            <div style={{ padding: 20, background: "#FAF8F3", borderRadius: 8 }}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#C9A84C", marginBottom: 16 }}>
                Event Image
              </div>
              <ImageUpload value={expo.image} onChange={(url) => setExpo({ ...expo, image: url })} folder="events" label="" recommendedSize="800x600px" />
            </div>
          </AdminModal>
        </>
      )}

      {/* ===== GALA TAB ===== */}
      {tab === "gala" && (
        <>
          <div className="card">
            <div className="card-header">
              <h3>Winter Gala &amp; Holiday Party</h3>
              <button className="btn-edit-sm" onClick={() => setGalaModalOpen(true)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                Edit
              </button>
            </div>
            <div className="card-body">
              <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 24 }}>
                <div style={{
                  width: 200, height: 140, borderRadius: 8, overflow: "hidden",
                  background: "#FAF8F3", border: "1px solid rgba(26,39,68,0.08)",
                }}>
                  {gala.image ? (
                    <img src={gala.image} alt={gala.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, color: "#8B92A0" }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 24, height: 24, opacity: 0.4 }}>
                        <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                      </svg>
                      <span style={{ fontSize: 11, fontWeight: 500 }}>No image</span>
                    </div>
                  )}
                </div>
                <div>
                  <h4 style={{ fontSize: 18, fontWeight: 600, color: "#1A2744", marginBottom: 8 }}>
                    {gala.name || "Untitled Event"}
                  </h4>
                  {gala.description ? (
                    <p style={{
                      fontSize: 13, color: "#5A6478", lineHeight: 1.6, marginBottom: 16,
                      display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, overflow: "hidden",
                    }}>
                      {gala.description}
                    </p>
                  ) : (
                    <p style={{ fontSize: 13, color: "#8B92A0", fontStyle: "italic", marginBottom: 16 }}>No description set</p>
                  )}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                    <span style={chipStyle}>
                      <CalendarIcon /> December
                    </span>
                    <span style={chipStyle}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      Awards Night
                    </span>
                    <span style={chipStyle}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
                      </svg>
                      Members Only
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <AdminModal title="Edit Gala Details" subtitle="Annual Winter Gala & Celebration" open={galaModalOpen} onClose={() => setGalaModalOpen(false)} onSave={save} width={640}>
            {/* Event Details */}
            <div style={{ padding: 20, background: "#FAF8F3", borderRadius: 8, marginBottom: 24 }}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#C9A84C", marginBottom: 16 }}>
                Event Details
              </div>
              <div className="field" style={{ marginBottom: 0 }}>
                <label>Event Name</label>
                <input type="text" value={gala.name} onChange={(e) => setGala({ ...gala, name: e.target.value })} />
              </div>
            </div>

            {/* Description */}
            <div style={{ padding: 20, background: "#FAF8F3", borderRadius: 8, marginBottom: 24 }}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#C9A84C", marginBottom: 16 }}>
                Description
              </div>
              <div className="field" style={{ marginBottom: 0 }}>
                <textarea value={gala.description} onChange={(e) => setGala({ ...gala, description: e.target.value })} style={{ minHeight: 120 }} />
              </div>
            </div>

            {/* Image */}
            <div style={{ padding: 20, background: "#FAF8F3", borderRadius: 8 }}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#C9A84C", marginBottom: 16 }}>
                Gala Image
              </div>
              <ImageUpload value={gala.image} onChange={(url) => setGala({ ...gala, image: url })} folder="events" label="" recommendedSize="800x600px" />
            </div>
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
              <span style={{ fontSize: 12, color: "#8B92A0" }}>Click any card to edit</span>
            </div>
            <div className="card-body">
              {meetings.length === 0 ? (
                <div className="empty-state">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <h4>No meeting types yet</h4>
                  <p>Add your first meeting type below.</p>
                </div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
                  {meetings.map((meeting) => (
                    <div
                      key={meeting.id}
                      onClick={() => setEditingMeetingId(meeting.id)}
                      style={{
                        background: "#FAF8F3", border: "1px solid rgba(26,39,68,0.08)",
                        borderRadius: 8, padding: 24, cursor: "pointer",
                        transition: "all 0.2s ease", position: "relative",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "rgba(201,168,76,0.2)";
                        e.currentTarget.style.boxShadow = "0 8px 30px rgba(26,39,68,0.08)";
                        e.currentTarget.style.transform = "translateY(-2px)";
                        const arrow = e.currentTarget.querySelector(".mtg-arrow") as HTMLElement;
                        if (arrow) { arrow.style.opacity = "1"; arrow.style.transform = "translateX(2px)"; }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "rgba(26,39,68,0.08)";
                        e.currentTarget.style.boxShadow = "none";
                        e.currentTarget.style.transform = "none";
                        const arrow = e.currentTarget.querySelector(".mtg-arrow") as HTMLElement;
                        if (arrow) { arrow.style.opacity = "0"; arrow.style.transform = "none"; }
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                        <div style={{
                          width: 36, height: 36, borderRadius: "50%", background: "#F5ECD5",
                          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                        }}>
                          {meetingIcons.default}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          {meeting.tag && (
                            <span style={{
                              fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const,
                              color: "#C9A84C", background: "white", border: "1px solid rgba(201,168,76,0.2)",
                              padding: "3px 10px", borderRadius: 100,
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
                      <h4 style={{ fontSize: 14, fontWeight: 600, color: "#1A2744", marginBottom: 6 }}>
                        {meeting.title || "Untitled Meeting"}
                      </h4>
                      <p style={{ fontSize: 12, color: "#8B92A0", lineHeight: 1.5 }}>
                        {meeting.description || "No description"}
                      </p>
                      <div className="mtg-arrow" style={{
                        position: "absolute", bottom: 16, right: 16,
                        opacity: 0, color: "#C9A84C", transition: "all 0.15s ease",
                      }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 16, height: 16 }}>
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <button className="btn-add" onClick={addMeeting} style={{ marginTop: 16 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 16, height: 16 }}>
                  <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Add Meeting Type
              </button>
            </div>
          </div>

          <AdminModal title="Edit Meeting Type" subtitle={editingMeeting ? editingMeeting.title || "New Meeting" : ""} open={!!editingMeeting} onClose={() => setEditingMeetingId(null)} onSave={save}>
            {editingMeeting && (
              <>
                <div className="field-row">
                  <div className="field"><label>Title</label><input type="text" value={editingMeeting.title} onChange={(e) => updateMeeting(editingMeeting.id, "title", e.target.value)} placeholder="e.g. Monthly Member Meetings" /></div>
                  <div className="field"><label>Tag / Badge</label><input type="text" value={editingMeeting.tag} onChange={(e) => updateMeeting(editingMeeting.id, "tag", e.target.value)} placeholder="e.g. Monthly" /></div>
                </div>
                <div className="field"><label>Description</label><textarea value={editingMeeting.description} onChange={(e) => updateMeeting(editingMeeting.id, "description", e.target.value)} /></div>
              </>
            )}
          </AdminModal>
        </>
      )}

      {/* ===== SPECIAL EVENTS TAB ===== */}
      {tab === "special" && (
        <>
          <div className="card">
            <div className="card-header">
              <div style={{ display: "flex", alignItems: "center" }}>
                <h3>Upcoming &amp; Special Events</h3>
                <span className="count">{specialEvents.length}</span>
              </div>
              <span style={{ fontSize: 12, color: "#8B92A0" }}>Click any card to edit</span>
            </div>
            <div className="card-body">
              {specialEvents.length === 0 ? (
                <div className="empty-state">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 40, height: 40 }}>
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <h4>No special events yet</h4>
                  <p>Add custom events like mixers, guest speakers, or supper clubs.</p>
                </div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
                  {specialEvents.map((event) => {
                    const hasTBA = !event.date || event.date.toUpperCase() === "TBA";
                    return (
                      <div
                        key={event.id}
                        onClick={() => setEditingSpecialId(event.id)}
                        style={{
                          border: "1px solid rgba(26,39,68,0.08)",
                          borderRadius: 8,
                          overflow: "hidden",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          position: "relative",
                          background: "white",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = "rgba(201,168,76,0.2)";
                          e.currentTarget.style.boxShadow = "0 8px 30px rgba(26,39,68,0.08)";
                          e.currentTarget.style.transform = "translateY(-2px)";
                          const a = e.currentTarget.querySelector(".se-arrow") as HTMLElement;
                          if (a) {
                            a.style.opacity = "1";
                            a.style.transform = "translateX(2px)";
                          }
                          const acts = e.currentTarget.querySelector(".se-actions") as HTMLElement;
                          if (acts) acts.style.opacity = "1";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "rgba(26,39,68,0.08)";
                          e.currentTarget.style.boxShadow = "none";
                          e.currentTarget.style.transform = "none";
                          const a = e.currentTarget.querySelector(".se-arrow") as HTMLElement;
                          if (a) {
                            a.style.opacity = "0";
                            a.style.transform = "none";
                          }
                          const acts = e.currentTarget.querySelector(".se-actions") as HTMLElement;
                          if (acts) acts.style.opacity = "0";
                        }}
                      >
                        {/* Image */}
                        <div style={{ height: 140, background: "#FAF8F3", overflow: "hidden", position: "relative" }}>
                          {event.image ? (
                            <img src={event.image} alt={event.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          ) : (
                            <div
                              style={{
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 6,
                                color: "#8B92A0",
                              }}
                            >
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 28, height: 28, opacity: 0.3 }}>
                                <rect x="3" y="3" width="18" height="18" rx="2" />
                                <circle cx="8.5" cy="8.5" r="1.5" />
                                <polyline points="21 15 16 10 5 21" />
                              </svg>
                              <span style={{ fontSize: 11 }}>No image</span>
                            </div>
                          )}
                          {/* Date badge */}
                          <div
                            style={{
                              position: "absolute",
                              top: 12,
                              left: 12,
                              background: hasTBA ? "rgba(214,158,46,0.9)" : "#1A2744",
                              padding: "6px 12px",
                              borderRadius: 6,
                              textAlign: "center",
                              minWidth: 52,
                            }}
                          >
                            <span
                              style={{
                                display: "block",
                                fontSize: 9,
                                fontWeight: 700,
                                letterSpacing: "0.1em",
                                textTransform: "uppercase" as const,
                                color: hasTBA ? "#0F1A2E" : "#C9A84C",
                                lineHeight: 1,
                              }}
                            >
                              {hasTBA ? "Date" : (() => {
                                const m = event.date.match(/([A-Za-z]+)/);
                                return m ? m[1].substring(0, 3) : "—";
                              })()}
                            </span>
                            <span
                              style={{
                                display: "block",
                                fontSize: hasTBA ? 12 : 18,
                                fontWeight: 600,
                                color: hasTBA ? "#0F1A2E" : "white",
                                lineHeight: 1.2,
                              }}
                            >
                              {hasTBA
                                ? "TBA"
                                : (() => {
                                    const d = event.date.match(/(\d+)/);
                                    return d ? d[1] : "—";
                                  })()}
                            </span>
                          </div>
                          {/* Hover actions */}
                          <div
                            className="se-actions"
                            style={{
                              position: "absolute",
                              top: 12,
                              right: 12,
                              display: "flex",
                              gap: 4,
                              opacity: 0,
                              transition: "opacity 0.15s",
                            }}
                          >
                            <button
                              className="btn-icon-sm danger"
                              onClick={(ev) => removeSpecialEvent(event.id, ev)}
                              title="Remove"
                              style={{ background: "rgba(255,255,255,0.95)" }}
                            >
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="3 6 5 6 21 6" />
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        {/* Body */}
                        <div style={{ padding: "16px 20px" }}>
                          <h4 style={{ fontSize: 15, fontWeight: 600, color: "#1A2744", marginBottom: 4 }}>
                            {event.title || "Untitled Event"}
                          </h4>
                          <p
                            style={{
                              fontSize: 12,
                              color: "#8B92A0",
                              lineHeight: 1.5,
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical" as const,
                              overflow: "hidden",
                            }}
                          >
                            {event.description || "No description"}
                          </p>
                          <div
                            style={{
                              display: "flex",
                              gap: 12,
                              marginTop: 10,
                              paddingTop: 10,
                              borderTop: "1px solid rgba(26,39,68,0.08)",
                            }}
                          >
                            {event.venue && (
                              <span style={{ fontSize: 11, color: "#8B92A0", display: "inline-flex", alignItems: "center", gap: 4 }}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2" style={{ width: 12, height: 12 }}>
                                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                  <circle cx="12" cy="10" r="3" />
                                </svg>
                                {event.venue}
                              </span>
                            )}
                            {event.time && (
                              <span style={{ fontSize: 11, color: "#8B92A0", display: "inline-flex", alignItems: "center", gap: 4 }}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2" style={{ width: 12, height: 12 }}>
                                  <circle cx="12" cy="12" r="10" />
                                  <polyline points="12 6 12 12 16 14" />
                                </svg>
                                {event.time}
                              </span>
                            )}
                          </div>
                        </div>
                        <div
                          className="se-arrow"
                          style={{
                            position: "absolute",
                            bottom: 16,
                            right: 16,
                            opacity: 0,
                            color: "#C9A84C",
                            transition: "all 0.15s",
                          }}
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 16, height: 16 }}>
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              <button className="btn-add" onClick={addSpecialEvent} style={{ marginTop: 16 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 16, height: 16 }}>
                  <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Add Special Event
              </button>
            </div>
          </div>

          <AdminModal
            title="Edit Special Event"
            subtitle={editingSpecial ? editingSpecial.title || "New Event" : ""}
            open={!!editingSpecial}
            onClose={() => setEditingSpecialId(null)}
            onSave={save}
            width={640}
          >
            {editingSpecial && (
              <>
                {/* Event Details */}
                <div style={{ padding: 20, background: "#FAF8F3", borderRadius: 8, marginBottom: 24 }}>
                  <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#C9A84C", marginBottom: 16 }}>
                    Event Details
                  </div>
                  <div className="field">
                    <label>Event Title</label>
                    <input type="text" value={editingSpecial.title} onChange={(e) => updateSpecialEvent(editingSpecial.id, "title", e.target.value)} placeholder="e.g. Summer Networking Mixer" />
                  </div>
                  <div className="field-row-3">
                    <div className="field" style={{ marginBottom: 0 }}><label>Date</label><input type="text" value={editingSpecial.date} onChange={(e) => updateSpecialEvent(editingSpecial.id, "date", e.target.value)} placeholder="e.g. June 14 or TBA" /></div>
                    <div className="field" style={{ marginBottom: 0 }}><label>Time</label><input type="text" value={editingSpecial.time} onChange={(e) => updateSpecialEvent(editingSpecial.id, "time", e.target.value)} placeholder="e.g. 6:00 PM" /></div>
                    <div className="field" style={{ marginBottom: 0 }}><label>Venue</label><input type="text" value={editingSpecial.venue} onChange={(e) => updateSpecialEvent(editingSpecial.id, "venue", e.target.value)} placeholder="e.g. Perch DTLA" /></div>
                  </div>
                </div>

                {/* Description */}
                <div style={{ padding: 20, background: "#FAF8F3", borderRadius: 8, marginBottom: 24 }}>
                  <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#C9A84C", marginBottom: 16 }}>
                    Description
                  </div>
                  <div className="field" style={{ marginBottom: 0 }}>
                    <textarea value={editingSpecial.description} onChange={(e) => updateSpecialEvent(editingSpecial.id, "description", e.target.value)} placeholder="Brief description of the event" style={{ minHeight: 100 }} />
                  </div>
                </div>

                {/* Image */}
                <div style={{ padding: 20, background: "#FAF8F3", borderRadius: 8 }}>
                  <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#C9A84C", marginBottom: 16 }}>
                    Event Image
                  </div>
                  <ImageUpload
                    value={editingSpecial.image}
                    onChange={(url) => updateSpecialEvent(editingSpecial.id, "image", url)}
                    folder="events"
                    label=""
                    recommendedSize="800x500px"
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