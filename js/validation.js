// js/validation.js
export function validasiInput({ nama, nim, mataKuliah, nilai }) {
  const messages = [];

  if (!nama || nama.trim().length < 2) messages.push('Nama minimal 2 karakter.');
  if (!nim || !/^[0-9]+$/.test(nim.trim())) messages.push('NIM harus berupa angka.');
  if (!mataKuliah || mataKuliah === '') messages.push('Pilih mata kuliah terlebih dahulu.');
  if (nilai === '' || isNaN(Number(nilai)) || Number(nilai) < 0 || Number(nilai) > 100)
    messages.push('Nilai harus angka antara 0 - 100.');

  return { valid: messages.length === 0, messages };
}
