import Link from "next/link";

interface PageHeroProps {
  label: string;
  title: string;
  titleEm: string;
  description: string;
  breadcrumb: string;
  bgImage?: string;
}

export default function PageHero({
  label,
  title,
  titleEm,
  description,
  breadcrumb,
  bgImage = "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1920&h=600&fit=crop",
}: PageHeroProps) {
  return (
    <section className="page-hero">
      <div
        className="page-hero-bg"
        style={{ backgroundImage: `url('${bgImage}')` }}
      />
      <div className="page-hero-overlay" />
      <div className="container page-hero-content">
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
          <span className="current">{breadcrumb}</span>
        </div>
        <div className="section-label">{label}</div>
        <h1>
          {title} <em>{titleEm}</em>
        </h1>
        <p>{description}</p>
      </div>
    </section>
  );
}