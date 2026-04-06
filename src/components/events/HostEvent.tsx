export default function HostEvent() {
    const types = [
      {
        title: "Monthly Meeting Venue",
        desc: "Classroom seating for 35–50, projector access, followed by reception",
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
        title: "Social Mixer Host",
        desc: "Reception space for 30–50 with light appetizers and hosted beverages",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        ),
      },
      {
        title: "Board Meeting Dinner",
        desc: "Private or semi-private lunch/dinner for 6–8 board members",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
          </svg>
        ),
      },
      {
        title: "Supper Club Partner",
        desc: "Host an exclusive dinner experience for a group of concierges",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        ),
      },
    ];
  
    return (
      <section className="host-event">
        <div className="container host-grid">
          <div className="host-content fade-in">
            <div className="section-label">Partner With Us</div>
            <h2>
              Host an Event <em>With LACA</em>
            </h2>
            <p>
              As a nonprofit, we rely on the generous support of our community to
              host our events. Hosting offers your venue valuable exposure to our
              concierge members, not only during the event but also through
              promotions via our website and social media leading up to it.
            </p>
            <p>
              Just stepping foot into a new venue is one of the best ways for a
              concierge to be able to better recommend it to guests. We have a
              variety of opportunities and look forward to working with you.
            </p>
  
            <div className="host-types">
              {types.map((t) => (
                <div className="host-type" key={t.title}>
                  <div className="host-type-icon">{t.icon}</div>
                  <div>
                    <h4>{t.title}</h4>
                    <p>{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
  
          <div className="host-visual fade-in">
            <div className="host-img">
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=900&fit=crop"
                alt="Fine dining restaurant table setting"
              />
            </div>
            <div className="host-cta">
              <span>Interested in Hosting?</span>
              <p>
                <a href="mailto:president@thelaca.com">president@thelaca.com</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }