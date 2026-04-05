const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    correctAnswer: "Paris"
  },
  {
    question: "Which language is used for web page styling?",
    options: ["HTML", "CSS", "Python", "SQL"],
    correctAnswer: "CSS"
  },
  {
    question: "Which tag is used to create a hyperlink in HTML?",
    options: ["<link>", "<a>", "<href>", "<url>"],
    correctAnswer: "<a>"
  },
  {
    question: "Which company developed JavaScript?",
    options: ["Microsoft", "Oracle", "Netscape", "Google"],
    correctAnswer: "Netscape"
  },
  {
    question: "What does CSS stand for?",
    options: ["Creative Style Syntax", "Cascading Style Sheets", "Colorful Style Sheets", "Computer Style System"],
    correctAnswer: "Cascading Style Sheets"
  },
  {
    question: "Which symbol is used for jQuery?",
    options: ["#", "$", "&", "@"],
    correctAnswer: "$"
  }
];

const assets = [
  {
    type: "asset",
    value: "diamond",
    icon: "fa-solid fa-gem",
    displayText: "You are getting an extra Star",
    scoreEffect: 1
  },
  {
    type: "asset",
    value: "bear",
    icon: "fa-solid fa-paw",
    displayText: "The scary bear takes away your one star.",
    scoreEffect: -1
  },
  {
    type: "asset",
    value: "cross",
    icon: "fa-solid fa-xmark",
    displayText: "Game OVER!!!",
    gameOver: true
  }
];
