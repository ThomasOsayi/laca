"use client";

import { useEffect } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/shared/PageHero";
import MembershipTiers from "@/components/membership/MembershipTiers";
import Qualifications from "@/components/membership/Qualifications";
import MembershipBenefits from "@/components/membership/MembershipBenefits";
import HowToApply from "@/components/membership/HowToApply";
import HotelManagement from "@/components/membership/HotelManagement";
import DeadlineBanner from "@/components/membership/DeadlineBanner";
import MembershipCTA from "@/components/membership/MembershipCTA";

export default function MembershipPage() {
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
        label="Membership"
        title="Membership"
        titleEm="Information"
        description="Join the premier network of Los Angeles hotel concierges. Your membership is an investment in professional growth, valuable relationships, and access to Les Clefs d'Or USA opportunities."
        breadcrumb="Membership"
        bgImage="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&h=600&fit=crop"
      />
      <MembershipTiers />
      <Qualifications />
      <MembershipBenefits />
      <HowToApply />
      <HotelManagement />
      <DeadlineBanner />
      <MembershipCTA />
      <Footer />
    </>
  );
}