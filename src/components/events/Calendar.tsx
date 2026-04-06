export default function Calendar() {
    const items = [
      {
        month: "Jan",
        sub: "– Jun",
        title: "Monthly Meetings & Social Mixers",
        desc: "Regular gatherings at venues across LA — meetings, mixers, and supper clubs",
      },
      {
        month: "May",
        sub: "15th",
        title: "Membership Renewal Deadline",
        desc: "Annual dues and applications due — $150 Full · $175 Affiliate · $800 Sponsor",
      },
      {
        month: "Aug",
        sub: "– Sep",
        title: "Annual Expo & Trade Show",
        desc: "LACA's premier event at the Taglyan Complex — 200–350 attendees, 45–65 vendors",
      },
      {
        month: "Oct",
        sub: "– Nov",
        title: "Board Nominations & Elections",
        desc: "October nominations meeting, November elections by secret ballot",
      },
      {
        month: "Dec",
        sub: "\u00A0",
        title: "Winter Gala & Officer Installation",
        desc: "Year-end celebration with awards, new board installation, and networking",
      },
    ];
  
    return (
      <section className="calendar">
        <div className="container">
          <div className="calendar-header fade-in">
            <div className="section-label">Year at a Glance</div>
            <h2>
              LACA Event <em>Calendar</em>
            </h2>
            <p>
              A snapshot of our annual programming. Specific dates are shared with
              members via email.
            </p>
          </div>
  
          <div className="calendar-grid">
            {items.map((item, i) => (
              <div
                className={`cal-item fade-in stagger-${(i % 4) + 1}`}
                key={item.month}
              >
                <div className="cal-month">
                  <span>{item.month}</span>
                  <small>{item.sub}</small>
                </div>
                <div className="cal-divider" />
                <div className="cal-info">
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }