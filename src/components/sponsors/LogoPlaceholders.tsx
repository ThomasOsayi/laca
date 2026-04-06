export default function LogoPlaceholders() {
    return (
      <section className="logos">
        <div className="container logos-inner">
          <div className="section-label">Our Partners</div>
          <h3>
            Current <em>Sponsors</em>
          </h3>
          <p>
            Sponsor logos will be featured here once provided by our partners.
          </p>
          <div className="logos-grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <div className="logo-placeholder" key={i}>
                <span>Logo</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }