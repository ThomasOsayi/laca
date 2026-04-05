export default function ContactBand() {
    const contacts = [
      {
        role: "Membership",
        name: "Alejandro Sosa",
        email: "membership@thelaca.com",
      },
      {
        role: "Public Relations",
        name: "Adriano Bartoli & David Hyland",
        email: "publicrelations@thelaca.com",
      },
      {
        role: "Les Clefs d'Or Liaison",
        name: "Matt Beritich",
        email: "liaison.lcd@thelaca.com",
      },
    ];
  
    return (
      <section className="contact-band">
        <div className="container">
          <div className="contact-band-inner">
            {contacts.map((c, i) => (
              <div
                className={`contact-band-card fade-in stagger-${i + 1}`}
                key={c.email}
              >
                <span>{c.role}</span>
                <h4>{c.name}</h4>
                <p>
                  <a href={`mailto:${c.email}`}>{c.email}</a>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }