"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMobile = () => {
    setMobileOpen(false);
    document.body.style.overflow = "";
  };

  const toggleMobile = () => {
    setMobileOpen((prev) => {
      document.body.style.overflow = !prev ? "hidden" : "";
      return !prev;
    });
  };

  const links = [
    { label: "About", href: "/about" },
    { label: "Events", href: "/events" },
    { label: "Membership", href: "/membership" },
    { label: "Sponsors", href: "/sponsors" },
  ];

  return (
    <>
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="container nav-inner">
          <Link href="/" className="nav-logo">
            <svg className="nav-logo-icon" viewBox="0 0 42 42" fill="none">
              <text x="0" y="32" fontFamily="Cormorant Garamond, serif" fontSize="30" fontWeight="700" fill="#C9A84C">L</text>
              <text x="14" y="28" fontFamily="Cormorant Garamond, serif" fontSize="20" fontWeight="600" fill="#C9A84C">A</text>
              <text x="10" y="40" fontFamily="Cormorant Garamond, serif" fontSize="16" fontWeight="500" fill="#C9A84C">CA</text>
              <line x1="32" y1="2" x2="32" y2="22" stroke="#C9A84C" strokeWidth="1.5" />
              <circle cx="32" cy="4" r="3" stroke="#C9A84C" strokeWidth="1" fill="none" />
            </svg>
            <div className="nav-logo-text">
              LACA
              <span>Los Angeles Concierge Association</span>
            </div>
          </Link>

          <ul className="nav-links">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={pathname === l.href ? "active" : ""}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" className="nav-cta">Contact / Join</Link>
            </li>
          </ul>

          <button
            className={`nav-toggle ${mobileOpen ? "open" : ""}`}
            onClick={toggleMobile}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${mobileOpen ? "open" : ""}`}>
        {links.map((l) => (
          <Link key={l.href} href={l.href} onClick={closeMobile}>{l.label}</Link>
        ))}
        <Link href="/contact" onClick={closeMobile}>Contact / Join</Link>
      </div>
    </>
  );
}