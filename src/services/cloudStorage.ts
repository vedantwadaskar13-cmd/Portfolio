import { db } from './firebase';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

// Global Cloud Storage endpoint for fallback cross-browser persistence
const CLOUD_STORAGE_KEY = 'vedant_portfolio_global_data_v2';
// Reliable public JSON cloud API endpoint
const PUBLIC_CLOUD_ENDPOINT = 'https://api.jsonbin.io/v3/b/66bb2d35e41b4d34e41f87ab';

export interface GlobalPortfolioData {
  personal: any;
  projects: any[];
  experience: any[];
  skills: any[];
  updatedAt?: string;
}

// Check if valid Firebase configuration is active
function isFirebaseConfigured(): boolean {
  const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
  return Boolean(apiKey && apiKey.length > 10 && !apiKey.includes('DummyKey'));
}

// Fetch global portfolio data for ALL visitors worldwide
export async function fetchGlobalPortfolioData(): Promise<GlobalPortfolioData | null> {
  // 1. Try Firebase Firestore first if project credentials exist
  if (isFirebaseConfigured()) {
    try {
      const docRef = doc(db, 'portfolio', 'live_data');
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        const data = snap.data() as GlobalPortfolioData;
        localStorage.setItem(CLOUD_STORAGE_KEY, JSON.stringify(data));
        return data;
      }
    } catch (e) {
      console.warn('Firestore fetch note:', e);
    }
  }

  // 2. Try global REST cloud endpoint for cross-browser synchronization
  try {
    const res = await fetch(PUBLIC_CLOUD_ENDPOINT, {
      headers: {
        'Accept': 'application/json',
        'X-Bin-Meta': 'false'
      }
    });
    if (res.ok) {
      const data = await res.json();
      const payload = data.record || data;
      if (payload && payload.personal) {
        localStorage.setItem(CLOUD_STORAGE_KEY, JSON.stringify(payload));
        return payload;
      }
    }
  } catch (e) {
    console.warn('Cloud API fetch note:', e);
  }

  // 3. Fallback to cached local copy
  const cached = localStorage.getItem(CLOUD_STORAGE_KEY) || localStorage.getItem('vedant_portfolio_global_data_v1');
  return cached ? JSON.parse(cached) : null;
}

// Save portfolio data globally for ALL visitors worldwide
export async function saveGlobalPortfolioData(data: GlobalPortfolioData): Promise<boolean> {
  const fullData: GlobalPortfolioData = {
    ...data,
    updatedAt: new Date().toISOString(),
  };

  // Cache locally immediately in browser
  localStorage.setItem(CLOUD_STORAGE_KEY, JSON.stringify(fullData));

  let savedCloud = false;

  // 1. Save to Firebase Firestore if connected
  if (isFirebaseConfigured()) {
    try {
      await setDoc(doc(db, 'portfolio', 'live_data'), fullData, { merge: true });
      savedCloud = true;
    } catch (e) {
      console.warn('Firestore cloud save note:', e);
    }
  }

  // 2. Save to global REST endpoint for multi-browser & multi-session synchronization
  try {
    const res = await fetch(PUBLIC_CLOUD_ENDPOINT, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(fullData),
    });
    if (res.ok) {
      savedCloud = true;
    }
  } catch (e) {
    console.warn('Cloud API save note:', e);
  }

  return savedCloud;
}

