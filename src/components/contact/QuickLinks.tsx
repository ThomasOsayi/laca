import Link from "next/link";

export default function QuickLinks() {
  const links = [
    {
      title: "Become a Member",
      desc: "Join LA's premier concierge network. $150/year for full members.",
      label: "View Membership",
      href: "/membership",
    },
    {
      title: "Sponsor LACA",
      desc: "Partner with us to reach the most influential hospitality voices in SoCal.",
      label: "View Sponsorship",
      href: "/sponsors",
    },
    {
      title: "Upcoming Events",
      desc: "Expo, monthly meetings, social mixers, and the Winter Gala.",
      label: "View Events",
      href: "/events",
    },
  ];

  return (
    <section className="quick-links">
      <div className="container">
        <div className="quick-links-header fade-in">
          <div className="section-label">Explore</div>
          <h2>
            Quick <em>Links</em>
          </h2>
        </div>

        <div className="quick-links-grid">
          {links.map((l, i) => (
            <div
              className={`ql-card fade-in stagger-${i + 1}`}
              key={l.title}
            >
              <h4>{l.title}</h4>
              <p>{l.desc}</p>
              <Link href={l.href} className="ql-link">
                {l.label}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}