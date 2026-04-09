"use client";

import { useSiteData } from "@/lib/SiteDataContext";

export default function ContactMain() {
  const { contacts } = useSiteData();
  const emails = contacts?.emails;
  const socials = contacts?.socials;
  const website = contacts?.website || "https://thelaca.com";

  const channels = [
    { label: "Membership", value: emails?.membership || "membership@thelaca.com", href: `mailto:${emails?.membership || "membership@thelaca.com"}`, icon: "email" },
    { label: "Corporate Ambassador", value: emails?.corporateAmbassador || "corporateambassador@thelaca.com", href: `mailto:${emails?.corporateAmbassador || "corporateambassador@thelaca.com"}`, icon: "email" },
    { label: "Public Relations", value: emails?.publicRelations || "publicrelations@thelaca.com", href: `mailto:${emails?.publicRelations || "publicrelations@thelaca.com"}`, icon: "email" },
    { label: "Website", value: website.replace("https://", ""), href: website, icon: "globe" },
  ];

  return (
    <section className="contact-main">
      <div className="container contact-main-grid">
        {/* Left — Info */}
        <div className="contact-info fade-in">
          <div className="section-label">Reach Out</div>
          <h2>
            Contact <em>LACA</em>
          </h2>
          <p>
            Have a question about membership, sponsorship, events, or
            partnerships? Reach out to the right department below, or send us a
            message through the form.
          </p>

          <div className="contact-channels">
            {channels.map((c) => (
              <div className="channel" key={c.label}>
                <div className="channel-icon">
                  {c.icon === "globe" ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  )}
                </div>
                <div>
                  <div className="channel-label">{c.label}</div>
                  <div className="channel-value">
                    <a href={c.href}>{c.value}</a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="contact-social">
            <a href={socials?.facebook || "https://www.facebook.com/thelaca/"} className="social-btn" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
            </a>
            <a href={socials?.instagram || "https://www.instagram.com/thelaca/"} className="social-btn" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
            </a>
            <a href={socials?.twitter || "https://twitter.com/thelaca"} className="social-btn" aria-label="Twitter">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" /></svg>
            </a>
            <a href={socials?.youtube || "https://www.youtube.com/@thelaca"} className="social-btn" aria-label="YouTube">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white" /></svg>
            </a>
          </div>
        </div>

        {/* Right — Form */}
        <div className="contact-form fade-in">
          <h3>Send a Message</h3>
          <p>We&apos;ll get back to you within 48 hours.</p>

          <div className="form-row">
            <div className="form-group">
              <label>First Name *</label>
              <input type="text" placeholder="First" />
            </div>
            <div className="form-group">
              <label>Last Name *</label>
              <input type="text" placeholder="Last" />
            </div>
          </div>

          <div className="form-group">
            <label>Phone Number *</label>
            <input type="tel" placeholder="(310) 555-0100" />
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input type="email" placeholder="you@hotel.com" />
          </div>

          <div className="form-group">
            <label>Subject *</label>
            <select defaultValue="">
              <option value="" disabled>
                Select an inquiry type
              </option>
              <option>Membership Inquiry</option>
              <option>Vendor / Sponsorship</option>
              <option>Expo Participation</option>
              <option>Host an Event</option>
              <option>General Question</option>
            </select>
          </div>

          <div className="form-group">
            <label>Message *</label>
            <textarea placeholder="Tell us about your interest in LACA..." />
          </div>

          <button className="form-submit" type="button">
            Submit Inquiry
          </button>
        </div>
      </div>
    </section>
  );
}
