import { generateButtons, showButtons } from "./myFunctions.js";
import { ColorButton } from "./myColorButton.js";

generateButtons();
showButtons();

// extra ColorButton (required)
const specialBtn = new ColorButton(
  "Extra Button",
  "black",
  "Extra Button is shown on black background",
  "yellow"
);

setTimeout(() => {
  specialBtn.show();
}, 4 * 3000);