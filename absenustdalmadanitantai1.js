// Fungsi untuk reset semua checkbox saat halaman dimuat
window.onload = function() {
    resetCheckboxes(); // Panggil fungsi reset pada saat halaman pertama kali dimuat
    attachEventListeners(); // Attach event listeners untuk tombol
};

// Fungsi untuk mereset semua checkbox
function resetCheckboxes() {
    const checkboxes = document.querySelectorAll('input[name="person"]');
    checkboxes.forEach((checkbox) => {
        checkbox.checked = false;  // Reset semua checkbox ke tidak dicentang
    });
}

// Fungsi untuk mengirimkan absensi dan mengunduh file teks
function submitAttendance() {
    const checkboxes = document.querySelectorAll('input[name="person"]:checked');
    const names = [];

    checkboxes.forEach((checkbox) => {
        names.push(checkbox.value);
    });

    const date = new Date();
    const day = date.toLocaleDateString();
    const week = getWeekNumber(date);
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    const weekday = getDayName(date); // Mendapatkan nama hari

    const data = {
        date: day,
        weekday: weekday, // Menambahkan hari
        week: week,
        month: month,
        year: year,
        names: names
    };

    // Buat string absensi untuk disimpan dalam file
    const attendanceData = `Tanggal: ${data.date}\nHari: ${data.weekday}\nMinggu: ${data.week}\nBulan: ${data.month}\nTahun: ${data.year}\nHadir: ${data.names.join(", ")}\n\n`;

    // Panggil fungsi untuk mengunduh file teks
    downloadTxt(attendanceData);

    // Reset semua checkbox setelah pengiriman
    resetCheckboxes();

    // Menampilkan alert setelah pengiriman berhasil
    showAlert('Absensi berhasil dikirim!');
}

// Fungsi untuk mengunduh file teks (.txt)
function downloadTxt(content) {
    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    const date = new Date();
    const filename = `absensi_pembimbing_${date.toLocaleDateString()}.txt`; // Nama file yang lebih dinamis
    link.download = filename; // Nama file yang akan diunduh
    link.click();
}

// Fungsi untuk mengunduh file PDF (.pdf)
function downloadPdf() {
    const checkboxes = document.querySelectorAll('input[name="person"]:checked');
    const names = [];

    checkboxes.forEach((checkbox) => {
        names.push(checkbox.value);
    });

    const date = new Date();
    const day = date.toLocaleDateString();
    const week = getWeekNumber(date);
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    const weekday = getDayName(date); // Mendapatkan nama hari

    // Pastikan menggunakan jsPDF dari library yang diimpor
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Menambahkan konten ke PDF
    doc.setFontSize(16);
    doc.text("Rekap Absensi Pembimbing", 10, 10);
    doc.setFontSize(12);
    doc.text(`Tanggal: ${day}`, 10, 20);
    doc.text(`Hari: ${weekday}`, 10, 30); // Menambahkan hari
    doc.text(`Minggu: ${week}`, 10, 40);
    doc.text(`Bulan: ${month}`, 10, 50);
    doc.text(`Tahun: ${year}`, 10, 60);
    doc.text(`Hadir: ${names.join(", ")}`, 10, 70);

    // Unduh file PDF
    const filename = `absensi_pembimbing_${day.replace(/\//g, '-')}.pdf`; // Nama file PDF yang lebih dinamis
    doc.save(filename);
}

// Fungsi untuk menghitung nomor minggu
function getWeekNumber(date) {
    const startDate = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000));
    return Math.ceil((days + 1) / 7);
}

// Fungsi untuk mendapatkan nama hari (Senin, Selasa, dll)
function getDayName(date) {
    const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    return dayNames[date.getDay()];
}

// Fungsi untuk menampilkan alert
function showAlert(message) {
    const alert = document.createElement('div');
    alert.textContent = message;
    alert.style.position = 'fixed';
    alert.style.bottom = '20px';
    alert.style.left = '50%';
    alert.style.transform = 'translateX(-50%)';
    alert.style.backgroundColor = '#4CAF50';
    alert.style.color = 'white';
    alert.style.padding = '10px 20px';
    alert.style.borderRadius = '5px';
    alert.style.fontSize = '16px';
    alert.style.zIndex = '1000';
    alert.style.opacity = '0';
    document.body.appendChild(alert);

    // Menampilkan alert dengan efek fade-in
    setTimeout(() => {
        alert.style.transition = 'opacity 0.5s';
        alert.style.opacity = '1';
    }, 100);

    // Menghilangkan alert setelah beberapa detik
    setTimeout(() => {
        alert.style.transition = 'opacity 0.5s';
        alert.style.opacity = '0';
    }, 2500);

    setTimeout(() => {
        alert.remove();
    }, 3000);
}

// Fungsi untuk menambah event listeners pada tombol
function attachEventListeners() {
    const submitButton = document.getElementById("submitAttendanceBtn");
    const pdfButton = document.getElementById("downloadPdfBtn");
    const modeToggle = document.getElementById("modeToggle");

    // Menambahkan event listener untuk tombol kirim absensi
    submitButton.addEventListener("click", submitAttendance);

    // Menambahkan event listener untuk tombol kirim PDF
    pdfButton.addEventListener("click", downloadPdf);

    // Menambahkan event listener untuk mode gelap
    modeToggle.addEventListener("change", () => {
        document.body.classList.toggle("dark-mode", modeToggle.checked);
    });
}
