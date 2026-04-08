import { db } from "./firebase";
import {
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  DocumentData,
} from "firebase/firestore";
import { useState, useEffect } from "react";

// Real-time listener for a Firestore document
export function useSiteDoc(docId: string) {
  const [data, setData] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "site", docId), (snap) => {
      setData(snap.exists() ? snap.data() : null);
      setLoading(false);
    });
    return () => unsub();
  }, [docId]);

  return { data, loading };
}

// One-time fetch for a Firestore document
export async function fetchSiteDoc(docId: string) {
  const snap = await getDoc(doc(db, "site", docId));
  return snap.exists() ? snap.data() : null;
}

// Save/update a Firestore document
export async function saveSiteDoc(docId: string, data: DocumentData) {
  await setDoc(doc(db, "site", docId), data, { merge: true });
}