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
  
  export default function MembershipTiers() {
    const tiers = [
      {
        label: "Most Popular",
        name: "Full Member",
        price: "$150",
        desc: "For hotel concierges working full-time at a lobby concierge desk in LA or Orange County.",
        featured: true,
        cta: "Apply Now",
        ctaStyle: "btn-primary",
        features: [
          "Voting rights on elections and business matters",
          "Eligible to hold elected office",
          "Access to all meetings, events, and Expo",
          "Les Clefs d'Or USA mentorship pathway",
          "Scholarship opportunities",
        ],
      },
      {
        label: "Non-Hotel Concierges",
        name: "Affiliate Member",
        price: "$175",
        desc: "For non-hotel concierges participating under a one-year trial period with board approval.",
        featured: false,
        cta: "Inquire",
        ctaStyle: "btn-outline",
        features: [
          "Access to meetings and events",
          "Mandatory participation in Expo/Gala",
          "One-year trial period",
          "Case-by-case board approval",
        ],
      },
      {
        label: "Industry Partners",
        name: "General Sponsor",
        price: "$800",
        desc: "By invitation only from the Board. For businesses providing services valuable to the concierge profession.",
        featured: false,
        cta: "Request Invitation",
        ctaStyle: "btn-outline",
        features: [
          "Attend up to 6 LACA meetings (2 guests)",
          "Complimentary Winter Gala admission for 2",
          "Complimentary table at Annual Trade Show",
          "Recognition on LACA website",
          "Confidential member roster for business use",
        ],
      },
    ];
  
    return (
      <section className="tiers">
        <div className="container">
          <div className="tiers-header fade-in">
            <div className="section-label">Membership Types</div>
            <h2>
              Choose Your <em>Path</em>
            </h2>
            <p>
              LACA offers three membership categories, each providing unique
              access to the LA hospitality community.
            </p>
          </div>
  
          <div className="tiers-grid">
            {tiers.map((t, i) => (
              <div
                className={`tier-card ${t.featured ? "featured" : ""} fade-in stagger-${i + 1}`}
                key={t.name}
              >
                <div className="tier-label">{t.label}</div>
                <h3>{t.name}</h3>
                <div className="tier-price">
                  {t.price} <span>/ year</span>
                </div>
                <div className="tier-desc">{t.desc}</div>
                <div className="tier-features">
                  {t.features.map((f) => (
                    <div className="tier-feature" key={f}>
                      <div className="tier-check">
                        <Check />
                      </div>
                      {f}
                    </div>
                  ))}
                </div>
                <a
                  href="mailto:membership@thelaca.com"
                  className={t.ctaStyle}
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  {t.cta} <Arrow />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }