import { simpanData, updateData, deleteData, loadDataRealtime, loadDataOnce } from './dataService.js';
import { validasiInput } from './validation.js';
import { renderTable, clearForm, showAlert } from './uiHandler.js';

document.addEventListener('DOMContentLoaded', () => {
  const navInput = document.getElementById('navInput');
  const navData = document.getElementById('navData');
  const btnClear = document.getElementById('btnClear');
  const btnRefresh = document.getElementById('btnRefresh');
  const form = document.getElementById('nilaiForm');
  const tableBody = document.querySelector('#mahasiswaTable tbody');

  // Fungsi tampilan
  function showInput() {
    document.getElementById('inputDashboard').classList.remove('d-none');
    document.getElementById('dataDashboard').classList.add('d-none');
    navInput.classList.replace('btn-outline-light', 'btn-light');
    navData.classList.replace('btn-light', 'btn-outline-light');
  }

  function showData() {
    document.getElementById('inputDashboard').classList.add('d-none');
    document.getElementById('dataDashboard').classList.remove('d-none');
    navData.classList.replace('btn-outline-light', 'btn-light');
    navInput.classList.replace('btn-light', 'btn-outline-light');
  }

  // Navigasi antar dashboard
  navInput.addEventListener('click', showInput);
  navData.addEventListener('click', showData);
  btnClear.addEventListener('click', clearForm);

  // Form submit
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nama = document.getElementById('nama').value;
    const nim = document.getElementById('nim').value;
    const mataKuliah = document.getElementById('mk').value;
    const nilai = document.getElementById('nilai').value;
    const docId = document.getElementById('docId').value;

    const { valid, messages } = validasiInput({ nama, nim, mataKuliah, nilai });
    if (!valid) {
      showAlert(messages.join(' '), 'danger');
      return;
    }

    try {
      if (docId) {
        await updateData(docId, { nama, nim, mataKuliah, nilai });
        showAlert('Data berhasil diupdate.', 'success');
      } else {
        await simpanData({ nama, nim, mataKuliah, nilai });
        showAlert('Data berhasil disimpan.', 'success');
      }
      clearForm();
    } catch (err) {
      console.error(err);
      showAlert('Terjadi kesalahan saat menyimpan data.', 'danger');
    }
  });

  // Refresh data mahasiswa
  btnRefresh.addEventListener('click', async () => {
    const data = await loadDataOnce();
    renderTable(data);
    showAlert('Data diperbarui.', 'info');
  });

  // Edit & Hapus
  tableBody.addEventListener('click', async (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const id = btn.dataset.id;

    if (btn.classList.contains('btn-delete')) {
      if (confirm('Yakin ingin menghapus data ini?')) {
        await deleteData(id);
        showAlert('Data berhasil dihapus.', 'success');
      }
      return;
    }

    if (btn.classList.contains('btn-edit')) {
      const data = await loadDataOnce();
      const mhs = data.find((d) => d.id === id);
      if (mhs) {
        document.getElementById('nama').value = mhs.nama;
        document.getElementById('nim').value = mhs.nim;
        document.getElementById('mk').value = mhs.mataKuliah;
        document.getElementById('nilai').value = mhs.nilai;
        document.getElementById('docId').value = mhs.id;
        document.getElementById('btnSimpan').textContent = 'Update Data';
        showInput();
      }
    }
  });

  // Realtime listener
  loadDataRealtime(renderTable);
  showInput();
});
