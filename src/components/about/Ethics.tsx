export default function Ethics() {
    const principles = [
      {
        num: "01",
        title: "Integrity & Accountability",
        desc: "Act in the best interests of the organization at all times. Exercise sound judgment and avoid self-dealing or undue influence.",
      },
      {
        num: "02",
        title: "Confidentiality",
        desc: "Maintain confidentiality of all board discussions, financial records, and sensitive information.",
      },
      {
        num: "03",
        title: "Conflict of Interest",
        desc: "Disclose any personal, financial, or professional interests that may conflict with the organization's objectives.",
      },
      {
        num: "04",
        title: "Commitment & Participation",
        desc: "Regularly attend board meetings and actively contribute to discussions. Stay informed about operations and programs.",
      },
      {
        num: "05",
        title: "Compliance",
        desc: "Adhere to all federal, state, and local laws, as well as organizational policies. Ensure ethical oversight of financial decisions.",
      },
      {
        num: "06",
        title: "Respect & Professionalism",
        desc: "Treat fellow board members, staff, volunteers, and stakeholders with respect. Foster an inclusive and collaborative culture.",
      },
    ];
  
    return (
      <section className="ethics">
        <div className="container">
          <div className="ethics-header fade-in">
            <div className="section-label">Governance</div>
            <h2>
              Board Code of <em>Ethics</em>
            </h2>
            <p>
              As board members of LACA, our leadership commits to the highest
              standards of integrity, professionalism, and service.
            </p>
          </div>
  
          <div className="ethics-grid">
            {principles.map((p, i) => (
              <div
                className={`ethic-card fade-in stagger-${(i % 4) + 1}`}
                key={p.num}
              >
                <div className="ethic-num">{p.num}</div>
                <h4>{p.title}</h4>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }