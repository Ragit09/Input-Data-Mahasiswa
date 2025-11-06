export function renderTable(data) {
  const tbody = document.querySelector('#mahasiswaTable tbody');
  tbody.innerHTML = '';

  if (!data || data.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="text-center text-muted">Belum ada data.</td></tr>';
    return;
  }

  data.forEach((item, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${item.nama}</td>
      <td>${item.nim}</td>
      <td>${item.kode || '-'}</td>
      <td>${item.mataKuliah}</td>
      <td>${item.nilai}</td>
    `;
    tbody.appendChild(tr);
  });
}

export function clearForm() {
  document.getElementById('nilaiForm').reset();
}

export function showAlert(message, type = 'info') {
  const alertArea = document.getElementById('alertArea');
  alertArea.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
  `;
  setTimeout(() => alertArea.innerHTML = '', 4000);
}
