const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg" />
      <div className="hero-overlay" />
      <div className="hero-deco" />

      <div className="container hero-content">
        {/* Left column */}
        <div>
          <div className="hero-tagline">Los Angeles, California</div>
          <h1>
            In Service<br />Through <em>Friendship</em>
          </h1>
          <p className="hero-description">
            The Los Angeles Concierge Association fosters the education and
            development of its members while maintaining the highest professional
            and ethical standards — shaping how the world experiences LA.
          </p>
          <div className="hero-actions">
            <a href="#membership" className="btn-primary">
              Become a Member <Arrow />
            </a>
            <a href="#expo" className="btn-secondary">
              Expo &amp; Trade Show <Arrow />
            </a>
          </div>
        </div>

        {/* Right column — image + stats */}
        <div className="hero-right">
          <div className="hero-img-frame">
            <img
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=900&fit=crop"
              alt="Luxury Los Angeles hotel lobby with elegant lighting"
            />
          </div>

          <div className="hero-img-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            Established Mid-1980s
          </div>

          <div className="hero-stats-float">
            <div className="hero-stat-item">
              <div className="hero-stat-num">10+</div>
              <div className="hero-stat-label">Years of<br />Trade Shows</div>
            </div>
            <div className="hero-stat-item">
              <div className="hero-stat-num">350</div>
              <div className="hero-stat-label">Hospitality<br />Experts</div>
            </div>
            <div className="hero-stat-item">
              <div className="hero-stat-num">65</div>
              <div className="hero-stat-label">Vendor<br />Partners</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}