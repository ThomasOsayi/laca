"use client";

import { useState } from "react";

interface AdminLoginProps {
  onLogin: () => void;
  correctPassword: string;
  settingsLoading?: boolean;
}

export default function AdminLogin({ onLogin, correctPassword, settingsLoading }: AdminLoginProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (settingsLoading || !correctPassword) {
      setError(true);
      setTimeout(() => setError(false), 2500);
      return;
    }
    if (password === correctPassword) {
      setLoading(true);
      sessionStorage.setItem("laca-admin", "true");
      setTimeout(() => onLogin(), 400);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2500);
    }
  };

  const isDisabled = settingsLoading || loading;

  return (
    <div className="admin-login-page">
      <div className="admin-login-bg" />
      <div className="admin-login-line-left" />
      <div className="admin-login-line-right" />

      <div className="admin-login-wrapper">
        {/* Brand */}
        <div className="admin-login-brand-area">
          <div className="admin-login-logo">
            <div className="admin-login-logo-icon">
              <svg viewBox="0 0 42 42" fill="none" style={{ width: 28, height: 28 }}>
                <text x="4" y="28" fontFamily="Cormorant Garamond, serif" fontSize="24" fontWeight="700" fill="#0F1A2E">L</text>
                <text x="16" y="24" fontFamily="Cormorant Garamond, serif" fontSize="16" fontWeight="600" fill="#0F1A2E">A</text>
                <text x="12" y="36" fontFamily="Cormorant Garamond, serif" fontSize="14" fontWeight="500" fill="#0F1A2E">CA</text>
              </svg>
            </div>
            <div className="admin-login-logo-text">
              <h1>LACA Admin</h1>
              <span>Content Manager</span>
            </div>
          </div>
          <div className="admin-login-motto">
            &ldquo;In Service Through Friendship&rdquo;
          </div>
        </div>

        {/* Card */}
        <div
          className="admin-login-card"
          style={{ opacity: loading ? 0.5 : 1, transition: "opacity 0.3s ease" }}
        >
          <h2>Welcome Back</h2>
          <p className="admin-login-subtitle">
            Sign in to manage the LACA website
          </p>

          <div className="admin-login-field">
            <label>Admin Password</label>
            <div className="admin-login-password-wrap">
              <input
                type={showPassword ? "text" : "password"}
                placeholder={settingsLoading ? "Connecting..." : "Enter admin password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                className={error ? "error" : ""}
                autoComplete="current-password"
                disabled={settingsLoading}
              />
              <div
                className="admin-login-eye"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </div>
            </div>
          </div>

          {error && (
            <div className="admin-login-error">
              {settingsLoading ? "Still connecting to the database. Please wait a moment." : "Incorrect password. Please try again."}
            </div>
          )}

          <button
            className="admin-login-submit"
            onClick={handleSubmit}
            disabled={isDisabled}
            style={{ opacity: isDisabled ? 0.6 : 1, cursor: isDisabled ? "not-allowed" : "pointer" }}
          >
            {loading ? "Signing in..." : settingsLoading ? "Connecting..." : "Sign In"}
          </button>

          <div className="admin-login-divider">
            <span>or</span>
          </div>

          <div className="admin-login-help">
            <p>
              Need access? Contact your{" "}
              <a href="mailto:president@thelaca.com">
                LACA Board Administrator
              </a>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="admin-login-footer">
          <a href="/" target="_blank">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            View Live Website
          </a>
          <p>Los Angeles Concierge Association &copy; 2025</p>
        </div>
      </div>
    </div>
  );
}