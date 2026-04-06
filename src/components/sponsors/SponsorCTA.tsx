const Arrow = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
  
  export default function SponsorCTA() {
    return (
      <section className="sponsor-cta">
        <div className="container">
          <div className="section-label">Partner With Us</div>
          <h2>
            Reach LA&apos;s Most <em>Influential</em> Voices
          </h2>
          <p className="sponsor-cta-desc">
            Connect your brand with the concierges who shape how the world
            experiences Los Angeles.
          </p>
          <div className="cta-buttons">
            <a
              href="mailto:corporateambassador@thelaca.com"
              className="btn-primary"
            >
              Sponsorship Inquiry <Arrow />
            </a>
            <a
              href="mailto:membership@thelaca.com"
              className="btn-secondary-light"
            >
              General Questions <Arrow />
            </a>
          </div>
        </div>
      </section>
    );
  }