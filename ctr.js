const boardEl = document.getElementById("board");
const menuEl = document.getElementById("menu");
const gameEl = document.getElementById("game");

const turnText = document.getElementById("turnText");
const statusText = document.getElementById("statusText");
const modeText = document.getElementById("modeText");
const moveListEl = document.getElementById("moveList");

const promotionEl =
  document.getElementById("promotion");

const promotionChoices =
  document.getElementById("promotionChoices");

const gameOverEl =
  document.getElementById("gameOver");

const resultTitle =
  document.getElementById("resultTitle");

const resultDetails =
  document.getElementById("resultDetails");

const undoBtn =
  document.getElementById("undoBtn");

const restartBtn =
  document.getElementById("restartBtn");

const menuBtn =
  document.getElementById("menuBtn");

const againBtn =
  document.getElementById("againBtn");

const resultMenuBtn =
  document.getElementById("resultMenuBtn");


/* =========================================================
   BIDAK
========================================================= */

const PIECES = {

  white: {
    k: "♔",
    q: "♕",
    r: "♖",
    b: "♗",
    n: "♘",
    p: "♙"
  },

  black: {
    k: "♚",
    q: "♛",
    r: "♜",
    b: "♝",
    n: "♞",
    p: "♟"
  }
};


const VALUES = {
  p: 100,
  n: 320,
  b: 330,
  r: 500,
  q: 900,
  k: 20000
};


/* =========================================================
   STATE
========================================================= */

let board = [];

let turn = "white";

let mode = "pvp";

let selected = null;

let legalTargets = [];

let history = [];

let moveHistory = [];

let enPassant = null;

let gameFinished = false;

let pendingPromotion = null;

let lastMove = null;

let castling = {

  whiteKing: true,

  whiteRookA: true,

  whiteRookH: true,

  blackKing: true,

  blackRookA: true,

  blackRookH: true
};


/* =========================================================
   BOARD AWAL
========================================================= */

function createInitialBoard() {

  return [

    [
      { color: "black", type: "r" },
      { color: "black", type: "n" },
      { color: "black", type: "b" },
      { color: "black", type: "q" },
      { color: "black", type: "k" },
      { color: "black", type: "b" },
      { color: "black", type: "n" },
      { color: "black", type: "r" }
    ],

    Array(8)
      .fill(null)
      .map(() => ({
        color: "black",
        type: "p"
      })),

    Array(8).fill(null),

    Array(8).fill(null),

    Array(8).fill(null),

    Array(8).fill(null),

    Array(8)
      .fill(null)
      .map(() => ({
        color: "white",
        type: "p"
      })),

    [
      { color: "white", type: "r" },
      { color: "white", type: "n" },
      { color: "white", type: "b" },
      { color: "white", type: "q" },
      { color: "white", type: "k" },
      { color: "white", type: "b" },
      { color: "white", type: "n" },
      { color: "white", type: "r" }
    ]
  ];
}


/* =========================================================
   UTILITY
========================================================= */

function cloneBoard(b) {

  return b.map(row =>
    row.map(piece =>
      piece
        ? { ...piece }
        : null
    )
  );
}


function cloneCastling() {

  return {
    ...castling
  };
}


function inside(r, c) {

  return (
    r >= 0 &&
    r < 8 &&
    c >= 0 &&
    c < 8
  );
}


function opposite(color) {

  return color === "white"
    ? "black"
    : "white";
}


function coordToNotation(r, c) {

  return (
    "abcdefgh"[c] +
    (8 - r)
  );
}


/* =========================================================
   CARI RAJA
========================================================= */

function findKing(b, color) {

  for (let r = 0; r < 8; r++) {

    for (let c = 0; c < 8; c++) {

      const piece = b[r][c];

      if (
        piece &&
        piece.color === color &&
        piece.type === "k"
      ) {

        return {
          r,
          c
        };
      }
    }
  }

  return null;
}


/* =========================================================
   CEK SERANGAN
========================================================= */

function isSquareAttacked(
  b,
  r,
  c,
  byColor
) {

  /* PAWN */

  const pawnDir =
    byColor === "white"
      ? -1
      : 1;

  const pawnRow =
    r - pawnDir;

  for (const dc of [-1, 1]) {

    const pc =
      c - dc;

    if (
      !inside(
        pawnRow,
        pc
      )
    ) {
      continue;
    }

    const piece =
      b[pawnRow][pc];

    if (
      piece &&
      piece.color === byColor &&
      piece.type === "p"
    ) {

      return true;
    }
  }


  /* KNIGHT */

  const knightMoves = [

    [-2, -1],
    [-2, 1],

    [-1, -2],
    [-1, 2],

    [1, -2],
    [1, 2],

    [2, -1],
    [2, 1]
  ];


  for (
    const [dr, dc]
    of knightMoves
  ) {

    const nr =
      r + dr;

    const nc =
      c + dc;


    if (
      !inside(nr, nc)
    ) {
      continue;
    }


    const piece =
      b[nr][nc];


    if (
      piece &&
      piece.color === byColor &&
      piece.type === "n"
    ) {

      return true;
    }
  }


  /* KING */

  for (
    let dr = -1;
    dr <= 1;
    dr++
  ) {

    for (
      let dc = -1;
      dc <= 1;
      dc++
    ) {

      if (
        dr === 0 &&
        dc === 0
      ) {
        continue;
      }


      const nr =
        r + dr;

      const nc =
        c + dc;


      if (
        !inside(nr, nc)
      ) {
        continue;
      }


      const piece =
        b[nr][nc];


      if (
        piece &&
        piece.color === byColor &&
        piece.type === "k"
      ) {

        return true;
      }
    }
  }


  /* ROOK / QUEEN */

  const straight = [

    [-1, 0],
    [1, 0],

    [0, -1],
    [0, 1]
  ];


  for (
    const [dr, dc]
    of straight
  ) {

    let nr =
      r + dr;

    let nc =
      c + dc;


    while (
      inside(nr, nc)
    ) {

      const piece =
        b[nr][nc];


      if (piece) {

        if (
          piece.color === byColor &&
          (
            piece.type === "r" ||
            piece.type === "q"
          )
        ) {

          return true;
        }

        break;
      }


      nr += dr;
      nc += dc;
    }
  }


  /* BISHOP / QUEEN */

  const diagonal = [

    [-1, -1],
    [-1, 1],

    [1, -1],
    [1, 1]
  ];


  for (
    const [dr, dc]
    of diagonal
  ) {

    let nr =
      r + dr;

    let nc =
      c + dc;


    while (
      inside(nr, nc)
    ) {

      const piece =
        b[nr][nc];


      if (piece) {

        if (
          piece.color === byColor &&
          (
            piece.type === "b" ||
            piece.type === "q"
          )
        ) {

          return true;
        }

        break;
      }


      nr += dr;
      nc += dc;
    }
  }


  return false;
}


/* =========================================================
   SKAK
========================================================= */

function isInCheck(
  b,
  color
) {

  const king =
    findKing(
      b,
      color
    );


  if (!king) {
    return true;
  }


  return isSquareAttacked(
    b,
    king.r,
    king.c,
    opposite(color)
  );
}


/* =========================================================
   GERAK BIDAK
========================================================= */

function pseudoMoves(
  b,
  r,
  c,
  includeCastle = true
) {

  const piece =
    b[r][c];


  if (!piece) {
    return [];
  }


  const moves = [];


  function add(
    nr,
    nc,
    extra = {}
  ) {

    if (
      !inside(nr, nc)
    ) {
      return;
    }


    const target =
      b[nr][nc];


    if (
      !target ||
      target.color !== piece.color
    ) {

      moves.push({

        from: {
          r,
          c
        },

        to: {
          r: nr,
          c: nc
        },

        ...extra
      });
    }
  }


  /* PAWN */

  if (
    piece.type === "p"
  ) {

    const dir =
      piece.color === "white"
        ? -1
        : 1;


    const startRow =
      piece.color === "white"
        ? 6
        : 1;


    if (
      inside(
        r + dir,
        c
      ) &&
      !b[r + dir][c]
    ) {

      add(
        r + dir,
        c
      );


      if (
        r === startRow &&
        !b[r + dir * 2][c]
      ) {

        add(
          r + dir * 2,
          c,
          {
            doublePawn:
              true
          }
        );
      }
    }


    for (
      const dc of [-1, 1]
    ) {

      const nr =
        r + dir;

      const nc =
        c + dc;


      if (
        !inside(nr, nc)
      ) {
        continue;
      }


      const target =
        b[nr][nc];


      if (
        target &&
        target.color !== piece.color
      ) {

        add(
          nr,
          nc
        );
      }


      if (
        enPassant &&
        enPassant.r === nr &&
        enPassant.c === nc
      ) {

        moves.push({

          from: {
            r,
            c
          },

          to: {
            r: nr,
            c: nc
          },

          enPassant: true
        });
      }
    }
  }


  /* KNIGHT */

  if (
    piece.type === "n"
  ) {

    const jumps = [

      [-2, -1],
      [-2, 1],

      [-1, -2],
      [-1, 2],

      [1, -2],
      [1, 2],

      [2, -1],
      [2, 1]
    ];


    jumps.forEach(
      ([dr, dc]) =>
        add(
          r + dr,
          c + dc
        )
    );
  }


  /* BISHOP / ROOK / QUEEN */

  if (
    piece.type === "b" ||
    piece.type === "r" ||
    piece.type === "q"
  ) {

    const dirs = [];


    if (
      piece.type === "b" ||
      piece.type === "q"
    ) {

      dirs.push(

        [-1, -1],
        [-1, 1],

        [1, -1],
        [1, 1]
      );
    }


    if (
      piece.type === "r" ||
      piece.type === "q"
    ) {

      dirs.push(

        [-1, 0],
        [1, 0],

        [0, -1],
        [0, 1]
      );
    }


    for (
      const [dr, dc]
      of dirs
    ) {

      let nr =
        r + dr;

      let nc =
        c + dc;


      while (
        inside(nr, nc)
      ) {

        const target =
          b[nr][nc];


        if (!target) {

          moves.push({

            from: {
              r,
              c
            },

            to: {
              r: nr,
              c: nc
            }
          });

        } else {

          if (
            target.color !== piece.color
          ) {

            moves.push({

              from: {
                r,
                c
              },

              to: {
                r: nr,
                c: nc
              }
            });
          }

          break;
        }


        nr += dr;
        nc += dc;
      }
    }
  }


  /* KING */

  if (
    piece.type === "k"
  ) {

    for (
      let dr = -1;
      dr <= 1;
      dr++
    ) {

      for (
        let dc = -1;
        dc <= 1;
        dc++
      ) {

        if (
          dr === 0 &&
          dc === 0
        ) {
          continue;
        }


        add(
          r + dr,
          c + dc
        );
      }
    }


    /* ROKADE */

    if (
      includeCastle &&
      r === (
        piece.color === "white"
          ? 7
          : 0
      ) &&
      c === 4
    ) {

      const color =
        piece.color;

      const row = r;


      /* ROKADE KANAN */

      const kingSide =
        color === "white"

          ? castling.whiteKing &&
            castling.whiteRookH

          : castling.blackKing &&
            castling.blackRookH;


      if (
        kingSide &&
        !b[row][5] &&
        !b[row][6] &&
        b[row][7] &&
        b[row][7].type === "r" &&
        b[row][7].color === color &&
        !isInCheck(
          b,
          color
        ) &&
        !isSquareAttacked(
          b,
          row,
          5,
          opposite(color)
        ) &&
        !isSquareAttacked(
          b,
          row,
          6,
          opposite(color)
        )
      ) {

        moves.push({

          from: {
            r,
            c
          },

          to: {
            r,
            c: 6
          },

          castle:
            "king"
        });
      }


      /* ROKADE KIRI */

      const queenSide =
        color === "white"

          ? castling.whiteKing &&
            castling.whiteRookA

          : castling.blackKing &&
            castling.blackRookA;


      if (
        queenSide &&
        !b[row][1] &&
        !b[row][2] &&
        !b[row][3] &&
        b[row][0] &&
        b[row][0].type === "r" &&
        b[row][0].color === color &&
        !isInCheck(
          b,
          color
        ) &&
        !isSquareAttacked(
          b,
          row,
          3,
          opposite(color)
        ) &&
        !isSquareAttacked(
          b,
          row,
          2,
          opposite(color)
        )
      ) {

        moves.push({

          from: {
            r,
            c
          },

          to: {
            r,
            c: 2
          },

          castle:
            "queen"
        });
      }
    }
  }


  return moves;
}


/* =========================================================
   APPLY MOVE
========================================================= */

function applyMoveToBoard(
  b,
  move
) {

  const next =
    cloneBoard(b);


  const piece =
    next[
      move.from.r
    ][
      move.from.c
    ];


  next[
    move.from.r
  ][
    move.from.c
  ] = null;


  /* EN PASSANT */

  if (
    move.enPassant
  ) {

    next[
      move.from.r
    ][
      move.to.c
    ] = null;
  }


  next[
    move.to.r
  ][
    move.to.c
  ] = piece;


  /* ROKADE KANAN */

  if (
    move.castle === "king"
  ) {

    next[
      move.to.r
    ][5] =
      next[
        move.to.r
      ][7];

    next[
      move.to.r
    ][7] = null;
  }


  /* ROKADE KIRI */

  if (
    move.castle === "queen"
  ) {

    next[
      move.to.r
    ][3] =
      next[
        move.to.r
      ][0];

    next[
      move.to.r
    ][0] = null;
  }


  return next;
}


/* =========================================================
   LEGAL MOVES
========================================================= */

function legalMovesForPiece(
  b,
  r,
  c
) {

  const piece =
    b[r][c];


  if (!piece) {
    return [];
  }


  const pseudo =
    pseudoMoves(
      b,
      r,
      c
    );


  return pseudo.filter(
    move => {

      const next =
        applyMoveToBoard(
          b,
          move
        );


      return !isInCheck(
        next,
        piece.color
      );
    }
  );
}


function allLegalMoves(
  b,
  color
) {

  const result = [];


  for (
    let r = 0;
    r < 8;
    r++
  ) {

    for (
      let c = 0;
      c < 8;
      c++
    ) {

      const piece =
        b[r][c];


      if (
        piece &&
        piece.color === color
      ) {

        result.push(
          ...legalMovesForPiece(
            b,
            r,
            c
          )
        );
      }
    }
  }


  return result;
}


/* =========================================================
   HISTORY
========================================================= */

function saveState() {

  history.push({

    board:
      cloneBoard(
        board
      ),

    turn,

    enPassant:
      enPassant
        ? {
            ...enPassant
          }
        : null,

    castling:
      cloneCastling(),

    moveHistory:
      [
        ...moveHistory
      ],

    lastMove:
      lastMove
        ? {

            from: {
              ...lastMove.from
            },

            to: {
              ...lastMove.to
            }

          }
        : null
  });
}


function restoreState(
  state
) {

  board =
    cloneBoard(
      state.board
    );


  turn =
    state.turn;


  enPassant =
    state.enPassant
      ? {
          ...state.enPassant
        }
      : null;


  castling =
    {
      ...state.castling
    };


  moveHistory =
    [
      ...state.moveHistory
    ];


  lastMove =
    state.lastMove
      ? {

          from: {
            ...state.lastMove.from
          },

          to: {
            ...state.lastMove.to
          }

        }
      : null;


  selected = null;

  legalTargets = [];

  gameFinished = false;

  pendingPromotion = null;


  promotionEl.classList.add(
    "hidden"
  );


  gameOverEl.classList.add(
    "hidden"
  );


  render();

  updateStatus();
}


/* =========================================================
   CASTLING RIGHTS
========================================================= */

function updateCastlingRights(
  piece,
  from,
  to
) {

  /* RAJA */

  if (
    piece.type === "k"
  ) {

    if (
      piece.color === "white"
    ) {

      castling.whiteKing =
        false;

    } else {

      castling.blackKing =
        false;
    }
  }


  /* BENTENG */

  if (
    piece.type === "r"
  ) {

    if (
      piece.color === "white"
    ) {

      if (
        from.r === 7 &&
        from.c === 0
      ) {

        castling.whiteRookA =
          false;
      }


      if (
        from.r === 7 &&
        from.c === 7
      ) {

        castling.whiteRookH =
          false;
      }

    } else {

      if (
        from.r === 0 &&
        from.c === 0
      ) {

        castling.blackRookA =
          false;
      }


      if (
        from.r === 0 &&
        from.c === 7
      ) {

        castling.blackRookH =
          false;
      }
    }
  }


  /* BENTENG DIMAKAN */

  if (
    to.r === 7 &&
    to.c === 0
  ) {

    castling.whiteRookA =
      false;
  }


  if (
    to.r === 7 &&
    to.c === 7
  ) {

    castling.whiteRookH =
      false;
  }


  if (
    to.r === 0 &&
    to.c === 0
  ) {

    castling.blackRookA =
      false;
  }


  if (
    to.r === 0 &&
    to.c === 7
  ) {

    castling.blackRookH =
      false;
  }
}


/* =========================================================
   EKSEKUSI LANGKAH
========================================================= */

function executeMove(
  move,
  promotion = null
) {

  saveState();


  const piece =
    board[
      move.from.r
    ][
      move.from.c
    ];


  updateCastlingRights(
    piece,
    move.from,
    move.to
  );


  board =
    applyMoveToBoard(
      board,
      move
    );


  /* PROMOSI */

  if (promotion) {

    board[
      move.to.r
    ][
      move.to.c
    ].type =
      promotion;
  }


  /* EN PASSANT */

  if (
    piece.type === "p" &&
    Math.abs(
      move.to.r -
      move.from.r
    ) === 2
  ) {

    enPassant = {

      r:
        (
          move.from.r +
          move.to.r
        ) / 2,

      c:
        move.from.c
    };

  } else {

    enPassant =
      null;
  }


  let captured = null;


  if (
    move.enPassant
  ) {

    captured = {
      type: "p"
    };

  } else {

    captured =
      board[
        move.to.r
      ][
        move.to.c
      ];
  }


  const notation =
    makeNotation(
      piece,
      move,
      captured,
      promotion
    );


  moveHistory.push({

    color:
      piece.color,

    text:
      notation
  });


  lastMove = {

    from: {
      ...move.from
    },

    to: {
      ...move.to
    }
  };


  turn =
    opposite(turn);


  selected = null;

  legalTargets = [];


  render();

  updateStatus();

  checkGameEnd();


  /* AI */

  if (
    mode === "ai" &&
    turn === "black" &&
    !gameFinished
  ) {

    setTimeout(
      aiMove,
      300
    );
  }
}


/* =========================================================
   NOTASI
========================================================= */

function makeNotation(
  piece,
  move,
  captured,
  promotion
) {

  if (
    move.castle === "king"
  ) {

    return "O-O";
  }


  if (
    move.castle === "queen"
  ) {

    return "O-O-O";
  }


  const names = {

    k: "K",

    q: "Q",

    r: "R",

    b: "B",

    n: "N",

    p: ""
  };


  let text =
    names[
      piece.type
    ];


  if (
    piece.type === "p" &&
    captured
  ) {

    text +=
      "abcdefgh"[
        move.from.c
      ];
  }


  if (captured) {
    text += "x";
  }


  text +=
    coordToNotation(
      move.to.r,
      move.to.c
    );


  if (promotion) {

    text +=
      "=" +
      names[promotion];
  }


  return text;
}


/* =========================================================
   PROMOTION
========================================================= */

function needsPromotion(
  move
) {

  const piece =
    board[
      move.from.r
    ][
      move.from.c
    ];


  return (

    piece &&

    piece.type === "p" &&

    (
      move.to.r === 0 ||
      move.to.r === 7
    )
  );
}


function showPromotion(
  move
) {

  pendingPromotion =
    move;


  promotionChoices.innerHTML =
    "";


  const color =
    board[
      move.from.r
    ][
      move.from.c
    ].color;


  [
    "q",
    "r",
    "b",
    "n"
  ].forEach(
    type => {

      const button =
        document.createElement(
          "button"
        );


      button.className =
        "promotion-btn";


      button.textContent =
        PIECES[
          color
        ][
          type
        ];


      button.onclick =
        () => {

          promotionEl.classList.add(
            "hidden"
          );


          executeMove(
            pendingPromotion,
            type
          );


          pendingPromotion =
            null;
        };


      promotionChoices.appendChild(
        button
      );
    }
  );


  promotionEl.classList.remove(
    "hidden"
  );
}


/* =========================================================
   HANDLE CLICK
========================================================= */

function handleSquareClick(
  r,
  c
) {

  if (gameFinished) {
    return;
  }


  if (
    mode === "ai" &&
    turn === "black"
  ) {

    return;
  }


  const piece =
    board[r][c];


  /* BIDAK SUDAH DIPILIH */

  if (selected) {

    const target =
      legalTargets.find(
        move =>
          move.to.r === r &&
          move.to.c === c
      );


    if (target) {

      if (
        needsPromotion(
          target
        )
      ) {

        showPromotion(
          target
        );

      } else {

        executeMove(
          target
        );
      }


      return;
    }
  }


  /* PILIH BIDAK */

  if (
    piece &&
    piece.color === turn
  ) {

    selected = {

      r,
      c
    };


    legalTargets =
      legalMovesForPiece(
        board,
        r,
        c
      );


    render();

    return;
  }


  selected = null;

  legalTargets = [];

  render();
}


/* =========================================================
   RENDER BOARD
========================================================= */

function render() {

  boardEl.innerHTML =
    "";


  /*
    WARNA KOTAK SELALU BERDASARKAN
    KOORDINAT.

    BIDAK TIDAK PERNAH MENGUBAH
    WARNA KOTAK.
  */

  const checkedKing =
    isInCheck(
      board,
      turn
    )
      ? findKing(
          board,
          turn
        )
      : null;


  for (
    let r = 0;
    r < 8;
    r++
  ) {

    for (
      let c = 0;
      c < 8;
      c++
    ) {

      const square =
        document.createElement(
          "div"
        );


      /* =================================================
         WARNA PAPAN
         TIDAK TERGANTUNG BIDAK
      ================================================= */

      if (
        (r + c) % 2 === 0
      ) {

        square.className =
          "square light";

      } else {

        square.className =
          "square dark";
      }


      /* SELECTED */

      if (
        selected &&
        selected.r === r &&
        selected.c === c
      ) {

        square.classList.add(
          "selected"
        );
      }


      /* LEGAL TARGET */

      const target =
        legalTargets.find(
          move =>
            move.to.r === r &&
            move.to.c === c
        );


      if (target) {

        if (
          board[r][c]
        ) {

          square.classList.add(
            "capture"
          );

        } else {

          square.classList.add(
            "legal"
          );
        }
      }


      /* SKAK */

      if (
        checkedKing &&
        checkedKing.r === r &&
        checkedKing.c === c
      ) {

        square.classList.add(
          "check"
        );
      }


      /* LANGKAH TERAKHIR */

      if (
        lastMove &&
        (
          (
            lastMove.from.r === r &&
            lastMove.from.c === c
          ) ||
          (
            lastMove.to.r === r &&
            lastMove.to.c === c
          )
        )
      ) {

        square.classList.add(
          "last-move"
        );
      }


      /* =================================================
         BIDAK

         INI YANG MEMBEDAKAN WARNA BIDAK.
         BUKAN WARNA KOTAK.
      ================================================= */

      const piece =
        board[r][c];


      if (piece) {

        const pieceEl =
          document.createElement(
            "span"
          );


        /*
          white-piece = bidak putih
          black-piece = bidak hitam
        */

        pieceEl.className =
          `piece ${piece.color}-piece`;


        pieceEl.textContent =
          PIECES[
            piece.color
          ][
            piece.type
          ];


        square.appendChild(
          pieceEl
        );
      }


      /* KOORDINAT FILE */

      if (r === 7) {

        const file =
          document.createElement(
            "span"
          );


        file.className =
          "coords-file";


        file.textContent =
          "abcdefgh"[c];


        square.appendChild(
          file
        );
      }


      /* KOORDINAT RANK */

      if (c === 0) {

        const rank =
          document.createElement(
            "span"
          );


        rank.className =
          "coords-rank";


        rank.textContent =
          8 - r;


        square.appendChild(
          rank
        );
      }


      square.addEventListener(
        "click",
        () =>
          handleSquareClick(
            r,
            c
          )
      );


      boardEl.appendChild(
        square
      );
    }
  }


  renderMoves();


  turnText.textContent =
    `Giliran: ${
      turn === "white"
        ? "Putih"
        : "Hitam"
    }`;
}


/* =========================================================
   MOVE LIST
========================================================= */

function renderMoves() {

  moveListEl.innerHTML =
    "";


  for (
    let i = 0;
    i < moveHistory.length;
    i += 2
  ) {

    const row =
      document.createElement(
        "div"
      );


    row.className =
      "move-row";


    const number =
      document.createElement(
        "span"
      );


    number.className =
      "move-number";


    number.textContent =
      `${Math.floor(i / 2) + 1}.`;


    const white =
      document.createElement(
        "span"
      );


    white.className =
      "move-white";


    white.textContent =
      moveHistory[i]
        ?.text || "";


    const black =
      document.createElement(
        "span"
      );


    black.className =
      "move-black";


    black.textContent =
      moveHistory[i + 1]
        ?.text || "";


    row.append(
      number,
      white,
      black
    );


    moveListEl.appendChild(
      row
    );
  }


  moveListEl.scrollTop =
    moveListEl.scrollHeight;
}


/* =========================================================
   STATUS
========================================================= */

function updateStatus() {

  if (
    isInCheck(
      board,
      turn
    )
  ) {

    statusText.textContent =
      "RAJA DISKAK! Cari jalan keluar.";

  } else {

    statusText.textContent =
      "Pilih bidak untuk bergerak.";
  }
}


/* =========================================================
   GAME OVER
========================================================= */

function checkGameEnd() {

  const moves =
    allLegalMoves(
      board,
      turn
    );


  if (
    moves.length > 0
  ) {

    return;
  }


  gameFinished =
    true;


  const check =
    isInCheck(
      board,
      turn
    );


  if (check) {

    const winner =
      turn === "white"
        ? "Hitam"
        : "Putih";


    resultTitle.textContent =
      "Skakmat!";


    resultDetails.textContent =
      `${winner} menang. Raja ${
        turn === "white"
          ? "Putih"
          : "Hitam"
      } sudah nggak punya jalan.`;


    statusText.textContent =
      `Skakmat — ${winner} menang.`;

  } else {

    resultTitle.textContent =
      "Remis";


    resultDetails.textContent =
      "Stalemate — tidak ada langkah legal, tetapi raja tidak sedang skak.";


    statusText.textContent =
      "Remis — stalemate.";
  }


  gameOverEl.classList.remove(
    "hidden"
  );
}


/* =========================================================
   AI
========================================================= */

function evaluateBoard(b) {

  let score = 0;


  for (
    let r = 0;
    r < 8;
    r++
  ) {

    for (
      let c = 0;
      c < 8;
      c++
    ) {

      const piece =
        b[r][c];


      if (!piece) {
        continue;
      }


      let value =
        VALUES[
          piece.type
        ];


      if (
        piece.type === "p"
      ) {

        const advancement =
          piece.color === "black"
            ? r
            : 7 - r;


        value +=
          advancement * 8;
      }


      if (
        piece.type === "n"
      ) {

        if (
          r >= 2 &&
          r <= 5 &&
          c >= 2 &&
          c <= 5
        ) {

          value += 25;
        }
      }


      if (
        piece.type === "k" &&
        isInCheck(
          b,
          piece.color
        )
      ) {

        value -= 100;
      }


      score +=
        piece.color === "black"
          ? value
          : -value;
    }
  }


  return score;
}


function minimax(
  b,
  color,
  depth,
  alpha,
  beta
) {

  const moves =
    allLegalMoves(
      b,
      color
    );


  if (
    depth === 0 ||
    moves.length === 0
  ) {

    if (
      moves.length === 0
    ) {

      if (
        isInCheck(
          b,
          color
        )
      ) {

        return color === "black"
          ? -999999
          : 999999;
      }


      return 0;
    }


    return evaluateBoard(b);
  }


  /* HITAM */

  if (
    color === "black"
  ) {

    let best =
      -Infinity;


    for (
      const move
      of moves
    ) {

      const next =
        applyMoveToBoard(
          b,
          move
        );


      const score =
        minimax(
          next,
          "white",
          depth - 1,
          alpha,
          beta
        );


      best =
        Math.max(
          best,
          score
        );


      alpha =
        Math.max(
          alpha,
          score
        );


      if (
        beta <= alpha
      ) {

        break;
      }
    }


    return best;
  }


  /* PUTIH */

  let best =
    Infinity;


  for (
    const move
    of moves
  ) {

    const next =
      applyMoveToBoard(
        b,
        move
      );


    const score =
      minimax(
        next,
        "black",
        depth - 1,
        alpha,
        beta
      );


    best =
      Math.min(
        best,
        score
      );


    beta =
      Math.min(
        beta,
        score
      );


    if (
      beta <= alpha
    ) {

      break;
    }
  }


  return best;
}


/* =========================================================
   AI MOVE
========================================================= */

function aiMove() {

  if (
    gameFinished ||
    turn !== "black"
  ) {

    return;
  }


  statusText.textContent =
    "AI sedang mikir...";


  const moves =
    allLegalMoves(
      board,
      "black"
    );


  if (
    !moves.length
  ) {

    checkGameEnd();

    return;
  }


  let bestScore =
    -Infinity;


  let bestMoves =
    [];


  for (
    const move
    of moves
  ) {

    const next =
      applyMoveToBoard(
        board,
        move
      );


    let score =
      minimax(
        next,
        "white",
        2,
        -Infinity,
        Infinity
      );


    const target =
      board[
        move.to.r
      ][
        move.to.c
      ];


    if (target) {

      score +=
        VALUES[
          target.type
        ] * 0.2;
    }


    if (
      score > bestScore
    ) {

      bestScore =
        score;

      bestMoves =
        [move];

    } else if (
      score === bestScore
    ) {

      bestMoves.push(
        move
      );
    }
  }


  const move =
    bestMoves[
      Math.floor(
        Math.random() *
        bestMoves.length
      )
    ];


  setTimeout(
    () => {

      if (
        needsPromotion(
          move
        )
      ) {

        executeMove(
          move,
          "q"
        );

      } else {

        executeMove(
          move
        );
      }

    },
    300
  );
}


/* =========================================================
   START GAME
========================================================= */

function startGame(
  selectedMode
) {

  mode =
    selectedMode;


  board =
    createInitialBoard();


  turn =
    "white";


  history = [];

  moveHistory = [];

  enPassant = null;

  lastMove = null;


  castling = {

    whiteKing: true,

    whiteRookA: true,

    whiteRookH: true,

    blackKing: true,

    blackRookA: true,

    blackRookH: true
  };


  selected = null;

  legalTargets = [];

  gameFinished =
    false;

  pendingPromotion =
    null;


  modeText.textContent =
    mode === "pvp"
      ? "Multiplayer — 2 Pemain"
      : "vs AI — Kamu Putih";


  menuEl.classList.add(
    "hidden"
  );

  gameEl.classList.remove(
    "hidden"
  );


  gameOverEl.classList.add(
    "hidden"
  );

  promotionEl.classList.add(
    "hidden"
  );


  render();

  updateStatus();
}


/* =========================================================
   MODE BUTTON
========================================================= */

document
  .querySelectorAll(
    ".mode-btn"
  )
  .forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          startGame(
            button.dataset.mode
          );
        }
      );
    }
  );


/* =========================================================
   RESTART
========================================================= */

restartBtn.addEventListener(
  "click",
  () => {

    startGame(
      mode
    );
  }
);


/* =========================================================
   AGAIN
========================================================= */

againBtn.addEventListener(
  "click",
  () => {

    startGame(
      mode
    );
  }
);


/* =========================================================
   MENU
========================================================= */

menuBtn.addEventListener(
  "click",
  () => {

    gameEl.classList.add(
      "hidden"
    );

    menuEl.classList.remove(
      "hidden"
    );

    gameOverEl.classList.add(
      "hidden"
    );
  }
);


resultMenuBtn.addEventListener(
  "click",
  () => {

    gameOverEl.classList.add(
      "hidden"
    );

    gameEl.classList.add(
      "hidden"
    );

    menuEl.classList.remove(
      "hidden"
    );
  }
);


/* =========================================================
   UNDO
========================================================= */

undoBtn.addEventListener(
  "click",
  () => {

    if (
      !history.length ||
      gameFinished
    ) {

      return;
    }


    /*
      PvP:
      mundur 1 langkah.

      AI:
      mundur 2 langkah.
    */

    if (
      mode === "ai" &&
      history.length >= 2
    ) {

      const previous =
        history[
          history.length - 2
        ];


      history.splice(
        history.length - 2,
        2
      );


      restoreState(
        previous
      );

    } else {

      const previous =
        history[
          history.length - 1
        ];


      history.pop();


      restoreState(
        previous
      );
    }
  }
);


/* =========================================================
   DEFAULT
========================================================= */

gameEl.classList.add(
  "hidden"
);