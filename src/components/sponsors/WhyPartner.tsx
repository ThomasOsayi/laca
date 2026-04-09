"use client";

import { useSiteData } from "@/lib/SiteDataContext";

export default function WhyPartner() {
  const { events } = useSiteData();
  const expo = events?.expo;

  const stats = [
    { num: expo?.attendeeCount || "200–350", label: "Concierges per Expo" },
    { num: expo?.vendorCount || "45–65", label: "Vendor Partners" },
    { num: expo?.yearsRunning || "10+", label: "Years of Events" },
    { num: "8+", label: "Events per Year" },
  ];

  const cards = [
    {
      title: "Direct Access",
      desc: "Face-to-face engagement with concierges who recommend businesses to hotel guests daily.",
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
      title: "Brand Credibility",
      desc: "Align your brand with the premier hospitality association in Los Angeles.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
    },
    {
      title: "Year-Round Exposure",
      desc: "Website recognition, event attendance, and ongoing networking beyond the Expo.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
    },
    {
      title: "Exclusive Guest Access",
      desc: "Reach luxury, leisure, and convention markets through the concierges who serve them.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="why-partner">
      <div className="container why-partner-grid">
        <div className="why-partner-left fade-in">
          <div className="section-label">Partnership Value</div>
          <h2>
            Why Partner <em>With LACA</em>
          </h2>
          <p>
            LACA sponsors gain direct access to the concierges who shape how
            millions of visitors experience Los Angeles. Our members are the
            trusted advisors behind every hotel recommendation, from fine
            dining and entertainment to tours, wellness, and luxury retail.
          </p>
          <p>
            A partnership with LACA isn&apos;t just visibility. It&apos;s a
            relationship with the people who put your brand in front of the
            guests who matter most.
          </p>

          <div className="partner-stats">
            {stats.map((s) => (
              <div className="partner-stat" key={s.label}>
                <div className="partner-stat-num">{s.num}</div>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="why-partner-right fade-in">
          {cards.map((c) => (
            <div className="why-card" key={c.title}>
              <div className="why-card-icon">{c.icon}</div>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
