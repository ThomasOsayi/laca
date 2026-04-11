"use client";

import { useState, useEffect, type ReactElement } from "react";
import { useSiteDoc } from "@/lib/hooks";
import AdminLogin from "@/app/admin/components/AdminLogin";
import Dashboard from "@/app/admin/components/Dashboard";
import BoardEditor from "@/app/admin/components/BoardEditor";
import EventsEditor from "@/app/admin/components/EventsEditor";
import MembershipEditor from "@/app/admin/components/MembershipEditor";
import SponsorsEditor from "@/app/admin/components/SponsorsEditor";
import ContactsEditor from "@/app/admin/components/ContactsEditor";
import SiteEditor from "@/app/admin/components/SiteEditor";
import SettingsEditor from "@/app/admin/components/SettingsEditor";

const NAV_ITEMS = [
  { key: "overview", label: "Dashboard", section: "Overview", icon: "grid" },
  { key: "board", label: "Board Members", section: "Content", icon: "users" },
  { key: "events", label: "Events", section: "Content", icon: "calendar" },
  { key: "membership", label: "Membership", section: "Content", icon: "user" },
  { key: "sponsors", label: "Sponsors", section: "Content", icon: "star" },
  { key: "contacts", label: "Contacts", section: "Content", icon: "mail" },
  { key: "site", label: "Site Content", section: "Content", icon: "edit" },
  { key: "settings", label: "Settings", section: "Settings", icon: "settings" },
];

function NavIcon({ type }: { type: string }) {
  const icons: Record<string, ReactElement> = {
    grid: <><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></>,
    users: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
    calendar: <><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></>,
    user: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>,
    star: <><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></>,
    mail: <><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z" /><polyline points="22,6 12,13 2,6" /></>,
    edit: <><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1.08-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.32 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></>,
  };

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 18, height: 18, flexShrink: 0, opacity: 0.6 }}>
      {icons[type]}
    </svg>
  );
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const { data: settings, loading } = useSiteDoc("settings");

  useEffect(() => {
    if (sessionStorage.getItem("laca-admin") === "true") {
      setAuthed(true);
    }
  }, []);

  if (!authed) {
    return (
      <AdminLogin
        correctPassword={settings?.adminPassword || ""}
        onLogin={() => setAuthed(true)}
        settingsLoading={loading}
      />
    );
  }

  const sections = [...new Set(NAV_ITEMS.map((n) => n.section))];

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="sidebar-brand-icon">LA</div>
          <div>
            <h2 style={{ fontSize: 15, fontWeight: 600, color: "white", letterSpacing: "0.04em" }}>
              LACA Admin
            </h2>
            <span style={{ display: "block", fontSize: 10, fontWeight: 400, color: "#8B92A0", letterSpacing: "0.08em", textTransform: "uppercase" as const, marginTop: 2 }}>
              Content Manager
            </span>
          </div>
        </div>

        {sections.map((section) => (
          <div className="sidebar-section" key={section}>
            <div className="sidebar-section-label">{section}</div>
            {NAV_ITEMS.filter((n) => n.section === section).map((item) => (
              <div
                key={item.key}
                className={`sidebar-link ${activeTab === item.key ? "active" : ""}`}
                onClick={() => setActiveTab(item.key)}
              >
                <NavIcon type={item.icon} />
                {item.label}
              </div>
            ))}
          </div>
        ))}

        <div className="sidebar-footer">
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.2)" }}>
            LACA Website Admin v1.0
          </p>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#C9A84C", fontSize: 12, fontWeight: 500, display: "inline-flex", alignItems: "center", gap: 6, marginTop: 8 }}
          >
            View Live Site
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
      </aside>

      {/* Main content */}
      <main className="main">
        {activeTab === "overview" && <Dashboard onNavigate={setActiveTab} />}
        {activeTab === "board" && <BoardEditor />}
        {activeTab === "events" && <EventsEditor />}
        {activeTab === "membership" && <MembershipEditor />}
        {activeTab === "sponsors" && <SponsorsEditor />}
        {activeTab === "contacts" && <ContactsEditor />}
        {activeTab === "site" && <SiteEditor />}
        {activeTab === "settings" && <SettingsEditor onLogout={() => setAuthed(false)} />}
      </main>
    </div>
  );
}