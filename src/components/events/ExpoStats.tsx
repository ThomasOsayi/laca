"use client";

import { useSiteData } from "@/lib/SiteDataContext";

export default function ExpoStats() {
  const { events } = useSiteData();
  const expo = events?.expo;

  const stats = [
    {
      num: expo?.attendeeCount || "200–350",
      title: "Front-Line Experts",
      desc: "Hospitality professionals from leading LA hotels and resorts",
    },
    {
      num: expo?.vendorCount || "45–65",
      title: "Top-Tier Vendors",
      desc: "A curated vendor list for meaningful engagement",
    },
    {
      num: expo?.yearsRunning || "10+",
      title: "Years Running",
      desc: "A decade-long tradition of industry excellence",
    },
  ];

  return (
    <section className="expo-stats">
      <div className="container">
        <div className="expo-stats-grid">
          {stats.map((s, i) => (
            <div
              className={`expo-stat-card fade-in stagger-${i + 1}`}
              key={s.title}
            >
              <div className="expo-stat-num">{s.num}</div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
