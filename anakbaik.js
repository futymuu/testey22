// Mendapatkan elemen tombol dan div pencarian
const searchToggleBtn = document.getElementById('searchToggleBtn');
const searchContainer = document.getElementById('searchContainer');

// Menambahkan event listener untuk tombol pencarian
searchToggleBtn.addEventListener('click', () => {
    // Toggle class "active" pada search-container untuk menampilkan atau menyembunyikan
    searchContainer.classList.toggle('active');
});
