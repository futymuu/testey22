// Fungsi untuk reset semua checkbox saat halaman dimuat
window.onload = function() {
    resetCheckboxes(); // Panggil fungsi reset pada saat halaman pertama kali dimuat
};

// Fungsi untuk mereset semua checkbox
function resetCheckboxes() {
    const checkboxes = document.querySelectorAll('input[name="person"]');
    checkboxes.forEach((checkbox) => {
        checkbox.checked = false;  // Reset semua checkbox ke tidak dicentang
    });
}

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

    const data = {
        date: day,
        week: week,
        month: month,
        year: year,
        names: names
    };

    // Buat string absensi untuk disimpan dalam file
    const attendanceData = `Tanggal: ${data.date}\nMinggu: ${data.week}\nBulan: ${data.month}\nTahun: ${data.year}\nHadir: ${data.names.join(", ")}\n\n`;

    // Panggil fungsi untuk mengunduh file teks
    downloadTxt(attendanceData);

    // Reset semua checkbox setelah pengiriman
    resetCheckboxes();

    // Menampilkan alert setelah pengiriman berhasil
    const alert = document.getElementById('alert');
    alert.style.display = 'block';  // Tampilkan alert
    setTimeout(() => {
        alert.style.display = 'none'; // Sembunyikan alert setelah 3 detik
    }, 3000);
}

// Fungsi untuk mengunduh file teks (.txt)
function downloadTxt(content) {
    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'absensi_pembimbing.txt'; // Nama file yang akan diunduh
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

    const doc = new jsPDF();

    // Menambahkan konten ke PDF
    doc.text(`Tanggal: ${day}`, 10, 10);
    doc.text(`Minggu: ${week}`, 10, 20);
    doc.text(`Bulan: ${month}`, 10, 30);
    doc.text(`Tahun: ${year}`, 10, 40);
    doc.text(`Hadir: ${names.join(", ")}`, 10, 50);

    // Unduh file PDF
    doc.save('absensi_pembimbing.pdf');
}

function getWeekNumber(date) {
    const startDate = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000));
    return Math.ceil((days + 1) / 7);
}
