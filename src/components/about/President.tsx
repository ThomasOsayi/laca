export default function President() {
    return (
      <section className="president">
        <div className="container president-grid">
          <div className="president-photo fade-in">
            <div className="president-img">
              <img
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=560&h=680&fit=crop&crop=faces"
                alt="Chamian Coates, LACA President"
              />
            </div>
            <div className="president-name-card">
              <h4>Chamian Coates</h4>
              <span>President, LACA</span>
            </div>
          </div>
  
          <div className="president-note fade-in">
            <div className="section-label">President&apos;s Note</div>
            <h2>
              A Message from Our <em>President</em>
            </h2>
            <p>
              The art of concierge goes beyond basic service. It is about
              intuition, personalization, and the ability to transform ordinary
              moments into extraordinary ones. It is about problem-solving with
              grace, leveraging an extensive network, and curating experiences
              that leave lasting impressions.
            </p>
            <p>
              Our profession thrives on knowledge, empathy, and a proactive
              approach, all of which are honed through initiatives like this. By
              forging strong partnerships and expanding our local expertise, we
              reinforce the excellence and prestige of our profession.
            </p>
            <p>
              Together, we continue to uphold the values of the Los Angeles
              Concierge Association: service, professionalism, and camaraderie. I
              invite you all to participate, learn, and collaborate. Let&apos;s
              take this opportunity to not only enhance our craft but to also
              strengthen the bonds that make our community exceptional.
            </p>
            <div className="president-signature">
              In Service Through Friendship,
              <span>
                Chamian Coates · President, Los Angeles Concierge Association
              </span>
            </div>
          </div>
        </div>
      </section>
    );
  }