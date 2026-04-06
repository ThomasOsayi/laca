const Arrow = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
  
  const Check = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
  
  export default function SponsorTiers() {
    const tiers = [
      {
        label: "Premier Level",
        name: "Gold Key Partner",
        price: "Invitation Only",
        priceSpan: null,
        desc: "Reserved for sponsors who have participated as General Sponsors for a minimum of four years and consistently demonstrated exceptional service standards.",
        featured: true,
        showCta: false,
        features: [
          "Invitation for 2 to at least 6 LACA meetings",
          "Complimentary admission for 2 to Winter Gala",
          "Complimentary table at Annual Trade Show",
          "Option to purchase additional tables at discount",
          "Recognition on LACA website",
          "Confidential LACA member roster",
          "Invitations to additional special events",
        ],
      },
      {
        label: "Entry Level",
        name: "General Sponsor",
        price: "$800",
        priceSpan: "/ year",
        desc: "By invitation from the Board of Directors. For businesses providing services valuable to the concierge profession with high customer service standards.",
        featured: false,
        showCta: true,
        features: [
          "Invitation for 1 to at least 3 LACA meetings",
          "Annual Trade Show and Winter Gala access",
          "Discounted table at the Trade Show",
          "Recognition on LACA website",
          "Confidential LACA member roster",
        ],
      },
    ];
  
    return (
      <section className="sponsor-tiers">
        <div className="container">
          <div className="sponsor-tiers-header fade-in">
            <div className="section-label">Partnership Levels</div>
            <h2>
              Sponsorship <em>Tiers</em>
            </h2>
            <p>
              Two levels of partnership, each designed to connect your brand with
              LA&apos;s most influential concierge network.
            </p>
          </div>
  
          <div className="sponsor-tiers-grid">
            {tiers.map((t, i) => (
              <div
                className={`sponsor-tier-card ${t.featured ? "featured" : ""} fade-in stagger-${i + 1}`}
                key={t.name}
              >
                <div className="sponsor-tier-label">{t.label}</div>
                <h3>{t.name}</h3>
                <div className="sponsor-tier-price">
                  {t.price} {t.priceSpan && <span>{t.priceSpan}</span>}
                </div>
                <div className="sponsor-tier-desc">{t.desc}</div>
                <div className="sponsor-tier-features">
                  {t.features.map((f) => (
                    <div className="sponsor-tier-feature" key={f}>
                      <div className="sponsor-tier-check">
                        <Check />
                      </div>
                      {f}
                    </div>
                  ))}
                </div>
                {t.showCta && (
                  <a
                    href="mailto:membership@thelaca.com"
                    className="btn-secondary-light"
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    Request Invitation <Arrow />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }