"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { db } from "./firebase";
import { doc, onSnapshot, DocumentData } from "firebase/firestore";

interface SiteData {
  board: DocumentData | null;
  events: DocumentData | null;
  membership: DocumentData | null;
  sponsors: DocumentData | null;
  contacts: DocumentData | null;
  content: DocumentData | null;
  settings: DocumentData | null;
  loading: boolean;
}

const SiteDataContext = createContext<SiteData>({
  board: null,
  events: null,
  membership: null,
  sponsors: null,
  contacts: null,
  content: null,
  settings: null,
  loading: true,
});

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [board, setBoard] = useState<DocumentData | null>(null);
  const [events, setEvents] = useState<DocumentData | null>(null);
  const [membership, setMembership] = useState<DocumentData | null>(null);
  const [sponsors, setSponsors] = useState<DocumentData | null>(null);
  const [contacts, setContacts] = useState<DocumentData | null>(null);
  const [content, setContent] = useState<DocumentData | null>(null);
  const [settings, setSettings] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const docs = [
      { id: "board", setter: setBoard },
      { id: "events", setter: setEvents },
      { id: "membership", setter: setMembership },
      { id: "sponsors", setter: setSponsors },
      { id: "contacts", setter: setContacts },
      { id: "content", setter: setContent },
      { id: "settings", setter: setSettings },
    ];

    let loaded = 0;
    const unsubs = docs.map(({ id, setter }) =>
      onSnapshot(doc(db, "site", id), (snap) => {
        setter(snap.exists() ? snap.data() : null);
        loaded++;
        if (loaded >= docs.length) setLoading(false);
      })
    );

    return () => unsubs.forEach((unsub) => unsub());
  }, []);

  return (
    <SiteDataContext.Provider
      value={{ board, events, membership, sponsors, contacts, content, settings, loading }}
    >
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  return useContext(SiteDataContext);
}