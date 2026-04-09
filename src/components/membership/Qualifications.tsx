"use client";

import { useSiteData } from "@/lib/SiteDataContext";

const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ width: 10, height: 10, color: "var(--gold)" }}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const defaultQualifications = [
  "At least 21 years of age",
  'Employed by a hotel with the title of "Concierge"',
  "Work a minimum of 32 hours per week",
  'At a desk located in the lobby displaying the sign "Concierge"',
  "Passed the 90-day probationary period in that position",
  "Attend at least 4 LACA meetings per calendar year",
  "Abide by the LACA Code of Conduct and Bylaws",
];

export default function Qualifications() {
  const { membership } = useSiteData();
  const qualifications = membership?.qualifications?.length > 0 ? membership!.qualifications : defaultQualifications;

  const groups = [
    {
      label: "Personal Requirements",
      items: [qualifications[0] || "At least 21 years of age"],
    },
    {
      label: "Employment Requirements",
      items: qualifications.slice(1, 5).length > 0
        ? qualifications.slice(1, 5)
        : [
            'Employed by a hotel with the title of "Concierge"',
            "Work a minimum of 32 hours per week",
            'At a desk located in the lobby displaying the sign "Concierge"',
            "Passed the 90-day probationary period in that position",
          ],
    },
    {
      label: "Ongoing Requirements",
      items: qualifications.slice(5).length > 0
        ? qualifications.slice(5)
        : [
            "Attend at least 4 LACA meetings per calendar year",
            "Abide by the LACA Code of Conduct and Bylaws",
          ],
    },
  ];

  return (
    <section className="qualifications-section">
      <div className="container quals-grid">
        <div className="quals-content fade-in">
          <div className="section-label">Requirements</div>
          <h2>
            Full Member <em>Qualifications</em>
          </h2>
          <p>
            To qualify for full membership in the Los Angeles Concierge
            Association, candidates must meet specific professional criteria
            that ensure the highest standards of the concierge profession.
          </p>
          <p>
            Returning Full Members must have attended at least four LACA
            meetings within the previous calendar year. Members who
            haven&apos;t met the requirement may submit a letter of explanation
            to the Board.
          </p>

          <div className="affiliate-box">
            <h4>Social Affiliate Membership</h4>
            <p>
              Social Affiliate status is available for front office employees
              who perform concierge duties daily but work at hotels without a
              proper concierge desk, or concierges working less than 32 hours
              weekly. Affiliates are carefully selected through an application
              process including a test call, board interview, and job
              verification.
            </p>
          </div>
        </div>

        <div className="quals-box fade-in">
          <h4>Eligibility Criteria</h4>

          {groups.map((g) => (
            <div className="qual-group" key={g.label}>
              <div className="qual-group-label">{g.label}</div>
              {g.items.map((item: string, idx: number) => (
                <div className="qual-item-row" key={idx}>
                  <div className="qual-ring">
                    <Check />
                  </div>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
