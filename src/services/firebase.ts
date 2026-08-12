import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc, setDoc } from 'firebase/firestore';

// Default Firebase Configuration (using Vite environment variables)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDummyKeyForLocalTestingOnly12345",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "vedant-portfolio.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "vedant-portfolio",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "vedant-portfolio.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1234567890:web:abcdef123456"
};

// Initialize Firebase safely
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);

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
  try {
    const fullMsg = {
      ...msg,
      timestamp: new Date().toISOString(),
      read: false
    };
    
    // Save to Firestore if connected
    if (import.meta.env.VITE_FIREBASE_API_KEY) {
      const docRef = await addDoc(collection(db, 'contact_messages'), fullMsg);
      return { success: true, id: docRef.id };
    } else {
      // Local storage fallback when running without backend env keys
      const existing = JSON.parse(localStorage.getItem('contact_messages') || '[]');
      const newMsg = { ...fullMsg, id: 'msg_' + Date.now() };
      existing.unshift(newMsg);
      localStorage.setItem('contact_messages', JSON.stringify(existing));
      return { success: true, id: newMsg.id };
    }
  } catch (error) {
    console.warn('Backend message save fallback to localStorage:', error);
    const existing = JSON.parse(localStorage.getItem('contact_messages') || '[]');
    const newMsg = { ...msg, timestamp: new Date().toISOString(), read: false, id: 'msg_' + Date.now() };
    existing.unshift(newMsg);
    localStorage.setItem('contact_messages', JSON.stringify(existing));
    return { success: true, id: newMsg.id };
  }
}
