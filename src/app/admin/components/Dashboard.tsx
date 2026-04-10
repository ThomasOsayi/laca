"use client";

import { useSiteDoc } from "@/lib/hooks";

interface DashboardProps {
  onNavigate: (tab: string) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const { data: board } = useSiteDoc("board");
  const { data: contacts } = useSiteDoc("contacts");
  const { data: sponsors } = useSiteDoc("sponsors");
  const { data: events } = useSiteDoc("events");

  const membersWithPhotos = board?.members?.filter((m: { photo: string }) => m.photo)?.length || 0;
  const totalMembers = board?.members?.length || 0;
  const logoCount = sponsors?.logos?.length || 0;
  const expoDate = events?.expo?.date || "TBA";

  // Build attention items dynamically
  const attentionItems: { type: "warn" | "info"; text: string; action: string; tab: string }[] = [];
  if (logoCount === 0) {
    attentionItems.push({ type: "warn", text: "No sponsor logos uploaded — the Sponsors page shows placeholder boxes", action: "Add Logos", tab: "sponsors" });
  }
  if (expoDate === "TBA" || !expoDate) {
    attentionItems.push({ type: "warn", text: "Expo date is TBA — update the date once it's confirmed", action: "Update", tab: "events" });
  }
  if (membersWithPhotos < totalMembers && totalMembers > 0) {
    attentionItems.push({ type: "info", text: `Board photos missing — ${membersWithPhotos} of ${totalMembers} members have photos uploaded`, action: "Upload Photos", tab: "board" });
  }

  const cards = [
    {
      key: "board", title: "Board Members", desc: "Names, roles, photos, and emails",
      count: totalMembers,
      icon: (<><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>),
    },
    {
      key: "events", title: "Events", desc: "Expo, Gala, and meeting types", count: "5",
      icon: (<><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /></>),
    },
    {
      key: "membership", title: "Membership", desc: "Dues, deadline, qualifications", count: "3 tiers",
      icon: (<><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>),
    },
    {
      key: "sponsors", title: "Sponsors", desc: "Logos and partner gallery",
      count: logoCount, countColor: logoCount === 0 ? "#D69E2E" : undefined,
      icon: (<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />),
    },
    {
      key: "contacts", title: "Contacts", desc: "Emails, socials, address",
      count: contacts?.emails ? Object.keys(contacts.emails).length : 0,
      icon: (<><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z" /><polyline points="22,6 12,13 2,6" /></>),
    },
    {
      key: "site", title: "Site Content", desc: "Hero, mission, president's note", count: "3",
      icon: (<><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></>),
    },
  ];

  return (
    <>
      {/* Welcome */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
        <div>
          <div className="status-badge" style={{ marginBottom: 10 }}>
            <div className="status-dot" /> Site Live
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 600, color: "#1A2744", fontFamily: "var(--font-body)", marginBottom: 4 }}>
            Welcome back
          </h1>
          <p style={{ fontSize: 13, color: "#8B92A0" }}>
            Manage your LACA website content and settings
          </p>
        </div>
        <a href="/" target="_blank" className="btn-preview">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 16, height: 16 }}>
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          Preview Site
        </a>
      </div>

      {/* Needs Attention */}
      {attentionItems.length > 0 && (
        <div className="card" style={{ marginBottom: 28 }}>
          <div className="card-header">
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#D69E2E" strokeWidth="2" style={{ width: 18, height: 18 }}>
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <h3>Needs Attention</h3>
              <span style={{ fontSize: 11, fontWeight: 600, color: "#D69E2E", background: "#FFFBEB", padding: "2px 8px", borderRadius: 100, marginLeft: 8 }}>
                {attentionItems.length} {attentionItems.length === 1 ? "item" : "items"}
              </span>
            </div>
          </div>
          <div>
            {attentionItems.map((item, i) => (
              <div
                key={i}
                onClick={() => onNavigate(item.tab)}
                style={{
                  display: "flex", alignItems: "center", gap: 14,
                  padding: "14px 24px", borderBottom: i < attentionItems.length - 1 ? "1px solid rgba(26,39,68,0.08)" : "none",
                  cursor: "pointer", transition: "background 0.15s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#FAF8F3"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
              >
                <div style={{
                  width: 8, height: 8, borderRadius: "50%", flexShrink: 0,
                  background: item.type === "warn" ? "#D69E2E" : "#C9A84C",
                }} />
                <p style={{ fontSize: 13, color: "#5A6478", flex: 1 }}>
                  {item.text}
                </p>
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" as const, color: "#C9A84C", whiteSpace: "nowrap" }}>
                  {item.action} →
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Content Cards */}
      <div className="overview-grid">
        {cards.map((card) => (
          <div className="overview-card" key={card.key} onClick={() => onNavigate(card.key)} style={{ position: "relative" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <div className="overview-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 18, height: 18, color: "#C9A84C" }}>
                  {card.icon}
                </svg>
              </div>
              <div style={{
                fontSize: typeof card.count === "string" && card.count.includes("tier") ? 16 : 24,
                fontWeight: 600,
                color: (card as { countColor?: string }).countColor || "#C9A84C",
                fontFamily: "var(--font-body)",
              }}>
                {card.count}
              </div>
            </div>
            <h3>{card.title}</h3>
            <p>{card.desc}</p>
          </div>
        ))}
      </div>

      {/* Bottom: Site Health + Recent Activity */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Site Health */}
        <div className="card">
          <div className="card-header">
            <h3>Site Health</h3>
          </div>
          <div style={{ padding: "8px 0" }}>
            {[
              { label: "All pages published", value: "6 / 6", good: true },
              { label: "Firebase connected", value: "Active", good: true },
              { label: "Sponsor logos", value: logoCount > 0 ? `${logoCount} uploaded` : "0 uploaded", good: logoCount > 0 },
              { label: "Board photos", value: `${membersWithPhotos} / ${totalMembers}`, good: membersWithPhotos === totalMembers },
              { label: "Content synced", value: "Live", good: true },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: "50%",
                    background: item.good ? "#F0FFF4" : "#FFFBEB",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {item.good ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="#38A169" strokeWidth="3" style={{ width: 12, height: 12 }}>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="#D69E2E" strokeWidth="2" style={{ width: 12, height: 12 }}>
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                        <line x1="12" y1="9" x2="12" y2="13" />
                        <line x1="12" y1="17" x2="12.01" y2="17" />
                      </svg>
                    )}
                  </div>
                  <span style={{ fontSize: 13, color: "#5A6478" }}>{item.label}</span>
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: item.good ? "#38A169" : "#D69E2E" }}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <div className="card-header">
            <h3>Recent Activity</h3>
          </div>
          <div>
            {[
              { text: "Site deployed to Vercel", time: "Just now" },
              { text: "All 6 pages published", time: "Today" },
              { text: "Firestore seeded with content", time: "Today" },
              { text: "Admin dashboard configured", time: "Today" },
            ].map((item, i) => (
              <div key={i} style={{
                display: "flex", gap: 12, alignItems: "flex-start",
                padding: "14px 24px", borderBottom: i < 3 ? "1px solid rgba(26,39,68,0.08)" : "none",
              }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#C9A84C", marginTop: 5, flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: 13, color: "#5A6478" }}>{item.text}</p>
                  <span style={{ fontSize: 11, color: "#8B92A0", display: "block", marginTop: 2 }}>{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}