"use client";

import { useSiteData } from "@/lib/SiteDataContext";

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export default function MembershipCTA() {
  const { contacts } = useSiteData();
  const membershipEmail = contacts?.emails?.membership || "membership@thelaca.com";

  return (
    <section className="mem-cta">
      <div className="container">
        <div className="section-label">Ready?</div>
        <h2>
          Elevate Your <em>Career</em>
        </h2>
        <p className="mem-cta-desc">
          Join the most influential hospitality professionals in Southern
          California.
        </p>
        <div className="cta-buttons">
          <a href={`mailto:${membershipEmail}`} className="btn-primary">
            Apply for Membership <Arrow />
          </a>
          <a
            href={`mailto:${membershipEmail}`}
            className="btn-secondary-light"
          >
            Questions? Contact Us <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}
