"use client";

import { useSiteData } from "@/lib/SiteDataContext";

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export default function ExpoFeature() {
  const { events, contacts, settings } = useSiteData();
  const expo = events?.expo;

  if (settings?.showExpo === false) return null;

  return (
    <section className="expo-feature">
      <div className="container">
        <div className="expo-feature-grid fade-in">
          <div className="expo-feature-img">
            <img
              src={expo?.image || "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop"}
              alt="Taglyan Complex event venue"
            />
          </div>
          <div className="expo-feature-details">
            <div className="expo-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 12, height: 12 }}>
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              Premier Annual Event
            </div>
            <h2>
              {expo?.name ? (
                <span dangerouslySetInnerHTML={{ __html: (expo.name as string).replace("Trade Show", "<em>Trade Show</em>") }} />
              ) : (
                <>LACA Expo &amp; Hospitality <em>Trade Show</em></>
              )}
            </h2>
            <p>
              {expo?.description ||
                "Our signature annual event brings together concierges and hospitality professionals from across Los Angeles. For over a decade, this event has connected the industry's best with top-tier vendors and partners."}
            </p>
            <div className="expo-meta">
              <div className="expo-meta-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {expo?.venue || "Taglyan Complex"}, LA
              </div>
              <div className="expo-meta-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                {expo?.year || "2025"} {expo?.date || "Date TBA"}
              </div>
              <div className="expo-meta-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {expo?.time || "Evening Event"}
              </div>
            </div>
            <a
              href={`mailto:${contacts?.emails?.corporateAmbassador || "corporateambassador@thelaca.com"}`}
              className="btn-primary"
              style={{ display: "inline-flex" }}
            >
              Inquire About Participation <Arrow />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
