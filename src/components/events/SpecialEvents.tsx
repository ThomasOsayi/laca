"use client";

import { useSiteData } from "@/lib/SiteDataContext";

interface SpecialEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  image: string;
}

function parseDate(dateStr: string): { month: string; day: string; isTBA: boolean } {
  if (!dateStr || dateStr.toUpperCase() === "TBA") return { month: "TBA", day: "—", isTBA: true };
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) {
    // Try to extract month/day from text like "June 14"
    const parts = dateStr.match(/([A-Za-z]+)\s+(\d+)/);
    if (parts) return { month: parts[1].substring(0, 3), day: parts[2], isTBA: false };
    return { month: dateStr.substring(0, 3), day: "—", isTBA: false };
  }
  return {
    month: d.toLocaleString("en-US", { month: "short" }),
    day: d.getDate().toString(),
    isTBA: false,
  };
}

export default function SpecialEvents() {
  const { events } = useSiteData();
  const specialEvents: SpecialEvent[] = events?.specialEvents || [];

  if (specialEvents.length === 0) return null;

  return (
    <section className="special-events">
      <div className="container">
        <div className="special-events-header fade-in">
          <div className="section-label">What&apos;s Coming Up</div>
          <h2>
            Upcoming <em>Events</em>
          </h2>
          <p>
            From exclusive dinners to networking mixers, stay connected with the
            LA hospitality community year-round.
          </p>
        </div>
        <div className="special-events-grid">
          {specialEvents.map((event) => {
            const { month, day, isTBA } = parseDate(event.date);
            return (
              <div className="se-card fade-in" key={event.id}>
                <div className="se-card-img">
                  {event.image ? (
                    <img src={event.image} alt={event.title} />
                  ) : (
                    <div className="se-card-img-placeholder">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="3" y="4" width="18" height="18" rx="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                      </svg>
                    </div>
                  )}
                  <div className={`se-date-badge ${isTBA ? "tba" : ""}`}>
                    <span className="se-date-month">{month}</span>
                    <span className="se-date-day">{day}</span>
                  </div>
                </div>
                <div className="se-card-body">
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                  <div className="se-card-footer">
                    {event.venue && (
                      <span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        {event.venue}
                      </span>
                    )}
                    {event.time && (
                      <span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        {event.time}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}