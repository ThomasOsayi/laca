"use client";

import { useSiteData } from "@/lib/SiteDataContext";

interface SponsorLogo {
  id: string;
  name: string;
  url: string;
}

export default function LogoPlaceholders() {
  const { sponsors, settings, loading } = useSiteData();

  if (settings?.showSponsorLogos === false) return null;

  const logos: SponsorLogo[] = Array.isArray(sponsors?.logos) ? sponsors.logos : [];
  const hasLogos = logos.length > 0;

  // Debug — remove after confirming
  if (typeof window !== "undefined") {
    console.log("[LogoPlaceholders]", { loading, sponsors, logos, hasLogos });
  }

  return (
    <section className="logos">
      <div className="container logos-inner">
        <div className="section-label">Our Partners</div>
        <h3>
          Current <em>Sponsors</em>
        </h3>
        <p>
          {hasLogos
            ? "Proudly supported by our valued partners."
            : "Sponsor logos will be featured here once provided by our partners."}
        </p>
        <div className="logos-grid">
          {hasLogos
            ? logos.map((logo) => (
                <div className="logo-placeholder" key={logo.id}>
                  {logo.url ? (
                    <img
                      src={logo.url}
                      alt={logo.name}
                      style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                    />
                  ) : (
                    <span>{logo.name}</span>
                  )}
                </div>
              ))
            : Array.from({ length: 6 }).map((_, i) => (
                <div className="logo-placeholder" key={i}>
                  <span>Logo</span>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}