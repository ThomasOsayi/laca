export default function Ambassador() {
    return (
      <section className="ambassador">
        <div className="container ambassador-grid">
          <div className="ambassador-photo fade-in">
            <div className="ambassador-img">
              <img
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=560&h=680&fit=crop&crop=faces"
                alt="Frank Parr, Corporate Ambassador"
              />
            </div>
            <div className="ambassador-name">
              <h4>Frank Parr</h4>
              <span>Corporate Ambassador</span>
              <p>Peninsula Beverly Hills</p>
            </div>
          </div>
  
          <div className="ambassador-content fade-in">
            <div className="section-label">Your Point of Contact</div>
            <h2>
              Meet Our Corporate <em>Ambassador</em>
            </h2>
            <p>
              Frank Parr serves as LACA&apos;s Corporate Ambassador, connecting
              businesses with the concierge community and facilitating meaningful
              partnerships that benefit both sponsors and members.
            </p>
            <p>
              Whether you&apos;re interested in sponsorship, Expo participation,
              or hosting a LACA event at your venue — Frank is your first point
              of contact.
            </p>
  
            <div className="ambassador-contacts">
              <div className="amb-contact">
                <div className="amb-contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <span>Corporate Ambassador</span>
                  <p>
                    <a href="mailto:corporateambassador@thelaca.com">
                      corporateambassador@thelaca.com
                    </a>
                  </p>
                </div>
              </div>
              <div className="amb-contact">
                <div className="amb-contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <span>Membership &amp; Sponsorship</span>
                  <p>
                    <a href="mailto:membership@thelaca.com">
                      membership@thelaca.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }