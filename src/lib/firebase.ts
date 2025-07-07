import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAoyariK69fWmoZ7FSrU7kJH4n7KZCtIc",
  authDomain: "ai-automations-engineer-de.firebaseapp.com",
  projectId: "ai-automations-engineer-de",
  storageBucket: "ai-automations-engineer-de.firebasestorage.app",
  messagingSenderId: "1051916032696",
  appId: "1:1051916032696:web:5f2fe1affef42b24a4724d",
  measurementId: "G-1YSBMPQ55Y"
};

console.log(import.meta.env);

// Initialize Firebase (avoid double initialization)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Connect to emulators in development (optional)
if (import.meta.env.DEV && typeof window !== 'undefined') {
  // Only connect to emulators if running in development and in browser
  try {
    // Uncomment these lines if you want to use Firebase emulators in development
    // connectAuthEmulator(auth, 'http://localhost:9099');
    // connectFirestoreEmulator(db, 'localhost', 8080);
  } catch (error) {
    console.log('Firebase emulators already connected or not available');
  }
}

export default app;