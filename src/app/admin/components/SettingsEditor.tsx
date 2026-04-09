"use client";

import { useState, useEffect } from "react";
import { useSiteDoc, saveSiteDoc } from "@/lib/hooks";

export default function SettingsEditor() {
  const { data, loading } = useSiteDoc("settings");
  const [adminPassword, setAdminPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showExpo, setShowExpo] = useState(true);
  const [showGala, setShowGala] = useState(true);
  const [showDeadlineBanner, setShowDeadlineBanner] = useState(true);
  const [showSponsorLogos, setShowSponsorLogos] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [passwordSaved, setPasswordSaved] = useState(false);

  useEffect(() => {
    if (!data) return;
    if (data.adminPassword) setAdminPassword(data.adminPassword);
    if (data.showExpo !== undefined) setShowExpo(data.showExpo);
    if (data.showGala !== undefined) setShowGala(data.showGala);
    if (data.showDeadlineBanner !== undefined) setShowDeadlineBanner(data.showDeadlineBanner);
    if (data.showSponsorLogos !== undefined) setShowSponsorLogos(data.showSponsorLogos);
  }, [data]);

  const saveToggles = async () => {
    setSaving(true);
    await saveSiteDoc("settings", { showExpo, showGala, showDeadlineBanner, showSponsorLogos });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const savePassword = async () => {
    if (newPassword.length < 8) {
      alert("Password must be at least 8 characters.");
      return;
    }
    await saveSiteDoc("settings", { adminPassword: newPassword });
    setAdminPassword(newPassword);
    setNewPassword("");
    setPasswordSaved(true);
    setTimeout(() => setPasswordSaved(false), 2000);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("laca-admin");
    window.location.reload();
  };

  if (loading) return <div style={{ padding: 40, color: "#8B92A0" }}>Loading...</div>;

  return (
    <>
      <div className="topbar">
        <h1>Settings</h1>
        <div className="topbar-actions">
          {saved && (
            <span style={{ fontSize: 13, color: "#38A169", fontWeight: 500 }}>Saved!</span>
          )}
          <button className="btn-save" onClick={saveToggles} disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Section Visibility */}
      <div className="card">
        <div className="card-header">
          <h3>Section Visibility</h3>
        </div>
        <div className="card-body">
          <div className="toggle-row">
            <div className="toggle-label">
              <h4>Show Expo Section</h4>
              <p>Display the Annual Expo feature on the Events page</p>
            </div>
            <div className={`toggle ${showExpo ? "on" : ""}`} onClick={() => setShowExpo(!showExpo)} />
          </div>
          <div className="toggle-row">
            <div className="toggle-label">
              <h4>Show Winter Gala</h4>
              <p>Display the Winter Gala section on the Events page</p>
            </div>
            <div className={`toggle ${showGala ? "on" : ""}`} onClick={() => setShowGala(!showGala)} />
          </div>
          <div className="toggle-row">
            <div className="toggle-label">
              <h4>Show Deadline Banner</h4>
              <p>Display the membership deadline banner on the Membership page</p>
            </div>
            <div className={`toggle ${showDeadlineBanner ? "on" : ""}`} onClick={() => setShowDeadlineBanner(!showDeadlineBanner)} />
          </div>
          <div className="toggle-row">
            <div className="toggle-label">
              <h4>Show Sponsor Logos</h4>
              <p>Display the logo grid on the Sponsors page (enable after adding logos)</p>
            </div>
            <div className={`toggle ${showSponsorLogos ? "on" : ""}`} onClick={() => setShowSponsorLogos(!showSponsorLogos)} />
          </div>
        </div>
      </div>

      {/* Admin Access */}
      <div className="card">
        <div className="card-header">
          <h3>Admin Access</h3>
        </div>
        <div className="card-body">
          <div style={{ padding: 20, background: "#FAF8F3", borderRadius: 8, marginBottom: 24 }}>
            <div className="summary-label" style={{ marginBottom: 6 }}>Current Password</div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: "#1A2744", fontFamily: "monospace", letterSpacing: "0.05em" }}>
                {showPassword ? adminPassword : "••••••••••"}
              </div>
              <button
                onClick={() => setShowPassword(!showPassword)}
                style={{ color: "#8B92A0", transition: "color 0.2s ease" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#1A2744"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "#8B92A0"; }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 16, height: 16 }}>
                  {showPassword ? (
                    <>
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </>
                  ) : (
                    <>
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </>
                  )}
                </svg>
              </button>
            </div>
            <div className="field-hint" style={{ marginTop: 8 }}>
              Share only with authorized LACA board members.
            </div>
          </div>

          <div style={{ display: "flex", gap: 12, alignItems: "flex-end" }}>
            <div className="field" style={{ flex: 1, marginBottom: 0 }}>
              <label>New Password</label>
              <input
                type="text"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password (min 8 characters)"
              />
            </div>
            <button className="btn-save" onClick={savePassword} style={{ height: 44, whiteSpace: "nowrap" as const }}>
              Update
            </button>
          </div>
          {passwordSaved && (
            <div style={{ fontSize: 13, color: "#38A169", fontWeight: 500, marginTop: 12 }}>
              Password updated!
            </div>
          )}
        </div>
      </div>

      {/* Logout */}
      <div className="card">
        <div className="card-header">
          <h3>Session</h3>
        </div>
        <div className="card-body">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 500, color: "#1A2744", marginBottom: 4 }}>
                Logged in as Admin
              </div>
              <div style={{ fontSize: 12, color: "#8B92A0" }}>
                Session stored in browser. Closing the tab will log you out.
              </div>
            </div>
            <button
              onClick={handleLogout}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" as const,
                color: "#E53E3E", border: "1px solid rgba(229,62,62,0.2)",
                padding: "10px 24px", borderRadius: 4, transition: "all 0.2s ease", background: "transparent",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#FFF5F5"; e.currentTarget.style.borderColor = "#E53E3E"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(229,62,62,0.2)"; }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 16, height: 16 }}>
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Log Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
}