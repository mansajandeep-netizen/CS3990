class Card {
  constructor(questionData, tileElement, gameApi) {
    this.question = questionData.question;
    this.options = questionData.options;
    this.correctAnswer = questionData.correctAnswer;
    this.tileElement = tileElement;
    this.gameApi = gameApi;
    this.done = false;
    this.cardBlock = null;
    this.checkBtn = null;
  }

  render() {
    const wrap = document.createElement("div");
    wrap.className = "tile-face tile-front";

    const questionEl = document.createElement("div");
    questionEl.className = "question-text";
    questionEl.textContent = this.question;
    wrap.appendChild(questionEl);

    const optionsWrap = document.createElement("div");
    optionsWrap.className = "options-wrap";

    const radioName = "answer_" + Date.now() + "_" + Math.floor(Math.random() * 100000);

    this.options.forEach((option) => {
      const line = document.createElement("label");
      line.className = "option-line";

      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = radioName;
      radio.value = option;

      const span = document.createElement("span");
      span.textContent = option;

      line.appendChild(radio);
      line.appendChild(span);
      optionsWrap.appendChild(line);
    });

    wrap.appendChild(optionsWrap);

    this.checkBtn = document.createElement("button");
    this.checkBtn.className = "check-btn";
    this.checkBtn.type = "button";
    this.checkBtn.textContent = "Check";
    wrap.appendChild(this.checkBtn);

    this.cardBlock = wrap;
    this.bindCheck();
    return wrap;
  }

  show(container) {
    container.innerHTML = "";
    container.appendChild(this.render());
  }

  bindCheck() {
    this.checkBtn.onclick = (event) => {
      event.stopPropagation();

      if (this.done || this.tileElement.dataset.done === "true") {
        this.gameApi.message("This tile is already done.", true);
        return;
      }

      const selected = this.cardBlock.querySelector("input[type='radio']:checked");

      if (!selected) {
        this.gameApi.message("Please select one answer.", true);
        return;
      }

      if (selected.value === this.correctAnswer) {
        this.gameApi.changeScore(1);
        this.gameApi.message("Good job!");
      } else {
        this.gameApi.message("Wrong answer!", true);
      }

      this.done = true;
      this.tileElement.dataset.done = "true";
      this.tileElement.classList.add("done");
      this.checkBtn.disabled = true;
    };
  }
}
