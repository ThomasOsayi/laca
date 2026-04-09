"use client";

import { useSiteData } from "@/lib/SiteDataContext";

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export default function DeadlineBanner() {
  const { membership, contacts, settings } = useSiteData();

  if (settings?.showDeadlineBanner === false) return null;

  const deadline = membership?.deadline || "May 15, 2026";
  const deadlineYear = membership?.deadlineYear || "2026";
  const membershipEmail = contacts?.emails?.membership || "membership@thelaca.com";

  return (
    <section className="deadline">
      <div className="container">
        <div className="deadline-card fade-in">
          <div className="section-label">Important Date</div>
          <div className="deadline-date">
            Applications Due <em>{deadline}</em>
          </div>
          <p>
            Annual dues and membership applications must be submitted by {deadline}.
            Don&apos;t miss your chance to join.
          </p>
          <a
            href={`mailto:${membershipEmail}`}
            className="btn-primary"
            style={{ display: "inline-flex" }}
          >
            Apply Before the Deadline <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}
