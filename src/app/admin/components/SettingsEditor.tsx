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

  // Toggle card component
  const ToggleCard = ({ icon, title, desc, checked, onChange, disabled, warning }: {
    icon: React.ReactNode; title: string; desc: string;
    checked: boolean; onChange: () => void; disabled?: boolean; warning?: string;
  }) => (
    <div>
      <div
        style={{
          display: "flex", alignItems: "center", gap: 16,
          padding: "16px 20px", background: "#FAF8F3",
          border: "1px solid rgba(26,39,68,0.08)", borderRadius: 8,
          marginBottom: warning ? 0 : 8, opacity: disabled ? 0.55 : 1,
          transition: "all 0.15s",
        }}
      >
        <div style={{
          width: 36, height: 36, borderRadius: "50%",
          background: disabled ? "rgba(214,158,46,0.1)" : "#F5ECD5",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          {icon}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#1A2744", marginBottom: 2 }}>{title}</div>
          <div style={{ fontSize: 12, color: "#8B92A0" }}>{desc}</div>
        </div>
        <div
          className={`toggle ${checked ? "on" : ""}`}
          onClick={onChange}
        />
      </div>
      {warning && (
        <div style={{
          display: "flex", alignItems: "center", gap: 6,
          fontSize: 11, color: "#D69E2E", marginTop: 6, marginBottom: 8, paddingLeft: 56,
        }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 12, height: 12, flexShrink: 0 }}>
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          {warning}
        </div>
      )}
    </div>
  );

  if (loading) return <div style={{ padding: 40, color: "#8B92A0" }}>Loading...</div>;

  return (
    <>
      <div className="topbar">
        <h1>Settings</h1>
        <div className="topbar-actions">
          {saved && <span style={{ fontSize: 13, color: "#38A169", fontWeight: 500 }}>Saved!</span>}
          <button className="btn-save" onClick={saveToggles} disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {/* ===== SECTION VISIBILITY ===== */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3>Section Visibility</h3>
            <div style={{ fontSize: 12, color: "#8B92A0", marginTop: 2 }}>Control which sections appear on the public website</div>
          </div>
        </div>
        <div className="card-body">
          {/* Events Page group */}
          <div style={{ marginBottom: 20 }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 8,
              fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" as const,
              color: "#8B92A0", marginBottom: 12, paddingLeft: 4,
            }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2" style={{ width: 12, height: 12 }}>
                <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Events Page
            </div>
            <ToggleCard
              icon={<svg viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" style={{ width: 16, height: 16 }}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>}
              title="Show Expo Section"
              desc="Display the Annual Expo feature on the Events page"
              checked={showExpo}
              onChange={() => setShowExpo(!showExpo)}
            />
            <ToggleCard
              icon={<svg viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" style={{ width: 16, height: 16 }}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" /></svg>}
              title="Show Winter Gala"
              desc="Display the Winter Gala section on the Events page"
              checked={showGala}
              onChange={() => setShowGala(!showGala)}
            />
          </div>

          {/* Membership Page group */}
          <div style={{ marginBottom: 20 }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 8,
              fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" as const,
              color: "#8B92A0", marginBottom: 12, paddingLeft: 4,
            }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2" style={{ width: 12, height: 12 }}>
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
              </svg>
              Membership Page
            </div>
            <ToggleCard
              icon={<svg viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" style={{ width: 16, height: 16 }}><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>}
              title="Show Deadline Banner"
              desc="Display the membership deadline banner on the Membership page"
              checked={showDeadlineBanner}
              onChange={() => setShowDeadlineBanner(!showDeadlineBanner)}
            />
          </div>

          {/* Sponsors Page group */}
          <div>
            <div style={{
              display: "flex", alignItems: "center", gap: 8,
              fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" as const,
              color: "#8B92A0", marginBottom: 12, paddingLeft: 4,
            }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2" style={{ width: 12, height: 12 }}>
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              Sponsors Page
            </div>
            <ToggleCard
              icon={<svg viewBox="0 0 24 24" fill="none" stroke={showSponsorLogos ? "#C9A84C" : "#D69E2E"} strokeWidth="1.5" style={{ width: 16, height: 16 }}><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>}
              title="Show Sponsor Logos"
              desc="Display the logo grid on the Sponsors page"
              checked={showSponsorLogos}
              onChange={() => setShowSponsorLogos(!showSponsorLogos)}
              disabled={!showSponsorLogos}
              warning={!showSponsorLogos ? "No sponsor logos uploaded yet. Add logos in the Sponsors tab first." : undefined}
            />
          </div>
        </div>
      </div>

      {/* ===== ADMIN ACCESS ===== */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3>Admin Access</h3>
            <div style={{ fontSize: 12, color: "#8B92A0", marginTop: 2 }}>Manage the admin dashboard password</div>
          </div>
        </div>
        <div className="card-body">
          {/* Current password display */}
          <div style={{
            display: "flex", alignItems: "center", gap: 16,
            padding: "16px 20px", background: "#FAF8F3",
            border: "1px solid rgba(26,39,68,0.08)", borderRadius: 8,
            marginBottom: 20,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: "50%", background: "#F5ECD5",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" style={{ width: 16, height: 16 }}>
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const,
                color: "#8B92A0", marginBottom: 4,
              }}>Current Password</div>
              <div style={{ fontSize: 14, fontWeight: 500, color: "#1A2744", fontFamily: "monospace", letterSpacing: "0.05em" }}>
                {showPassword ? adminPassword : "••••••••••"}
              </div>
            </div>
            <button
              onClick={() => setShowPassword(!showPassword)}
              title={showPassword ? "Hide password" : "Show password"}
              style={{
                width: 28, height: 28, borderRadius: 4,
                display: "flex", alignItems: "center", justifyContent: "center",
                border: "1px solid rgba(26,39,68,0.08)", background: "transparent",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#C9A84C"; e.currentTarget.style.background = "#F5ECD5"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(26,39,68,0.08)"; e.currentTarget.style.background = "transparent"; }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="#8B92A0" strokeWidth="1.5" style={{ width: 14, height: 14 }}>
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

          {/* Change password cream section */}
          <div style={{ padding: 20, background: "#FAF8F3", borderRadius: 8 }}>
            <div style={{
              fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const,
              color: "#C9A84C", marginBottom: 16,
            }}>Change Password</div>
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <div className="field" style={{ marginBottom: 0 }}>
                  <label>New Password</label>
                  <input
                    type="text"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password (min 8 characters)"
                  />
                  <div className="field-hint">Minimum 8 characters</div>
                </div>
              </div>
              <button
                className="btn-save"
                onClick={savePassword}
                style={{ marginTop: 22, whiteSpace: "nowrap" as const }}
              >
                Update
              </button>
            </div>
            {passwordSaved && (
              <div style={{ fontSize: 13, color: "#38A169", fontWeight: 500, marginTop: 12 }}>
                Password updated!
              </div>
            )}
          </div>

          {/* Security hint */}
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            fontSize: 11, color: "#8B92A0", marginTop: 16,
          }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" style={{ width: 14, height: 14, flexShrink: 0 }}>
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            Share only with authorized LACA board members.
          </div>
        </div>
      </div>

      {/* ===== SESSION ===== */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3>Session</h3>
            <div style={{ fontSize: 12, color: "#8B92A0", marginTop: 2 }}>Manage your current admin session</div>
          </div>
        </div>
        <div className="card-body">
          <div style={{
            display: "flex", alignItems: "center", gap: 16,
            padding: 20, background: "#FAF8F3",
            border: "1px solid rgba(26,39,68,0.08)", borderRadius: 8,
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: "50%", background: "rgba(56,161,105,0.1)",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#38A169" strokeWidth="1.5" style={{ width: 18, height: 18 }}>
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#1A2744", display: "flex", alignItems: "center", gap: 8 }}>
                Logged in as Admin
                <span style={{
                  fontSize: 9, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const,
                  padding: "2px 8px", borderRadius: 100, background: "rgba(56,161,105,0.1)", color: "#38A169",
                }}>Active</span>
              </div>
              <div style={{ fontSize: 12, color: "#8B92A0", marginTop: 2 }}>
                Session stored in browser. Closing the tab will log you out.
              </div>
            </div>
            <button
              onClick={handleLogout}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" as const,
                color: "#E53E3E", border: "1px solid rgba(229,62,62,0.2)",
                padding: "10px 20px", borderRadius: 4, transition: "all 0.2s", background: "transparent",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#FFF5F5"; e.currentTarget.style.borderColor = "#E53E3E"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(229,62,62,0.2)"; }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
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