// js/dataService.js
import { db } from './firebaseConfig.js';
import {
  collection, addDoc, onSnapshot, doc, updateDoc,
  deleteDoc, query, orderBy, getDocs
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const collRef = collection(db, 'mahasiswa');

export async function simpanData(data) {
  const payload = {
    nama: data.nama.trim(),
    nim: data.nim.trim(),
    mataKuliah: data.mataKuliah,
    nilai: Number(data.nilai)
  };
  return addDoc(collRef, payload);
}

export async function updateData(id, data) {
  const ref = doc(db, 'mahasiswa', id);
  return updateDoc(ref, {
    nama: data.nama.trim(),
    nim: data.nim.trim(),
    mataKuliah: data.mataKuliah,
    nilai: Number(data.nilai)
  });
}

export async function deleteData(id) {
  const ref = doc(db, 'mahasiswa', id);
  return deleteDoc(ref);
}

export function loadDataRealtime(callback) {
  const q = query(collRef, orderBy('nama'));
  return onSnapshot(q, snapshot => {
    const arr = [];
    snapshot.forEach(d => arr.push({ id: d.id, ...d.data() }));
    callback(arr);
  }, err => {
    console.error('onSnapshot error', err);
    callback([]);
  });
}

export async function loadDataOnce() {
  const q = query(collRef, orderBy('nama'));
  const snap = await getDocs(q);
  const arr = [];
  snap.forEach(d => arr.push({ id: d.id, ...d.data() }));
  return arr;
}
