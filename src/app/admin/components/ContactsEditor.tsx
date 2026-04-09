"use client";

import { useState, useEffect } from "react";
import { useSiteDoc, saveSiteDoc } from "@/lib/hooks";
import AdminModal from "./AdminModal";

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

  const shortenUrl = (url: string) => {
    try {
      return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
    } catch {
      return url;
    }
  };

  if (loading) return <div style={{ padding: 40, color: "#8B92A0" }}>Loading...</div>;

  return (
    <>
      <div className="topbar">
        <h1>Contacts</h1>
        <div className="topbar-actions">
          {saved && (
            <span style={{ fontSize: 13, color: "#38A169", fontWeight: 500 }}>Saved!</span>
          )}
          <button className="btn-save" onClick={save} disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {/* ===== EMAIL ADDRESSES ===== */}
      <div className="card">
        <div className="card-header">
          <h3>Email Addresses</h3>
          <button className="btn-edit-sm" onClick={() => setEmailsModalOpen(true)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
            Edit
          </button>
        </div>
        <div className="card-body">
          <div className="summary-grid">
            <div className="summary-item">
              <div className="summary-label">Membership</div>
              <div className="summary-value">{emails.membership || <span className="empty">Not set</span>}</div>
            </div>
            <div className="summary-item">
              <div className="summary-label">Corporate Ambassador</div>
              <div className="summary-value">{emails.corporateAmbassador || <span className="empty">Not set</span>}</div>
            </div>
            <div className="summary-item">
              <div className="summary-label">Public Relations</div>
              <div className="summary-value">{emails.publicRelations || <span className="empty">Not set</span>}</div>
            </div>
            <div className="summary-item">
              <div className="summary-label">President</div>
              <div className="summary-value">{emails.president || <span className="empty">Not set</span>}</div>
            </div>
            <div className="summary-item">
              <div className="summary-label">Les Clefs d&apos;Or Liaison</div>
              <div className="summary-value">{emails.lesClefs || <span className="empty">Not set</span>}</div>
            </div>
            <div className="summary-item">
              <div className="summary-label">Website</div>
              <div className="summary-value">{website || <span className="empty">Not set</span>}</div>
            </div>
          </div>
        </div>
      </div>

      <AdminModal
        title="Edit Email Addresses"
        subtitle="Update department contact emails"
        open={emailsModalOpen}
        onClose={() => setEmailsModalOpen(false)}
      >
        <div className="field-row">
          <div className="field">
            <label>Membership</label>
            <input type="email" value={emails.membership} onChange={(e) => setEmails({ ...emails, membership: e.target.value })} />
          </div>
          <div className="field">
            <label>Corporate Ambassador</label>
            <input type="email" value={emails.corporateAmbassador} onChange={(e) => setEmails({ ...emails, corporateAmbassador: e.target.value })} />
          </div>
        </div>
        <div className="field-row">
          <div className="field">
            <label>Public Relations</label>
            <input type="email" value={emails.publicRelations} onChange={(e) => setEmails({ ...emails, publicRelations: e.target.value })} />
          </div>
          <div className="field">
            <label>President</label>
            <input type="email" value={emails.president} onChange={(e) => setEmails({ ...emails, president: e.target.value })} />
          </div>
        </div>
        <div className="field-row">
          <div className="field">
            <label>Les Clefs d&apos;Or Liaison</label>
            <input type="email" value={emails.lesClefs} onChange={(e) => setEmails({ ...emails, lesClefs: e.target.value })} />
          </div>
          <div className="field">
            <label>Website URL</label>
            <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} />
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
          <div className="summary-grid">
            <div className="summary-item">
              <div className="summary-label">Facebook</div>
              <div className={`summary-value ${!socials.facebook ? "empty" : ""}`}>
                {socials.facebook ? shortenUrl(socials.facebook) : "Not set"}
              </div>
            </div>
            <div className="summary-item">
              <div className="summary-label">Instagram</div>
              <div className={`summary-value ${!socials.instagram ? "empty" : ""}`}>
                {socials.instagram ? shortenUrl(socials.instagram) : "Not set"}
              </div>
            </div>
            <div className="summary-item">
              <div className="summary-label">Twitter / X</div>
              <div className={`summary-value ${!socials.twitter ? "empty" : ""}`}>
                {socials.twitter ? shortenUrl(socials.twitter) : "Not set"}
              </div>
            </div>
            <div className="summary-item">
              <div className="summary-label">YouTube</div>
              <div className={`summary-value ${!socials.youtube ? "empty" : ""}`}>
                {socials.youtube ? shortenUrl(socials.youtube) : "Not set"}
              </div>
            </div>
          </div>
        </div>
      </div>

      <AdminModal
        title="Edit Social Media"
        subtitle="Update social media profile URLs"
        open={socialsModalOpen}
        onClose={() => setSocialsModalOpen(false)}
      >
        <div className="field-row">
          <div className="field">
            <label>Facebook URL</label>
            <input type="text" value={socials.facebook} onChange={(e) => setSocials({ ...socials, facebook: e.target.value })} placeholder="https://www.facebook.com/..." />
          </div>
          <div className="field">
            <label>Instagram URL</label>
            <input type="text" value={socials.instagram} onChange={(e) => setSocials({ ...socials, instagram: e.target.value })} placeholder="https://www.instagram.com/..." />
          </div>
        </div>
        <div className="field-row">
          <div className="field">
            <label>Twitter / X URL</label>
            <input type="text" value={socials.twitter} onChange={(e) => setSocials({ ...socials, twitter: e.target.value })} placeholder="https://twitter.com/..." />
          </div>
          <div className="field">
            <label>YouTube URL</label>
            <input type="text" value={socials.youtube} onChange={(e) => setSocials({ ...socials, youtube: e.target.value })} placeholder="https://www.youtube.com/..." />
          </div>
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
            padding: 24, background: "#FAF8F3", borderRadius: 8,
            display: "flex", gap: 16, alignItems: "flex-start",
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: "50%", background: "#F5ECD5",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" style={{ width: 18, height: 18 }}>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600, color: "#1A2744", marginBottom: 4 }}>
                {address.name || "Organization Name"}
              </div>
              <div style={{ fontSize: 14, color: "#5A6478", lineHeight: 1.6 }}>
                {address.street || "Street Address"}<br />
                {address.cityStateZip || "City, State, Zip"}
              </div>
            </div>
          </div>
        </div>
      </div>

      <AdminModal
        title="Edit Mailing Address"
        subtitle="Physical mailing address for LACA"
        open={addressModalOpen}
        onClose={() => setAddressModalOpen(false)}
        width={520}
      >
        <div className="field">
          <label>Organization Name</label>
          <input type="text" value={address.name} onChange={(e) => setAddress({ ...address, name: e.target.value })} />
        </div>
        <div className="field">
          <label>Street Address</label>
          <input type="text" value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} />
        </div>
        <div className="field">
          <label>City, State, Zip</label>
          <input type="text" value={address.cityStateZip} onChange={(e) => setAddress({ ...address, cityStateZip: e.target.value })} />
        </div>
      </AdminModal>
    </>
  );
}