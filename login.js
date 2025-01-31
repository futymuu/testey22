// Ambil elemen-elemen penting dari HTML
const modeToggleInput = document.getElementById('modeToggle'); // Tombol geser untuk mode gelap
const body = document.body;
const contentList = document.getElementById('content-list');
const cards = document.querySelectorAll('.card');
const header = document.querySelector('.header');
const profileCircle = document.getElementById('profileCircle');
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const logoutBtn = document.getElementById('logoutBtn');
const loginOverlay = document.getElementById('loginOverlay');
const registerOverlay = document.getElementById('registerOverlay');

// Menampilkan overlay login saat tombol login diklik
loginBtn.addEventListener('click', () => {
    loginOverlay.classList.add('show');
});

// Menutup overlay login
document.getElementById('closeLoginBtn').addEventListener('click', () => {
    loginOverlay.classList.remove('show');
});

// Menampilkan overlay daftar saat tombol daftar diklik
registerBtn.addEventListener('click', () => {
    registerOverlay.classList.add('show');
});

// Menutup overlay daftar
document.getElementById('closeRegisterBtn').addEventListener('click', () => {
    registerOverlay.classList.remove('show');
});

// Fungsi untuk mengaktifkan atau menonaktifkan mode gelap
function toggleDarkMode(isDarkMode) {
    if (isDarkMode) {
        body.classList.add('dark-mode');
        contentList.classList.add('dark-mode');
        cards.forEach(card => card.classList.add('dark-mode'));
        header.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
        contentList.classList.remove('dark-mode');
        cards.forEach(card => card.classList.remove('dark-mode'));
        header.classList.remove('dark-mode');
    }
}

// Cek apakah mode gelap diaktifkan saat halaman dimuat
modeToggleInput.checked = body.classList.contains('dark-mode');

// Mengubah mode gelap saat tombol geser diaktifkan atau dinonaktifkan
modeToggleInput.addEventListener('change', () => {
    toggleDarkMode(modeToggleInput.checked);
});

// Form login submit
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    alert(`Login berhasil! Username: ${username}, Password: ${password}`);
    
    // Menutup overlay login setelah login berhasil
    loginOverlay.classList.remove('show');

    // Mengubah status profil menjadi logged-in
    updateProfileCircle(true);

    // Mengganti tombol setelah login
    toggleButtonsAfterLogin();
});

// Form daftar submit
const registerForm = document.getElementById('registerForm');
registerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    alert(`Daftar berhasil! Username: ${username}, Email: ${email}, Password: ${password}`);
    
    // Menutup overlay daftar setelah daftar berhasil
    registerOverlay.classList.remove('show');

    // Mengubah status profil menjadi logged-in
    updateProfileCircle(true);

    // Mengganti tombol setelah registrasi
    toggleButtonsAfterLogin();
});

// Fungsi untuk memperbarui warna lingkaran profil
function updateProfileCircle(isLoggedIn) {
    if (isLoggedIn) {
        profileCircle.classList.add('logged-in');  // Menambahkan kelas untuk warna hijau
    } else {
        profileCircle.classList.remove('logged-in');  // Menghapus kelas untuk warna ungu
    }
}

// Fungsi untuk mengganti tombol setelah login atau daftar
function toggleButtonsAfterLogin() {
    loginBtn.style.display = 'none';
    registerBtn.style.display = 'none';
    logoutBtn.style.display = 'inline-block';
}

// Fungsi untuk logout
logoutBtn.addEventListener('click', () => {
    updateProfileCircle(false); // Status logout
    alert('Anda telah logout');

    // Sembunyikan tombol Logout
    logoutBtn.style.display = 'none';

    // Tampilkan kembali tombol Login dan Daftar
    loginBtn.style.display = 'inline-block';
    registerBtn.style.display = 'inline-block';
});

// Menambahkan event listener pada tombol logout untuk mode gelap
logoutBtn.addEventListener('click', () => {
    // Jika tombol logout diklik, pastikan mode gelap tetap ada jika sudah diaktifkan
    if (modeToggleInput.checked) {
        toggleDarkMode(true);
    }
});
