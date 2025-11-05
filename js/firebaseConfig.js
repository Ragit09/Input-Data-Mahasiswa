// js/firebaseConfig.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDyyFgho0Cd8CLX6RN7mpLTGhbjikfhZ7w",
  authDomain: "input-nilai-mahasiswa-7.firebaseapp.com",
  projectId: "input-nilai-mahasiswa-7",
  storageBucket: "input-nilai-mahasiswa-7.firebasestorage.app",
  messagingSenderId: "499799144209",
  appId: "1:499799144209:web:ac18fe581437f037a1beb0",
  measurementId: "G-95Y691FXRG"
};

const app = initializeApp(firebaseConfig);
try { getAnalytics(app); } catch (e) { console.warn('Analytics init failed', e); }

const db = getFirestore(app);
export { db };
