"use client";

import { useSiteData } from "@/lib/SiteDataContext";

export default function Calendar() {
  const { membership } = useSiteData();
  const deadline = membership?.deadline || "May 15, 2026";

  const items = [
    {
      month: "Jan",
      sub: "to Jun",
      title: "Monthly Meetings & Social Mixers",
      desc: "Regular gatherings at venues across LA, including meetings, mixers, and supper clubs",
    },
    {
      month: "May",
      sub: "15th",
      title: "Membership Renewal Deadline",
      desc: `Annual dues and applications due by ${deadline}: $150 Full · $175 Affiliate · $800 Sponsor`,
    },
    {
      month: "Aug",
      sub: "to Sep",
      title: "Annual Expo & Trade Show",
      desc: "LACA's premier event at the Taglyan Complex, with 200–350 attendees and 45–65 vendors",
    },
    {
      month: "Oct",
      sub: "to Nov",
      title: "Board Nominations & Elections",
      desc: "October nominations meeting, November elections by secret ballot",
    },
    {
      month: "Dec",
      sub: "\u00A0",
      title: "Winter Gala & Officer Installation",
      desc: "Year-end celebration with awards, new board installation, and networking",
    },
  ];

  return (
    <section className="calendar">
      <div className="container">
        <div className="calendar-header fade-in">
          <div className="section-label">Year at a Glance</div>
          <h2>
            LACA Event <em>Calendar</em>
          </h2>
          <p>
            A snapshot of our annual programming. Specific dates are shared with
            members via email.
          </p>
        </div>

        <div className="calendar-grid">
          {items.map((item, i) => (
            <div
              className={`cal-item fade-in stagger-${(i % 4) + 1}`}
              key={item.month}
            >
              <div className="cal-month">
                <span>{item.month}</span>
                <small>{item.sub}</small>
              </div>
              <div className="cal-divider" />
              <div className="cal-info">
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
