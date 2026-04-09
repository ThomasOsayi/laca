"use client";

import { useState, useEffect } from "react";
import { useSiteDoc, saveSiteDoc } from "@/lib/hooks";
import AdminModal from "./AdminModal";
import ImageUpload from "./ImageUpload";

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

  const [editingLogoId, setEditingLogoId] = useState<string | null>(null);
  const [editingGalleryId, setEditingGalleryId] = useState<string | null>(null);

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

  // Logo handlers
  const addLogo = () => {
    const newLogo: SponsorLogo = { id: Date.now().toString(), name: "", url: "" };
    setLogos([...logos, newLogo]);
    setEditingLogoId(newLogo.id);
  };

  const updateLogo = (id: string, field: keyof SponsorLogo, value: string) => {
    setLogos(logos.map((l) => (l.id === id ? { ...l, [field]: value } : l)));
  };

  const removeLogo = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Remove this sponsor logo?")) {
      setLogos(logos.filter((l) => l.id !== id));
      if (editingLogoId === id) setEditingLogoId(null);
    }
  };

  // Gallery handlers
  const addGalleryImage = () => {
    const newImg: GalleryImage = { id: Date.now().toString(), url: "", alt: "" };
    setGallery([...gallery, newImg]);
    setEditingGalleryId(newImg.id);
  };

  const updateGalleryImage = (id: string, field: keyof GalleryImage, value: string) => {
    setGallery(gallery.map((g) => (g.id === id ? { ...g, [field]: value } : g)));
  };

  const removeGalleryImage = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Remove this gallery image?")) {
      setGallery(gallery.filter((g) => g.id !== id));
      if (editingGalleryId === id) setEditingGalleryId(null);
    }
  };

  const editingLogo = logos.find((l) => l.id === editingLogoId);
  const editingGallery = gallery.find((g) => g.id === editingGalleryId);

  if (loading) return <div style={{ padding: 40, color: "#8B92A0" }}>Loading...</div>;

  return (
    <>
      <div className="topbar">
        <h1>Sponsors</h1>
        <div className="topbar-actions">
          {saved && (
            <span style={{ fontSize: 13, color: "#38A169", fontWeight: 500 }}>Saved!</span>
          )}
          <button className="btn-save" onClick={save} disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {/* ===== SPONSOR LOGOS ===== */}
      <div className="card">
        <div className="card-header">
          <div style={{ display: "flex", alignItems: "center" }}>
            <h3>Sponsor Logos</h3>
            <span className="count">{logos.length}</span>
          </div>
        </div>

        {logos.length === 0 ? (
          <div className="empty-state">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <h4>No sponsor logos yet</h4>
            <p>Upload logos as they become available. They will appear on the Sponsors page.</p>
          </div>
        ) : (
          <div className="member-list">
            {logos.map((logo) => (
              <div
                className="member-row"
                key={logo.id}
                onClick={() => setEditingLogoId(logo.id)}
              >
                <div
                  style={{
                    width: 60, height: 44, borderRadius: 6, background: "white",
                    border: "1px solid rgba(26,39,68,0.08)", display: "flex",
                    alignItems: "center", justifyContent: "center", flexShrink: 0, overflow: "hidden",
                  }}
                >
                  {logo.url ? (
                    <img src={logo.url} alt={logo.name} style={{ maxWidth: "90%", maxHeight: 36, objectFit: "contain" }} />
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="#8B92A0" strokeWidth="1.5" style={{ width: 18, height: 18 }}>
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                  )}
                </div>
                <div className="member-details">
                  <h4>{logo.name || "Unnamed Sponsor"}</h4>
                  <p>{logo.url ? "Logo uploaded" : "No logo image"}</p>
                </div>
                <div className="member-row-actions">
                  <button
                    className="btn-icon-sm danger"
                    onClick={(e) => removeLogo(logo.id, e)}
                    title="Remove"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="btn-add-row" onClick={addLogo}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Sponsor Logo
        </div>
      </div>

      <AdminModal
        title="Edit Sponsor Logo"
        subtitle={editingLogo ? editingLogo.name || "New Sponsor" : ""}
        open={!!editingLogo}
        onClose={() => setEditingLogoId(null)}
      >
        {editingLogo && (
          <>
            <div className="field">
              <label>Sponsor Name</label>
              <input
                type="text"
                value={editingLogo.name}
                onChange={(e) => updateLogo(editingLogo.id, "name", e.target.value)}
                placeholder="Company name"
              />
            </div>
            <ImageUpload
              value={editingLogo.url}
              onChange={(url) => updateLogo(editingLogo.id, "url", url)}
              folder="sponsors/logos"
              label="Logo Image"
              recommendedSize="300x200px"
              previewWidth={120}
              previewHeight={80}
            />
          </>
        )}
      </AdminModal>

      {/* ===== GALLERY IMAGES ===== */}
      <div className="card">
        <div className="card-header">
          <div style={{ display: "flex", alignItems: "center" }}>
            <h3>Gallery Images</h3>
            <span className="count">{gallery.length}</span>
          </div>
        </div>

        {gallery.length === 0 ? (
          <div className="card-body">
            <div style={{
              padding: 20, background: "#FAF8F3", borderRadius: 8,
              fontSize: 13, color: "#8B92A0", lineHeight: 1.6,
            }}>
              Currently using default placeholder images. Add custom event and venue photos below to replace them on the Sponsors and Home pages.
            </div>
          </div>
        ) : (
          <div className="member-list">
            {gallery.map((img) => (
              <div
                className="member-row"
                key={img.id}
                onClick={() => setEditingGalleryId(img.id)}
              >
                <div
                  style={{
                    width: 80, height: 56, borderRadius: 6, background: "white",
                    border: "1px solid rgba(26,39,68,0.08)", display: "flex",
                    alignItems: "center", justifyContent: "center", flexShrink: 0, overflow: "hidden",
                  }}
                >
                  {img.url ? (
                    <img src={img.url} alt={img.alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="#8B92A0" strokeWidth="1.5" style={{ width: 18, height: 18 }}>
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                  )}
                </div>
                <div className="member-details">
                  <h4>{img.alt || "Untitled Image"}</h4>
                  <p>{img.url ? "Image uploaded" : "No image"}</p>
                </div>
                <div className="member-row-actions">
                  <button
                    className="btn-icon-sm danger"
                    onClick={(e) => removeGalleryImage(img.id, e)}
                    title="Remove"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="btn-add-row" onClick={addGalleryImage}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Gallery Image
        </div>
      </div>

      <AdminModal
        title="Edit Gallery Image"
        subtitle={editingGallery ? editingGallery.alt || "New Image" : ""}
        open={!!editingGallery}
        onClose={() => setEditingGalleryId(null)}
      >
        {editingGallery && (
          <>
            <ImageUpload
              value={editingGallery.url}
              onChange={(url) => updateGalleryImage(editingGallery.id, "url", url)}
              folder="sponsors/gallery"
              label="Gallery Image"
              recommendedSize="640x440px"
              previewWidth={160}
              previewHeight={110}
            />
            <div className="field" style={{ marginTop: 20 }}>
              <label>Alt Text</label>
              <input
                type="text"
                value={editingGallery.alt}
                onChange={(e) => updateGalleryImage(editingGallery.id, "alt", e.target.value)}
                placeholder="Describe the image (e.g. LA skyline at sunset)"
              />
              <div className="field-hint">Used for accessibility and SEO</div>
            </div>
          </>
        )}
      </AdminModal>
    </>
  );
}