// ==================== DATA ANGGOTA (7 orang) ====================
const USERS = [
  { id: 1, username: 'fadilah', password: 'fadilah123', nama: 'fadilah', role: 'Admin' },
  { id: 2, username: 'fadliy', password: 'fadliy321', nama: 'fadliy', role: 'Anggota' },
  { id: 3, username: 'king', password: 'king111', nama: 'king', role: 'Anggota' },
  { id: 4, username: 'fauzan', password: 'fauzan666', nama: 'fauzan', role: 'Anggota' },
  { id: 5, username: 'baim', password: 'baim333', nama: 'baim', role: 'Anggota' },
  { id: 6, username: 'debry', password: 'debry999', nama: 'debry', role: 'Anggota' },
  { id: 7, username: 'ridwan', password: 'ridwan123', nama: 'ridwan', role: 'Anggota' }
];

const KATEGORI_LABEL = {
  makan: '🍽️ Makan',
  wifi: '📶 Wifi',
  beras: '🌾 Beras',
  kontrakan: '🏠 Pembayaran Kontrakan',
  lainnya: '📦 Lainnya'
};

// Kata semangat yang berganti tiap 3 detik
const SEMANGAT = [
  'Semangat kelola keuangan keluarga hari ini! 💪',
  'Setiap rupiah yang dicatat = langkah lebih tertib ✨',
  'Keuangan sehat, keluarga bahagia 🏠💚',
  'Catat rutin, hemat jadi kebiasaan 📝',
  'Hari ini lebih hemat dari kemarin! 🔥',
  'Saldo positif dimulai dari disiplin kecil 💵',
  'Yuk cek pengeluaran hari ini, jangan lupa! 👀',
  'Bersama kita jaga kas keluarga 🤝',
  'Keputusan keuangan bijak dimulai sekarang 🎯',
  'Hemat di awal, tenang di akhir bulan 😌',
  'Transparansi keuangan = kepercayaan keluarga 💙',
  'Satu catatan kecil, dampak besar nanti 🌟'
];

// ==================== STATE ====================
let currentUser = null;
let transactions = [];
let chartBar = null, chartPie = null, chartTren = null, chartAnggota = null;
let pendingWA = { number: '', message: '' };
let greetingInterval = null;
let greetingIndex = 0;

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  setupLogin();
  setupNavigation();
  setupForms();
  setupFilters();
  setupWAModal();

  const saved = sessionStorage.getItem('kas_user');
  if (saved) {
    currentUser = JSON.parse(saved);
    showApp();
  }
});

function loadData() {
  const raw = localStorage.getItem('kas_transactions');
  transactions = raw ? JSON.parse(raw) : [];
}

function saveData() {
  localStorage.setItem('kas_transactions', JSON.stringify(transactions));
}

function getLastLogins() {
  try {
    return JSON.parse(localStorage.getItem('kas_last_logins') || '{}');
  } catch {
    return {};
  }
}

function setLastLogin(userId) {
  const map = getLastLogins();
  map[userId] = new Date().toISOString();
  localStorage.setItem('kas_last_logins', JSON.stringify(map));
}

// ==================== LOGIN ====================
function setupLogin() {
  document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const user = document.getElementById('username').value.trim().toLowerCase();
    const pass = document.getElementById('password').value;
    const found = USERS.find(u => u.username === user && u.password === pass);
    if (found) {
      currentUser = found;
      setLastLogin(found.id);
      sessionStorage.setItem('kas_user', JSON.stringify(found));
      showApp();
      showToast('Selamat datang, ' + found.nama + '!', 'success');
    } else {
      showToast('Username atau password salah!', 'error');
    }
  });

  const doLogout = () => {
    stopGreeting();
    currentUser = null;
    sessionStorage.removeItem('kas_user');
    document.getElementById('appPage').classList.remove('active');
    document.getElementById('loginPage').classList.add('active');
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
  };

  document.getElementById('logoutBtn').addEventListener('click', doLogout);
  const mob = document.getElementById('logoutBtnMobile');
  if (mob) mob.addEventListener('click', doLogout);
}

function showApp() {
  document.getElementById('loginPage').classList.remove('active');
  document.getElementById('appPage').classList.add('active');
  document.getElementById('currentUserName').textContent = currentUser.nama;
  document.getElementById('currentUserRole').textContent = currentUser.role;
  startGreeting();
  populateAnggotaSelect();
  renderAnggota();
  refreshAll();
}

// ==================== GREETING BERGANTI ====================
function startGreeting() {
  stopGreeting();
  greetingIndex = 0;
  updateGreeting();
  greetingInterval = setInterval(() => {
    greetingIndex = (greetingIndex + 1) % SEMANGAT.length;
    updateGreeting();
  }, 3000);
}

function stopGreeting() {
  if (greetingInterval) {
    clearInterval(greetingInterval);
    greetingInterval = null;
  }
}

function updateGreeting() {
  const el = document.getElementById('greeting');
  if (!el || !currentUser) return;
  el.classList.add('fade');
  setTimeout(() => {
    const msg = SEMANGAT[greetingIndex];
    el.textContent = 'Halo, ' + currentUser.nama + '! ' + msg;
    el.classList.remove('fade');
  }, 280);
}

// ==================== NAVIGATION + SIDEBAR HP ====================
function openSidebar() {
  const sb = document.getElementById('sidebar');
  const ov = document.getElementById('sidebarOverlay');
  if (sb) sb.classList.add('open');
  if (ov) ov.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeSidebar() {
  const sb = document.getElementById('sidebar');
  const ov = document.getElementById('sidebarOverlay');
  if (sb) sb.classList.remove('open');
  if (ov) ov.classList.remove('show');
  document.body.style.overflow = '';
}

function setupNavigation() {
  const switchTab = (tab) => {
    document.querySelectorAll('.nav-btn, .bottom-nav-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.tab === tab);
    });
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.getElementById(tab).classList.add('active');
    if (tab === 'analisis') renderAnalisis();
    if (tab === 'riwayat') renderRiwayat();
    if (tab === 'anggota') renderAnggota();
    closeSidebar();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  document.querySelectorAll('.nav-btn, .bottom-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // Tombol hamburger buka menu
  const menuBtn = document.getElementById('menuToggleBtn');
  if (menuBtn) menuBtn.addEventListener('click', openSidebar);

  // Tombol X tutup menu
  const closeBtn = document.getElementById('sidebarCloseBtn');
  if (closeBtn) closeBtn.addEventListener('click', closeSidebar);

  // Klik overlay tutup menu
  const overlay = document.getElementById('sidebarOverlay');
  if (overlay) overlay.addEventListener('click', closeSidebar);

  // Swipe kiri di sidebar untuk tutup (opsional sederhana)
  let touchStartX = 0;
  const sidebar = document.getElementById('sidebar');
  if (sidebar) {
    sidebar.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    sidebar.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].screenX - touchStartX;
      if (dx < -60) closeSidebar();
    }, { passive: true });
  }
}


// ==================== FORMS ====================
function setupForms() {
  document.querySelectorAll('.form-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.form-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.data-form').forEach(f => f.classList.remove('active'));
      tab.classList.add('active');
      const formId = tab.dataset.form === 'pemasukan' ? 'formPemasukan' : 'formPengeluaran';
      document.getElementById(formId).classList.add('active');
    });
  });

  const today = new Date().toISOString().split('T')[0];
  document.getElementById('pemasukanTanggal').value = today;
  document.getElementById('pengeluaranTanggal').value = today;

  document.getElementById('formPemasukan').addEventListener('submit', (e) => {
    e.preventDefault();
    const tx = {
      id: Date.now(),
      tipe: 'pemasukan',
      tanggal: document.getElementById('pemasukanTanggal').value,
      jumlah: Number(document.getElementById('pemasukanJumlah').value),
      keterangan: document.getElementById('pemasukanKet').value.trim(),
      anggotaId: Number(document.getElementById('pemasukanAnggota').value),
      kategori: null,
      createdAt: new Date().toISOString()
    };
    transactions.unshift(tx);
    saveData();
    showToast('Pemasukan berhasil disimpan!', 'success');
    e.target.reset();
    document.getElementById('pemasukanTanggal').value = today;
    populateAnggotaSelect();
    refreshAll();
  });

  document.getElementById('formPengeluaran').addEventListener('submit', (e) => {
    e.preventDefault();
    const kategori = document.getElementById('pengeluaranKategori').value;
    const jumlah = Number(document.getElementById('pengeluaranJumlah').value);
    const ket = document.getElementById('pengeluaranKet').value.trim();
    const anggotaId = Number(document.getElementById('pengeluaranAnggota').value);
    const tanggal = document.getElementById('pengeluaranTanggal').value;
    const waNum = document.getElementById('waNumber').value.trim().replace(/\D/g, '');

    const tx = {
      id: Date.now(),
      tipe: 'pengeluaran',
      tanggal,
      jumlah,
      keterangan: ket,
      anggotaId,
      kategori,
      createdAt: new Date().toISOString()
    };
    transactions.unshift(tx);
    saveData();

    const msg = generateWAMessage(tx);
    pendingWA = { number: waNum, message: msg };
    document.getElementById('waMessagePreview').textContent = msg;
    document.getElementById('waModal').classList.add('show');

    showToast('Pengeluaran disimpan! Notifikasi WA siap dikirim.', 'success');
    e.target.reset();
    document.getElementById('pengeluaranTanggal').value = today;
    populateAnggotaSelect();
    refreshAll();
  });
}

function populateAnggotaSelect() {
  const opts = USERS.map(u => '<option value="' + u.id + '">' + u.nama + '</option>').join('');
  document.getElementById('pemasukanAnggota').innerHTML = opts;
  document.getElementById('pengeluaranAnggota').innerHTML = opts;
  if (currentUser) {
    document.getElementById('pemasukanAnggota').value = currentUser.id;
    document.getElementById('pengeluaranAnggota').value = currentUser.id;
  }
}

// ==================== WHATSAPP MESSAGE ====================
function generateWAMessage(tx) {
  const anggota = USERS.find(u => u.id === tx.anggotaId);
  const kategori = KATEGORI_LABEL[tx.kategori] || tx.kategori;
  const totalPemasukan = transactions.filter(t => t.tipe === 'pemasukan').reduce((s, t) => s + t.jumlah, 0);
  const totalPengeluaran = transactions.filter(t => t.tipe === 'pengeluaran').reduce((s, t) => s + t.jumlah, 0);
  const saldo = totalPemasukan - totalPengeluaran;

  const now = new Date();
  const bulanIni = transactions.filter(t => {
    const d = new Date(t.tanggal);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear() && t.tipe === 'pengeluaran';
  });
  const byKat = {};
  bulanIni.forEach(t => {
    byKat[t.kategori] = (byKat[t.kategori] || 0) + t.jumlah;
  });
  const totalBulanIni = bulanIni.reduce((s, t) => s + t.jumlah, 0);

  let analisisKat = '';
  Object.entries(byKat).forEach(([k, v]) => {
    const persen = totalBulanIni > 0 ? ((v / totalBulanIni) * 100).toFixed(1) : 0;
    analisisKat += '  • ' + (KATEGORI_LABEL[k] || k) + ': Rp ' + formatNumber(v) + ' (' + persen + '%)\n';
  });

  let insight = '';
  if (saldo < 0) {
    insight = '⚠️ PERHATIAN: Saldo sudah negatif! Segera kurangi pengeluaran.';
  } else if (tx.kategori === 'kontrakan') {
    insight = '🏠 Pembayaran kontrakan tercatat. Pastikan dibayar tepat waktu setiap bulan.';
  } else if (tx.kategori === 'makan' && byKat.makan > totalBulanIni * 0.4) {
    insight = '🍽️ Pengeluaran makan sudah >40% dari total bulan ini. Pertimbangkan hemat.';
  } else if (saldo > 0 && totalPengeluaran > 0) {
    const rasio = ((totalPengeluaran / totalPemasukan) * 100).toFixed(1);
    insight = '✅ Rasio pengeluaran saat ini ' + rasio + '% dari total pemasukan.';
  } else {
    insight = '✅ Transaksi berhasil dicatat.';
  }

  return '🔔 *NOTIFIKASI PENGELUARAN - Kas Keluarga*\n\n' +
    '📅 Tanggal: ' + formatDate(tx.tanggal) + '\n' +
    '👤 Dilaporkan oleh: ' + (anggota ? anggota.nama : '-') + '\n' +
    '📂 Kategori: ' + kategori + '\n' +
    '💬 Keterangan: ' + tx.keterangan + '\n' +
    '💰 Jumlah: *Rp ' + formatNumber(tx.jumlah) + '*\n\n' +
    '━━━━━━━━━━━━━━━━━━━━\n' +
    '📊 *ANALISIS KEUANGAN*\n' +
    '━━━━━━━━━━━━━━━━━━━━\n' +
    '📥 Total Pemasukan: Rp ' + formatNumber(totalPemasukan) + '\n' +
    '📤 Total Pengeluaran: Rp ' + formatNumber(totalPengeluaran) + '\n' +
    '💵 Saldo Saat Ini: *Rp ' + formatNumber(saldo) + '*\n\n' +
    '📅 *Pengeluaran Bulan Ini:* Rp ' + formatNumber(totalBulanIni) + '\n' +
    (analisisKat || '  (belum ada data)\n') +
    '━━━━━━━━━━━━━━━━━━━━\n' +
    '💡 ' + insight + '\n\n' +
    '_Dikirim otomatis dari Aplikasi Kas Keluarga_';
}

function setupWAModal() {
  document.getElementById('btnTutupWA').addEventListener('click', () => {
    document.getElementById('waModal').classList.remove('show');
  });
  document.getElementById('btnKirimWA').addEventListener('click', () => {
    const encoded = encodeURIComponent(pendingWA.message);
    const url = pendingWA.number
      ? 'https://wa.me/' + pendingWA.number + '?text=' + encoded
      : 'https://wa.me/?text=' + encoded;
    window.open(url, '_blank');
    document.getElementById('waModal').classList.remove('show');
  });
}

// ==================== REFRESH & RENDER ====================
function refreshAll() {
  updateStats();
  renderRecent();
  renderCharts();
  renderRiwayat();
}

function updateStats() {
  const totalIn = transactions.filter(t => t.tipe === 'pemasukan').reduce((s, t) => s + t.jumlah, 0);
  const totalOut = transactions.filter(t => t.tipe === 'pengeluaran').reduce((s, t) => s + t.jumlah, 0);
  const saldo = totalIn - totalOut;
  const now = new Date();
  const outBulan = transactions.filter(t => {
    const d = new Date(t.tanggal);
    return t.tipe === 'pengeluaran' && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).reduce((s, t) => s + t.jumlah, 0);

  document.getElementById('totalPemasukan').textContent = 'Rp ' + formatNumber(totalIn);
  document.getElementById('totalPengeluaran').textContent = 'Rp ' + formatNumber(totalOut);
  document.getElementById('saldo').textContent = 'Rp ' + formatNumber(saldo);
  document.getElementById('pengeluaranBulanIni').textContent = 'Rp ' + formatNumber(outBulan);
}

function renderRecent() {
  const list = document.getElementById('recentList');
  const recent = transactions.slice(0, 5);
  if (recent.length === 0) {
    list.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:20px;">Belum ada transaksi</p>';
    return;
  }
  list.innerHTML = recent.map(tx => txHTML(tx)).join('');
}

function renderRiwayat() {
  const tipe = document.getElementById('filterTipe') ? document.getElementById('filterTipe').value : 'semua';
  const kat = document.getElementById('filterKategori') ? document.getElementById('filterKategori').value : 'semua';
  let filtered = transactions.slice();
  if (tipe !== 'semua') filtered = filtered.filter(t => t.tipe === tipe);
  if (kat !== 'semua') filtered = filtered.filter(t => t.kategori === kat);

  const list = document.getElementById('riwayatList');
  if (filtered.length === 0) {
    list.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:30px;">Tidak ada data</p>';
    return;
  }
  list.innerHTML = filtered.map(tx => txHTML(tx, true)).join('');
}

function txHTML(tx, showDelete) {
  showDelete = showDelete || false;
  const anggota = USERS.find(u => u.id === tx.anggotaId);
  const isIn = tx.tipe === 'pemasukan';
  const icon = isIn ? '📥' : ((KATEGORI_LABEL[tx.kategori] || '📤').split(' ')[0]);
  const label = isIn ? tx.keterangan : ((KATEGORI_LABEL[tx.kategori] || tx.kategori) + ' — ' + tx.keterangan);
  return '<div class="tx-item">' +
    '<div class="tx-left">' +
      '<div class="tx-icon ' + (isIn ? 'income' : 'expense') + '">' + icon + '</div>' +
      '<div class="tx-info">' +
        '<strong>' + label + '</strong>' +
        '<small>' + formatDate(tx.tanggal) + ' • ' + (anggota ? anggota.nama : '-') + '</small>' +
      '</div>' +
    '</div>' +
    '<div style="display:flex;align-items:center;gap:8px;">' +
      '<span class="tx-amount ' + (isIn ? 'income' : 'expense') + '">' + (isIn ? '+' : '-') + ' Rp ' + formatNumber(tx.jumlah) + '</span>' +
      (showDelete ? '<button class="btn-icon" onclick="hapusTx(' + tx.id + ')" title="Hapus">🗑️</button>' : '') +
    '</div>' +
  '</div>';
}

function hapusTx(id) {
  if (!confirm('Hapus transaksi ini?')) return;
  transactions = transactions.filter(t => t.id !== id);
  saveData();
  refreshAll();
  showToast('Transaksi dihapus', 'success');
}

function setupFilters() {
  const ft = document.getElementById('filterTipe');
  const fk = document.getElementById('filterKategori');
  if (ft) ft.addEventListener('change', renderRiwayat);
  if (fk) fk.addEventListener('change', renderRiwayat);
  const btn = document.getElementById('btnClearData');
  if (btn) btn.addEventListener('click', () => {
    if (!confirm('Yakin hapus SEMUA data transaksi? Tidak bisa dibatalkan.')) return;
    transactions = [];
    saveData();
    refreshAll();
    showToast('Semua data dihapus', 'success');
  });
}

// ==================== CHARTS ====================
function renderCharts() {
  const months = getLast6Months();
  const inData = months.map(m => sumByMonth(m, 'pemasukan'));
  const outData = months.map(m => sumByMonth(m, 'pengeluaran'));

  if (chartBar) chartBar.destroy();
  chartBar = new Chart(document.getElementById('chartBar'), {
    type: 'bar',
    data: {
      labels: months.map(m => m.label),
      datasets: [
        { label: 'Pemasukan', data: inData, backgroundColor: 'rgba(34,197,94,0.75)', borderRadius: 6 },
        { label: 'Pengeluaran', data: outData, backgroundColor: 'rgba(239,68,68,0.75)', borderRadius: 6 }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: { legend: { labels: { color: '#94a3b8', boxWidth: 12 } } },
      scales: {
        x: { ticks: { color: '#94a3b8', font: { size: 11 } }, grid: { color: 'rgba(148,163,184,0.08)' } },
        y: { ticks: { color: '#94a3b8', font: { size: 10 }, callback: function(v) { return formatShort(v); } }, grid: { color: 'rgba(148,163,184,0.08)' } }
      }
    }
  });

  const katSum = {};
  transactions.filter(t => t.tipe === 'pengeluaran').forEach(t => {
    katSum[t.kategori] = (katSum[t.kategori] || 0) + t.jumlah;
  });
  const pieLabels = Object.keys(katSum).map(k => KATEGORI_LABEL[k] || k);
  const pieData = Object.values(katSum);
  const colors = ['#ef4444', '#3b82f6', '#f59e0b', '#8b5cf6', '#64748b'];

  if (chartPie) chartPie.destroy();
  chartPie = new Chart(document.getElementById('chartPie'), {
    type: 'doughnut',
    data: {
      labels: pieLabels.length ? pieLabels : ['Belum ada data'],
      datasets: [{ data: pieData.length ? pieData : [1], backgroundColor: colors, borderWidth: 0 }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { position: 'bottom', labels: { color: '#94a3b8', padding: 10, boxWidth: 12, font: { size: 11 } } }
      }
    }
  });
}

function getLast6Months() {
  const result = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    result.push({
      year: d.getFullYear(),
      month: d.getMonth(),
      label: d.toLocaleDateString('id-ID', { month: 'short', year: '2-digit' })
    });
  }
  return result;
}

function sumByMonth(m, tipe) {
  return transactions
    .filter(t => {
      const d = new Date(t.tanggal);
      return t.tipe === tipe && d.getMonth() === m.month && d.getFullYear() === m.year;
    })
    .reduce((s, t) => s + t.jumlah, 0);
}

// ==================== ANALISIS ====================
function renderAnalisis() {
  const now = new Date();
  const bulanIni = transactions.filter(t => {
    const d = new Date(t.tanggal);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });
  const inBulan = bulanIni.filter(t => t.tipe === 'pemasukan').reduce((s, t) => s + t.jumlah, 0);
  const outBulan = bulanIni.filter(t => t.tipe === 'pengeluaran').reduce((s, t) => s + t.jumlah, 0);
  const saldoBulan = inBulan - outBulan;

  const byKat = {};
  bulanIni.filter(t => t.tipe === 'pengeluaran').forEach(t => {
    byKat[t.kategori] = (byKat[t.kategori] || 0) + t.jumlah;
  });

  let html = '<p>📥 Pemasukan bulan ini: <span class="highlight">Rp ' + formatNumber(inBulan) + '</span></p>' +
    '<p>📤 Pengeluaran bulan ini: <span class="highlight">Rp ' + formatNumber(outBulan) + '</span></p>' +
    '<p>💵 Selisih: <span class="' + (saldoBulan >= 0 ? 'good' : 'bad') + '">Rp ' + formatNumber(saldoBulan) + '</span></p>' +
    '<hr style="border-color:var(--border);margin:12px 0;">' +
    '<p><strong>Rincian Pengeluaran:</strong></p>';
  Object.entries(byKat).forEach(([k, v]) => {
    const persen = outBulan > 0 ? ((v / outBulan) * 100).toFixed(1) : 0;
    html += '<p>• ' + (KATEGORI_LABEL[k] || k) + ': Rp ' + formatNumber(v) + ' (' + persen + '%)</p>';
  });
  if (Object.keys(byKat).length === 0) html += '<p style="color:var(--text-muted)">(belum ada pengeluaran)</p>';
  document.getElementById('analisisBulanIni').innerHTML = html;

  const totalIn = transactions.filter(t => t.tipe === 'pemasukan').reduce((s, t) => s + t.jumlah, 0);
  const totalOut = transactions.filter(t => t.tipe === 'pengeluaran').reduce((s, t) => s + t.jumlah, 0);
  const saldo = totalIn - totalOut;
  let insight = '';
  if (transactions.length === 0) {
    insight = '<p>Belum ada data. Mulai catat pemasukan dan pengeluaran untuk melihat analisis.</p>';
  } else {
    insight += '<p>Total keseluruhan: Pemasukan <span class="good">Rp ' + formatNumber(totalIn) + '</span> | Pengeluaran <span class="bad">Rp ' + formatNumber(totalOut) + '</span> | Saldo <span class="highlight">Rp ' + formatNumber(saldo) + '</span></p>';
    if (saldo < 0) {
      insight += '<p class="bad">⚠️ Saldo negatif! Segera evaluasi pengeluaran yang tidak penting.</p>';
    } else if (totalIn > 0) {
      const rasio = ((totalOut / totalIn) * 100).toFixed(1);
      insight += '<p>Rasio pengeluaran terhadap pemasukan: <strong>' + rasio + '%</strong>. ';
      if (rasio > 80) insight += 'Cukup tinggi, coba hemat.</p>';
      else if (rasio > 50) insight += 'Masih aman, jaga tetap di bawah 70%.</p>';
      else insight += 'Bagus! Pengeluaran terkendali.</p>';
    }
    const kontrakan = transactions.filter(t => t.kategori === 'kontrakan');
    if (kontrakan.length > 0) {
      const last = kontrakan[0];
      insight += '<p>🏠 Pembayaran kontrakan terakhir: Rp ' + formatNumber(last.jumlah) + ' pada ' + formatDate(last.tanggal) + '.</p>';
    } else {
      insight += '<p>🏠 Belum ada catatan pembayaran kontrakan bulan ini.</p>';
    }
    const topKat = Object.entries(byKat).sort((a, b) => b[1] - a[1])[0];
    if (topKat) {
      insight += '<p>Pengeluaran terbesar bulan ini: <strong>' + (KATEGORI_LABEL[topKat[0]] || topKat[0]) + '</strong> (Rp ' + formatNumber(topKat[1]) + ').</p>';
    }
  }
  document.getElementById('insightText').innerHTML = insight;

  const months = getLast6Months();
  const trenData = months.map(m => sumByMonth(m, 'pengeluaran'));
  if (chartTren) chartTren.destroy();
  chartTren = new Chart(document.getElementById('chartTren'), {
    type: 'line',
    data: {
      labels: months.map(m => m.label),
      datasets: [{
        label: 'Pengeluaran',
        data: trenData,
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239,68,68,0.1)',
        fill: true,
        tension: 0.35
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: '#94a3b8', font: { size: 11 } }, grid: { color: 'rgba(148,163,184,0.08)' } },
        y: { ticks: { color: '#94a3b8', font: { size: 10 }, callback: function(v) { return formatShort(v); } }, grid: { color: 'rgba(148,163,184,0.08)' } }
      }
    }
  });

  const byAnggota = {};
  transactions.filter(t => t.tipe === 'pengeluaran').forEach(t => {
    byAnggota[t.anggotaId] = (byAnggota[t.anggotaId] || 0) + t.jumlah;
  });
  const angLabels = Object.keys(byAnggota).map(id => {
    const u = USERS.find(x => x.id == id);
    return u ? u.nama.split(' ')[0] : id;
  });
  const angData = Object.values(byAnggota);
  if (chartAnggota) chartAnggota.destroy();
  chartAnggota = new Chart(document.getElementById('chartAnggota'), {
    type: 'bar',
    data: {
      labels: angLabels.length ? angLabels : ['Belum ada'],
      datasets: [{
        data: angData.length ? angData : [0],
        backgroundColor: 'rgba(59,130,246,0.75)',
        borderRadius: 6
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: true,
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: '#94a3b8', font: { size: 10 }, callback: function(v) { return formatShort(v); } }, grid: { color: 'rgba(148,163,184,0.08)' } },
        y: { ticks: { color: '#94a3b8', font: { size: 11 } }, grid: { display: false } }
      }
    }
  });

  const kontrakanList = transactions.filter(t => t.kategori === 'kontrakan').slice(0, 6);
  let konHtml = '';
  if (kontrakanList.length === 0) {
    konHtml = '<p style="color:var(--text-muted)">Belum ada pembayaran kontrakan tercatat.</p>';
  } else {
    kontrakanList.forEach(t => {
      const a = USERS.find(u => u.id === t.anggotaId);
      konHtml += '<p>• ' + formatDate(t.tanggal) + ' — Rp ' + formatNumber(t.jumlah) + ' (' + (a ? a.nama : '-') + ')</p>';
    });
  }
  document.getElementById('kontrakanInfo').innerHTML = konHtml;
}

// ==================== ANGGOTA + LAST LOGIN ====================
function renderAnggota() {
  const grid = document.getElementById('anggotaGrid');
  const lastLogins = getLastLogins();

  grid.innerHTML = USERS.map(u => {
    const out = transactions.filter(t => t.tipe === 'pengeluaran' && t.anggotaId === u.id).reduce((s, t) => s + t.jumlah, 0);
    const inn = transactions.filter(t => t.tipe === 'pemasukan' && t.anggotaId === u.id).reduce((s, t) => s + t.jumlah, 0);
    const lastISO = lastLogins[u.id];
    const isOnline = currentUser && currentUser.id === u.id;
    let lastText;
    if (isOnline) {
      lastText = '<div class="last-login"><strong>● Sedang login</strong></div>';
    } else if (lastISO) {
      lastText = '<div class="last-login">Terakhir login<br><strong>' + formatDateTime(lastISO) + '</strong></div>';
    } else {
      lastText = '<div class="last-login never">Belum pernah login</div>';
    }

    return '<div class="anggota-card ' + (isOnline ? 'online' : '') + '">' +
      (isOnline ? '<span class="badge-online"></span>' : '') +
      '<div class="anggota-avatar">' + u.nama.charAt(0) + '</div>' +
      '<h4>' + u.nama + '</h4>' +
      '<div class="role-tag">' + u.role + ' · @' + u.username + '</div>' +
      lastText +
      '<div class="anggota-stats">' +
        '<span>📥 ' + formatShort(inn) + '</span>' +
        '<span>📤 ' + formatShort(out) + '</span>' +
      '</div>' +
    '</div>';
  }).join('');
}

// ==================== UTILS ====================
function formatNumber(n) {
  return new Intl.NumberFormat('id-ID').format(n);
}
function formatShort(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, '') + 'jt';
  if (n >= 1000) return (n / 1000).toFixed(0) + 'rb';
  return String(n);
}
function formatDate(str) {
  const d = new Date(str);
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}
function formatDateTime(iso) {
  const d = new Date(iso);
  const date = d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  const time = d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  return date + ', ' + time;
}
function showToast(msg, type) {
  type = type || 'success';
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast show ' + type;
  setTimeout(() => t.classList.remove('show'), 3200);
}

window.hapusTx = hapusTx;
