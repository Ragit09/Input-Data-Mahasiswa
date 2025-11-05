// js/uiHandler.js
export function renderTable(data = []) {
  const tbody = document.querySelector('#mahasiswaTable tbody');
  tbody.innerHTML = '';

  data.forEach((item, idx) => {
    // tombol aksi: untuk desktop side-by-side; untuk mobile CSS akan tumpuk
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="text-center">${idx + 1}</td>
      <td>${escapeHtml(item.nama)}</td>
      <td>${escapeHtml(item.nim)}</td>
      <td>${escapeHtml(item.mataKuliah)}</td>
      <td class="text-center">${escapeHtml(String(item.nilai))}</td>
      <td>
        <div class="d-flex gap-2 justify-content-center flex-wrap">
          <button type="button" class="btn btn-warning btn-edit" data-id="${item.id}" aria-label="Edit ${escapeHtml(item.nama)}">Edit</button>
          <button type="button" class="btn btn-danger btn-delete" data-id="${item.id}" aria-label="Hapus ${escapeHtml(item.nama)}">Hapus</button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

export function clearForm() {
  const form = document.getElementById('nilaiForm');
  form.reset();
  document.getElementById('docId').value = '';
  document.getElementById('btnSimpan').textContent = 'Simpan Nilai';
}

export function showAlert(message, type = 'info', timeout = 3500) {
  const area = document.getElementById('alertArea');
  const id = 'alert-' + Date.now();
  const html = `
    <div id="${id}" class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${escapeHtml(message)}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;
  area.insertAdjacentHTML('beforeend', html);
  if (timeout > 0) {
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.remove();
    }, timeout);
  }
}

function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
