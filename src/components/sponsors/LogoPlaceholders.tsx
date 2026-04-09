"use client";

import { useSiteData } from "@/lib/SiteDataContext";

export default function LogoPlaceholders() {
  const { sponsors, settings } = useSiteData();

  if (settings?.showSponsorLogos === false) return null;

  const hasLogos = sponsors?.logos?.length > 0;

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
            ? sponsors!.logos.map((logo: { id: string; name: string; url: string }) => (
                <div className="logo-placeholder" key={logo.id}>
                  {logo.url ? (
                    <img src={logo.url} alt={logo.name} style={{ maxWidth: "100%", maxHeight: "100%" }} />
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
