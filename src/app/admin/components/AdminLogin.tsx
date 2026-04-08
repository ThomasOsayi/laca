"use client";

import { useState } from "react";

interface AdminLoginProps {
  onLogin: () => void;
  correctPassword: string;
}

export default function AdminLogin({ onLogin, correctPassword }: AdminLoginProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (password === correctPassword) {
      sessionStorage.setItem("laca-admin", "true");
      onLogin();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="admin-login">
      <div className="admin-login-card">
        <div className="admin-login-brand">LA</div>
        <h1>LACA Admin</h1>
        <p>Enter the admin password to continue.</p>
        <div className="admin-login-field">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className={error ? "error" : ""}
          />
        </div>
        {error && <div className="admin-login-error">Incorrect password</div>}
        <button className="admin-login-btn" onClick={handleSubmit}>
          Sign In
        </button>
      </div>
    </div>
  );
}