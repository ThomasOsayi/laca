"use client";

import { useSiteData } from "@/lib/SiteDataContext";

const icons = [
  <svg key="0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>,
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>,
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>,
  <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>,
];

const defaultMeetings = [
  {
    title: "Monthly Member Meetings",
    description: "Educational business meetings attended by 35–50 concierges with classroom-style seating, followed by a reception or sit-down dinner. Sponsors are invited to select meetings, adding 20–30 additional guests.",
    tag: "35–50 Attendees",
  },
  {
    title: "Social Mixers",
    description: "Networking receptions for 30–50 people with light appetizers and hosted beverages. A great opportunity for concierges to experience new venues firsthand and for venues to showcase menu highlights.",
    tag: "30–50 Guests",
  },
  {
    title: "LACA Supper Club",
    description: "Exclusive dinners hosted by restaurants around the city, offering concierges a full dining experience. Group sizes are tailored to what works best for each restaurant partner.",
    tag: "Intimate Dining",
  },
  {
    title: "Featured Restaurant of the Month",
    description: "A series of 3–4 intimate concierge dinners hosted by one restaurant in a single month, featured across LACA's website and social media for maximum exposure.",
    tag: "3–4 Events / Month",
  },
];

export default function Meetings() {
  const { events } = useSiteData();
  const meetings = events?.meetings?.length > 0 ? events!.meetings : defaultMeetings;

  return (
    <section className="meetings">
      <div className="container">
        <div className="meetings-header fade-in">
          <div className="section-label">Year-Round Programming</div>
          <h2>
            Monthly Meetings &amp; <em>Gatherings</em>
          </h2>
          <p>
            LACA hosts a minimum of eight events per year, from educational
            business meetings to exclusive dining experiences across the city.
          </p>
        </div>

        <div className="meetings-grid">
          {meetings.map((m: { title: string; description: string; tag: string }, i: number) => (
            <div
              className={`meeting-card fade-in stagger-${i + 1}`}
              key={m.title}
            >
              <div className="meeting-icon">{icons[i % icons.length]}</div>
              <div>
                <h3>{m.title}</h3>
                <p>{m.description}</p>
                <span className="meeting-tag">{m.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
