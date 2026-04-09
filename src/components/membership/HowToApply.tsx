"use client";

import { useSiteData } from "@/lib/SiteDataContext";

export default function HowToApply() {
  const { contacts } = useSiteData();
  const membershipEmail = contacts?.emails?.membership || "membership@thelaca.com";
  const address = contacts?.address;

  const steps = [
    {
      num: "01",
      title: "Submit Application",
      desc: `Download and complete the membership application form. Email it along with your business card to ${membershipEmail}.`,
    },
    {
      num: "02",
      title: "Pay Annual Dues",
      desc: "Mail a check to our Beverly Hills address, or bring your payment ($150 cash or check) to your first LACA meeting.",
    },
    {
      num: "03",
      title: "Attend & Connect",
      desc: "You're in. Start attending monthly meetings, networking with peers, and accessing all LACA events and resources.",
    },
  ];

  return (
    <section className="how-apply">
      <div className="container">
        <div className="how-apply-header fade-in">
          <div className="section-label">Get Started</div>
          <h2>
            How to <em>Apply</em>
          </h2>
          <p>
            Joining LACA is simple. Complete these three steps to become part of
            LA&apos;s premier concierge network.
          </p>
        </div>

        <div className="steps-grid">
          {steps.map((s, i) => (
            <div
              className={`step-card fade-in stagger-${i + 1}`}
              key={s.num}
            >
              <div className="step-num">{s.num}</div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="apply-info" style={{ marginTop: 56 }}>
          <div className="apply-info-card">
            <span>Submit Applications To</span>
            <p>
              <a href={`mailto:${membershipEmail}`}>
                <strong>{membershipEmail}</strong>
              </a>
            </p>
            <p style={{ marginTop: 8 }}>
              Alejandro Sosa, Director of Membership
            </p>
          </div>
          <div className="apply-info-card">
            <span>Mail Payments To</span>
            <p>
              <strong>{address?.name || "The Los Angeles Concierge Association"}</strong>
            </p>
            <p>{address?.street || "269 South Beverly Drive, Suite 701"}</p>
            <p>{address?.cityStateZip || "Beverly Hills, CA 90212"}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
