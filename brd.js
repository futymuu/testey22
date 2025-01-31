// Data untuk konten kartu
const contentData = [
    
 
        // Level 1-5: Pertanyaan untuk tingkat dasar
        {
            imgSrc: 'level1.jpg',
            title: 'Level 1: Matematika',
            subject: 'Apa itu penjumlahan? Hitung 2 + 3.',
            link: 'level1.html'
        },
        {
            imgSrc: 'level1.jpg',
            title: 'Level 1: Bahasa Indonesia',
            subject: 'Sebutkan 5 huruf vokal dalam alfabet!',
            link: 'level1.html'
        },
      
    ];
    

// Fungsi untuk membuat kartu konten
function loadContentCards() {
    const contentList = document.getElementById('content-list');

    // Menggunakan DocumentFragment untuk meminimalkan reflow
    const fragment = document.createDocumentFragment();

    contentData.forEach(data => {
        const li = document.createElement('li');
        li.classList.add('card');

        // Membuat link untuk setiap kartu
        const link = document.createElement('a');
        link.href = data.link; // Link menuju part.html
        link.classList.add('card-link');

        // Membuat elemen gambar
        const img = document.createElement('img');
        img.src = data.imgSrc;
        img.alt = data.title;

       

        // Membuat konten kartu
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const h3 = document.createElement('h3');
        h3.textContent = data.title;

        const p = document.createElement('p');
        p.textContent = data.subject;

        // Menambahkan elemen-elemen ke dalam kartu
        cardBody.appendChild(h3);
        cardBody.appendChild(p);

        // Menambahkan gambar dan body kartu ke dalam link
        link.appendChild(img);
        link.appendChild(cardBody);

        // Menambahkan link ke dalam elemen li
        li.appendChild(link);

        // Menambahkan kartu ke dalam fragment
        fragment.appendChild(li);
    });

    // Menambahkan semua kartu sekaligus ke dalam daftar konten
    contentList.appendChild(fragment);
}

// Memuat kartu konten ketika halaman dimuat
document.addEventListener('DOMContentLoaded', loadContentCards);
