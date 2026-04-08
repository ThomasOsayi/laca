"use client";

import { useState, useEffect } from "react";
import { useSiteDoc, saveSiteDoc } from "@/lib/hooks";

interface SponsorLogo {
  id: string;
  name: string;
  url: string;
}

interface GalleryImage {
  id: string;
  url: string;
  alt: string;
}

export default function SponsorsEditor() {
  const { data, loading } = useSiteDoc("sponsors");
  const [logos, setLogos] = useState<SponsorLogo[]>([]);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!data) return;
    if (data.logos) setLogos(data.logos);
    if (data.galleryImages) setGallery(data.galleryImages);
  }, [data]);

  const save = async () => {
    setSaving(true);
    await saveSiteDoc("sponsors", { logos, galleryImages: gallery });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addLogo = () => {
    setLogos([...logos, { id: Date.now().toString(), name: "", url: "" }]);
  };

  const updateLogo = (id: string, field: keyof SponsorLogo, value: string) => {
    setLogos(logos.map((l) => (l.id === id ? { ...l, [field]: value } : l)));
  };

  const removeLogo = (id: string) => {
    if (confirm("Remove this sponsor logo?")) {
      setLogos(logos.filter((l) => l.id !== id));
    }
  };

  const addGalleryImage = () => {
    setGallery([...gallery, { id: Date.now().toString(), url: "", alt: "" }]);
  };

  const updateGalleryImage = (id: string, field: keyof GalleryImage, value: string) => {
    setGallery(gallery.map((g) => (g.id === id ? { ...g, [field]: value } : g)));
  };

  const removeGalleryImage = (id: string) => {
    if (confirm("Remove this gallery image?")) {
      setGallery(gallery.filter((g) => g.id !== id));
    }
  };

  if (loading) return <div style={{ padding: 40, color: "#8B92A0" }}>Loading...</div>;

  return (
    <>
      <div className="topbar">
        <h1>Sponsors</h1>
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

      {/* Sponsor Logos */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3>Sponsor Logos</h3>
          <span>{logos.length} logos</span>
        </div>

        {logos.length === 0 && (
          <div style={{ padding: 24, textAlign: "center", color: "#8B92A0", fontSize: 13, background: "#FAF8F3", borderRadius: 8, marginBottom: 16 }}>
            No sponsor logos added yet. Add logos below and they will appear on the Sponsors page.
          </div>
        )}

        {logos.map((logo) => (
          <div
            key={logo.id}
            style={{
              padding: 20,
              background: "#FAF8F3",
              border: "1px solid rgba(26,39,68,0.08)",
              borderRadius: 8,
              marginBottom: 16,
              display: "flex",
              gap: 16,
              alignItems: "flex-start",
            }}
          >
            {/* Preview */}
            <div
              style={{
                width: 80,
                height: 60,
                background: "white",
                border: "1px solid rgba(26,39,68,0.08)",
                borderRadius: 6,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                overflow: "hidden",
              }}
            >
              {logo.url ? (
                <img
                  src={logo.url}
                  alt={logo.name}
                  style={{ maxWidth: "90%", maxHeight: 48, objectFit: "contain" }}
                />
              ) : (
                <span style={{ fontSize: 10, color: "#8B92A0", fontWeight: 600 }}>
                  NO IMG
                </span>
              )}
            </div>

            <div style={{ flex: 1 }}>
              <div className="field-row">
                <div className="field" style={{ marginBottom: 0 }}>
                  <label>Sponsor Name</label>
                  <input
                    type="text"
                    value={logo.name}
                    onChange={(e) => updateLogo(logo.id, "name", e.target.value)}
                    placeholder="Company name"
                  />
                </div>
                <div className="field" style={{ marginBottom: 0 }}>
                  <label>Logo URL</label>
                  <input
                    type="text"
                    value={logo.url}
                    onChange={(e) => updateLogo(logo.id, "url", e.target.value)}
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>

            <button
              className="btn-icon danger"
              onClick={() => removeLogo(logo.id)}
              style={{ marginTop: 24 }}
              title="Remove"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </button>
          </div>
        ))}

        <button className="btn-add" onClick={addLogo}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 16, height: 16 }}>
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Sponsor Logo
        </button>
      </div>

      {/* Gallery Images */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3>Gallery Images</h3>
          <span>{gallery.length} images</span>
        </div>

        <div className="field-hint" style={{ marginBottom: 20 }}>
          {gallery.length === 0
            ? "Currently using default Unsplash placeholder images. Add custom images below to replace them on the Sponsors and Home pages."
            : "Custom gallery images are active. Remove all to revert to defaults."}
        </div>

        {gallery.map((img) => (
          <div
            key={img.id}
            style={{
              padding: 20,
              background: "#FAF8F3",
              border: "1px solid rgba(26,39,68,0.08)",
              borderRadius: 8,
              marginBottom: 16,
              display: "flex",
              gap: 16,
              alignItems: "flex-start",
            }}
          >
            {/* Preview */}
            <div
              style={{
                width: 100,
                height: 68,
                background: "white",
                border: "1px solid rgba(26,39,68,0.08)",
                borderRadius: 6,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                overflow: "hidden",
              }}
            >
              {img.url ? (
                <img
                  src={img.url}
                  alt={img.alt}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <span style={{ fontSize: 10, color: "#8B92A0", fontWeight: 600 }}>
                  NO IMG
                </span>
              )}
            </div>

            <div style={{ flex: 1 }}>
              <div className="field-row">
                <div className="field" style={{ marginBottom: 0 }}>
                  <label>Image URL</label>
                  <input
                    type="text"
                    value={img.url}
                    onChange={(e) => updateGalleryImage(img.id, "url", e.target.value)}
                    placeholder="https://..."
                  />
                </div>
                <div className="field" style={{ marginBottom: 0 }}>
                  <label>Alt Text</label>
                  <input
                    type="text"
                    value={img.alt}
                    onChange={(e) => updateGalleryImage(img.id, "alt", e.target.value)}
                    placeholder="Describe the image"
                  />
                </div>
              </div>
            </div>

            <button
              className="btn-icon danger"
              onClick={() => removeGalleryImage(img.id)}
              style={{ marginTop: 24 }}
              title="Remove"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </button>
          </div>
        ))}

        <button className="btn-add" onClick={addGalleryImage}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 16, height: 16 }}>
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Gallery Image
        </button>

        <div className="field-hint" style={{ marginTop: 12 }}>
          Recommended size: 640x440px. Up to 12 images for the scrolling gallery.
        </div>
      </div>
    </>
  );
}