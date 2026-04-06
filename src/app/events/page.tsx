"use client";

import { useEffect } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/shared/PageHero";
import ExpoFeature from "@/components/events/ExpoFeature";
import ExpoStats from "@/components/events/ExpoStats";
import Meetings from "@/components/events/Meetings";
import HostEvent from "@/components/events/HostEvent";
import WinterGala from "@/components/events/WinterGala";
import Calendar from "@/components/events/Calendar";
import EventsCTA from "@/components/events/EventsCTA";

export default function EventsPage() {
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
        label="Events"
        title="Events &"
        titleEm="Meetings"
        description="From our signature annual Expo and Trade Show to monthly member gatherings, supper clubs, and social mixers — LACA brings the LA hospitality community together year-round."
        breadcrumb="Events & Meetings"
        bgImage="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1920&h=600&fit=crop"
      />
      <ExpoFeature />
      <ExpoStats />
      <Meetings />
      <HostEvent />
      <WinterGala />
      <Calendar />
      <EventsCTA />
      <Footer />
    </>
  );
}