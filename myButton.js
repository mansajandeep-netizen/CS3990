export class Button {
  constructor(btnText, btnBgColor, btnTitle) {
    this.btnText = btnText;
    this.btnBgColor = btnBgColor;
    this.btnTitle = btnTitle;
  }

  show() {
    document.write(`
      <button
        title="${this.btnTitle}"
        style="
          background-color:${this.btnBgColor};
          color:white;
          padding:10px 16px;
          margin:6px;
          border:none;
          border-radius:5px;
          font-size:14px;
          cursor:pointer;
        "
      >
        ${this.btnText}
      </button>
    `);
  }
}