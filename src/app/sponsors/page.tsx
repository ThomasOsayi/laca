"use client";

import { useEffect } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/shared/PageHero";
import WhyPartner from "@/components/sponsors/WhyPartner";
import SponsorTiers from "@/components/sponsors/SponsorTiers";
import SponsorsGallery from "@/components/sponsors/SponsorsGallery";
import HowToSponsor from "@/components/sponsors/HowToSponsor";
import Ambassador from "@/components/sponsors/Ambassador";
import LogoPlaceholders from "@/components/sponsors/LogoPlaceholders";
import SponsorCTA from "@/components/sponsors/SponsorCTA";

export default function SponsorsPage() {
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
        label="Sponsors"
        title="Sponsors &"
        titleEm="Partners"
        description="Our vendors and partners represent the best in Los Angeles dining, attractions, entertainment, wellness, retail, and experiences. Partner with LACA to reach the most influential hospitality voices in Southern California."
        breadcrumb="Sponsors & Partners"
        bgImage="https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1920&h=600&fit=crop"
      />
      <WhyPartner />
      <SponsorTiers />
      <SponsorsGallery />
      <HowToSponsor />
      <Ambassador />
      <LogoPlaceholders />
      <SponsorCTA />
      <Footer />
    </>
  );
}