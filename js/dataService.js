// === FIREBASE CONFIG DAN FIRESTORE ===
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDyyFgho0Cd8CLX6RN7mpLTGhbjikfhZ7w",
  authDomain: "input-nilai-mahasiswa-7.firebaseapp.com",
  projectId: "input-nilai-mahasiswa-7",
  storageBucket: "input-nilai-mahasiswa-7.firebasestorage.app",
  messagingSenderId: "499799144209",
  appId: "1:499799144209:web:ac18fe581437f037a1beb0",
  measurementId: "G-95Y691FXRG"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// === SIMPAN DATA MAHASISWA ===
export async function simpanData(data) {
  // Data sekarang termasuk kode MK
  const docRef = await addDoc(collection(db, "mahasiswa"), {
    nama: data.nama,
    nim: data.nim,
    kode: data.kode, // <--- ditambahkan
    mataKuliah: data.mataKuliah,
    nilai: data.nilai
  });
  console.log("Data disimpan dengan ID:", docRef.id);
}

// === LOAD DATA REALTIME ===
export function loadDataRealtime(callback) {
  const colRef = collection(db, "mahasiswa");
  onSnapshot(colRef, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(data);
  });
}

// === LOAD DATA SEKALI SAJA (untuk refresh) ===
export async function loadDataOnce() {
  const querySnapshot = await getDocs(collection(db, "mahasiswa"));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}
