export default function ExpoStats() {
    const stats = [
      {
        num: "200–350",
        title: "Front-Line Experts",
        desc: "Hospitality professionals from leading LA hotels and resorts",
      },
      {
        num: "45–65",
        title: "Top-Tier Vendors",
        desc: "A curated vendor list for meaningful engagement",
      },
      {
        num: "10+",
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