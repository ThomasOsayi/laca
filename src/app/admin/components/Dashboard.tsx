"use client";

import { useSiteDoc } from "@/lib/hooks";

interface DashboardProps {
  onNavigate: (tab: string) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const { data: board } = useSiteDoc("board");
  const { data: contacts } = useSiteDoc("contacts");
  const { data: sponsors } = useSiteDoc("sponsors");

  const cards = [
    {
      key: "board",
      title: "Board Members",
      desc: "Manage names, roles, photos, and emails",
      count: board?.members?.length || 0,
      icon: (
        <>
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </>
      ),
    },
    {
      key: "events",
      title: "Events",
      desc: "Expo, Gala, meetings, and calendar",
      count: "5",
      icon: (
        <>
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
        </>
      ),
    },
    {
      key: "membership",
      title: "Membership",
      desc: "Dues, deadline, and qualifications",
      count: "3 tiers",
      icon: (
        <>
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </>
      ),
    },
    {
      key: "sponsors",
      title: "Sponsors",
      desc: "Logos and partner information",
      count: sponsors?.logos?.length || 0,
      icon: (
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      ),
    },
    {
      key: "contacts",
      title: "Contacts",
      desc: "Emails, socials, and mailing address",
      count: contacts?.emails ? Object.keys(contacts.emails).length : 0,
      icon: (
        <>
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </>
      ),
    },
    {
      key: "site",
      title: "Site Content",
      desc: "Hero, mission, and president's note",
      count: "3",
      icon: (
        <>
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </>
      ),
    },
  ];

  return (
    <>
      <div className="topbar">
        <div>
          <div className="status-badge">
            <div className="status-dot" />
            Site Live
          </div>
          <h1>Dashboard</h1>
        </div>
        <div className="topbar-actions">
          <a href="/" target="_blank" className="btn-preview">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 16, height: 16 }}>
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            Preview Site
          </a>
        </div>
      </div>

      <div className="overview-grid">
        {cards.map((card) => (
          <div
            className="overview-card"
            key={card.key}
            onClick={() => onNavigate(card.key)}
          >
            <div className="overview-card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 18, height: 18, color: "#C9A84C" }}>
                {card.icon}
              </svg>
            </div>
            <h3>{card.title}</h3>
            <p>{card.desc}</p>
            <div className="count">{card.count}</div>
          </div>
        ))}
      </div>

      <div className="admin-card">
        <div className="admin-card-header">
          <h3>Quick Actions</h3>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          <button className="btn-preview" onClick={() => onNavigate("board")} style={{ justifyContent: "center" }}>
            Edit Board
          </button>
          <button className="btn-preview" onClick={() => onNavigate("events")} style={{ justifyContent: "center" }}>
            Update Events
          </button>
          <button className="btn-preview" onClick={() => onNavigate("membership")} style={{ justifyContent: "center" }}>
            Edit Membership
          </button>
        </div>
      </div>
    </>
  );
}