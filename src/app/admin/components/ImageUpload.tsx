"use client";

import { useState } from "react";
import { storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  folder: string;
  label?: string;
  recommendedSize?: string;
  previewStyle?: "circle" | "rectangle";
  previewWidth?: number;
  previewHeight?: number;
}

export default function ImageUpload({
  value,
  onChange,
  folder,
  label = "Photo",
  recommendedSize = "800x600px",
  previewStyle = "rectangle",
  previewWidth = 160,
  previewHeight = 120,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File must be under 5MB");
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    setUploading(true);
    try {
      const fileName = `${folder}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, "_")}`;
      const storageRef = ref(storage, fileName);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      onChange(url);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed. Please try again.");
    }
    setUploading(false);
    e.target.value = "";
  };

  const isCircle = previewStyle === "circle";

  return (
    <div className="field">
      <label>{label}</label>
      <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
        {/* Preview */}
        <div
          style={{
            width: isCircle ? 80 : previewWidth,
            height: isCircle ? 80 : previewHeight,
            borderRadius: isCircle ? "50%" : 8,
            background: "#FAF8F3",
            border: "1px solid rgba(26,39,68,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            overflow: "hidden",
          }}
        >
          {value ? (
            <img
              src={value}
              alt="Preview"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="#8B92A0" strokeWidth="1.5" style={{ width: 24, height: 24 }}>
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          )}
        </div>

        <div style={{ flex: 1 }}>
          {/* Upload button */}
          <label
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase" as const,
              color: uploading ? "#8B92A0" : "#5A6478",
              border: "1px solid rgba(26,39,68,0.08)",
              padding: "10px 20px",
              borderRadius: 4,
              cursor: uploading ? "not-allowed" : "pointer",
              transition: "all 0.2s ease",
              marginBottom: 8,
            }}
            onMouseEnter={(e) => {
              if (!uploading) {
                e.currentTarget.style.borderColor = "#C9A84C";
                e.currentTarget.style.color = "#C9A84C";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(26,39,68,0.08)";
              e.currentTarget.style.color = uploading ? "#8B92A0" : "#5A6478";
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 16, height: 16 }}>
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            {uploading ? "Uploading..." : "Upload Image"}
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleUpload}
              disabled={uploading}
            />
          </label>

          <div className="field-hint">
            Recommended: {recommendedSize}. Max 5MB.
          </div>

          {value && (
            <button
              onClick={() => onChange("")}
              style={{
                marginTop: 8,
                fontSize: 12,
                fontWeight: 500,
                color: "#E53E3E",
                cursor: "pointer",
                background: "none",
                border: "none",
                padding: 0,
              }}
            >
              Remove image
            </button>
          )}
        </div>
      </div>
    </div>
  );
}