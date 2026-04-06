const Arrow = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
  
  export default function ContactCTA() {
    return (
      <section className="contact-cta">
        <div className="container">
          <div className="section-label">Ready?</div>
          <h2>
            Join the <em>Community</em>
          </h2>
          <p className="contact-cta-desc">
            Whether you&apos;re a concierge, vendor, or hospitality leader —
            there&apos;s a place for you at LACA.
          </p>
          <div className="cta-buttons">
            <a href="mailto:membership@thelaca.com" className="btn-primary">
              Apply for Membership <Arrow />
            </a>
            <a
              href="mailto:corporateambassador@thelaca.com"
              className="btn-secondary-light"
            >
              Sponsorship Inquiry <Arrow />
            </a>
          </div>
        </div>
      </section>
    );
  }