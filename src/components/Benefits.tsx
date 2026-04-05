export default function Benefits() {
  const benefits = [
    {
      title: "Unmatched Exposure",
      desc: "Reach key decision-makers from luxury, leisure, and convention markets across Los Angeles and beyond.",
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
      title: "Professional Standards",
      desc: "LACA upholds the highest ethical and professional standards in the concierge industry.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
    },
    {
      title: "Education & Growth",
      desc: "Access ongoing training, Les Clefs d'Or USA mentorship and scholarship pathways, and professional development resources.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      ),
    },
    {
      title: "Valuable Partnerships",
      desc: "Connect directly with hotel concierges, tourism experts, and industry peers who shape Southern California hospitality.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
    },
  ];

  return (
    <section className="participate" id="benefits">
      <div className="container">
        <div className="participate-header fade-in">
          <div className="section-label">Why LACA</div>
          <h2>
            Elevate Your <em>Hospitality</em> Career
          </h2>
        </div>

        <div className="benefits-grid">
          {benefits.map((b, i) => (
            <div className={`benefit-card fade-in stagger-${i + 1}`} key={b.title}>
              <div className="benefit-icon">{b.icon}</div>
              <h3>{b.title}</h3>
              <p>{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}