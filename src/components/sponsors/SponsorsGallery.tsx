export default function SponsorsGallery() {
    const images = [
      { src: "photo-1580655653885-65763b2597d0", alt: "Los Angeles skyline at sunset" },
      { src: "photo-1566073771259-6a8506099945", alt: "Luxury hotel pool" },
      { src: "photo-1414235077428-338989a2e8c0", alt: "Fine dining setting" },
      { src: "photo-1540541338287-41700207dee6", alt: "Beverly Hills palm trees" },
      { src: "photo-1571896349842-33c89424de2d", alt: "Hotel lobby" },
      { src: "photo-1506929562872-bb421503ef21", alt: "Malibu beach" },
    ];
  
    const allImages = [...images, ...images];
  
    return (
      <section className="sponsors-gallery">
        <div className="container">
          <div className="sponsors-gallery-header fade-in">
            <div className="section-label">LA Hospitality</div>
            <h2>
              The City <em>We Serve</em>
            </h2>
            <p>
              Our partners represent the finest dining, attractions,
              entertainment, and experiences in Los Angeles.
            </p>
          </div>
        </div>
  
        <div className="sponsors-gallery-scroll">
          {allImages.map((img, i) => (
            <div className="sponsors-gallery-item" key={`${img.src}-${i}`}>
              <img
                src={`https://images.unsplash.com/${img.src}?w=640&h=440&fit=crop`}
                alt={img.alt}
              />
            </div>
          ))}
        </div>
      </section>
    );
  }