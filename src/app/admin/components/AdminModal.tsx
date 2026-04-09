"use client";

import { useEffect } from "react";

interface AdminModalProps {
  title: string;
  subtitle?: string;
  open: boolean;
  onClose: () => void;
  onSave?: () => void;
  children: React.ReactNode;
  width?: number;
}

export default function AdminModal({
  title,
  subtitle,
  open,
  onClose,
  onSave,
  children,
  width = 600,
}: AdminModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  if (!open) return null;

  const handleSave = () => {
    if (onSave) onSave();
    onClose();
  };

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div
        className="admin-modal"
        style={{ maxWidth: width }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="admin-modal-header">
          <div>
            <h3>{title}</h3>
            {subtitle && <span>{subtitle}</span>}
          </div>
          <button className="admin-modal-close" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 16, height: 16 }}>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="admin-modal-body">
          {children}
        </div>

        <div className="admin-modal-actions">
          <button className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-save" onClick={handleSave}>
            Save &amp; Close
          </button>
        </div>
      </div>
    </div>
  );
}