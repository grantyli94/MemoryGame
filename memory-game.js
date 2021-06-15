"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */
let startButton = document.querySelector("#start");
let resetButton = document.createElement("button");
resetButton.innerText = "Reset";
let body = document.querySelector("#body");

startButton.addEventListener("click", function(event) {
    event.preventDefault();
    startButton.disabled = true;
    body.appendChild(resetButton);
    const FOUND_MATCH_WAIT_MSECS = 1000;
    const COLORS = [
      "red", "blue", "green", "orange", "purple",
      "red", "blue", "green", "orange", "purple",
    ];
    
    const colors = shuffle(COLORS); // shuffled array of colors
    createCards(colors);
})

resetButton.addEventListener("click", function(event) {
    event.preventDefault();
    let cards = document.querySelectorAll(".card")
    removeCards(cards);
    startButton.disabled = false;
    resetButton.remove();
})

/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

/** Create card for every color in colors (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the color
 * - an click listener for each card to handleCardClick
 */

function createCards(colors) {
  const gameBoard = document.getElementById("game");

  for (let color of colors) {
    let card = document.createElement("div");

    card.setAttribute("class",color);
    card.classList.add("card")
    card.classList.add("facedown")
    card.addEventListener("click",handleCardClick);
    
    gameBoard.appendChild(card);
  }
}

function flipCard(card) {
  card.classList.replace("facedown","faceup")
  if (document.querySelectorAll("#game div.faceup").length === 2) {
    let faceDownCards = document.querySelectorAll("#game div.facedown");
    disableClick(faceDownCards);

    let card1 = document.querySelectorAll("#game div.faceup")[0];
    let card2 = document.querySelectorAll("#game div.faceup")[1];
    
    setTimeout(function() {
        checkCards(card1,card2);
        let cards = document.querySelectorAll("#game div");
        for (let i = 0; i < cards.length; i++) {
            unFlipCard(cards[i]);
            cards[i].addEventListener("click",handleCardClick)
        }
    },1000);
  }

  if (document.querySelectorAll("#game div.completed").length === 10) {
      alert("Congrats! You finished the game");
  }

}

function unFlipCard(card) {
  card.classList.replace("faceup","facedown")
}

function handleCardClick(evt) {
  flipCard(evt.target);
}

function checkCards(card1,card2) {
    if (card1.classList[0] === card2.classList[0]) {
        card1.classList.replace("faceup","completed")
        card2.classList.replace("faceup","completed")
    }
}

function disableClick(cards) {
    for (let i = 0; i < cards.length; i++) {
        cards[i].removeEventListener("click",handleCardClick)
    }
}

function removeCards(cards) {
    for (let i = 0; i < cards.length; i++) {
        cards[i].remove();
    }
}
