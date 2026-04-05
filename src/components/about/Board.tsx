export default function Board() {
    const members = [
      {
        role: "President",
        name: "Chamian Coates",
        detail: "president@thelaca.com",
        img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&crop=faces",
        initials: null,
      },
      {
        role: "Director of Membership",
        name: "Alejandro Sosa",
        detail: "membership@thelaca.com",
        img: null,
        initials: "AS",
      },
      {
        role: "Corporate Ambassador",
        name: "Frank Parr",
        detail: "Peninsula Beverly Hills",
        img: null,
        initials: "FP",
      },
      {
        role: "Public Relations",
        name: "Adriano Bartoli",
        detail: "publicrelations@thelaca.com",
        img: null,
        initials: "AB",
      },
      {
        role: "Public Relations Co-Chair",
        name: "David Hyland",
        detail: "publicrelations@thelaca.com",
        img: null,
        initials: "DH",
      },
      {
        role: "Les Clefs d'Or Liaison",
        name: "Matt Beritich",
        detail: "liaison.lcd@thelaca.com",
        img: null,
        initials: "MB",
      },
      {
        role: "Treasurer",
        name: "Board Treasurer",
        detail: "Name TBA",
        img: null,
        initials: "TR",
      },
      {
        role: "Secretary",
        name: "Board Secretary",
        detail: "Name TBA",
        img: null,
        initials: "SE",
      },
    ];
  
    const isEmail = (str: string) => str.includes("@");
  
    return (
      <section className="board">
        <div className="container">
          <div className="board-header fade-in">
            <div className="section-label">Leadership</div>
            <h2>
              The 2025–2026 <em>Board</em>
            </h2>
            <p>
              The dedicated leaders guiding LACA&apos;s mission, events, and
              community.
            </p>
          </div>
  
          <div className="board-grid">
            {members.map((m, i) => (
              <div
                className={`board-card fade-in stagger-${(i % 4) + 1}`}
                key={m.name}
              >
                <div className="board-card-img">
                  {m.img ? (
                    <img src={m.img} alt={m.name} />
                  ) : (
                    <div className="board-card-initials">{m.initials}</div>
                  )}
                </div>
                <div className="board-card-info">
                  <span>{m.role}</span>
                  <h4>{m.name}</h4>
                  {isEmail(m.detail) ? (
                    <p>
                      <a href={`mailto:${m.detail}`}>{m.detail}</a>
                    </p>
                  ) : (
                    <p>{m.detail}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }