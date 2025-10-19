import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "joinmeetupbd.firebaseapp.com",
  projectId: "joinmeetupbd",
  storageBucket: "joinmeetupbd.firebasestorage.app",
  messagingSenderId: "234684932675",
  appId: "1:234684932675:web:a75b9e12a618b937bdeaf6",
  measurementId: "G-888D79N23B"
};


export const app = initializeApp(firebaseConfig);
