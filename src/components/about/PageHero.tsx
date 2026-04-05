import Link from "next/link";

export default function PageHero() {
  return (
    <section className="page-hero">
      <div className="page-hero-bg" />
      <div className="page-hero-overlay" />
      <div className="container page-hero-content">
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
          <span className="current">About / Mission / Board</span>
        </div>
        <h1>
          Our Mission &amp; <em>Leadership</em>
        </h1>
        <p>
          Founded in the mid-1980s, the Los Angeles Concierge Association is the
          premier network for LA&apos;s finest hotel concierges — united in service,
          friendship, and the pursuit of hospitality excellence.
        </p>
      </div>
    </section>
  );
}