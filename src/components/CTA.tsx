"use client";

import { useSiteData } from "@/lib/SiteDataContext";

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export default function CTA() {
  const { contacts } = useSiteData();
  const emails = contacts?.emails;
  const address = contacts?.address;

  return (
    <section className="cta" id="contact">
      <div className="container">
        <div className="section-label">Get Involved</div>
        <h2>
          Ready to <em>Elevate</em>
          <br />
          Your Network?
        </h2>
        <p className="cta-desc">
          Whether you&apos;re a concierge professional or a hospitality vendor,
          LACA opens doors to the most influential voices in Southern California.
        </p>

        <div className="cta-actions">
          <a href={`mailto:${emails?.membership || "membership@thelaca.com"}`} className="btn-primary">
            Apply for Membership <Arrow />
          </a>
          <a
            href={`mailto:${emails?.corporateAmbassador || "corporateambassador@thelaca.com"}`}
            className="btn-secondary"
          >
            Vendor Inquiry <Arrow />
          </a>
        </div>

        <div className="cta-contact">
          <div className="cta-contact-item">
            <span>Membership</span>
            <p>
              <a href={`mailto:${emails?.membership || "membership@thelaca.com"}`}>
                {emails?.membership || "membership@thelaca.com"}
              </a>
            </p>
          </div>
          <div className="cta-contact-item">
            <span>Public Relations</span>
            <p>
              <a href={`mailto:${emails?.publicRelations || "publicrelations@thelaca.com"}`}>
                {emails?.publicRelations || "publicrelations@thelaca.com"}
              </a>
            </p>
          </div>
          <div className="cta-contact-item">
            <span>Les Clefs d&apos;Or Liaison</span>
            <p>
              <a href={`mailto:${emails?.lesClefs || "liaison.lcd@thelaca.com"}`}>
                {emails?.lesClefs || "liaison.lcd@thelaca.com"}
              </a>
            </p>
          </div>
          <div className="cta-contact-item">
            <span>Mailing Address</span>
            <p>
              {address
                ? `${address.street || "269 S. Beverly Dr. Suite 701"}, ${address.cityStateZip || "Beverly Hills, CA 90212"}`
                : "269 S. Beverly Dr. Suite 701, Beverly Hills, CA 90212"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
