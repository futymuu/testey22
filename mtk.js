/* =========================================================
   DATA GAME
========================================================= */

let game = {
    operation: null,
    difficulty: null,
    totalQuestions: 10,
    currentQuestion: 0,
    correct: 0,
    wrong: 0,
    currentAnswer: null,
    questions: []

};


/* =========================================================
   STATISTIK
========================================================= */

let statistics =
    JSON.parse(
        localStorage.getItem(
            "mathTestStatistics"
        )
    ) || {

        correct: 0,

        wrong: 0

    };


/* =========================================================
   SCREEN
========================================================= */

function showScreen(id) {

    document
        .querySelectorAll(".screen")
        .forEach(screen => {

            screen.classList.remove(
                "active"
            );

        });


    document
        .getElementById(id)
        .classList.add("active");

}


/* =========================================================
   PILIH OPERASI
========================================================= */

function selectOperation(operation) {

    game.operation =
        operation;


    const names = {

        addition:
            "Pertambahan",

        subtraction:
            "Pengurangan",

        multiplication:
            "Perkalian",

        division:
            "Pembagian"

    };


    document.getElementById(
        "operationTitle"
    ).textContent =
        names[operation] +
        " - Pilih Kesulitan";


    showScreen(
        "difficultyScreen"
    );

}


/* =========================================================
   PILIH KESULITAN
========================================================= */

function selectDifficulty(
    difficulty
) {

    game.difficulty =
        difficulty;


    showScreen(
        "countScreen"
    );

}


/* =========================================================
   RANDOM
========================================================= */

function randomInt(min, max) {

    return Math.floor(
        Math.random() *
        (max - min + 1)
    ) + min;

}


/* =========================================================
   RANGE LEVEL
========================================================= */

function getRange() {

    if (
        game.difficulty ===
        "easy"
    ) {

        return {
            min: 1,
            max: 10
        };

    }


    if (
        game.difficulty ===
        "medium"
    ) {

        return {
            min: 10,
            max: 50
        };

    }


    return {

        min: 50,

        max: 100

    };

}


/* =========================================================
   GENERATOR SOAL
========================================================= */

function generateQuestion() {

    const range =
        getRange();


    let a;

    let b;

    let answer;

    let symbol;


    /* PERTAMBAHAN */

    if (
        game.operation ===
        "addition"
    ) {

        a = randomInt(
            range.min,
            range.max
        );

        b = randomInt(
            range.min,
            range.max
        );

        answer = a + b;

        symbol = "+";

    }


    /* PENGURANGAN */

    else if (
        game.operation ===
        "subtraction"
    ) {

        a = randomInt(
            range.min,
            range.max
        );

        b = randomInt(
            range.min,
            a
        );

        answer = a - b;

        symbol = "-";

    }


    /* PERKALIAN */

    else if (
        game.operation ===
        "multiplication"
    ) {

        a = randomInt(
            range.min,
            range.max
        );

        b = randomInt(
            range.min,
            range.max
        );

        answer = a * b;

        symbol = "×";

    }


    /* PEMBAGIAN */

    else if (
        game.operation ===
        "division"
    ) {

        /*
            Buat hasil dahulu
            supaya pembagian
            selalu bilangan bulat.
        */

        b = randomInt(
            range.min,
            Math.max(
                range.min,
                Math.floor(
                    range.max / 2
                )
            )
        );


        answer = randomInt(
            range.min,
            range.max
        );


        a = b * answer;

        symbol = "÷";

    }


    return {

        text:
            `${a} ${symbol} ${b} = ?`,

        answer:
            answer

    };

}


/* =========================================================
   JAWABAN SALAH
========================================================= */

function generateWrongAnswers(
    correctAnswer
) {

    const answers =
        new Set();


    while (
        answers.size < 8
    ) {

        let offset;


        if (
            Math.abs(
                correctAnswer
            ) < 10
        ) {

            offset =
                randomInt(
                    -10,
                    10
                );

        }

        else if (
            Math.abs(
                correctAnswer
            ) < 100
        ) {

            offset =
                randomInt(
                    -25,
                    25
                );

        }

        else {

            const range =
                Math.max(
                    20,
                    Math.floor(
                        Math.abs(
                            correctAnswer
                        ) * .2
                    )
                );


            offset =
                randomInt(
                    -range,
                    range
                );

        }


        const wrong =
            correctAnswer +
            offset;


        if (
            wrong ===
            correctAnswer
        ) {

            continue;

        }


        if (
            wrong < 0
        ) {

            continue;

        }


        answers.add(
            wrong
        );

    }


    return [
        ...answers
    ];

}


/* =========================================================
   SHUFFLE
========================================================= */

function shuffle(array) {

    for (
        let i =
            array.length - 1;

        i > 0;

        i--
    ) {

        const j =
            Math.floor(
                Math.random() *
                (i + 1)
            );


        [
            array[i],
            array[j]
        ] = [
            array[j],
            array[i]
        ];

    }


    return array;

}


/* =========================================================
   START GAME
========================================================= */

function startGame(
    totalQuestions
) {

    game.totalQuestions =
        totalQuestions;

    game.currentQuestion =
        0;

    game.correct =
        0;

    game.wrong =
        0;

    game.questions =
        [];


    /*
        Generate soal otomatis.
    */

    for (
        let i = 0;

        i < totalQuestions;

        i++
    ) {

        game.questions.push(
            generateQuestion()
        );

    }


    showScreen(
        "gameScreen"
    );


    showQuestion();

}


/* =========================================================
   INPUT MANUAL
========================================================= */

function startManualGame() {

    const input =
        document.getElementById(
            "manualQuestionCount"
        );


    const error =
        document.getElementById(
            "manualError"
        );


    const amount =
        Number(input.value);


    if (
        !Number.isInteger(
            amount
        )
    ) {

        error.textContent =
            "Isi jumlah soal yang benar.";

        return;

    }


    if (
        amount < 1
    ) {

        error.textContent =
            "Minimal 1 soal.";

        return;

    }


    if (
        amount > 1000
    ) {

        error.textContent =
            "Maksimal 1000 soal.";

        return;

    }


    error.textContent = "";


    startGame(
        amount
    );

}


/* =========================================================
   TAMPILKAN SOAL
========================================================= */

function showQuestion() {

    if (
        game.currentQuestion >=
        game.totalQuestions
    ) {

        finishGame();

        return;

    }


    const question =
        game.questions[
            game.currentQuestion
        ];


    game.currentAnswer =
        question.answer;


    document.getElementById(
        "questionText"
    ).textContent =
        question.text;


    document.getElementById(
        "questionNumber"
    ).textContent =
        `${game.currentQuestion + 1}/${game.totalQuestions}`;


    document.getElementById(
        "gameCorrect"
    ).textContent =
        game.correct;


    document.getElementById(
        "gameWrong"
    ).textContent =
        game.wrong;


    document.getElementById(
        "message"
    ).textContent = "";


    const progress =
        (
            game.currentQuestion /
            game.totalQuestions
        ) * 100;


    document.getElementById(
        "progressBar"
    ).style.width =
        progress + "%";


    /*
        1 jawaban benar
        + 8 jawaban salah
        = 9 tombol
    */

    let answers = [

        game.currentAnswer,

        ...generateWrongAnswers(
            game.currentAnswer
        )

    ];


    shuffle(
        answers
    );


    const wrapper =
        document.getElementById(
            "answerWrapper"
        );


    wrapper.innerHTML = "";


    answers.forEach(
        answer => {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "answer-btn";


            button.textContent =
                answer;


            button.onclick =
                () => {

                    checkAnswer(
                        answer,
                        button
                    );

                };


            wrapper.appendChild(
                button
            );

        }
    );

}


/* =========================================================
   CEK JAWABAN
========================================================= */

function checkAnswer(
    selected,
    clickedButton
) {

    const buttons =
        document.querySelectorAll(
            ".answer-btn"
        );


    buttons.forEach(
        button => {

            button.disabled =
                true;

        }
    );


    const message =
        document.getElementById(
            "message"
        );


    if (
        selected ===
        game.currentAnswer
    ) {

        clickedButton
            .classList
            .add("correct");


        game.correct++;


        statistics.correct++;


        message.textContent =
            "Benar.";

    }

    else {

        clickedButton
            .classList
            .add("wrong");


        buttons.forEach(
            button => {

                if (
                    Number(
                        button.textContent
                    ) ===
                    game.currentAnswer
                ) {

                    button
                        .classList
                        .add("correct");

                }

            }
        );


        game.wrong++;


        statistics.wrong++;


        message.textContent =
            `Salah. Jawaban: ${game.currentAnswer}`;

    }


    saveStatistics();


    document.getElementById(
        "gameCorrect"
    ).textContent =
        game.correct;


    document.getElementById(
        "gameWrong"
    ).textContent =
        game.wrong;


    setTimeout(
        () => {

            game.currentQuestion++;

            showQuestion();

        },
        700
    );

}


/* =========================================================
   SELESAI GAME
========================================================= */

function finishGame() {

    const total =
        game.correct +
        game.wrong;


    const percentage =
        total === 0
        ? 0
        : Math.round(
            game.correct /
            total *
            100
        );


    document.getElementById(
        "progressBar"
    ).style.width =
        "100%";


    document.getElementById(
        "resultScore"
    ).textContent =
        percentage + "%";


    let comment;


    if (
        percentage === 100
    ) {

        comment =
            "Sempurna. Gila juga lu.";

    }

    else if (
        percentage >= 80
    ) {

        comment =
            "Mantap. Lumayan jago.";

    }

    else if (
        percentage >= 60
    ) {

        comment =
            "Lumayan. Tapi masih bisa lebih bagus.";

    }

    else if (
        percentage >= 40
    ) {

        comment =
            "Masih perlu latihan.";

    }

    else {

        comment =
            "Waduh. Matematika sedang menghajar lu.";

    }


    document.getElementById(
        "resultDetail"
    ).innerHTML = `

        <p>
            ${comment}
        </p>

        <p>
            Benar:
            <strong>
                ${game.correct}
            </strong>
        </p>

        <p>
            Salah:
            <strong>
                ${game.wrong}
            </strong>
        </p>

        <p>
            Total:
            <strong>
                ${total}
            </strong>
        </p>

    `;


    showScreen(
        "resultScreen"
    );


    updateStatsUI();

}


/* =========================================================
   LOCAL STORAGE
========================================================= */

function saveStatistics() {

    localStorage.setItem(

        "mathTestStatistics",

        JSON.stringify(
            statistics
        )

    );

}


/* =========================================================
   UPDATE STATISTIK
========================================================= */

function updateStatsUI() {

    const total =
        statistics.correct +
        statistics.wrong;


    const accuracy =
        total === 0
        ? 0
        : Math.round(
            statistics.correct /
            total *
            100
        );


    document.getElementById(
        "totalCorrect"
    ).textContent =
        statistics.correct;


    document.getElementById(
        "totalWrong"
    ).textContent =
        statistics.wrong;


    document.getElementById(
        "totalAnswered"
    ).textContent =
        total;


    document.getElementById(
        "accuracy"
    ).textContent =
        accuracy + "%";

}


/* =========================================================
   RESET STATISTIK
========================================================= */

function resetStats() {

    const yakin =
        confirm(
            "Yakin mau menghapus semua statistik?"
        );


    if (!yakin) {

        return;

    }


    statistics = {

        correct: 0,

        wrong: 0

    };


    saveStatistics();


    updateStatsUI();

}


/* =========================================================
   MAIN LAGI
========================================================= */

function playAgain() {

    startGame(
        game.totalQuestions
    );

}


/* =========================================================
   LOAD
========================================================= */

updateStatsUI();