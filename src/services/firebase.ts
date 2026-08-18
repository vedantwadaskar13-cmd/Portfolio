import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, doc, setDoc, onSnapshot, getDocs, query, orderBy } from 'firebase/firestore';

// Default Firebase Configuration (reads securely from environment variables)
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || ""
};

// Initialize Firebase safely only if valid API key is present
const hasFirebaseKey = Boolean(firebaseConfig.apiKey && firebaseConfig.apiKey.length > 5);
const app = hasFirebaseKey 
  ? (!getApps().length ? initializeApp(firebaseConfig) : getApp())
  : null;

export const auth = app ? getAuth(app) : ({} as any);
export const db = app ? getFirestore(app) : ({} as any);

export function isFirebaseReady(): boolean {
  return hasFirebaseKey;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
  read?: boolean;
}

// Function to record contact transmission
export async function sendContactMessage(msg: Omit<ContactMessage, 'timestamp'>): Promise<{ success: boolean; id?: string }> {
  const fullMsg = {
    ...msg,
    timestamp: new Date().toISOString(),
    read: false
  };

  try {
    const docRef = await addDoc(collection(db, 'contact_messages'), fullMsg);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.warn('Firestore message save note:', error);
    const existing = JSON.parse(localStorage.getItem('contact_messages') || '[]');
    const newMsg = { ...fullMsg, id: 'msg_' + Date.now() };
    existing.unshift(newMsg);
    localStorage.setItem('contact_messages', JSON.stringify(existing));
    return { success: true, id: newMsg.id };
  }
}

// Fetch all contact messages for admin
export async function fetchContactMessages(): Promise<ContactMessage[]> {
  try {
    const q = query(collection(db, 'contact_messages'), orderBy('timestamp', 'desc'));
    const snap = await getDocs(q);
    const messages: ContactMessage[] = [];
    snap.forEach(docSnap => {
      messages.push({ id: docSnap.id, ...(docSnap.data() as Omit<ContactMessage, 'id'>) });
    });
    if (messages.length > 0) {
      localStorage.setItem('contact_messages', JSON.stringify(messages));
      return messages;
    }
  } catch (e) {
    console.warn('Firestore fetch messages note:', e);
  }

  const existing = JSON.parse(localStorage.getItem('contact_messages') || '[]');
  return existing;
}

// Cloud Persistence helper for cross-domain CMS syncing
export async function savePortfolioCloud(data: any) {
  try {
    await setDoc(doc(db, 'portfolio', 'live_data'), data, { merge: true });
  } catch (e) {
    console.warn('Cloud sync note:', e);
  }
}

export function subscribePortfolioCloud(callback: (data: any) => void) {
  try {
    return onSnapshot(doc(db, 'portfolio', 'live_data'), (snapshot) => {
      if (snapshot.exists()) {
        callback(snapshot.data());
      }
    });
  } catch (e) {
    console.warn('Cloud snapshot note:', e);
  }
  return () => {};
}


