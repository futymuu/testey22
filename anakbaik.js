// Mendapatkan elemen checkbox tombol mode gelap
const modeToggleDesktop = document.getElementById('modeToggleDesktop');
const modeToggleMobile = document.getElementById('modeToggleMobile');

// Mendapatkan elemen body
const body = document.body;

// Fungsi untuk mengaktifkan atau menonaktifkan mode gelap
function toggleDarkMode() {
    // Jika salah satu checkbox dicentang, aktifkan mode gelap
    if (modeToggleDesktop.checked || modeToggleMobile.checked) {
        body.classList.add('dark-mode'); // Mengaktifkan mode gelap
        // Simpan pilihan mode gelap di localStorage
        localStorage.setItem('darkMode', 'enabled');
    } else {
        body.classList.remove('dark-mode'); // Menonaktifkan mode gelap
        // Simpan pilihan mode terang di localStorage
        localStorage.setItem('darkMode', 'disabled');
    }
}

// Fungsi untuk memeriksa waktu dan mengaktifkan mode gelap otomatis
function setDarkModeByTime() {
    const currentHour = new Date().getHours(); // Ambil jam saat ini
    
    // Mengaktifkan mode gelap menjelang malam (misalnya 6 PM sampai 6 AM)
    if (currentHour >= 18 || currentHour < 6) {
        body.classList.add('dark-mode');
        modeToggleDesktop.checked = true;
        modeToggleMobile.checked = true;
    } else {
        body.classList.remove('dark-mode');
        modeToggleDesktop.checked = false;
        modeToggleMobile.checked = false;
    }
}

// Periksa apakah mode gelap disimpan di localStorage
const savedMode = localStorage.getItem('darkMode');
if (savedMode === 'enabled') {
    body.classList.add('dark-mode');
    modeToggleDesktop.checked = true;
    modeToggleMobile.checked = true;
} else {
    body.classList.remove('dark-mode');
    modeToggleDesktop.checked = false;
    modeToggleMobile.checked = false;
}

// Menambahkan event listener untuk mengaktifkan atau menonaktifkan mode gelap
modeToggleDesktop.addEventListener('change', function() {
    if (modeToggleDesktop.checked) {
        modeToggleMobile.checked = true; // Menyinkronkan dengan tombol mobile
    } else {
        modeToggleMobile.checked = false; // Jika desktop uncheck, maka mobile juga uncheck
    }
    toggleDarkMode(); // Memastikan mode gelap diperbarui
});

modeToggleMobile.addEventListener('change', function() {
    if (modeToggleMobile.checked) {
        modeToggleDesktop.checked = true; // Menyinkronkan dengan tombol desktop
    } else {
        modeToggleDesktop.checked = false; // Jika mobile uncheck, maka desktop juga uncheck
    }
    toggleDarkMode(); // Memastikan mode gelap diperbarui
});

// Set mode gelap berdasarkan waktu saat halaman dimuat
setDarkModeByTime();
