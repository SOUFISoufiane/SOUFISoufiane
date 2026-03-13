// ============================================================
// Minesweeper — Faithful JS port of the C++/Qt original
// Original: C++ OOP, Qt Creator, QPainter canvas rendering
// Port: Vanilla JS + HTML5 Canvas
// ============================================================

// --- Tile class (mirrors Tile.h / Tile.cpp) ---
class Tile {
  constructor() {
    this.iPic = 0;
    this.nSurroundingBombs = 0;
    this.isBomb = false;
    this.isClicked = false;
    this.isFlagged = false;
    this.tileState = 0; // 0 = hidden, 1 = revealed, 2 = flagged
    this.tileBombCount = "0";
  }

  flagSwap() {
    this.isFlagged = !this.isFlagged;
  }
}

// --- Game state (mirrors MainWindow members) ---
const WIDTH = 30;       // tile size in px
const N_COLS = 10;
const N_ROWS = 10;
let M = [];             // 2D matrix of Tiles
let gameOver = false;

const canvas = document.getElementById("minesweeper-canvas");
const ctx = canvas.getContext("2d");
canvas.width = N_COLS * WIDTH;
canvas.height = N_ROWS * WIDTH;

// --- Matrix init (mirrors resizeMatrix) ---
function resizeMatrix() {
  M = [];
  for (let r = 0; r < N_ROWS; r++) {
    M[r] = [];
    for (let c = 0; c < N_COLS; c++) {
      M[r][c] = new Tile();
    }
  }
}

// --- Bomb planting (mirrors plantBombs — same random logic) ---
function plantBombs() {
  for (let r = 0; r < N_ROWS; r++) {
    for (let c = 0; c < N_COLS; c++) {
      const N = Math.floor(Math.random() * 10) + 1; // 1–10
      M[r][c].isBomb = (N === 3 || N === 10);
    }
  }
}

// --- Count surrounding bombs (mirrors calcSurroundingBombs) ---
function calcSurroundingBombs(i, j) {
  let bombCount = 0;
  for (let r = j - 1; r <= j + 1; r++) {
    for (let c = i - 1; c <= i + 1; c++) {
      if (r >= 0 && c >= 0 && r < N_ROWS && c < N_COLS) {
        if (M[r][c].isBomb) bombCount++;
      }
    }
  }
  return bombCount;
}

// --- Populate all bomb counts (mirrors tileSurroundingBombsState) ---
function tileSurroundingBombsState() {
  for (let r = 0; r < N_ROWS; r++) {
    for (let c = 0; c < N_COLS; c++) {
      if (!M[r][c].isBomb) {
        const count = calcSurroundingBombs(c, r);
        M[r][c].tileBombCount = String(count);
      }
    }
  }
}

// --- Flood fill (mirrors neighbourState) ---
function neighbourState(j, i) {
  if (j < 0 || j >= N_ROWS || i < 0 || i >= N_COLS) return;
  if (M[j][i].tileState === 1 || M[j][i].tileState === 2) return;

  M[j][i].tileState = 1;

  if (M[j][i].tileBombCount === "0") {
    for (let r = j - 1; r <= j + 1; r++) {
      for (let c = i - 1; c <= i + 1; c++) {
        neighbourState(r, c);
      }
    }
  }
}

// --- Number colors (mirrors the switch in paintEvent) ---
const NUMBER_COLORS = {
  1: "#0000ff",   // blue
  2: "#006400",   // darkGreen
  3: "#ff0000",   // red
  4: "#ff00ff",   // magenta
  5: "#cccc00",   // yellow (darkened for visibility)
  6: "#00cccc",   // cyan (darkened for visibility)
  7: "#000000",   // black
  8: "#808080"    // gray
};

// --- Draw (mirrors paintEvent) ---
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let r = 0; r < N_ROWS; r++) {
    for (let c = 0; c < N_COLS; c++) {
      const x = WIDTH * c;
      const y = WIDTH * r;
      const tile = M[r][c];

      if (tile.tileState === 0) {
        // Hidden tile — gray
        ctx.fillStyle = "#A9A9A9";
        ctx.fillRect(x, y, WIDTH, WIDTH);
        ctx.strokeStyle = "#000";
        ctx.strokeRect(x, y, WIDTH, WIDTH);

      } else if (tile.tileState === 1 && !tile.isFlagged) {
        if (!tile.isBomb) {
          // Revealed, no bomb — light gray
          ctx.fillStyle = "#D6D2D2";
          ctx.fillRect(x, y, WIDTH, WIDTH);
          ctx.strokeStyle = "#000";
          ctx.strokeRect(x, y, WIDTH, WIDTH);
        } else {
          // Revealed bomb — exploded
          ctx.fillStyle = "#D6D2D2";
          ctx.fillRect(x, y, WIDTH, WIDTH);
          ctx.strokeStyle = "#000";
          ctx.strokeRect(x, y, WIDTH, WIDTH);
          ctx.font = `${WIDTH - 6}px serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("\u{1F4A5}", x + WIDTH / 2, y + WIDTH / 2);
        }

        // Draw number if > 0
        if (tile.tileBombCount !== "0" && !tile.isBomb) {
          const val = parseInt(tile.tileBombCount, 10);
          ctx.fillStyle = NUMBER_COLORS[val] || "#000";
          ctx.font = `bold ${WIDTH - 10}px sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(tile.tileBombCount, x + WIDTH / 2, y + WIDTH / 2);
        }

      } else if (tile.tileState === 2) {
        // Flagged tile — gray + flag
        ctx.fillStyle = "#A9A9A9";
        ctx.fillRect(x, y, WIDTH, WIDTH);
        ctx.strokeStyle = "#000";
        ctx.strokeRect(x, y, WIDTH, WIDTH);
        ctx.font = `${WIDTH - 8}px serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("\u{1F6A9}", x + WIDTH / 2, y + WIDTH / 2);
      }
    }
  }
}

// --- Game Over popup (mirrors popupGO) ---
function popupGO() {
  gameOver = true;
  document.getElementById("game-over-overlay").style.display = "flex";
}

// --- Restart (implements ressayerGame) ---
function ressayerGame() {
  gameOver = false;
  document.getElementById("game-over-overlay").style.display = "none";
  resizeMatrix();
  plantBombs();
  tileSurroundingBombsState();
  draw();
}

// --- Mouse handling (mirrors mousePressEvent) ---
canvas.addEventListener("click", function (e) {
  if (gameOver) return;

  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const xPos = (e.clientX - rect.left) * scaleX;
  const yPos = (e.clientY - rect.top) * scaleY;

  const c = Math.floor(xPos / WIDTH);
  const r = Math.floor(yPos / WIDTH);

  if (r >= 0 && r < N_ROWS && c >= 0 && c < N_COLS) {
    if (!M[r][c].isFlagged) {
      if (M[r][c].isBomb) {
        M[r][c].tileState = 1;
        draw();
        popupGO();
      } else {
        neighbourState(r, c);
      }
    }
  }

  draw();
});

canvas.addEventListener("contextmenu", function (e) {
  e.preventDefault();
  if (gameOver) return;

  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const xPos = (e.clientX - rect.left) * scaleX;
  const yPos = (e.clientY - rect.top) * scaleY;

  const c = Math.floor(xPos / WIDTH);
  const r = Math.floor(yPos / WIDTH);

  if (r >= 0 && r < N_ROWS && c >= 0 && c < N_COLS) {
    if (M[r][c].tileState !== 1) {
      M[r][c].tileState = 2;
      M[r][c].flagSwap();
      if (!M[r][c].isFlagged) M[r][c].tileState = 0;
    }
  }

  draw();
});

// --- Init ---
resizeMatrix();
plantBombs();
tileSurroundingBombsState();
draw();
