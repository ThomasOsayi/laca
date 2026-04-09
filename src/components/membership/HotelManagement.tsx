"use client";

import { useSiteData } from "@/lib/SiteDataContext";

export default function HotelManagement() {
  const { membership } = useSiteData();
  const fullPrice = membership?.dues?.full || "$150";

  const perks = [
    {
      title: "Professional Development",
      desc: "Exclusive training, workshops, and industry education",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      ),
    },
    {
      title: "Unmatched Networking",
      desc: "Connections with top-tier industry professionals",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      title: "Preferred Partnerships",
      desc: "Access to premier local venues and service providers",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
    },
  ];

  return (
    <section className="hotel-mgmt">
      <div className="container hotel-grid">
        <div className="hotel-content fade-in">
          <div className="section-label">For Hotel Management</div>
          <h2>
            Support Your <em>Concierge Team</em>
          </h2>
          <p>
            Investing in your concierge team&apos;s development through LACA
            membership isn&apos;t just a perk. It&apos;s a strategic advantage
            for your hotel. For a nominal {fullPrice} per concierge, you open the door
            to professional growth that directly enhances your guest experience.
          </p>
          <p>
            With little to no additional cost beyond membership, LACA equips
            your concierge team with the knowledge, connections, and resources
            needed to stay ahead in Los Angeles&apos; competitive hospitality
            landscape.
          </p>

          <div className="hotel-perks">
            {perks.map((p) => (
              <div className="hotel-perk" key={p.title}>
                <div className="hotel-perk-icon">{p.icon}</div>
                <div>
                  <h4>{p.title}</h4>
                  <p>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hotel-visual fade-in">
          <div className="hotel-img">
            <img
              src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=900&fit=crop"
              alt="Luxury hotel lobby concierge desk"
            />
          </div>
          <div className="hotel-price-badge">
            <div className="price">{fullPrice}</div>
            <span>per concierge / year</span>
          </div>
        </div>
      </div>
    </section>
  );
}
