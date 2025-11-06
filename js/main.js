import { simpanData, loadDataRealtime, loadDataOnce } from './dataService.js';
import { validasiInput } from './validation.js';
import { renderTable, clearForm, showAlert } from './uiHandler.js';

document.addEventListener('DOMContentLoaded', () => {
  const navContainer = document.getElementById('navButtons');
  const btnClear = document.getElementById('btnClear');
  const btnRefresh = document.getElementById('btnRefresh');
  const form = document.getElementById('nilaiForm');

  // Navbar dinamis (tanpa emoji, tanpa hamburger)
  function setNavbar(mode) {
    navContainer.innerHTML = '';
    const btn = document.createElement('button');
    btn.className = 'btn btn-light fw-semibold nav-btn';
    if (mode === 'input') {
      btn.textContent = 'Data Mahasiswa';
      btn.onclick = showData;
    } else {
      btn.textContent = 'Input Nilai';
      btn.onclick = showInput;
    }
    navContainer.appendChild(btn);
  }

  // Tampilkan dashboard
  function showInput() {
    document.getElementById('inputDashboard').classList.remove('d-none');
    document.getElementById('dataDashboard').classList.add('d-none');
    setNavbar('input');
  }

  function showData() {
    document.getElementById('inputDashboard').classList.add('d-none');
    document.getElementById('dataDashboard').classList.remove('d-none');
    setNavbar('data');
  }

  btnClear.addEventListener('click', clearForm);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nama = document.getElementById('nama').value.trim();
    const nim = document.getElementById('nim').value.trim();
    const mkValue = document.getElementById('mk').value;
    const nilai = document.getElementById('nilai').value;

    if (!mkValue.includes('|')) return showAlert('Format mata kuliah tidak valid', 'danger');

    const [kode, mataKuliah] = mkValue.split('|');
    const { valid, messages } = validasiInput({ nama, nim, mataKuliah, nilai });
    if (!valid) return showAlert(messages.join(' '), 'danger');

    try {
      await simpanData({ nama, nim, kode, mataKuliah, nilai });
      showAlert('Data berhasil disimpan.', 'success');
      clearForm();
    } catch (err) {
      console.error(err);
      showAlert('Terjadi kesalahan saat menyimpan data.', 'danger');
    }
  });

  btnRefresh.addEventListener('click', async () => {
    const data = await loadDataOnce();
    renderTable(data);
    showAlert('Data diperbarui.', 'info');
  });

  loadDataRealtime((data) => renderTable(data));
  showInput();
});
