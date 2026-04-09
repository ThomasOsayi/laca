"use client";

import { useSiteData } from "@/lib/SiteDataContext";

const defaultParagraphs = [
  "The art of concierge goes beyond basic service. It is about intuition, personalization, and the ability to transform ordinary moments into extraordinary ones. It is about problem-solving with grace, leveraging an extensive network, and curating experiences that leave lasting impressions.",
  "Our profession thrives on knowledge, empathy, and a proactive approach, all of which are honed through initiatives like this. By forging strong partnerships and expanding our local expertise, we reinforce the excellence and prestige of our profession.",
  "Together, we continue to uphold the values of the Los Angeles Concierge Association: service, professionalism, and camaraderie. I invite you all to participate, learn, and collaborate. Let's take this opportunity to not only enhance our craft but to also strengthen the bonds that make our community exceptional.",
];

export default function President() {
  const { content } = useSiteData();
  const president = content?.president;
  const paragraphs = president?.paragraphs?.length > 0 ? president.paragraphs : defaultParagraphs;

  return (
    <section className="president">
      <div className="container president-grid">
        <div className="president-photo fade-in">
          <div className="president-img">
            <img
              src={president?.photo || "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=560&h=680&fit=crop&crop=faces"}
              alt={`${president?.name || "Chamian Coates"}, LACA President`}
            />
          </div>
          <div className="president-name-card">
            <h4>{president?.name || "Chamian Coates"}</h4>
            <span>{president?.title || "President, LACA"}</span>
          </div>
        </div>

        <div className="president-note fade-in">
          <div className="section-label">President&apos;s Note</div>
          <h2>
            A Message from Our <em>President</em>
          </h2>
          {paragraphs.map((p: string, i: number) => (
            <p key={i}>{p}</p>
          ))}
          <div className="president-signature">
            {president?.signature || "In Service Through Friendship,"}
            <span>
              {president?.name || "Chamian Coates"} · {president?.title || "President, Los Angeles Concierge Association"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
