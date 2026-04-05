export default function Gallery() {
  const images = [
    { src: "photo-1580655653885-65763b2597d0", alt: "Los Angeles cityscape at sunset" },
    { src: "photo-1566073771259-6a8506099945", alt: "Luxury hotel pool with palm trees" },
    { src: "photo-1414235077428-338989a2e8c0", alt: "Fine dining restaurant table setting" },
    { src: "photo-1540541338287-41700207dee6", alt: "Beverly Hills palm tree lined street" },
    { src: "photo-1571896349842-33c89424de2d", alt: "Hotel lobby with elegant lighting" },
    { src: "photo-1506929562872-bb421503ef21", alt: "Malibu beach at golden hour" },
  ];

  /* duplicate for seamless loop */
  const allImages = [...images, ...images];

  return (
    <section className="gallery">
      <div className="container">
        <div className="gallery-header fade-in">
          <div className="section-label">LA Hospitality</div>
          <h2>The City We Serve</h2>
        </div>
      </div>

      <div className="gallery-scroll">
        {allImages.map((img, i) => (
          <div className="gallery-item" key={`${img.src}-${i}`}>
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