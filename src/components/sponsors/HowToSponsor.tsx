export default function HowToSponsor() {
    const steps = [
      {
        num: "01",
        title: "Express Interest",
        desc: "Contact our Corporate Ambassador or Director of Membership to express your interest in becoming a LACA sponsor.",
      },
      {
        num: "02",
        title: "Board Review",
        desc: "The Board of Directors reviews your application to ensure alignment with the concierge profession and service standards.",
      },
      {
        num: "03",
        title: "Welcome Aboard",
        desc: "Once approved, submit your $800 annual dues and start attending meetings, events, and the Annual Expo.",
      },
    ];
  
    return (
      <section className="how-sponsor">
        <div className="container">
          <div className="how-sponsor-header fade-in">
            <div className="section-label">Get Started</div>
            <h2>
              Become a <em>Sponsor</em>
            </h2>
            <p>
              Sponsorship is by invitation from the LACA Board of Directors.
              Here&apos;s how the process works.
            </p>
          </div>
  
          <div className="how-sponsor-steps">
            {steps.map((s, i) => (
              <div
                className={`how-step fade-in stagger-${i + 1}`}
                key={s.num}
              >
                <div className="how-step-num">{s.num}</div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }