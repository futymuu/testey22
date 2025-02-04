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
    } else {
        body.classList.remove('dark-mode'); // Menonaktifkan mode gelap
    }
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
