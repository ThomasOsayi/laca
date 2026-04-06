export default function Mission() {
    return (
      <section className="mission">
        <div className="container mission-grid">
          <div className="mission-left fade-in">
            <div className="section-label">Our Mission</div>
            <span className="gold-divider" style={{ margin: "16px 0 24px" }} />
            <h2>
              Concierge: The <em>Original</em> Influencer
            </h2>
  
            <div className="mission-quote">
              <p>
                &ldquo;The Los Angeles Concierge Association will foster the
                education and development of its members while maintaining the
                highest professional and ethical standards. We will unite hotel
                concierges in the community encouraging service through friendship
                throughout the concierge profession.&rdquo;
              </p>
              <cite>LACA Mission Statement</cite>
            </div>
          </div>
  
          <div className="mission-right fade-in">
            <p>
              Founded in the mid-1980s as a nonprofit, LACA stands as the premier
              network for Los Angeles-based hotel concierges, representing the
              city&apos;s most prestigious luxury hotels, boutique properties, and
              independent hotels. Our members are dedicated to curating
              extraordinary, personalized experiences, offering elite guests
              exclusive access to the finest that Los Angeles has to offer.
            </p>
            <p>
              Before social media, before algorithms, the concierge was the
              trusted voice, recommending the restaurants people rave about, the
              hidden gems they discover, and the experiences they carry home as
              stories. LACA was founded to protect and elevate that legacy.
            </p>
            <p>
              Through ongoing education, collaboration, and networking, LACA
              enhances the role of the modern concierge. Through our Les Clefs
              d&apos;Or USA Mentorship and Scholarship Program, we empower members
              to excel in their concierge careers.
            </p>
  
            <div className="pillars">
              {[
                {
                  title: "Education & Training",
                  desc: "Ongoing professional development and industry learning",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                  ),
                },
                {
                  title: "Ethical Standards",
                  desc: "Upholding the integrity of the concierge profession",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  ),
                },
                {
                  title: "Service Excellence",
                  desc: "Delivering unforgettable guest experiences daily",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ),
                },
                {
                  title: "Community & Networking",
                  desc: "Uniting hospitality professionals across Southern California",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  ),
                },
              ].map((p) => (
                <div className="pillar-card" key={p.title}>
                  <div className="pillar-icon">{p.icon}</div>
                  <div>
                    <h4>{p.title}</h4>
                    <p>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }