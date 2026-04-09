"use client";

import { useSiteData } from "@/lib/SiteDataContext";

export default function ContactBand() {
  const { contacts } = useSiteData();
  const emails = contacts?.emails;

  const contactList = [
    {
      role: "Membership",
      name: "Alejandro Sosa",
      email: emails?.membership || "membership@thelaca.com",
    },
    {
      role: "Public Relations",
      name: "Adriano Bartoli & David Hyland",
      email: emails?.publicRelations || "publicrelations@thelaca.com",
    },
    {
      role: "Les Clefs d'Or Liaison",
      name: "Matt Beritich",
      email: emails?.lesClefs || "liaison.lcd@thelaca.com",
    },
  ];

  return (
    <section className="contact-band">
      <div className="container">
        <div className="contact-band-inner">
          {contactList.map((c, i) => (
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
