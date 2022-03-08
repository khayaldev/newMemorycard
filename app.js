//Variables
let cardOne, cardTwo;
let disableDeck = false;
let hour = 0;
let minute = 0;
let second = 0;
let millisecond = 0;
let cron;

//Querying
const card = document.querySelector(".cards");
const cards = document.querySelectorAll(".card");
const inputContainer = document.querySelector(".input-container");
const quickLookImg = document.querySelector(".img img");
const menuButton = document.querySelector(".img span");
const menu = document.querySelector(".menu");
const wrapper = document.querySelector(".wrapper");
const congrats = document.querySelector(".congratulations");
const cardDiv = document.querySelector(".cardDiv");
const playButton = document.querySelector(".start");
const exitButton = document.querySelector(".exit");
const restartButton = document.querySelector(".restart");
const records = document.querySelector(".record");

const play = document.querySelector(".play");
const spanElement = document.querySelector(".material-icons");
const timerInterface = document.getElementById("timer");
const highScore = document.querySelector(".hscore");
const highScoreİnterface = document.querySelector(".high-score");
const cancelButton = document.getElementById("cancel");
// console.log(playButton);
//Adding Event Listener

quickLookImg.addEventListener("click", () => {
  inputContainer.style.opacity = 1;
  document.body.style.pointerEvents = "none";

  setTimeout(() => {
    inputContainer.style.opacity = 0;
    document.body.style.pointerEvents = "auto";
  }, 4000);
});
cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});

//RESTART
restartButton.addEventListener("click", (e) => {
  reset();
  cards.forEach((cd) => {
    if (cd.classList.contains("flip")) {
      cd.classList.remove("flip");
    }
    if (cd.classList.contains("see")) {
      cd.classList.remove("see");
    }

    // playButtonFunc();
  });
  start();

  cards.forEach((card) => {
    card.addEventListener("click", flipCard);
  });
  congrats.style.opacity = 0;
  cardDiv.style.opacity = 1;
  cardDiv.style.pointerEvents = "all";
  wrapper.style.pointerEvents = "auto";
  wrapper.style.backgroundColor = "white";
  wrapper.style.border = " ";
  timerInterface.style.backgroundColor = "white";
  timerInterface.style.color = "black";

  checkFinish();
});

menuButton.addEventListener("click", openMenu);
playButton.addEventListener("click", playButtonFunc);
exitButton.addEventListener("click", exitButtonFunc);
records.addEventListener("click", showHighRecords);
cancelButton.addEventListener("click", (e) => {
  highScoreİnterface.style.opacity = 0;
});
// Functions

function openMenu(e) {
  const spanElement = e.target;
  // console.log(spanElement);
  if (spanElement.innerText == "menu") {
    spanElement.innerText = "menu_open";
    menu.style.opacity = 1;
  } else {
    spanElement.innerText = "menu";
    menu.style.opacity = 0;
  }
}
function flipCard(e) {
  let clickCard = e.target;

  if (clickCard !== cardOne && !disableDeck) {
    clickCard.classList.add("flip");
    if (!cardOne) {
      //return the cardOne value to the clickCard
      return (cardOne = clickCard);
    }

    cardTwo = clickCard;
    disableDeck = true;

    let cardOneImg = cardOne.querySelector("img").src;
    let cardTwoImg = cardTwo.querySelector("img").src;

    matchCards(cardOneImg, cardTwoImg);
    checkFinish();
  }
}

function matchCards(img1, img2) {
  if (img1 === img2) {
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne.classList.add("see");
    cardTwo.classList.add("see");
    cardOne = cardTwo = "";

    return (disableDeck = false);
  }
  setTimeout(() => {
    //adding shake to both cards after 400ms
    cardOne.classList.add("shake");
    cardTwo.classList.add("shake");
  }, 400);

  setTimeout(() => {
    //adding shake to both cards after 400ms
    cardOne.classList.remove("shake", "flip");
    cardTwo.classList.remove("shake", "flip");
    cardOne = cardTwo = "";
    disableDeck = false;
  }, 1200);
}

function checkFinish() {
  let countSee = 0;
  cards.forEach((card) => {
    if (card.classList.contains("see")) {
      countSee += 1;
    }
  });
  if (countSee == 16) {
    pause();
    saveScores();

    setTimeout(() => {
      congrats.style.opacity = 1;
      cardDiv.style.opacity = 0;
      wrapper.style.backgroundColor = "black";
      wrapper.style.border = " 2px solid rgb(5, 112, 49)";
      cardDiv.style.pointerEvents = "none";
      timerInterface.style.backgroundColor = "black";
      timerInterface.style.color = "rgb(5, 112, 49)";
    }, 200);

    // return console.log(
    //   returnData(hour),
    //   returnData(minute),
    //   returnData(second),
    //   returnData(millisecond)
    // );
  }
}
function playButtonFunc() {
  reset();
  cards.forEach((cd) => {
    if (cd.classList.contains("flip")) {
      cd.classList.remove("flip");
    }
    if (cd.classList.contains("see")) {
      cd.classList.remove("see");
    }

    // playButtonFunc();
  });
  start();

  cards.forEach((card) => {
    card.addEventListener("click", flipCard);
  });
  timerInterface.style.opacity = 1;
  play.style.opacity = 0;
  cardDiv.style.opacity = 1;
  cardDiv.style.pointerEvents = "auto";
  menu.style.opacity = 0;
  spanElement.innerText = "menu";
  congrats.style.opacity = 0;
  wrapper.style.pointerEvents = "auto";
  wrapper.style.backgroundColor = "white";
  wrapper.style.border = " ";
  timerInterface.style.backgroundColor = "white";
  timerInterface.style.color = "black";
}

function exitButtonFunc() {
  timerInterface.style.opacity = 0;

  play.style.opacity = 1;
  cardDiv.style.opacity = 0;
  cardDiv.style.pointerEvents = "none";
  menu.style.opacity = 0;
  spanElement.innerText = "menu";
  highScoreİnterface.style.opacity = 0;
}

//Creating Timer
function start() {
  // pause();
  cron = setInterval(() => {
    timer();
  }, 10);
}

function pause() {
  clearInterval(cron);
}
function reset() {
  hour = 0;
  minute = 0;
  second = 0;
  millisecond = 0;
  document.getElementById("hour").innerText = "00";
  document.getElementById("minute").innerText = "00";
  document.getElementById("second").innerText = "00";
  document.getElementById("millisecond").innerText = "000";
}
function timer() {
  if ((millisecond += 10) == 1000) {
    millisecond = 0;
    second++;
  }
  if (second == 60) {
    second = 0;
    minute++;
  }
  if (minute == 60) {
    minute = 0;
    hour++;
  }
  document.getElementById("hour").innerText = returnData(hour);
  document.getElementById("minute").innerText = returnData(minute);
  document.getElementById("second").innerText = returnData(second);
  document.getElementById("millisecond").innerText = returnData(millisecond);
}

function returnData(input) {
  return input >= 10 ? input : `0${input}`;
}

//Adding Scores to localStorage
function saveScores() {
  let scores;
  if (localStorage.getItem("time") === null) {
    scores = [];
  } else {
    scores = JSON.parse(localStorage.getItem("time"));
  }
  scores.push(
    `${returnData(hour)}:${returnData(minute)}:${returnData(
      second
    )}:${returnData(millisecond)}`
  );
  localStorage.setItem("time", JSON.stringify(scores));
}
function minimum(millisecondExp) {
  let min = millisecondExp[0];
  for (var i = 0; i < millisecondExp.length; i++) {
    if (millisecondExp[i] < min) {
      min = millisecondExp[i];
    }
  }
  let h = Math.trunc(min / (1000 * 60 * 60));
  let m = Math.trunc(min / (1000 * 60));
  let s = Math.trunc(min / 1000);
  let ms = min - s * 1000;

  h = h >= 10 ? `${h}` : `0${h}`;
  m = m >= 10 ? `${m}` : `0${m}`;
  s = s >= 10 ? `${s}` : `0${s}`;

  highScore.innerText = `${h}:${m}:${s}:${ms}`;

  // return console.log);
}
function showHighRecords() {
  let millisecondExp = [];
  JSON.parse(localStorage.getItem("time")).forEach((a) => {
    let hourRecord = Number(a.slice(0, 2));
    let minuteRecord = Number(a.slice(3, 5));
    let secondRecord = Number(a.slice(6, 8));
    let millisecondRecord = Number(a.slice(9, 12));
    millisecondExp.push(
      hourRecord * 60 * 60 * 1000 +
        minuteRecord * 60 * 1000 +
        secondRecord * 1000 +
        millisecondRecord
    );
  });
  highScoreİnterface.style.opacity = 1;

  return minimum(millisecondExp);
}
