import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAsM-fSjWQ2d4U1KAy3ghSL6iKG_5tu-qk",
  authDomain: "namipmututorial.firebaseapp.com",
  projectId: "namipmututorial",
  storageBucket: "namipmututorial.firebasestorage.app",
  messagingSenderId: "1005512938743",
  appId: "1:1005512938743:web:6ec95e4f4f2aca6cd9eff2",
  measurementId: "G-P67FWKL811"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Firestore Database
export const db = getFirestore(app);

export default app;
