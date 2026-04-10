"use client";

import { useState, useEffect } from "react";
import { useSiteDoc, saveSiteDoc } from "@/lib/hooks";
import AdminModal from "./AdminModal";

const EmailIcon = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" style={{ width: 16, height: 16 }}>
    <path d={d} />
  </svg>
);

export default function ContactsEditor() {
  const { data, loading } = useSiteDoc("contacts");
  const [emails, setEmails] = useState({
    membership: "", corporateAmbassador: "", publicRelations: "", president: "", lesClefs: "",
  });
  const [socials, setSocials] = useState({
    facebook: "", instagram: "", twitter: "", youtube: "",
  });
  const [address, setAddress] = useState({
    name: "", street: "", cityStateZip: "",
  });
  const [website, setWebsite] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [emailsModalOpen, setEmailsModalOpen] = useState(false);
  const [socialsModalOpen, setSocialsModalOpen] = useState(false);
  const [addressModalOpen, setAddressModalOpen] = useState(false);

  useEffect(() => {
    if (!data) return;
    if (data.emails) setEmails(data.emails);
    if (data.socials) setSocials(data.socials);
    if (data.address) setAddress(data.address);
    if (data.website) setWebsite(data.website);
  }, [data]);

  const save = async () => {
    setSaving(true);
    await saveSiteDoc("contacts", { emails, socials, address, website });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const extractHandle = (url: string) => {
    try {
      const clean = url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
      const parts = clean.split("/");
      return "/" + parts[parts.length - 1];
    } catch {
      return url;
    }
  };

  if (loading) return <div style={{ padding: 40, color: "#8B92A0" }}>Loading...</div>;

  const emailCards = [
    { label: "Membership", value: emails.membership, icon: (<><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>) },
    { label: "Corporate Ambassador", value: emails.corporateAmbassador, icon: (<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />) },
    { label: "Public Relations", value: emails.publicRelations, icon: (<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />) },
    { label: "President", value: emails.president, icon: (<><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>) },
    { label: "Les Clefs d'Or Liaison", value: emails.lesClefs, icon: (<><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></>) },
    { label: "Website", value: website, icon: (<><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></>) },
  ];

  const socialPlatforms = [
    { key: "facebook", name: "Facebook", icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
    { key: "instagram", name: "Instagram", icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" },
    { key: "twitter", name: "Twitter / X", icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
    { key: "youtube", name: "YouTube", icon: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
  ];

  return (
    <>
      <div className="topbar">
        <h1>Contacts</h1>
        <div className="topbar-actions">
          {saved && <span style={{ fontSize: 13, color: "#38A169", fontWeight: 500 }}>Saved!</span>}
          <button className="btn-save" onClick={save} disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {/* ===== DEPARTMENT EMAILS ===== */}
      <div className="card">
        <div className="card-header">
          <h3>Department Emails</h3>
          <button className="btn-edit-sm" onClick={() => setEmailsModalOpen(true)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
            Edit
          </button>
        </div>
        <div className="card-body">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
            {emailCards.map((card) => (
              <div key={card.label} style={{
                display: "flex", gap: 14, alignItems: "flex-start",
                padding: "16px 20px", background: "#FAF8F3",
                border: "1px solid rgba(26,39,68,0.08)", borderRadius: 8,
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: "50%", background: "#F5ECD5",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" style={{ width: 16, height: 16 }}>
                    {card.icon}
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#C9A84C", marginBottom: 3 }}>
                    {card.label}
                  </div>
                  <div style={{ fontSize: 13, color: card.value ? "#1A2744" : "#8B92A0", fontWeight: 500, fontStyle: card.value ? "normal" : "italic" }}>
                    {card.value || "Not set"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AdminModal
        title="Edit Email Addresses"
        subtitle="Department contact emails displayed on the website"
        open={emailsModalOpen}
        onClose={() => setEmailsModalOpen(false)}
        onSave={save}
      >
        <div style={{ padding: 20, background: "#FAF8F3", borderRadius: 8 }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#C9A84C", marginBottom: 16 }}>
            Department Emails
          </div>
          <div className="field-row">
            <div className="field"><label>Membership</label><input type="email" value={emails.membership} onChange={(e) => setEmails({ ...emails, membership: e.target.value })} /></div>
            <div className="field"><label>Corporate Ambassador</label><input type="email" value={emails.corporateAmbassador} onChange={(e) => setEmails({ ...emails, corporateAmbassador: e.target.value })} /></div>
          </div>
          <div className="field-row">
            <div className="field"><label>Public Relations</label><input type="email" value={emails.publicRelations} onChange={(e) => setEmails({ ...emails, publicRelations: e.target.value })} /></div>
            <div className="field"><label>President</label><input type="email" value={emails.president} onChange={(e) => setEmails({ ...emails, president: e.target.value })} /></div>
          </div>
          <div className="field-row">
            <div className="field" style={{ marginBottom: 0 }}><label>Les Clefs d&apos;Or Liaison</label><input type="email" value={emails.lesClefs} onChange={(e) => setEmails({ ...emails, lesClefs: e.target.value })} /></div>
            <div className="field" style={{ marginBottom: 0 }}><label>Website URL</label><input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} /></div>
          </div>
        </div>
      </AdminModal>

      {/* ===== SOCIAL MEDIA ===== */}
      <div className="card">
        <div className="card-header">
          <h3>Social Media</h3>
          <button className="btn-edit-sm" onClick={() => setSocialsModalOpen(true)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
            Edit
          </button>
        </div>
        <div className="card-body">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
            {socialPlatforms.map((platform) => {
              const value = socials[platform.key as keyof typeof socials];
              return (
                <div key={platform.key} style={{
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
                  padding: "20px 16px", background: "#FAF8F3",
                  border: "1px solid rgba(26,39,68,0.08)", borderRadius: 8,
                  textAlign: "center", transition: "all 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(201,168,76,0.2)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(26,39,68,0.08)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(26,39,68,0.08)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}
                >
                  <div style={{
                    width: 44, height: 44, borderRadius: "50%", background: "#F5ECD5",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <svg viewBox="0 0 24 24" fill="#C9A84C" style={{ width: 20, height: 20 }}>
                      <path d={platform.icon} />
                    </svg>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#1A2744" }}>{platform.name}</div>
                  <div style={{ fontSize: 11, color: "#8B92A0", wordBreak: "break-all" }}>
                    {value ? extractHandle(value) : "Not set"}
                  </div>
                  {value && (
                    <div style={{ fontSize: 10, fontWeight: 600, color: "#38A169", display: "flex", alignItems: "center", gap: 4 }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ width: 10, height: 10 }}>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Connected
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <AdminModal
        title="Edit Social Media"
        subtitle="Profile URLs for footer and contact page"
        open={socialsModalOpen}
        onClose={() => setSocialsModalOpen(false)}
        onSave={save}
      >
        <div style={{ padding: 20, background: "#FAF8F3", borderRadius: 8 }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#C9A84C", marginBottom: 16 }}>
            Social Profiles
          </div>
          {socialPlatforms.map((platform) => (
            <div key={platform.key} style={{
              display: "flex", gap: 12, alignItems: "center",
              padding: "14px 16px", background: "white",
              border: "1px solid rgba(26,39,68,0.1)", borderRadius: 8,
              marginBottom: 10,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%", background: "#F5ECD5",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <svg viewBox="0 0 24 24" fill="#C9A84C" style={{ width: 16, height: 16 }}>
                  <path d={platform.icon} />
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "#8B92A0", marginBottom: 4 }}>
                  {platform.name}
                </div>
                <input
                  type="url"
                  value={socials[platform.key as keyof typeof socials]}
                  onChange={(e) => setSocials({ ...socials, [platform.key]: e.target.value })}
                  placeholder={`https://${platform.name.toLowerCase().replace(/ \/ x/, "")}.com/...`}
                />
              </div>
            </div>
          ))}
        </div>
      </AdminModal>

      {/* ===== MAILING ADDRESS ===== */}
      <div className="card">
        <div className="card-header">
          <h3>Mailing Address</h3>
          <button className="btn-edit-sm" onClick={() => setAddressModalOpen(true)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
            Edit
          </button>
        </div>
        <div className="card-body">
          <div style={{
            display: "flex", gap: 20, alignItems: "flex-start",
            padding: "20px 24px", background: "linear-gradient(135deg, #1A2744 0%, #243555 100%)",
            borderRadius: 8, color: "white",
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: "50%",
              background: "rgba(201,168,76,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" style={{ width: 22, height: 22 }}>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>
                {address.name || "Organization Name"}
              </div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                {address.street || "Street Address"}<br />
                {address.cityStateZip || "City, State, Zip"}
              </div>
            </div>
          </div>
        </div>
      </div>

      <AdminModal
        title="Edit Mailing Address"
        subtitle="Physical address displayed on the website"
        open={addressModalOpen}
        onClose={() => setAddressModalOpen(false)}
        onSave={save}
        width={520}
      >
        <div style={{ padding: 20, background: "#FAF8F3", borderRadius: 8 }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#C9A84C", marginBottom: 16 }}>
            Address Details
          </div>
          <div className="field">
            <label>Organization Name</label>
            <input type="text" value={address.name} onChange={(e) => setAddress({ ...address, name: e.target.value })} />
          </div>
          <div className="field">
            <label>Street Address</label>
            <input type="text" value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} />
          </div>
          <div className="field" style={{ marginBottom: 0 }}>
            <label>City, State, Zip</label>
            <input type="text" value={address.cityStateZip} onChange={(e) => setAddress({ ...address, cityStateZip: e.target.value })} />
          </div>
        </div>
      </AdminModal>
    </>
  );
}