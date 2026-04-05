// =========================
// TASK 1
// =========================

class NumberGenerator {
  constructor(containerId, newsContainerId) {
    this.container = document.getElementById(containerId);
    this.newsContainer = document.getElementById(newsContainerId);
    this.number = 0;
    this.newsData = [
      {
        title: "Title #1",
        text: "Lorem Ipsum originated as early as 45 BC when Roman scholar Marcus Tullius Cicero wrote De Finibus Bonorum et Malorum."
      },
      {
        title: "Title #2",
        text: "This treatise discusses various philosophical topics including ethics and politics."
      },
      {
        title: "Title #3",
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
      },
      {
        title: "Title #4",
        text: "It has survived not only five centuries, but also the leap into electronic typesetting."
      },
      {
        title: "Title #5",
        text: "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages."
      },
      {
        title: "Title #6",
        text: "More recently, desktop publishing software like Aldus PageMaker included versions of Lorem Ipsum."
      },
      {
        title: "Title #7",
        text: "Dummy text helps designers preview layout, spacing, and styling before real content is added."
      },
      {
        title: "Title #8",
        text: "This is another generated news paragraph for demonstrating the assignment behavior."
      }
    ];

    this.show();
    this.updateNews();
  }

  show() {
    this.container.innerHTML = `
      <div class="generator-panel">
        <div class="control-row">
          <button class="control-btn" id="lessBtn">&#8595;</button>
          <div class="number-box" id="numberValue">${this.number}</div>
          <button class="control-btn" id="greaterBtn">&#8593;</button>
        </div>
        <button class="make-btn" id="generateBtn">Make your number now!</button>
      </div>
    `;

    document.getElementById("generateBtn").addEventListener("click", () => {
      this.number = Math.floor(Math.random() * 101);
      this.refresh();
    });

    document.getElementById("greaterBtn").addEventListener("click", () => {
      this.number++;
      this.refresh();
    });

    document.getElementById("lessBtn").addEventListener("click", () => {
      this.number--;
      if (this.number < 0) this.number = 0;
      this.refresh();
    });
  }

  refresh() {
    document.getElementById("numberValue").textContent = this.number;
    this.updateNews();
  }

  updateNews() {
    this.newsContainer.innerHTML = "";

    for (let i = 0; i < this.number; i++) {
      const news = this.createNewsItem(i);
      this.newsContainer.appendChild(news);
    }
  }

  createNewsItem(index) {
    const item = document.createElement("div");
    item.className = "news-item";

    const data = this.newsData[index % this.newsData.length];

    item.innerHTML = `
      <div class="news-title">${data.title}</div>
      <div class="news-text">${data.text}</div>
      <button class="remove-btn">Remove !</button>
    `;

    item.querySelector(".remove-btn").addEventListener("click", () => {
      item.remove();
    });

    return item;
  }
}

new NumberGenerator("generatorContainer", "newsContainer");


// =========================
// TASK 2
// =========================

class ColorButton {
  constructor(color) {
    this.color = color;
  }

  show() {
    const cell = document.createElement("div");
    cell.className = "color-cell";
    cell.style.backgroundColor = this.color;
    cell.dataset.color = this.color;
    return cell;
  }
}

class PaletteMenu {
  constructor(containerId, targetId, colors) {
    this.container = document.getElementById(containerId);
    this.target = document.getElementById(targetId);
    this.colors = colors;

    this.renderPalette();
    this.container.addEventListener("click", this);
    this.container.addEventListener("mouseover", this);
  }

  renderPalette() {
    this.colors.forEach((color) => {
      const btn = new ColorButton(color);
      this.container.appendChild(btn.show());
    });
  }

  handleEvent(event) {
    const target = event.target;

    if (!target.classList.contains("color-cell")) return;

    const color = target.dataset.color;

    if (event.type === "click") {
      this.target.style.color = color;
    }

    if (event.type === "mouseover") {
      this.target.style.backgroundColor = color;
    }
  }
}

new PaletteMenu("paletteContainer", "paletteText", [
  "black",
  "white",
  "red",
  "yellow",
  "green",
  "cyan",
  "deepskyblue",
  "purple",
  "brown",
  "pink",
  "lime",
  "lightblue",
  "gray"
]);


// =========================
// TASK 3
// =========================

const menuToggleBtn = document.getElementById("menuToggleBtn");
const sweetMenuWrap = document.getElementById("sweetMenuWrap");
const sweetMenuItems = document.querySelectorAll("#sweetMenu li");
const sweetImage = document.getElementById("sweetImage");

let menuOpen = false;

menuToggleBtn.addEventListener("click", () => {
  menuOpen = !menuOpen;

  if (menuOpen) {
    sweetMenuWrap.style.display = "block";
  } else {
    sweetMenuWrap.style.display = "none";
    resetSweetMenu();
  }
});

sweetMenuItems.forEach((item) => {
  item.addEventListener("click", () => {
    sweetMenuItems.forEach((li) => li.classList.remove("active"));
    item.classList.add("active");

    sweetImage.src = item.dataset.img;
    sweetImage.style.display = "block";
  });
});

function resetSweetMenu() {
  sweetMenuItems.forEach((li) => li.classList.remove("active"));
  sweetImage.src = "";
  sweetImage.style.display = "none";
}


// =========================
// TASK 4
// =========================

const hannaFruits = [
  { fruit: "apple", color: "red", rating: 3 },
  { fruit: "pear", color: "green", rating: 2 },
  { fruit: "mango", color: "red", rating: 4 },
  { fruit: "plum", color: "blue", rating: 1 },
  { fruit: "kiwi", color: "green", rating: 5 },
  { fruit: "berry", color: "blue", rating: 2 }
];

class Fruit {
  constructor(name, color) {
    this.name = name;
    this.color = color;
  }

  show() {
    const li = document.createElement("li");
    li.textContent = this.name;
    li.dataset.color = this.color;
    li.style.backgroundColor = this.color;
    return li;
  }
}

class btnColor {
  constructor(color) {
    this.color = color;
  }

  show() {
    const button = document.createElement("button");
    button.className = "color-btn";
    button.textContent = this.color;
    button.dataset.color = this.color;
    button.style.backgroundColor = this.color;
    return button;
  }
}

class RatedFruit extends Fruit {
  constructor(name, color, rating) {
    super(name, color);
    this.rating = rating;
  }

  show() {
    const li = super.show();

    const starsWrap = document.createElement("div");
    starsWrap.className = "stars";

    for (let i = 1; i <= 5; i++) {
      const star = document.createElement("span");
      star.className = "star";
      star.innerHTML = "&#9733;";
      if (i <= this.rating) {
        star.classList.add("active-star");
      }
      starsWrap.appendChild(star);
    }

    li.appendChild(starsWrap);
    return li;
  }
}

function renderFruits() {
  const fruitList = document.getElementById("fruitList");
  fruitList.innerHTML = "";

  hannaFruits.forEach((item) => {
    const fruit = new RatedFruit(item.fruit, item.color, item.rating);
    fruitList.appendChild(fruit.show());
  });
}

function renderColorButtons() {
  const colorsDiv = document.getElementById("colors");
  const uniqueColors = [...new Set(hannaFruits.map((item) => item.color))];

  uniqueColors.forEach((color) => {
    const button = new btnColor(color);
    colorsDiv.appendChild(button.show());
  });
}

renderColorButtons();
renderFruits();


// jQuery event delegation for color buttons
$("#colors").on("click", ".color-btn", function () {
  const selectedColor = $(this).data("color");

  $("#fruitList li").removeClass("highlighted");

  $("#fruitList li").each(function () {
    if ($(this).data("color") === selectedColor) {
      $(this).addClass("highlighted");
    }
  });
});


// jQuery event delegation for stars
$("#fruitList").on("click", ".star", function () {
  const clickedStar = $(this);

  clickedStar
    .addClass("active-star")
    .prevAll(".star")
    .addClass("active-star");

  clickedStar
    .nextAll(".star")
    .removeClass("active-star");
});