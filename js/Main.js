const gameState = {
  score: 0,
  timeLeft: 0,
  timerId: null,
  locked: false,
  gameStarted: false
};

const boardEl = document.getElementById("board");
const statusPanelEl = document.getElementById("statusPanel");
const scoreStarsEl = document.getElementById("scoreStars");
const timerTextEl = document.getElementById("timerText");
const startBtnEl = document.getElementById("startBtn");

const gameApi = {
  changeScore(value) {
    gameState.score = clampScore(gameState.score + value);
    updateScoreView();
  },
  message(text, isError = false) {
    showMessage(text, isError);
  }
};

function updateScoreView() {
  scoreStarsEl.textContent = renderStars(gameState.score);
}

function updateTimerView() {
  timerTextEl.textContent = gameState.timeLeft + " secs.";
}

function clearBoard() {
  boardEl.innerHTML = "";
}

function stopTimer() {
  if (gameState.timerId) {
    clearInterval(gameState.timerId);
    gameState.timerId = null;
  }
}

function endGame(reasonMessage = "Game OVER!") {
  gameState.locked = true;
  stopTimer();
  clearBoard();
  showMessage(reasonMessage, true);
}

function lockBoardUntilTimerEnds(message) {
  gameState.locked = true;
  showMessage(message, true);
}

function startTimer(totalSeconds) {
  gameState.timeLeft = totalSeconds;
  updateTimerView();

  gameState.timerId = setInterval(() => {
    gameState.timeLeft--;
    updateTimerView();

    if (gameState.timeLeft <= 0) {
      timerTextEl.textContent = "0 secs.";
      endGame("Game OVER!");
    }
  }, 1000);
}

function buildAssetContent(asset) {
  const assetWrap = document.createElement("div");
  assetWrap.className = "asset-card";

  const icon = document.createElement("i");
  icon.className = "asset-icon " + asset.icon;

  const text = document.createElement("div");
  text.className = asset.gameOver ? "asset-text game-over-text" : "asset-text";
  text.textContent = asset.displayText;

  assetWrap.appendChild(icon);
  assetWrap.appendChild(text);

  return assetWrap;
}

function createTile(item) {
  const tile = document.createElement("div");
  tile.className = "tile";
  tile.dataset.done = "false";
  tile.dataset.opened = "false";

  tile.onclick = () => {
    if (!gameState.gameStarted || gameState.locked) {
      return;
    }

    if (tile.dataset.done === "true") {
      showMessage("This tile is already done.", true);
      return;
    }

    if (tile.dataset.opened === "true") {
      return;
    }

    tile.dataset.opened = "true";

    if (isQuizCard(item)) {
      const quizCard = new Card(item, tile, gameApi);
      quizCard.show(tile);
    } else {
      tile.innerHTML = "";
      tile.appendChild(buildAssetContent(item));
      tile.dataset.done = "true";
      tile.classList.add("done");

      if (item.value === "diamond") {
        gameApi.changeScore(1);
        gameApi.message("You got an extra star!");
      } else if (item.value === "bear") {
        gameApi.changeScore(-1);
        gameApi.message("Oops! Bear took one star.", true);
      } else if (item.value === "cross") {
        lockBoardUntilTimerEnds("You can do nothing! Just watching your Time!");
      }
    }
  };

  return tile;
}

function createBoard(allCards) {
  clearBoard();
  allCards.forEach((item) => {
    boardEl.appendChild(createTile(item));
  });
}

function startGame() {
  stopTimer();
  gameState.score = 0;
  gameState.locked = false;
  gameState.gameStarted = true;
  updateScoreView();

  const allCards = arrShuffle([...questions, ...assets]);

  statusPanelEl.classList.remove("hidden");
  boardEl.classList.remove("hidden");

  createBoard(allCards);
  startTimer(allCards.length * 2);
}

startBtnEl.addEventListener("click", startGame);
