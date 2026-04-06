"use client";

import { useEffect } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/shared/PageHero";
import ContactMain from "@/components/contact/ContactMain";
import Directory from "@/components/contact/Directory";
import QuickLinks from "@/components/contact/QuickLinks";
import ContactCTA from "@/components/contact/ContactCTA";

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
      );

      document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

      return () => observer.disconnect();
    }
  }, []);

  return (
    <>
      <Nav />
      <PageHero
        label="Contact"
        title="Get"
        titleEm="Involved"
        description="Whether you're a concierge professional looking to join, a vendor interested in our events, or a hospitality business seeking partnership, we'd love to hear from you."
        breadcrumb="Contact / Join"
        bgImage="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&h=600&fit=crop"
      />
      <ContactMain />
      <Directory />
      <QuickLinks />
      <ContactCTA />
      <Footer />
    </>
  );
}