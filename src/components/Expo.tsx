const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export default function Expo() {
  return (
    <section className="expo" id="expo">
      <div className="container">
        {/* Header */}
        <div className="expo-header fade-in">
          <div className="section-label">Annual Event</div>
          <h2>
            LACA Expo &amp; Hospitality <em>Trade Show</em>
          </h2>
          <p>
            Where hospitality meets opportunity, showcasing the best in dining,
            attractions, entertainment, wellness, retail, and experiences.
          </p>
        </div>

        {/* Stat cards */}
        <div className="expo-grid">
          {[
            {
              num: "200–350",
              title: "Front-Line Experts",
              desc: "Hospitality professionals from leading LA hotels and resorts attend each year to discover new partnerships.",
            },
            {
              num: "45–65",
              title: "Top-Tier Vendors",
              desc: "A curated vendor list ensures meaningful engagement and quality connections for every participant.",
            },
            {
              num: "10+",
              title: "Years Running",
              desc: "A decade-long tradition of excellence connecting the most influential voices in Southern California hospitality.",
            },
          ].map((card, i) => (
            <div className={`expo-card fade-in stagger-${i + 1}`} key={card.title}>
              <div className="expo-card-number">{card.num}</div>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </div>
          ))}
        </div>

        {/* Venue highlight */}
        <div className="expo-venue fade-in">
          <div className="expo-venue-img">
            <img
              src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=500&fit=crop"
              alt="Elegant event venue with ambient lighting"
            />
          </div>
          <div className="expo-venue-info">
            <h3>Taglyan Complex</h3>
            <p>
              Join us at one of Los Angeles&apos; most prestigious event venues for
              an evening of networking, discovery, and industry connection.
              Limited vendor space available.
            </p>
            <div className="expo-venue-details">
              <div className="venue-detail">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Los Angeles, CA
              </div>
              <div className="venue-detail">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                2025 Date TBA
              </div>
            </div>
            <div style={{ marginTop: 28 }}>
              <a
                href="mailto:corporateambassador@thelaca.com"
                className="btn-primary"
                style={{ display: "inline-flex" }}
              >
                Inquire About Participation <Arrow />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}