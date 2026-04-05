"use client";

const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ width: 10, height: 10, color: "var(--gold)" }}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function Membership() {
  const qualifications = [
    "At least 21 years of age",
    'Employed by a hotel with the title of "Concierge"',
    "Work a minimum of 32 hours a week at a lobby concierge desk",
    "Passed the 90-day probationary period in that position",
    "Returning members must attend at least 4 LACA meetings per calendar year",
    "Annual dues: $150 (Full Member) · $175 (Affiliate) · $800 (General Sponsor)",
  ];

  return (
    <section className="membership" id="membership">
      <div className="container membership-grid">
        {/* Left — content + qualifications */}
        <div className="membership-content fade-in">
          <div className="section-label">Membership</div>
          <h2>
            Join the <em>Association</em>
          </h2>
          <p>
            LACA membership is open to qualified concierge professionals across
            Los Angeles and Orange County. Your membership is an investment in
            professional growth, valuable relationships, and access to Les Clefs
            d&apos;Or USA Mentorship and Scholarship opportunities.
          </p>

          <div className="qualifications">
            <h4>Membership Qualifications</h4>
            {qualifications.map((q) => (
              <div className="qual-item" key={q}>
                <div className="qual-check">
                  <Check />
                </div>
                <p>{q}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — form */}
        <div className="membership-form fade-in">
          <h3>Get in Touch</h3>
          <p>
            Interested in membership or becoming a vendor partner? Reach out
            below.
          </p>

          <div className="form-row">
            <div className="form-group">
              <label>First Name *</label>
              <input type="text" placeholder="First" />
            </div>
            <div className="form-group">
              <label>Last Name *</label>
              <input type="text" placeholder="Last" />
            </div>
          </div>

          <div className="form-group">
            <label>Phone Number *</label>
            <input type="tel" placeholder="(310) 555-0100" />
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input type="email" placeholder="you@hotel.com" />
          </div>

          <div className="form-group">
            <label>Subject *</label>
            <select defaultValue="">
              <option value="" disabled>
                Select an inquiry type
              </option>
              <option>Membership Inquiry</option>
              <option>Vendor / Sponsorship</option>
              <option>Expo Participation</option>
              <option>General Question</option>
            </select>
          </div>

          <div className="form-group">
            <label>Message *</label>
            <textarea placeholder="Tell us about your interest in LACA..." />
          </div>

          <button className="form-submit" type="button">
            Submit Inquiry
          </button>
        </div>
      </div>
    </section>
  );
}