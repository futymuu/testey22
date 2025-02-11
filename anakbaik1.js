// Ambil elemen tempat kartu akan ditambahkan
const contentContainer = document.getElementById('contentCards');

// Data JSON untuk setiap tombol (1-5) dengan konten yang akan ditampilkan langsung
const dataJSON = {
    1: [
        { id: 1, title: 'BCIIIL SAMBIL M4NDI SAMBIL 0MEW', link: 'https://videy.co/v?id=z4876XPD1' },
        { id: 2, title: 'ES3MP COSPLAY JADI LOLI', link: 'https://videy.co/v?id=esPk8JQg1' },
        { id: 1, title: 'ES MP MUNG1L TAPI DI P4MERIN DONG ', link: 'https://videy.co/v?id=MF643MeK1' },
        { id: 2, title: 'YANG INI SDDE UDAH PEMER CUY BEHHH', link: 'https://videy.co/v?id=epyzsuoE1' },
        { id: 1, title: '📍BCIIIL ESEM PE MASIH S€MP1T S€MP1TNYA', link: 'https://videy.co/v?id=4zi9Q0ST1' },
        { id: 2, title: '📍T4NTE DI P4KSA PACARNYA NIH SAMPE PING SAN', link: 'https://videy.co/v?id=vR9OmZel1' },
        { id: 1, title: '📍CUCUW ESEMA GEMES BANGET EM PUK ', link: 'https://videy.co/v?id=deuip3tQ1' },
        { id: 2, title: '📍BULE MU LUS BANGET BIKIN NG1LER', link: 'https://videy.co/v?id=kY1Ytl4o1' },
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
