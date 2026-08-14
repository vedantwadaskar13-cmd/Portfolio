import { db } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const CLOUD_STORAGE_KEY = 'vedant_portfolio_global_data_v2';

export interface GlobalPortfolioData {
  personal: any;
  projects: any[];
  experience: any[];
  skills: any[];
  updatedAt?: string;
}

// Fetch global portfolio data for ALL visitors worldwide
export async function fetchGlobalPortfolioData(): Promise<GlobalPortfolioData | null> {
  // 1. Try Firebase Firestore
  try {
    const docRef = doc(db, 'portfolio', 'live_data');
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const data = snap.data() as GlobalPortfolioData;
      if (data && data.personal) {
        localStorage.setItem(CLOUD_STORAGE_KEY, JSON.stringify(data));
        return data;
      }
    }
  } catch (e) {
    console.warn('Firestore fetch note:', e);
  }

  // 2. Fallback to cached local copy
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

  // 1. Save to Firebase Firestore
  try {
    await setDoc(doc(db, 'portfolio', 'live_data'), fullData, { merge: true });
    return true;
  } catch (e) {
    console.warn('Firestore cloud save note:', e);
    return false;
  }
}


