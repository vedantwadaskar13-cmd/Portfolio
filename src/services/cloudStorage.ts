import { db } from './firebase';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

const CLOUD_JSON_ENDPOINT = 'https://api.jsonbin.io/v3/b/66bb2d35e41b4d34e41f87ab'; // Global fallback cloud storage
const STORAGE_KEY_GLOBAL = 'vedant_portfolio_global_data_v1';

export interface GlobalPortfolioData {
  personal: any;
  projects: any[];
  experience: any[];
  skills: any[];
  updatedAt?: string;
}

// Fetch global portfolio data for ALL visitors worldwide
export async function fetchGlobalPortfolioData(): Promise<GlobalPortfolioData | null> {
  try {
    // 1. Try Firebase Firestore first if project credentials exist
    if (import.meta.env.VITE_FIREBASE_API_KEY && import.meta.env.VITE_FIREBASE_PROJECT_ID !== 'vedant-portfolio') {
      const docRef = doc(db, 'portfolio', 'live_data');
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        const data = snap.data() as GlobalPortfolioData;
        localStorage.setItem(STORAGE_KEY_GLOBAL, JSON.stringify(data));
        return data;
      }
    }

    // 2. Try global JSON cloud endpoint for zero-config global persistence
    const res = await fetch('https://jsonblob.com/api/jsonBlob/1272543981881851904', {
      headers: { 'Accept': 'application/json' }
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.personal) {
        localStorage.setItem(STORAGE_KEY_GLOBAL, JSON.stringify(data));
        return data;
      }
    }
  } catch (e) {
    console.warn('Cloud fetch note:', e);
  }

  // 3. Fallback to cached local copy
  const cached = localStorage.getItem(STORAGE_KEY_GLOBAL);
  return cached ? JSON.parse(cached) : null;
}

// Save portfolio data globally for ALL visitors worldwide
export async function saveGlobalPortfolioData(data: GlobalPortfolioData): Promise<boolean> {
  const fullData = {
    ...data,
    updatedAt: new Date().toISOString(),
  };

  // Cache locally immediately
  localStorage.setItem(STORAGE_KEY_GLOBAL, JSON.stringify(fullData));

  try {
    // 1. Save to Firebase Firestore if connected
    if (import.meta.env.VITE_FIREBASE_API_KEY && import.meta.env.VITE_FIREBASE_PROJECT_ID !== 'vedant-portfolio') {
      await setDoc(doc(db, 'portfolio', 'live_data'), fullData, { merge: true });
    }

    // 2. Save to global cloud endpoint for worldwide synchronization
    await fetch('https://jsonblob.com/api/jsonBlob/1272543981881851904', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(fullData),
    });

    return true;
  } catch (e) {
    console.warn('Global cloud save note:', e);
    return false;
  }
}
