"use client";

import { useSiteData } from "@/lib/SiteDataContext";

interface BoardMember {
  id?: string;
  name: string;
  role: string;
  email?: string;
  affiliation?: string;
  photo?: string;
}

const ROLE_ICONS: Record<string, React.ReactNode> = {
  President: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  Membership: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Sponsorship: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  PR: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  LesClefs: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  Address: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
};

// Department definitions: which board role to look up + which email field + description
const DEPARTMENTS = [
  {
    role: "President",
    rolePattern: /president/i,
    desc: "Overall leadership and meeting hosting",
    emailKey: "president",
    iconKey: "President",
  },
  {
    role: "Director of Membership",
    rolePattern: /membership/i,
    desc: "New applications, renewals, and dues",
    emailKey: "membership",
    iconKey: "Membership",
  },
  {
    role: "Corporate Ambassador",
    rolePattern: /corporate.*ambassador|ambassador/i,
    desc: "Sponsorships, vendor partnerships, Expo",
    emailKey: "corporateAmbassador",
    iconKey: "Sponsorship",
  },
  {
    role: "Public Relations",
    rolePattern: /public relations/i,
    desc: "Event hosting and PR inquiries",
    emailKey: "publicRelations",
    iconKey: "PR",
  },
  {
    role: "Les Clefs d'Or Liaison",
    rolePattern: /clefs|liaison/i,
    desc: "Les Clefs d'Or mentorship and partnerships",
    emailKey: "lesClefs",
    iconKey: "LesClefs",
  },
];

export default function Directory() {
  const { contacts, board } = useSiteData();
  const emails = contacts?.emails;
  const address = contacts?.address;
  const members: BoardMember[] = Array.isArray(board?.members) ? board.members : [];

  // Build directory cards by matching board members to departments
  const directoryContacts = DEPARTMENTS.map((dept) => {
    // Find matching board members (handles co-chairs by joining names)
    const matched = members.filter((m) => dept.rolePattern.test(m.role || ""));
    const name =
      matched.length > 0
        ? matched.map((m) => m.name).filter(Boolean).join(" & ")
        : dept.role;

    return {
      role: dept.role,
      name,
      desc: dept.desc,
      email: emails?.[dept.emailKey] || "",
      icon: ROLE_ICONS[dept.iconKey],
    };
  });

  // Append mailing address card
  directoryContacts.push({
    role: "Mailing Address",
    name: address?.name || "LACA Headquarters",
    desc: `${address?.street || "269 S. Beverly Dr. Suite 701"}\n${address?.cityStateZip || "Beverly Hills, CA 90212"}`,
    email: "",
    icon: ROLE_ICONS.Address,
  });

  return (
    <section className="directory">
      <div className="container">
        <div className="directory-header fade-in">
          <div className="section-label">Directory</div>
          <h2>
            Board <em>Contacts</em>
          </h2>
          <p>
            Reach the right person for your inquiry. Each department handles
            specific areas of LACA operations.
          </p>
        </div>

        <div className="directory-grid">
          {directoryContacts.map((c, i) => (
            <div
              className={`dir-card fade-in stagger-${(i % 3) + 1}`}
              key={c.role}
            >
              <div className="dir-card-icon">{c.icon}</div>
              <span>{c.role}</span>
              <h4>{c.name}</h4>
              {c.desc.includes("\n") ? (
                <p dangerouslySetInnerHTML={{ __html: c.desc.replace("\n", "<br/>") }} />
              ) : (
                <p>{c.desc}</p>
              )}
              {c.email && (
                <a className="dir-email" href={`mailto:${c.email}`}>
                  {c.email}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}