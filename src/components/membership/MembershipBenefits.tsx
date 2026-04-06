export default function MembershipBenefits() {
    const benefits = [
      {
        title: "Professional Network",
        desc: "Connect with concierges from LA's most prestigious luxury hotels, boutique properties, and independent hotels.",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        ),
      },
      {
        title: "Les Clefs d'Or Pathway",
        desc: "Access mentorship and scholarship opportunities through our Les Clefs d'Or USA partnership — the gold standard in concierge excellence.",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ),
      },
      {
        title: "Education & Growth",
        desc: "Ongoing training, vendor presentations, guest speakers, and workshops designed to expand your hospitality knowledge.",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
        ),
      },
      {
        title: "Industry Standards",
        desc: "LACA upholds the highest ethical and professional standards, elevating the reputation of every member.",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        ),
      },
      {
        title: "Exclusive Events",
        desc: "Monthly meetings, social mixers, supper clubs, the Annual Expo, and the Winter Gala — all included with membership.",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        ),
      },
      {
        title: "Vendor Partnerships",
        desc: "Build preferred relationships with premier local venues, restaurants, entertainment providers, and service partners.",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
        ),
      },
    ];
  
    return (
      <section className="mem-benefits">
        <div className="container">
          <div className="mem-benefits-header fade-in">
            <div className="section-label">Why Join</div>
            <h2>
              Membership <em>Benefits</em>
            </h2>
          </div>
  
          <div className="mem-benefits-grid">
            {benefits.map((b, i) => (
              <div
                className={`mem-benefit-card fade-in stagger-${(i % 3) + 1}`}
                key={b.title}
              >
                <div className="mem-benefit-icon">{b.icon}</div>
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }