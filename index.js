import "./styles.css";

function getRandomNumbers(min, max) {
  const list = [];
  const range = max - min;

  while (list.length < range) {
    const num = Math.floor(Math.random() * range) + min;

    if (list.indexOf(num) === -1) {
      list.push(num);
    }
  }

  return list;
}

function updateCardImg(positions, images) {
  const imgSrcList = [
    "images/melted.jpeg",
    "images/melted.jpeg",
    "images/dead-face.jpeg",
    "images/dead-face.jpeg",
    "images/wink.jpeg",
    "images/wink.jpeg",
    "images/shocked.jpeg",
    "images/shocked.jpeg",
    "images/upside-down.jpeg",
    "images/upside-down.jpeg",
    "images/heart-in-eyes.jpeg",
    "images/heart-in-eyes.jpeg"
  ];
  const dataSetEmoji = [
    "melt",
    "melt",
    "dead-face",
    "dead-face",
    "wink",
    "wink",
    "shocked",
    "shocked",
    "upside-down",
    "upside-down",
    "heart-in-eyes",
    "heart-in-eyes"
  ];

  for (let i = 0; i < positions.length; i++) {
    const card = images[positions[i]];

    card.setAttribute("src", imgSrcList[i]);
    card.parentElement.parentElement.dataset.emoji = dataSetEmoji[i];
  }
}

function handleCardClick(flippedCards) {
  const cards = document.querySelectorAll(".card-inner");
  let clickCount;

  function resetClickCount() {
    clickCount = 0;
  }

  function testClick() {
    const currentEmojiName = this.dataset.emoji;

    clickCount = clickCount === undefined ? 0 : clickCount;

    if (this.className.indexOf("flip") === -1) {
      this.classList.add("flip");
      clickCount++;
      flippedCards.push(currentEmojiName);
    }

    if (flippedCards.length === 2) {
      removeTheMatched(flippedCards);
    }

    if (flippedCards.length === 3) {
      const currentCard = this;

      flippedCards = [flippedCards[2]];
      unflip(currentCard);
    }

    generateButton(clickCount, resetClickCount);
  }

  for (let i = 0; i < cards.length; i++) {
    cards[i].onclick = testClick;
  }
}

function unflip(currentCard) {
  const currentFlippedCards = document.querySelectorAll(".flip");

  for (let i = 0; i < currentFlippedCards.length; i++) {
    if (currentCard !== currentFlippedCards[i]) {
      currentFlippedCards[i].classList.remove("flip");
    }
  }
}

function removeTheMatched(flippedCards) {
  if (flippedCards[0] === flippedCards[1]) {
    flippedCards = [];

    const currentflippedCards = document.querySelectorAll(".flip");

    for (let i = 0; i < currentflippedCards.length; i++) {
      currentflippedCards[i].classList.add("hide");
      setTimeout(() => {
        currentflippedCards[i].classList.remove("flip");
      }, 800);
    }
  }
}

function startGame() {
  let flippedCards = [];
  const images = document.querySelectorAll(".emoji-style");
  const randomNumbers = getRandomNumbers(0, images.length);

  updateCardImg(randomNumbers, images);
  handleCardClick(flippedCards);
}

startGame();

function restart(hiddenCards) {
  for (let i = 0; i < hiddenCards.length; i++) {
    hiddenCards[i].classList.remove("hide");
  }
  startGame();
}

function generateButton(clickCount, resetClickCount) {
  const hiddenCards = document.querySelectorAll(".card-inner.hide");
  const button = document.createElement("button");

  function buttonClickHandler() {
    restart(hiddenCards);
    this.remove();
    document.querySelector("p").remove();
  }

  if (hiddenCards.length === 12) {
    setTimeout(() => {
      button.innerHTML = "RESTART";
      button.classList.add("button-style", "position-center");
      document.body.insertBefore(button, document.querySelector(".table"));

      console.log(clickCount);
      generateScoreScreen(clickCount);

      button.onclick = buttonClickHandler;
    }, 1000);
  }
}

function generateScoreScreen(clickCount) {
  const scoreScreen = document.createElement("p");

  scoreScreen.classList.add("score-style");
  scoreScreen.classList.add("position-top-center");

  const scoreScreenText = document.createTextNode(
    `You Have Cleared the Table In ${clickCount} Clicks`
  );

  scoreScreen.appendChild(scoreScreenText);
  document.body.appendChild(scoreScreen);
}
