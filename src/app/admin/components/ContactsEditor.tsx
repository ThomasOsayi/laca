"use client";

import { useState, useEffect } from "react";
import { useSiteDoc, saveSiteDoc } from "@/lib/hooks";

export default function ContactsEditor() {
  const { data, loading } = useSiteDoc("contacts");
  const [emails, setEmails] = useState({
    membership: "",
    corporateAmbassador: "",
    publicRelations: "",
    president: "",
    lesClefs: "",
  });
  const [socials, setSocials] = useState({
    facebook: "",
    instagram: "",
    twitter: "",
    youtube: "",
  });
  const [address, setAddress] = useState({
    name: "",
    street: "",
    cityStateZip: "",
  });
  const [website, setWebsite] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

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

  if (loading) return <div style={{ padding: 40, color: "#8B92A0" }}>Loading...</div>;

  return (
    <>
      <div className="topbar">
        <h1>Contacts</h1>
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

      {/* Email Addresses */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3>Email Addresses</h3>
        </div>

        <div className="field-row">
          <div className="field">
            <label>Membership Email</label>
            <input
              type="email"
              value={emails.membership}
              onChange={(e) => setEmails({ ...emails, membership: e.target.value })}
            />
          </div>
          <div className="field">
            <label>Corporate Ambassador Email</label>
            <input
              type="email"
              value={emails.corporateAmbassador}
              onChange={(e) => setEmails({ ...emails, corporateAmbassador: e.target.value })}
            />
          </div>
        </div>

        <div className="field-row">
          <div className="field">
            <label>Public Relations Email</label>
            <input
              type="email"
              value={emails.publicRelations}
              onChange={(e) => setEmails({ ...emails, publicRelations: e.target.value })}
            />
          </div>
          <div className="field">
            <label>President Email</label>
            <input
              type="email"
              value={emails.president}
              onChange={(e) => setEmails({ ...emails, president: e.target.value })}
            />
          </div>
        </div>

        <div className="field-row">
          <div className="field">
            <label>Les Clefs d&apos;Or Liaison Email</label>
            <input
              type="email"
              value={emails.lesClefs}
              onChange={(e) => setEmails({ ...emails, lesClefs: e.target.value })}
            />
          </div>
          <div className="field">
            <label>Website URL</label>
            <input
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3>Social Media</h3>
        </div>

        <div className="field-row">
          <div className="field">
            <label>Facebook URL</label>
            <input
              type="text"
              value={socials.facebook}
              onChange={(e) => setSocials({ ...socials, facebook: e.target.value })}
              placeholder="https://www.facebook.com/..."
            />
          </div>
          <div className="field">
            <label>Instagram URL</label>
            <input
              type="text"
              value={socials.instagram}
              onChange={(e) => setSocials({ ...socials, instagram: e.target.value })}
              placeholder="https://www.instagram.com/..."
            />
          </div>
        </div>

        <div className="field-row">
          <div className="field">
            <label>Twitter / X URL</label>
            <input
              type="text"
              value={socials.twitter}
              onChange={(e) => setSocials({ ...socials, twitter: e.target.value })}
              placeholder="https://twitter.com/..."
            />
          </div>
          <div className="field">
            <label>YouTube URL</label>
            <input
              type="text"
              value={socials.youtube}
              onChange={(e) => setSocials({ ...socials, youtube: e.target.value })}
              placeholder="https://www.youtube.com/..."
            />
          </div>
        </div>
      </div>

      {/* Mailing Address */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3>Mailing Address</h3>
        </div>

        <div className="field">
          <label>Organization Name</label>
          <input
            type="text"
            value={address.name}
            onChange={(e) => setAddress({ ...address, name: e.target.value })}
          />
        </div>

        <div className="field-row">
          <div className="field">
            <label>Street Address</label>
            <input
              type="text"
              value={address.street}
              onChange={(e) => setAddress({ ...address, street: e.target.value })}
            />
          </div>
          <div className="field">
            <label>City, State, Zip</label>
            <input
              type="text"
              value={address.cityStateZip}
              onChange={(e) => setAddress({ ...address, cityStateZip: e.target.value })}
            />
          </div>
        </div>
      </div>
    </>
  );
}