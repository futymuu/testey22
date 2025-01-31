const questions = [
    {
        question: "Pada tahun 2024, negara mana yang berhasil mengirimkan misi pertama ke bulan menggunakan robot berbiaya rendah?",
        options: ["India", "China", "Amerika Serikat", "Jepang"],
        correctAnswer: 0, // India
    },
    {
        question: "Siapa yang memenangkan penghargaan Nobel Perdamaian 2024?",
        options: ["Volodymyr Zelensky", "Malala Yousafzai", "PBB", "Nadia Murad"],
        correctAnswer: 0, // Volodymyr Zelensky
    },
    {
        question: "Pada tahun 2024, kota mana yang terpilih sebagai tuan rumah Olimpiade Musim Panas 2024?",
        options: ["Paris", "Los Angeles", "Tokyo", "Melbourne"],
        correctAnswer: 0, // Paris
    },
    {
        question: "Pada tahun 2025, berapa persen target energi terbarukan yang ingin dicapai Uni Eropa?",
        options: ["20%", "35%", "50%", "80%"],
        correctAnswer: 2, // 50%
    },
    {
        question: "Pada tahun 2024, perusahaan mobil listrik Tesla meluncurkan model mobil listrik baru dengan fitur otonom penuh. Apa nama model tersebut?",
        options: ["Cybertruck", "Model X", "Model 3", "Roadster"],
        correctAnswer: 0, // Cybertruck
    },
    {
        question: "Pada tahun 2025, siapa yang diperkirakan menjadi Presiden Indonesia setelah Pemilu 2024?",
        options: ["Joko Widodo", "Anies Baswedan", "Ganjar Pranowo", "Prabowo Subianto"],
        correctAnswer: 2, // Ganjar Pranowo
    },
    {
        question: "Apa peristiwa besar yang terjadi di luar angkasa pada 2024 yang menjadi sorotan dunia?",
        options: ["Misi Mars oleh NASA", "Misi pertama manusia ke bulan oleh SpaceX", "Teleskop James Webb mengirim gambar pertama", "Pendaratan roket reusable pertama oleh SpaceX"],
        correctAnswer: 1, // Misi pertama manusia ke bulan oleh SpaceX
    },
    {
        question: "Pada tahun 2024, siapa yang menjadi Presiden Amerika Serikat setelah Joe Biden?",
        options: ["Kamala Harris", "Donald Trump", "Ron DeSantis", "Gavin Newsom"],
        correctAnswer: 1, // Donald Trump (mengacu pada hasil pemilu 2024)
    },
    {
        question: "Pada tahun 2024, misi luar angkasa mana yang diluncurkan oleh NASA untuk mencari tanda-tanda kehidupan di salah satu bulan Jupiter?",
        options: ["Artemis I", "Europa Clipper", "Mars Perseverance", "Voyager 2"],
        correctAnswer: 1, // Europa Clipper
    },
    {
        question: "Pada tahun 2024, siapa yang menjadi pemenang Piala Dunia Wanita FIFA?",
        options: ["Amerika Serikat", "Jerman", "Swedia", "Inggris"],
        correctAnswer: 3, // Inggris
    },
    {
        question: "Pada 2024, negara mana yang mengumumkan bahwa mereka akan mulai melarang kendaraan berbahan bakar fosil dan beralih ke kendaraan listrik pada tahun 2035?",
        options: ["Norwegia", "Prancis", "Jerman", "Inggris"],
        correctAnswer: 1, // Prancis
    },
    {
        question: "Siapa yang menjadi pemimpin Rusia pada tahun 2024 setelah pemilu?",
        options: ["Vladimir Putin", "Dmitry Medvedev", "Sergey Lavrov", "Alexei Navalny"],
        correctAnswer: 0, // Vladimir Putin
    },
    {
        question: "Pada tahun 2024, Indonesia mengadakan pertemuan besar mengenai perubahan iklim yang dikenal dengan nama?",
        options: ["COP27", "COP28", "COP29", "COP30"],
        correctAnswer: 1, // COP28 (diadakan di Dubai, tetapi terkait dengan masalah global)
    },
    {
        question: "Apa nama perjanjian yang disepakati oleh negara-negara dunia pada 2024 untuk menanggulangi perubahan iklim?",
        options: ["Paris Agreement", "Kyoto Protocol", "Glasgow Pact", "Berlin Accord"],
        correctAnswer: 2, // Glasgow Pact
    },
    {
        question: "Pada tahun 2024, perusahaan teknologi mana yang mengumumkan keberhasilan dalam mengembangkan chip quantum yang lebih kuat?",
        options: ["Google", "IBM", "Intel", "Microsoft"],
        correctAnswer: 0, // Google
    },
    {
        question: "Pada tahun 2024, negara mana yang mengumumkan untuk menghentikan semua penebangan hutan secara ilegal di hutan Amazon?",
        options: ["Brasil", "Indonesia", "Kongo", "Australia"],
        correctAnswer: 0, // Brasil
    },
    {
        question: "Pada tahun 2024, siapa yang berhasil memenangkan penghargaan Grammy untuk Album Terbaik?",
        options: ["Taylor Swift", "Beyoncé", "Bad Bunny", "Harry Styles"],
        correctAnswer: 3, // Harry Styles
    },
    {
        question: "Pada tahun 2024, negara mana yang berhasil mengadakan Pemilu Presiden dengan sistem digital penuh pertama kali?",
        options: ["Estonia", "India", "Korea Selatan", "Finlandia"],
        correctAnswer: 0, // Estonia
    },
    {
        question: "Pada tahun 2024, siapa yang menjadi CEO baru perusahaan Twitter setelah Elon Musk?",
        options: ["Parag Agrawal", "Linda Yaccarino", "Jack Dorsey", "Sundar Pichai"],
        correctAnswer: 1, // Linda Yaccarino
    },
    {
        question: "Pada tahun 2025, untuk pertama kalinya, apa nama kendaraan listrik yang melintasi jalanan Indonesia secara massal?",
        options: ["Tesla Model 3", "BYD Dolphin", "Wuling Air EV", "Toyota bZ4X"],
        correctAnswer: 2, // Wuling Air EV
    },
    {
        question: "Pada tahun 2024, siapa yang menjadi juara Formula 1 setelah musim yang sengit?",
        options: ["Max Verstappen", "Lewis Hamilton", "Charles Leclerc", "Sergio Pérez"],
        correctAnswer: 0, // Max Verstappen
    },
    {
        question: "Pada tahun 2024, siapa yang memecahkan rekor dunia untuk video TikTok paling banyak ditonton?",
        options: ["Charli D'Amelio", "Zach King", "Khaby Lame", "Bella Poarch"],
        correctAnswer: 2, // Khaby Lame
    },
    {
        question: "Pada tahun 2024, siapa yang memenangkan penghargaan Oscar untuk Aktor Terbaik?",
        options: ["Austin Butler", "Brendan Fraser", "Will Smith", "Tom Hanks"],
        correctAnswer: 1, // Brendan Fraser
    },
    {
        question: "Pada tahun 2024, siapa yang memenangkan penghargaan Grammy untuk Album Terbaik?",
        options: ["Beyoncé", "Harry Styles", "Bad Bunny", "Taylor Swift"],
        correctAnswer: 3, // Taylor Swift
    },
    {
        question: "Pada tahun 2025, siapa yang memenangkan pemilu presiden Indonesia?",
        options: ["Ganjar Pranowo", "Prabowo Subianto", "Anies Baswedan", "Joko Widodo"],
        correctAnswer: 0, // Ganjar Pranowo
    },
    {
        question: "Pada tahun 2024, siapa yang menjadi trending dengan tantangan dance viral di TikTok di Indonesia?",
        options: ["Nabila Maharani", "Rizky Febian", "Atta Halilintar", "Krisdayanti"],
        correctAnswer: 0, // Nabila Maharani
    },
    {
        question: "Pada tahun 2024, artis internasional mana yang mengadakan konser tur dunia di Indonesia?",
        options: ["BTS", "Ed Sheeran", "Ariana Grande", "The Weeknd"],
        correctAnswer: 3, // The Weeknd
    },
    {
        question: "Pada 2024, siapa yang menjadi pemenang The Voice Indonesia?",
        options: ["Rizky Febian", "Gita Gutawa", "Bramasta", "Tiara Andini"],
        correctAnswer: 3, // Tiara Andini
    },
    {
        question: "Pada tahun 2024, siapa yang merilis album ‘Midnights’ dan menjadi pembicaraan di media sosial?",
        options: ["Beyoncé", "Ariana Grande", "Taylor Swift", "Dua Lipa"],
        correctAnswer: 2, // Taylor Swift
    },
    {
        question: "Pada tahun 2024, siapa yang menjadi aktor terpopuler di TikTok dengan lebih dari 100 juta pengikut?",
        options: ["Zach King", "Dwayne Johnson", "Charli D'Amelio", "Kylie Jenner"],
        correctAnswer: 1, // Dwayne Johnson
    },
    {
        question: "Pada 2024, siapa yang menjadi selebriti TikTok dengan video paling viral di Indonesia?",
        options: ["Fadil Jaidi", "Baim Wong", "Raffi Ahmad", "Deddy Corbuzier"],
        correctAnswer: 0, // Fadil Jaidi
    },
    {
        question: "Pada 2024, siapa yang memenangkan Piala Dunia FIFA 2024?",
        options: ["Argentina", "Perancis", "Brazil", "Spanyol"],
        correctAnswer: 1, // Perancis
    },
    {
        question: "Pada 2024, TikTok meluncurkan fitur baru yang memungkinkan pengguna untuk mengedit video secara real-time. Apa nama fitur tersebut?",
        options: ["TikTok Live Edit", "TikTok Studio", "TikTok Trim", "TikTok Clips"],
        correctAnswer: 1, // TikTok Studio
    },
    {
        question: "Pada 2025, siapa yang menjadi pemenang Miss Universe 2025?",
        options: ["Harnaaz Sandhu", "Zozibini Tunzi", "Andrea Meza", "Hannah Arnold"],
        correctAnswer: 3, // Hannah Arnold
    },
    {
        question: "Pada 2024, siapa yang menjadi influencer paling banyak diikuti di TikTok Indonesia?",
        options: ["Fadil Jaidi", "Khalid Al-Walid", "Lesti Kejora", "Ria Ricis"],
        correctAnswer: 3, // Ria Ricis
    },
    {
        question: "Pada 2024, artis Korea mana yang sukses merilis lagu yang viral di TikTok?",
        options: ["BTS", "BLACKPINK", "IU", "EXO"],
        correctAnswer: 1, // BLACKPINK
    },
    {
        question: "Pada 2025, siapa yang menjadi pemenang Pemilu Presiden AS?",
        options: ["Kamala Harris", "Donald Trump", "Joe Biden", "Ron DeSantis"],
        correctAnswer: 1, // Donald Trump
    },
    {
        question: "Pada 2024, selebriti mana yang menjadi berita utama karena hubungan viral mereka di TikTok?",
        options: ["Kim Kardashian", "Selena Gomez", "Kylie Jenner", "Hailey Bieber"],
        correctAnswer: 2, // Kylie Jenner
    },
    {
        question: "Pada 2024, siapa yang meraih penghargaan TikTok Creator of the Year?",
        options: ["Khaby Lame", "Dixie D'Amelio", "Charli D'Amelio", "Loren Gray"],
        correctAnswer: 0, // Khaby Lame
    },
    {
        question: "Pada tahun 2024, siapa yang merilis lagu viral berjudul 'Flowers' di TikTok?",
        options: ["Miley Cyrus", "Ariana Grande", "Dua Lipa", "Olivia Rodrigo"],
        correctAnswer: 0, // Miley Cyrus
    },
    {
        question: "Pada 2024, siapa yang menjadi influencer TikTok dengan video bertema edukasi yang paling banyak ditonton?",
        options: ["Nikita Mirzani", "Sandy Walsh", "Keanu Agl", "Alshad Ahmad"],
        correctAnswer: 2, // Keanu Agl
    }
];

let currentQuestionIndex = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;
let incorrectQuestions = [];
let startTime = 0;
let timerInterval = null;
let countdownTime = 3; // Countdown timer sebelum kuis dimulai
let countdownInterval = null; // Interval countdown

// Fungsi untuk memulai countdown sebelum kuis
function startCountdown() {
    const countdownElement = document.getElementById('countdown-timer');
    countdownElement.textContent = countdownTime;

    countdownInterval = setInterval(() => {
        countdownTime--;
        countdownElement.textContent = countdownTime;

        if (countdownTime <= 0) {
            clearInterval(countdownInterval); // Hentikan countdown
            countdownElement.classList.add('hidden'); // Sembunyikan countdown timer
            startQuiz(); // Mulai kuis
        }
    }, 1000);
}

// Fungsi untuk memulai kuis dan menyembunyikan overlay
function startQuiz() {
    document.getElementById('overlay').classList.remove('show');
    document.getElementById('overlay').classList.add('hidden');
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
    loadQuestion();
}

// Memuat soal dan pilihan jawaban
function loadQuestion() {
    const question = questions[currentQuestionIndex];
    
    // Tampilkan soal dan animasi fade-in untuk question-text
    const questionTextElement = document.getElementById('question-text');
    questionTextElement.classList.remove('fadeInQuestion'); // Hapus animasi sebelumnya
    void questionTextElement.offsetWidth; // Trigger reflow untuk memulai animasi baru
    questionTextElement.classList.add('fadeInQuestion'); // Terapkan animasi lagi

    document.getElementById('question-number').textContent = `Soal ${currentQuestionIndex + 1}`;
    document.getElementById('question-text').textContent = question.question;

    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = "";

    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        
        const radioInput = document.createElement('input');
        radioInput.type = "radio";
        radioInput.name = "answer";
        radioInput.id = `option-${index}`;
        radioInput.value = index;

        const label = document.createElement('label');
        label.setAttribute('for', `option-${index}`);
        label.textContent = option;

        optionElement.appendChild(radioInput);
        optionElement.appendChild(label);
        optionsContainer.appendChild(optionElement);

        radioInput.addEventListener('change', () => {
            submitAnswer();
        });
    });

    // Reset pilihan radio button
    document.querySelectorAll('input[name="answer"]').forEach(input => {
        input.checked = false;
    });
}

// Mengirim jawaban
function submitAnswer() {
    const options = document.getElementsByName('answer');
    let selectedAnswer = null;

    options.forEach((option) => {
        if (option.checked) {
            selectedAnswer = parseInt(option.value);
        }
    });

    if (selectedAnswer === null) {
        return;
    }

    const question = questions[currentQuestionIndex];
    if (selectedAnswer === question.correctAnswer) {
        correctAnswers++;
    } else {
        incorrectAnswers++;
        incorrectQuestions.push(currentQuestionIndex);
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

// Menampilkan hasil
function showResults() {
    clearInterval(timerInterval);
    const endTime = Date.now();
    const timeTaken = Math.floor((endTime - startTime) / 1000);

    document.getElementById('correct-count').textContent = correctAnswers;
    document.getElementById('incorrect-count').textContent = incorrectAnswers;
    document.getElementById('time-taken').textContent = timeTaken;

    const resultOverlay = document.getElementById('result-overlay');
    const questionContainer = document.getElementById('question-container');

    resultOverlay.classList.remove('hidden');
    resultOverlay.classList.add('show');

    questionContainer.classList.add('hidden');
}

// Fungsi untuk memperbarui timer setiap detik
function updateTimer() {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000); // Waktu dalam detik
    const hours = Math.floor(elapsedTime / 3600); // Menghitung jam
    const minutes = Math.floor((elapsedTime % 3600) / 60); // Menghitung menit
    const seconds = elapsedTime % 60; // Menghitung detik

    // Jika waktu kurang dari 60 detik, hanya tampilkan detik
    if (elapsedTime < 60) {
        document.getElementById('timer').textContent = `${padTime(seconds)}`;
    }
    // Jika waktu lebih dari 60 detik, tampilkan menit dan detik
    else if (elapsedTime < 3600) {
        document.getElementById('timer').textContent = `${padTime(minutes)}:${padTime(seconds)}`;
    }
    // Jika waktu lebih dari 1 jam, tampilkan jam, menit, dan detik
    else {
        document.getElementById('timer').textContent = `${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}`;
    }
}

// Fungsi untuk memformat waktu agar selalu memiliki dua digit
function padTime(time) {
    return time < 10 ? '0' + time : time;
}

// Mulai ulang kuis
function restartQuiz() {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;
    incorrectQuestions = [];
    startTime = 0;
    clearInterval(timerInterval);
    document.getElementById('result-overlay').classList.remove('show');
    document.getElementById('result-overlay').classList.add('hidden');
    document.getElementById('question-container').classList.remove('hidden');
    document.getElementById('timer').textContent = '00';
    loadQuestion();
}

// Menampilkan soal yang salah
function showIncorrectAnswers() {
    const incorrectOverlay = document.getElementById('incorrect-overlay');
    const incorrectQuestionsContainer = document.getElementById('incorrect-questions');

    incorrectQuestionsContainer.innerHTML = '';

    incorrectQuestions.forEach(index => {
        const question = questions[index];
        const questionElement = document.createElement('p');
        questionElement.innerHTML = `Soal ${index + 1}: ${question.question} (Jawaban yang benar: ${question.options[question.correctAnswer]})`;
        incorrectQuestionsContainer.appendChild(questionElement);
    });

    incorrectOverlay.classList.remove('hidden');
    incorrectOverlay.classList.add('show');
}

// Menutup overlay soal yang salah
function closeIncorrectAnswers() {
    const incorrectOverlay = document.getElementById('incorrect-overlay');
    incorrectOverlay.classList.add('hidden');
    incorrectOverlay.classList.remove('show');
}

// Load overlay sebelum quiz dimulai
window.onload = () => {
    document.getElementById('overlay').classList.remove('hidden');
    document.getElementById('overlay').classList.add('show');
    startCountdown();
};
