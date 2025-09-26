import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "fuilstation.firebaseapp.com",
  projectId: "fuilstation",
  storageBucket: "fuilstation.firebasestorage.app",
  messagingSenderId: "479197639154",
  appId: "1:479197639154:web:0e3abc2534d322869ffb6b",
  measurementId: "G-HCCGNBBGJE",
};


export const app = initializeApp(firebaseConfig);
