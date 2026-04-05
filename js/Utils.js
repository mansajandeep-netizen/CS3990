function arrShuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function isQuizCard(item) {
  return Object.prototype.hasOwnProperty.call(item, "question");
}

function showMessage(text, isError = false) {
  const $box = $("#messageBox");
  $box.stop(true, true).hide();
  $box.text(text);
  $box.css("color", isError ? "#8d1b4a" : "#7f3a91");
  $box.fadeIn(180).delay(1200).fadeOut(400);
}

function clampScore(score) {
  return Math.max(0, score);
}

function renderStars(score) {
  return score > 0 ? "★".repeat(score) : "";
}
