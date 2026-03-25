import { Button } from "./myButton.js";

export class ColorButton extends Button {
  constructor(btnText, btnBgColor, btnTitle, fColor) {
    super(btnText, btnBgColor, btnTitle);
    this.fColor = fColor;
  }

  show() {
    document.write(`
      <button
        title="${this.btnTitle}"
        style="
          background-color:${this.btnBgColor};
          color:${this.fColor};
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