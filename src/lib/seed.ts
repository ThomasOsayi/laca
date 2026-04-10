import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAO12irZdSDjBZdGwKyDdULzZLjRCJlPgQ",
  authDomain: "laca-db236.firebaseapp.com",
  projectId: "laca-db236",
  storageBucket: "laca-db236.firebasestorage.app",
  messagingSenderId: "917050276464",
  appId: "1:917050276464:web:530ea3f19e1b532ad212b5",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seed() {
  console.log("Seeding Firestore...");

  // ===== BOARD MEMBERS =====
  await setDoc(doc(db, "site", "board"), {
    members: [
      {
        id: "1",
        name: "Chamian Coates",
        role: "President",
        email: "president@thelaca.com",
        affiliation: "",
        photo: "",
        initials: "CC",
      },
      {
        id: "2",
        name: "Alejandro Sosa",
        role: "Director of Membership",
        email: "membership@thelaca.com",
        affiliation: "",
        photo: "",
        initials: "AS",
      },
      {
        id: "3",
        name: "Frank Parr",
        role: "Corporate Ambassador",
        email: "corporateambassador@thelaca.com",
        affiliation: "Peninsula Beverly Hills",
        photo: "",
        initials: "FP",
      },
      {
        id: "4",
        name: "Adriano Bartoli",
        role: "Public Relations",
        email: "publicrelations@thelaca.com",
        affiliation: "",
        photo: "",
        initials: "AB",
      },
      {
        id: "5",
        name: "David Hyland",
        role: "Public Relations Co-Chair",
        email: "publicrelations@thelaca.com",
        affiliation: "",
        photo: "",
        initials: "DH",
      },
      {
        id: "6",
        name: "Matt Beritich",
        role: "Les Clefs d'Or Liaison",
        email: "liaison.lcd@thelaca.com",
        affiliation: "",
        photo: "",
        initials: "MB",
      },
      {
        id: "7",
        name: "Board Treasurer",
        role: "Treasurer",
        email: "",
        affiliation: "",
        photo: "",
        initials: "TR",
      },
      {
        id: "8",
        name: "Board Secretary",
        role: "Secretary",
        email: "",
        affiliation: "",
        photo: "",
        initials: "SE",
      },
    ],
  });
  console.log("  ✓ Board members");

  // ===== EVENTS =====
  await setDoc(doc(db, "site", "events"), {
    expo: {
      name: "LACA Expo & Hospitality Trade Show",
      year: "2025",
      venue: "Taglyan Complex",
      date: "TBA",
      time: "Evening Event",
      description:
        "Our signature annual event brings together concierges and hospitality professionals from across Los Angeles. For over a decade, this event has connected the industry's best with top-tier vendors and partners.",
      attendeeCount: "200–350",
      vendorCount: "45–65",
      yearsRunning: "10+",
      image: "",
    },
    gala: {
      name: "The LACA Winter Gala",
      description:
        "An elegant end-of-year celebration honoring the achievements of our members and the partnerships that define LA hospitality. Gold Key Partners and General Sponsors receive complimentary admission.",
      image: "",
    },
    meetings: [
      {
        id: "1",
        title: "Monthly Member Meetings",
        description:
          "Educational business meetings attended by 35–50 concierges with classroom-style seating, followed by a reception or sit-down dinner. Sponsors are invited to select meetings, adding 20–30 additional guests.",
        tag: "35–50 Attendees",
      },
      {
        id: "2",
        title: "Social Mixers",
        description:
          "Networking receptions for 30–50 people with light appetizers and hosted beverages. A great opportunity for concierges to experience new venues firsthand and for venues to showcase menu highlights.",
        tag: "30–50 Guests",
      },
      {
        id: "3",
        title: "LACA Supper Club",
        description:
          "Exclusive dinners hosted by restaurants around the city, offering concierges a full dining experience. Group sizes are tailored to what works best for each restaurant partner.",
        tag: "Intimate Dining",
      },
      {
        id: "4",
        title: "Featured Restaurant of the Month",
        description:
          "A series of 3–4 intimate concierge dinners hosted by one restaurant in a single month, featured across LACA's website and social media for maximum exposure.",
        tag: "3–4 Events / Month",
      },
    ],
    specialEvents: [],
  });
  console.log("  ✓ Events");

  // ===== MEMBERSHIP =====
  await setDoc(doc(db, "site", "membership"), {
    dues: {
      full: "$150",
      affiliate: "$175",
      sponsor: "$800",
    },
    deadline: "May 15, 2026",
    deadlineYear: "2026",
    qualifications: [
      "At least 21 years of age",
      'Employed by a hotel with the title of "Concierge"',
      "Work a minimum of 32 hours per week",
      'At a desk located in the lobby displaying the sign "Concierge"',
      "Passed the 90-day probationary period in that position",
      "Attend at least 4 LACA meetings per calendar year",
    ],
  });
  console.log("  ✓ Membership");

  // ===== SPONSORS =====
  await setDoc(doc(db, "site", "sponsors"), {
    logos: [],
    galleryImages: [],
  });
  console.log("  ✓ Sponsors");

  // ===== CONTACTS =====
  await setDoc(doc(db, "site", "contacts"), {
    emails: {
      membership: "membership@thelaca.com",
      corporateAmbassador: "corporateambassador@thelaca.com",
      publicRelations: "publicrelations@thelaca.com",
      president: "president@thelaca.com",
      lesClefs: "liaison.lcd@thelaca.com",
    },
    socials: {
      facebook: "https://www.facebook.com/thelaca/",
      instagram: "https://www.instagram.com/thelaca/",
      twitter: "https://twitter.com/thelaca",
      youtube: "https://www.youtube.com/@thelaca",
    },
    address: {
      name: "The Los Angeles Concierge Association",
      street: "269 South Beverly Drive, Suite 701",
      cityStateZip: "Beverly Hills, CA 90212",
    },
    website: "https://thelaca.com",
  });
  console.log("  ✓ Contacts");

  // ===== SITE CONTENT =====
  await setDoc(doc(db, "site", "content"), {
    hero: {
      tagline: "Los Angeles, California",
      titleLine1: "In Service",
      titleLine2: "Through Friendship",
      description:
        "The Los Angeles Concierge Association fosters the education and development of its members while maintaining the highest professional and ethical standards, shaping how the world experiences LA.",
      stats: [
        { number: "10+", label: "Years of Trade Shows" },
        { number: "350", label: "Hospitality Experts" },
        { number: "65", label: "Vendor Partners" },
      ],
      badge: "Established Mid-1980s",
      image: "",
    },
    president: {
      name: "Chamian Coates",
      title: "President, LACA",
      photo: "",
      paragraphs: [
        "The art of concierge goes beyond basic service. It is about intuition, personalization, and the ability to transform ordinary moments into extraordinary ones. It is about problem-solving with grace, leveraging an extensive network, and curating experiences that leave lasting impressions.",
        "Our profession thrives on knowledge, empathy, and a proactive approach, all of which are honed through initiatives like this. By forging strong partnerships and expanding our local expertise, we reinforce the excellence and prestige of our profession.",
        "Together, we continue to uphold the values of the Los Angeles Concierge Association: service, professionalism, and camaraderie. I invite you all to participate, learn, and collaborate. Let's take this opportunity to not only enhance our craft but to also strengthen the bonds that make our community exceptional.",
      ],
      signature: "In Service Through Friendship,",
    },
    mission: {
      heading: "Concierge, The Original Influencer",
      quote:
        "The Los Angeles Concierge Association will foster the education and development of its members while maintaining the highest professional and ethical standards. We will unite hotel concierges in the community encouraging service through friendship throughout the concierge profession.",
      paragraphs: [
        "Founded in the mid-1980s as a nonprofit, LACA stands as the premier network for Los Angeles-based hotel concierges, representing the city's most prestigious luxury hotels, boutique properties, and independent hotels. Our members are dedicated to curating extraordinary, personalized experiences, offering elite guests exclusive access to the finest that Los Angeles has to offer.",
        "Before social media, before algorithms, the concierge was the trusted voice, recommending the restaurants people rave about, the hidden gems they discover, and the experiences they carry home as stories. LACA was founded to protect and elevate that legacy.",
        "Through ongoing education, collaboration, and networking, LACA enhances the role of the modern concierge. Through our Les Clefs d'Or USA Mentorship and Scholarship Program, we empower members to excel in their concierge careers.",
      ],
    },
    copyrightYear: "2025",
  });
  console.log("  ✓ Site content");

  // ===== SETTINGS =====
  await setDoc(doc(db, "site", "settings"), {
    showExpo: true,
    showGala: true,
    showDeadlineBanner: true,
    showSponsorLogos: false,
    adminPassword: "laca2025admin",
  });
  console.log("  ✓ Settings");

  console.log("\n✅ Firestore seeded successfully!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});