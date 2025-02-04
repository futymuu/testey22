// Ambil elemen tempat kartu akan ditambahkan
const contentContainer = document.getElementById('contentCards');

// Data JSON untuk setiap tombol (1-5) dengan konten yang akan ditampilkan langsung
const dataJSON = {
    1: [
        { id: 1, title: 'Judul Kartu 1', link: '#link1' },
        { id: 2, title: 'Judul Kartu 2', link: '#link2' },
        { id: 1, title: 'Judul Kartu 1', link: '#link1' },
        { id: 2, title: 'Judul Kartu 2', link: '#link2' },
        { id: 1, title: 'Judul Kartu 1', link: '#link1' },
        { id: 2, title: 'Judul Kartu 2', link: '#link2' },
        { id: 1, title: 'Judul Kartu 1', link: '#link1' },
        { id: 2, title: 'Judul Kartu 2', link: '#link2' },
    ],
    2: [
        { id: 3, title: 'Judul Kartu 3', link: '#link3' },
        { id: 4, title: 'Judul Kartu 4', link: '#link4' },
        { id: 1, title: 'Judul Kartu 1', link: '#link1' },
        { id: 2, title: 'Judul Kartu 2', link: '#link2' },
        { id: 1, title: 'Judul Kartu 1', link: '#link1' },
        { id: 2, title: 'Judul Kartu 2', link: '#link2' },
        { id: 1, title: 'Judul Kartu 1', link: '#link1' },
        { id: 2, title: 'Judul Kartu 2', link: '#link2' },
    ],
    3: [
        { id: 5, title: 'Judul Kartu 5', link: '#link5' },
        { id: 1, title: 'Judul Kartu 1', link: '#link1' },
        { id: 2, title: 'Judul Kartu 2', link: '#link2' },
        { id: 1, title: 'Judul Kartu 1', link: '#link1' },
        { id: 2, title: 'Judul Kartu 2', link: '#link2' },
        { id: 1, title: 'Judul Kartu 1', link: '#link1' },
        { id: 2, title: 'Judul Kartu 2', link: '#link2' },
        { id: 1, title: 'Judul Kartu 1', link: '#link1' },
        { id: 2, title: 'Judul Kartu 2', link: '#link2' },
    ],
    4: [
        { id: 6, title: 'Judul Kartu 6', link: '#link6' },
        { id: 1, title: 'Judul Kartu 1', link: '#link1' },
        { id: 2, title: 'Judul Kartu 2', link: '#link2' },
        { id: 1, title: 'Judul Kartu 1', link: '#link1' },
        { id: 2, title: 'Judul Kartu 2', link: '#link2' },
        { id: 1, title: 'Judul Kartu 1', link: '#link1' },
        { id: 2, title: 'Judul Kartu 2', link: '#link2' },
        { id: 1, title: 'Judul Kartu 1', link: '#link1' },
        { id: 2, title: 'Judul Kartu 2', link: '#link2' },
    ],
    5: [
        { id: 7, title: 'Judul Kartu 7', link: '#link7' },
        { id: 1, title: 'Judul Kartu 1', link: '#link1' },
        { id: 2, title: 'Judul Kartu 2', link: '#link2' },
        { id: 1, title: 'Judul Kartu 1', link: '#link1' },
        { id: 2, title: 'Judul Kartu 2', link: '#link2' },
        { id: 1, title: 'Judul Kartu 1', link: '#link1' },
        { id: 2, title: 'Judul Kartu 2', link: '#link2' },
        { id: 1, title: 'Judul Kartu 1', link: '#link1' },
        { id: 2, title: 'Judul Kartu 2', link: '#link2' },
    ]
};

// Fungsi untuk menampilkan konten langsung di dalam kartu
function displayContent(buttonNumber) {
    // Bersihkan konten sebelumnya
    contentContainer.innerHTML = '';

    // Ambil data JSON untuk tombol yang ditekan
    const contentData = dataJSON[buttonNumber];

    // Jika ada data, tampilkan kartu untuk setiap item
    if (contentData) {
        contentData.forEach(content => {
            // Membuat kartu
            const card = document.createElement('div');
            card.classList.add('card');
            
            // Header kartu (menggunakan title dari JSON)
            const cardHeader = document.createElement('div');
            cardHeader.classList.add('card-header');
            cardHeader.innerText = content.title; // Menampilkan title dari JSON

            // Body kartu
            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');
            
            // Menambahkan event listener agar ketika kartu diklik, link terbuka
            card.addEventListener('click', () => {
                window.location.href = content.link;  // Membuka link saat kartu diklik
            });

            // Menambahkan header dan body ke dalam kartu
            card.appendChild(cardHeader);
            card.appendChild(cardBody);

            // Menambahkan kartu ke dalam container
            contentContainer.appendChild(card);
        });
    }
}

// Event listener untuk tombol-tombol
const buttons = document.querySelectorAll('.scroll-button');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonNumber = button.getAttribute('data-button');
        displayContent(buttonNumber); // Panggil fungsi untuk menampilkan konten
    });
});
