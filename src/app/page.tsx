"use client";

import { useEffect } from "react";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Expo from "@/components/Expo";
import Benefits from "@/components/Benefits";
import Membership from "@/components/Membership";
import Gallery from "@/components/Gallery";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
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
      <Hero />
      <About />
      <Expo />
      <Benefits />
      <Membership />
      <Gallery />
      <CTA />
      <Footer />
    </>
  );
}