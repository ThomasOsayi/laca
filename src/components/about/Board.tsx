"use client";

import { useSiteData } from "@/lib/SiteDataContext";

const defaultMembers = [
  {
    role: "President",
    name: "Chamian Coates",
    email: "president@thelaca.com",
    affiliation: "",
    photo: "",
    initials: "CC",
  },
  {
    role: "Director of Membership",
    name: "Alejandro Sosa",
    email: "membership@thelaca.com",
    affiliation: "",
    photo: "",
    initials: "AS",
  },
  {
    role: "Corporate Ambassador",
    name: "Frank Parr",
    email: "",
    affiliation: "Peninsula Beverly Hills",
    photo: "",
    initials: "FP",
  },
  {
    role: "Public Relations",
    name: "Adriano Bartoli",
    email: "publicrelations@thelaca.com",
    affiliation: "",
    photo: "",
    initials: "AB",
  },
  {
    role: "Public Relations Co-Chair",
    name: "David Hyland",
    email: "publicrelations@thelaca.com",
    affiliation: "",
    photo: "",
    initials: "DH",
  },
  {
    role: "Les Clefs d'Or Liaison",
    name: "Matt Beritich",
    email: "liaison.lcd@thelaca.com",
    affiliation: "",
    photo: "",
    initials: "MB",
  },
  {
    role: "Treasurer",
    name: "Board Treasurer",
    email: "",
    affiliation: "Name TBA",
    photo: "",
    initials: "TR",
  },
  {
    role: "Secretary",
    name: "Board Secretary",
    email: "",
    affiliation: "Name TBA",
    photo: "",
    initials: "SE",
  },
];

export default function Board() {
  const { board } = useSiteData();
  const members = board?.members?.length > 0 ? board!.members : defaultMembers;

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
          {members.map((m: { role: string; name: string; email?: string; affiliation?: string; photo?: string; initials?: string }, i: number) => {
            const detail = m.email || m.affiliation || "";
            const isEmail = detail.includes("@");

            return (
              <div
                className={`board-card fade-in stagger-${(i % 4) + 1}`}
                key={m.name + i}
              >
                <div className="board-card-img">
                  {m.photo ? (
                    <img src={m.photo} alt={m.name} />
                  ) : (
                    <div className="board-card-initials">{m.initials || m.name.split(" ").map((n: string) => n[0]).join("")}</div>
                  )}
                </div>
                <div className="board-card-info">
                  <span>{m.role}</span>
                  <h4>{m.name}</h4>
                  {isEmail ? (
                    <p>
                      <a href={`mailto:${detail}`}>{detail}</a>
                    </p>
                  ) : detail ? (
                    <p>{detail}</p>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
