"use client";

import { useSiteData } from "@/lib/SiteDataContext";

export default function Directory() {
  const { contacts } = useSiteData();
  const emails = contacts?.emails;
  const address = contacts?.address;

  const directoryContacts = [
    {
      role: "President",
      name: "Chamian Coates",
      desc: "Overall leadership and meeting hosting",
      email: emails?.president || "president@thelaca.com",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
    {
      role: "Director of Membership",
      name: "Alejandro Sosa",
      desc: "New applications, renewals, and dues",
      email: emails?.membership || "membership@thelaca.com",
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
      role: "Corporate Ambassador",
      name: "Frank Parr",
      desc: "Sponsorships, vendor partnerships, Expo",
      email: emails?.corporateAmbassador || "corporateambassador@thelaca.com",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
    },
    {
      role: "Public Relations",
      name: "Adriano Bartoli & David Hyland",
      desc: "Event hosting and PR inquiries",
      email: emails?.publicRelations || "publicrelations@thelaca.com",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      ),
    },
    {
      role: "Les Clefs d'Or Liaison",
      name: "Matt Beritich",
      desc: "Les Clefs d'Or mentorship and partnerships",
      email: emails?.lesClefs || "liaison.lcd@thelaca.com",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      ),
    },
    {
      role: "Mailing Address",
      name: address?.name || "LACA Headquarters",
      desc: `${address?.street || "269 S. Beverly Dr. Suite 701"}\n${address?.cityStateZip || "Beverly Hills, CA 90212"}`,
      email: null as string | null,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
    },
  ];

  return (
    <section className="directory">
      <div className="container">
        <div className="directory-header fade-in">
          <div className="section-label">Directory</div>
          <h2>
            Board <em>Contacts</em>
          </h2>
          <p>
            Reach the right person for your inquiry. Each department handles
            specific areas of LACA operations.
          </p>
        </div>

        <div className="directory-grid">
          {directoryContacts.map((c, i) => (
            <div
              className={`dir-card fade-in stagger-${(i % 3) + 1}`}
              key={c.name}
            >
              <div className="dir-card-icon">{c.icon}</div>
              <span>{c.role}</span>
              <h4>{c.name}</h4>
              {c.desc.includes("\n") ? (
                <p dangerouslySetInnerHTML={{ __html: c.desc.replace("\n", "<br/>") }} />
              ) : (
                <p>{c.desc}</p>
              )}
              {c.email && (
                <a className="dir-email" href={`mailto:${c.email}`}>
                  {c.email}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
