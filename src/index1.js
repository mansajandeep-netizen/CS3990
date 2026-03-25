class News {
  static counter = 0;
  static allNews = {};

  constructor(title, imgSrc, newsText) {
    this.title = title;
    this.imgSrc = imgSrc;
    this.newsText = newsText;
    this.likes = 0;
    this.id = "news_" + (++News.counter);

    News.allNews[this.id] = this;
  }

  render() {
    return `
      <article id="${this.id}" style="border:1px solid gray; padding:15px; margin:10px 0; background:white;">
        <h2 id="${this.id}_title">${this.title}</h2>

        <div id="${this.id}_likes" style="margin-bottom:10px; font-size:20px;">
          ${"⭐".repeat(this.likes)}
        </div>

        <img
          id="${this.id}_img"
          src="${this.imgSrc}"
          alt="${this.title}"
          style="width:250px; display:block; margin-bottom:10px; opacity:1;"
        >

        <p id="${this.id}_text">${this.newsText}</p>

        <input
          id="${this.id}_likeBtn"
          type="button"
          value="LIKE"
          onclick="News.allNews['${this.id}'].incLikes()"
        >

        <input
          type="button"
          value="HIDE"
          onclick="News.allNews['${this.id}'].hide()"
        >
      </article>
    `;
  }

  show(block) {
    block.innerHTML = this.render();
  }

  incLikes() {
    this.likes++;
    document.getElementById(this.id + "_likes").innerHTML =
      "⭐".repeat(this.likes);
  }

  hide() {
    const img = document.getElementById(this.id + "_img");
    const title = document.getElementById(this.id + "_title");
    const text = document.getElementById(this.id + "_text");
    const likeBtn = document.getElementById(this.id + "_likeBtn");

    const isHidden = img.style.opacity === "0.3";

    if (!isHidden) {
      img.style.opacity = "0.3";
      title.style.color = "darkgray";
      title.style.backgroundColor = "lightgray";
      text.style.color = "darkgray";
      text.style.backgroundColor = "lightgray";
      likeBtn.disabled = true;
    } else {
      img.style.opacity = "1";
      title.style.color = "black";
      title.style.backgroundColor = "transparent";
      text.style.color = "black";
      text.style.backgroundColor = "transparent";
      likeBtn.disabled = false;
    }
  }
}

window.News = News;

const arrRecourses = [
  {
    srcImg: "Images/1.jpg",
    newsTitle: "Title 1",
    newsContent:
      "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs."
  },
  {
    srcImg: "Images/2.jpg",
    newsTitle: "Title 2",
    newsContent:
      "The purpose of lorem ipsum is to create a natural looking block of text that does not distract from the layout."
  },
  {
    srcImg: "Images/3.jpg",
    newsTitle: "Title 3",
    newsContent:
      "Meaningless filler text can be useful when the focus is meant to be on design, not content."
  }
];

function generateNews() {
  const paragraphs = document.querySelectorAll("#content p");

  paragraphs.forEach((p, index) => {
    const item = arrRecourses[index];

    if (item) {
      const news = new News(item.newsTitle, item.srcImg, item.newsContent);
      news.show(p);
    }
  });
}

const btn = document.getElementById("myBtn");
btn.value = "Generate News";
btn.onclick = generateNews;