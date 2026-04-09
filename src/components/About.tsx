"use client";

import { useSiteData } from "@/lib/SiteDataContext";

const defaultParagraphs = [
  "For decades, the hotel concierge has shaped the way visitors experience Los Angeles, recommending the restaurants people rave about, the hidden gems they discover, and the experiences they carry home as stories. Before social media, before algorithms, the concierge was the trusted voice.",
  "Founded in the mid-1980s as a nonprofit, LACA stands as the premier network for Los Angeles-based hotel concierges, representing the city's most prestigious luxury hotels, boutique properties, and independent hotels. Through our Les Clefs d'Or USA Mentorship and Scholarship Program, we empower members to excel in their concierge careers.",
];

export default function About() {
  const { content } = useSiteData();
  const mission = content?.mission;
  const paragraphs = mission?.paragraphs?.length > 0 ? mission.paragraphs : defaultParagraphs;

  return (
    <section className="about" id="about">
      <div className="container about-grid">
        <div className="about-left">
          <div className="section-label">Our Mission</div>
          <span className="gold-divider" />
          <h2 style={{ marginTop: 20 }}>
            {mission?.heading ? (
              <span dangerouslySetInnerHTML={{ __html: mission.heading.replace("Original", "<em>Original</em>") }} />
            ) : (
              <>Concierge: The <em>Original</em> Influencer</>
            )}
          </h2>
        </div>

        <div className="about-right fade-in">
          {paragraphs.map((p: string, i: number) => (
            <p key={i}>{p}</p>
          ))}

          <div className="about-values">
            {[
              {
                title: "Professional Development",
                desc: "Ongoing education and industry training for members",
              },
              {
                title: "Ethical Standards",
                desc: "Upholding the integrity of the concierge profession",
              },
              {
                title: "Service Excellence",
                desc: "Delivering unforgettable guest experiences daily",
              },
              {
                title: "Community",
                desc: "Uniting hospitality professionals across Southern California",
              },
            ].map((v) => (
              <div className="value-item" key={v.title}>
                <div className="value-icon" />
                <div>
                  <h4>{v.title}</h4>
                  <p>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
