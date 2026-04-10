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
          {saved && <span style={{ fontSize: 13, color: "#38A169", fontWeight: 500 }}>Saved!</span>}
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
          <span style={{ fontSize: 12, color: "#8B92A0" }}>Click any logo to edit</span>
        </div>
        <div className="card-body">
          {/* Info bar */}
          <div style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "14px 20px", background: "#FAF8F3", borderRadius: 8,
            marginBottom: 20, fontSize: 12, color: "#5A6478",
          }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" style={{ width: 16, height: 16, flexShrink: 0 }}>
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            Logos appear on the Sponsors page when &quot;Show Sponsor Logos&quot; is enabled in Settings.
          </div>

          {logos.length === 0 ? (
            <div className="empty-state">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 40, height: 40 }}>
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <h4>No sponsor logos yet</h4>
              <p>Upload logos as they become available.</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
              {logos.map((logo) => {
                const isIncomplete = !logo.name || !logo.url;
                return (
                  <div
                    key={logo.id}
                    onClick={() => setEditingLogoId(logo.id)}
                    style={{
                      background: "#FAF8F3", border: "1px solid rgba(26,39,68,0.08)",
                      borderRadius: 8, overflow: "hidden", cursor: "pointer",
                      transition: "all 0.2s", position: "relative",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "rgba(201,168,76,0.2)";
                      e.currentTarget.style.boxShadow = "0 8px 30px rgba(26,39,68,0.08)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                      const acts = e.currentTarget.querySelector(".logo-acts") as HTMLElement;
                      if (acts) acts.style.opacity = "1";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(26,39,68,0.08)";
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.transform = "none";
                      const acts = e.currentTarget.querySelector(".logo-acts") as HTMLElement;
                      if (acts) acts.style.opacity = "0";
                    }}
                  >
                    {/* Logo preview */}
                    <div style={{
                      height: 100, display: "flex", alignItems: "center", justifyContent: "center",
                      overflow: "hidden", background: "white", margin: "12px 12px 0", borderRadius: 6,
                      border: "1px solid rgba(26,39,68,0.08)",
                    }}>
                      {logo.url ? (
                        <img src={logo.url} alt={logo.name} style={{ maxWidth: "80%", maxHeight: "80%", objectFit: "contain" }} />
                      ) : (
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, color: "#8B92A0" }}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 24, height: 24, opacity: 0.3 }}>
                            <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                          </svg>
                          <span style={{ fontSize: 10 }}>No logo</span>
                        </div>
                      )}
                    </div>
                    {/* Info */}
                    <div style={{ padding: "10px 12px" }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: "#1A2744", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {logo.name || "Unnamed Sponsor"}
                      </div>
                      <div style={{ fontSize: 10, color: isIncomplete ? "#D69E2E" : "#38A169" }}>
                        {!logo.name && !logo.url ? "Incomplete" : !logo.url ? "Needs logo" : "Logo uploaded"}
                      </div>
                    </div>
                    {/* Hover actions */}
                    <div className="logo-acts" style={{
                      position: "absolute", top: 8, right: 8, display: "flex", gap: 4,
                      opacity: 0, transition: "opacity 0.15s",
                    }}>
                      <button
                        className="btn-icon-sm danger"
                        onClick={(e) => removeLogo(logo.id, e)}
                        title="Remove"
                        style={{ background: "rgba(255,255,255,0.95)" }}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 12, height: 12 }}>
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <button className="btn-add" onClick={addLogo} style={{ marginTop: 16 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Sponsor Logo
          </button>
        </div>
      </div>

      {/* Logo Modal */}
      <AdminModal
        title="Edit Sponsor Logo"
        subtitle={editingLogo ? editingLogo.name || "New Sponsor" : ""}
        open={!!editingLogo}
        onClose={() => setEditingLogoId(null)}
        onSave={save}
      >
        {editingLogo && (
          <>
            <div style={{ padding: 20, background: "#FAF8F3", borderRadius: 8, marginBottom: 20 }}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#C9A84C", marginBottom: 16 }}>
                Sponsor Details
              </div>
              <div className="field" style={{ marginBottom: 0 }}>
                <label>Company Name</label>
                <input
                  type="text"
                  value={editingLogo.name}
                  onChange={(e) => updateLogo(editingLogo.id, "name", e.target.value)}
                  placeholder="Company name"
                />
              </div>
            </div>
            <div style={{ padding: 20, background: "#FAF8F3", borderRadius: 8 }}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#C9A84C", marginBottom: 16 }}>
                Logo Image
              </div>
              <ImageUpload
                value={editingLogo.url}
                onChange={(url) => updateLogo(editingLogo.id, "url", url)}
                folder="sponsors/logos"
                label=""
                recommendedSize="300x200px. PNG with transparent background"
                previewWidth={120}
                previewHeight={80}
              />
            </div>
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
          <span style={{ fontSize: 12, color: "#8B92A0" }}>Click to edit</span>
        </div>
        <div className="card-body">
          {/* Info bar */}
          <div style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "14px 20px", background: "#FAF8F3", borderRadius: 8,
            marginBottom: 20, fontSize: 12, color: "#5A6478",
          }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" style={{ width: 16, height: 16, flexShrink: 0 }}>
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            These images appear in the scrolling gallery on the Sponsors and Home pages.
          </div>

          {gallery.length === 0 ? (
            <div className="empty-state">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 40, height: 40 }}>
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <h4>No gallery images yet</h4>
              <p>Add event and venue photos to replace the defaults.</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
              {gallery.map((img) => (
                <div
                  key={img.id}
                  onClick={() => setEditingGalleryId(img.id)}
                  style={{
                    borderRadius: 8, overflow: "hidden", cursor: "pointer",
                    transition: "all 0.2s", position: "relative", height: 140,
                    background: "#FAF8F3", border: "1px solid rgba(26,39,68,0.08)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(201,168,76,0.2)";
                    e.currentTarget.style.boxShadow = "0 8px 30px rgba(26,39,68,0.08)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                    const ov = e.currentTarget.querySelector(".gal-overlay") as HTMLElement;
                    if (ov) ov.style.opacity = "1";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(26,39,68,0.08)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.transform = "none";
                    const ov = e.currentTarget.querySelector(".gal-overlay") as HTMLElement;
                    if (ov) ov.style.opacity = "0";
                  }}
                >
                  {img.url ? (
                    <img src={img.url} alt={img.alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, color: "#8B92A0" }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 28, height: 28, opacity: 0.3 }}>
                        <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                      </svg>
                      <span style={{ fontSize: 11 }}>No image</span>
                    </div>
                  )}
                  {/* Hover overlay */}
                  <div className="gal-overlay" style={{
                    position: "absolute", inset: 0, background: "rgba(15,26,46,0.6)",
                    opacity: 0, transition: "opacity 0.2s",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  }}>
                    <button
                      className="btn-icon-sm danger"
                      onClick={(e) => removeGalleryImage(img.id, e)}
                      title="Remove"
                      style={{ background: "rgba(255,255,255,0.95)" }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 12, height: 12 }}>
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                  </div>
                  {/* Alt text label on hover */}
                  {img.alt && (
                    <div className="gal-overlay" style={{
                      position: "absolute", bottom: 0, left: 0, right: 0,
                      padding: "8px 12px", background: "linear-gradient(transparent, rgba(15,26,46,0.8))",
                      opacity: 0, transition: "opacity 0.2s",
                    }}>
                      <span style={{ fontSize: 10, color: "white", fontWeight: 500 }}>{img.alt}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <button className="btn-add" onClick={addGalleryImage} style={{ marginTop: 16 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Gallery Image
          </button>
        </div>
      </div>

      {/* Gallery Modal */}
      <AdminModal
        title="Edit Gallery Image"
        subtitle={editingGallery ? editingGallery.alt || "New Image" : ""}
        open={!!editingGallery}
        onClose={() => setEditingGalleryId(null)}
        onSave={save}
      >
        {editingGallery && (
          <>
            <div style={{ padding: 20, background: "#FAF8F3", borderRadius: 8, marginBottom: 20 }}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#C9A84C", marginBottom: 16 }}>
                Image
              </div>
              <ImageUpload
                value={editingGallery.url}
                onChange={(url) => updateGalleryImage(editingGallery.id, "url", url)}
                folder="sponsors/gallery"
                label=""
                recommendedSize="640x440px"
                previewWidth={160}
                previewHeight={110}
              />
            </div>
            <div style={{ padding: 20, background: "#FAF8F3", borderRadius: 8 }}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#C9A84C", marginBottom: 16 }}>
                Details
              </div>
              <div className="field" style={{ marginBottom: 0 }}>
                <label>Alt Text</label>
                <input
                  type="text"
                  value={editingGallery.alt}
                  onChange={(e) => updateGalleryImage(editingGallery.id, "alt", e.target.value)}
                  placeholder="Describe the image (e.g. LA skyline at sunset)"
                />
                <div className="field-hint">Used for accessibility and SEO</div>
              </div>
            </div>
          </>
        )}
      </AdminModal>
    </>
  );
}