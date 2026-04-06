const Arrow = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
  
  export default function EventsCTA() {
    return (
      <section className="events-cta">
        <div className="container">
          <div className="section-label">Get Involved</div>
          <h2>
            Attend, Host, or <em>Sponsor</em>
          </h2>
          <p className="events-cta-desc">
            Whether you&apos;re a concierge, venue, or hospitality brand,
            there&apos;s a place for you at every LACA event.
          </p>
          <div className="cta-buttons">
            <a href="mailto:publicrelations@thelaca.com" className="btn-primary">
              Event Inquiries <Arrow />
            </a>
            <a href="mailto:president@thelaca.com" className="btn-secondary-light">
              Host a Meeting <Arrow />
            </a>
          </div>
        </div>
      </section>
    );
  }