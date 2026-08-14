import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, doc, setDoc, onSnapshot, getDocs, query, orderBy } from 'firebase/firestore';

// Default Firebase Configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDBq1dEc3RmCQKMyjr2IoTg5NhYkDDyx3E",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "portfolio-a7b3f.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "portfolio-a7b3f",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "portfolio-a7b3f.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1234567890:web:abcdef123456"
};

// Initialize Firebase safely
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);

export function isFirebaseReady(): boolean {
  const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
  return Boolean(apiKey && apiKey.length > 10 && !apiKey.includes('DummyKey'));
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

  if (isFirebaseReady()) {
    try {
      const docRef = await addDoc(collection(db, 'contact_messages'), fullMsg);
      return { success: true, id: docRef.id };
    } catch (error) {
      console.warn('Firestore message save note:', error);
    }
  }

  // Fallback to local storage & cloud persistence
  const existing = JSON.parse(localStorage.getItem('contact_messages') || '[]');
  const newMsg = { ...fullMsg, id: 'msg_' + Date.now() };
  existing.unshift(newMsg);
  localStorage.setItem('contact_messages', JSON.stringify(existing));
  return { success: true, id: newMsg.id };
}

// Fetch all contact messages for admin
export async function fetchContactMessages(): Promise<ContactMessage[]> {
  if (isFirebaseReady()) {
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
  }

  const existing = JSON.parse(localStorage.getItem('contact_messages') || '[]');
  return existing;
}

// Cloud Persistence helper for cross-domain CMS syncing
export async function savePortfolioCloud(data: any) {
  if (isFirebaseReady()) {
    try {
      await setDoc(doc(db, 'portfolio', 'live_data'), data, { merge: true });
    } catch (e) {
      console.warn('Cloud sync note:', e);
    }
  }
}

export function subscribePortfolioCloud(callback: (data: any) => void) {
  if (isFirebaseReady()) {
    try {
      return onSnapshot(doc(db, 'portfolio', 'live_data'), (snapshot) => {
        if (snapshot.exists()) {
          callback(snapshot.data());
        }
      });
    } catch (e) {
      console.warn('Cloud snapshot note:', e);
    }
  }
  return () => {};
}

