import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeFirestore, getFirestore, type Firestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase only once (prevents duplicate app errors in dev with hot reload)
const isNewApp = !getApps().length;
const app = isNewApp ? initializeApp(firebaseConfig) : getApp();

// Firestore — use initializeFirestore on first init to enable long-polling auto-detect.
// This fixes cold-start hangs on Vercel where the WebChannel transport gets blocked
// by edge networks/firewalls and the SDK takes 30+ seconds to fall back.
let db: Firestore;
if (isNewApp) {
  db = initializeFirestore(app, {
    experimentalAutoDetectLongPolling: true,
  });
} else {
  db = getFirestore(app);
}

export { db };

// Storage for image uploads (board photos, sponsor logos)
export const storage = getStorage(app);

export default app;