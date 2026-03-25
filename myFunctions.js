import { Button } from "./myButton.js";
import { arrTexts, arrColors, arrButtons } from "./myArrays.js";

export function generateButtons() {
  arrTexts.forEach((element, index) => {
    const color = arrColors[index];

    const title = `${element} is shown on the ${color} background`;

    const btn = new Button(element, color, title);

    arrButtons.push(btn);
  });
}

export function showButtons() {
  arrButtons.forEach((btn, index) => {
    setTimeout(() => {
      btn.show();
    }, index * 2000); // 2 seconds delay
  });
}