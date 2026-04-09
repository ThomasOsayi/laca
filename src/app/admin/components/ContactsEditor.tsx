"use client";

import { useState, useEffect } from "react";
import { useSiteDoc, saveSiteDoc } from "@/lib/hooks";
import AdminModal from "./AdminModal";

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
  const [emailsModal, setEmailsModal] = useState(false);
  const [socialsModal, setSocialsModal] = useState(false);
  const [addressModal, setAddressModal] = useState(false);

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

      {/* Email Addresses Summary */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3>Email Addresses</h3>
          <EditBtn onClick={() => setEmailsModal(true)} />
        </div>
        <div style={{ display: "grid", gap: 12 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <SummaryField label="Membership" value={emails.membership} />
            <SummaryField label="Corporate Ambassador" value={emails.corporateAmbassador} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <SummaryField label="Public Relations" value={emails.publicRelations} />
            <SummaryField label="President" value={emails.president} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <SummaryField label="Les Clefs d'Or Liaison" value={emails.lesClefs} />
            <SummaryField label="Website URL" value={website} />
          </div>
        </div>
      </div>

      <AdminModal title="Edit Email Addresses" open={emailsModal} onClose={() => setEmailsModal(false)}>
        <div className="field-row">
          <div className="field">
            <label>Membership Email</label>
            <input type="email" value={emails.membership} onChange={(e) => setEmails({ ...emails, membership: e.target.value })} />
          </div>
          <div className="field">
            <label>Corporate Ambassador Email</label>
            <input type="email" value={emails.corporateAmbassador} onChange={(e) => setEmails({ ...emails, corporateAmbassador: e.target.value })} />
          </div>
        </div>
        <div className="field-row">
          <div className="field">
            <label>Public Relations Email</label>
            <input type="email" value={emails.publicRelations} onChange={(e) => setEmails({ ...emails, publicRelations: e.target.value })} />
          </div>
          <div className="field">
            <label>President Email</label>
            <input type="email" value={emails.president} onChange={(e) => setEmails({ ...emails, president: e.target.value })} />
          </div>
        </div>
        <div className="field-row">
          <div className="field">
            <label>Les Clefs d&apos;Or Liaison Email</label>
            <input type="email" value={emails.lesClefs} onChange={(e) => setEmails({ ...emails, lesClefs: e.target.value })} />
          </div>
          <div className="field">
            <label>Website URL</label>
            <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} />
          </div>
        </div>
        <div className="admin-modal-actions">
          <button className="btn-preview" onClick={() => setEmailsModal(false)}>Cancel</button>
          <button className="btn-save" onClick={() => setEmailsModal(false)}>Save &amp; Close</button>
        </div>
      </AdminModal>

      {/* Social Media Summary */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3>Social Media</h3>
          <EditBtn onClick={() => setSocialsModal(true)} />
        </div>
        <div style={{ display: "grid", gap: 12 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <SummaryField label="Facebook" value={socials.facebook} />
            <SummaryField label="Instagram" value={socials.instagram} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <SummaryField label="Twitter / X" value={socials.twitter} />
            <SummaryField label="YouTube" value={socials.youtube} />
          </div>
        </div>
      </div>

      <AdminModal title="Edit Social Media" open={socialsModal} onClose={() => setSocialsModal(false)}>
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
        <div className="admin-modal-actions">
          <button className="btn-preview" onClick={() => setSocialsModal(false)}>Cancel</button>
          <button className="btn-save" onClick={() => setSocialsModal(false)}>Save &amp; Close</button>
        </div>
      </AdminModal>

      {/* Mailing Address Summary */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3>Mailing Address</h3>
          <EditBtn onClick={() => setAddressModal(true)} />
        </div>
        <div style={{ display: "grid", gap: 12 }}>
          <SummaryField label="Organization Name" value={address.name} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <SummaryField label="Street Address" value={address.street} />
            <SummaryField label="City, State, Zip" value={address.cityStateZip} />
          </div>
        </div>
      </div>

      <AdminModal title="Edit Mailing Address" open={addressModal} onClose={() => setAddressModal(false)}>
        <div className="field">
          <label>Organization Name</label>
          <input type="text" value={address.name} onChange={(e) => setAddress({ ...address, name: e.target.value })} />
        </div>
        <div className="field-row">
          <div className="field">
            <label>Street Address</label>
            <input type="text" value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} />
          </div>
          <div className="field">
            <label>City, State, Zip</label>
            <input type="text" value={address.cityStateZip} onChange={(e) => setAddress({ ...address, cityStateZip: e.target.value })} />
          </div>
        </div>
        <div className="admin-modal-actions">
          <button className="btn-preview" onClick={() => setAddressModal(false)}>Cancel</button>
          <button className="btn-save" onClick={() => setAddressModal(false)}>Save &amp; Close</button>
        </div>
      </AdminModal>
    </>
  );
}
