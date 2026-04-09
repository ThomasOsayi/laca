"use client";

import { useSiteData } from "@/lib/SiteDataContext";

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14, color: "var(--gold)", flexShrink: 0 }}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function WinterGala() {
  const { events, settings } = useSiteData();
  const gala = events?.gala;

  if (settings?.showGala === false) return null;

  const perks = [
    "Complimentary for Gold Key Partners (2 guests)",
    "Member recognition and awards ceremony",
    "Networking with LA's top hospitality professionals",
  ];

  return (
    <section className="gala">
      <div className="container">
        <div className="gala-card fade-in">
          <div className="gala-img">
            <img
              src={gala?.image || "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=600&fit=crop"}
              alt="Elegant gala dinner setting"
            />
          </div>
          <div className="gala-details">
            <div className="gala-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 12, height: 12 }}>
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              Annual Celebration
            </div>
            <h2>
              {gala?.name ? (
                <span dangerouslySetInnerHTML={{ __html: (gala.name as string).replace("Gala", "<em>Gala</em>") }} />
              ) : (
                <>The LACA Winter <em>Gala</em></>
              )}
            </h2>
            <p>
              {gala?.description ||
                "An elegant end-of-year celebration honoring the achievements of our members and the partnerships that define LA hospitality. Gold Key Partners and General Sponsors receive complimentary admission."}
            </p>
            <div className="gala-perks">
              {perks.map((p) => (
                <div className="gala-perk" key={p}>
                  <Check />
                  {p}
                </div>
              ))}
            </div>
            <a
              href="mailto:publicrelations@thelaca.com"
              className="btn-secondary-light"
            >
              Inquire About the Gala <Arrow />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
