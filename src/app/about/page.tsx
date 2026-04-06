"use client";

import { useEffect } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AboutPageHero from "@/components/about/PageHero";
import Mission from "@/components/about/Mission";
import President from "@/components/about/President";
import Board from "@/components/about/Board";
import Ethics from "@/components/about/Ethics";
import LesClefs from "@/components/about/LesClefs";
import ContactBand from "@/components/about/ContactBand";

export default function AboutPage() {
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
      <AboutPageHero />
      <Mission />
      <President />
      <Board />
      <Ethics />
      <LesClefs />
      <ContactBand />
      <Footer />
    </>
  );
}