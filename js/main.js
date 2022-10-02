import getRandomWord from "./random-word.js";

const d = document;
const $inputZone = d.getElementById("input-zone");
const $letterInput = d.getElementById("letter-input");

const letters = "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z";
const lettersArr = letters.split(" ");

d.addEventListener("DOMContentLoaded", () => startGame());

const startGame = () => {
   const randomWord = getRandomWord();
   const randomWordArr = randomWord.split("");

   let isWinner = false;
   let count = 0;

   console.log(randomWord); //don't be a cheater

   $inputZone.innerHTML = "";
   $letterInput.innerHTML = "";
   d.querySelector(".hanged-man").innerHTML = "";

   lettersArr.forEach((letter) => {
      $inputZone.innerHTML += `<button class="btn btn-dark">${letter}</button>`;
   });

   for (let index = 0; index < randomWordArr.length; index++) {
      $letterInput.innerHTML += `<div class="letter"></div>`;
   }

   const $btns = $inputZone.querySelectorAll("button");
   const btnsArr = Array.from($btns).map(($btn) => $btn);

   const filteredBtns = randomWordArr.map((word) =>
      btnsArr.find(($btn) => $btn.textContent.toLowerCase() === word)
   );

   let $filteredIncortBtns = btnsArr.map(
      ($btn) =>
         randomWordArr.some((word) => word === $btn.textContent.toLowerCase()) || $btn
   );

   $filteredIncortBtns = $filteredIncortBtns.filter(($b) => $b !== true);
   const disableBtnsVal = $filteredIncortBtns.map(() => false);

   filteredBtns.forEach(($btn, index) => {
      $btn.addEventListener("click", ({ target }) => {
         if (count >= 7) return;

         d.querySelectorAll(".letter")[index].textContent = target.textContent;
         target.classList.add("disable-correct");

         const playedWord = $letterInput.textContent.toLowerCase();

         if (playedWord === randomWord) isWinner = true;

         if (!isWinner) return;

         addRestartBtn();
         setTimeout(() => alert("you win!"), 300);
      });
   });

   $filteredIncortBtns.forEach(($btn, index) => {
      $btn.addEventListener("click", ({ target }) => {
         if (disableBtnsVal[index] !== false) return;

         if (count < 8) count++;

         if (count >= 8 && !isWinner) return;

         disableBtnsVal[index] = true;
         target.classList.add("disable-incorrect");

         if (count <= 3) {
            const $hangmanPart = d.createElement("div");
            return d.querySelector(".hanged-man").appendChild($hangmanPart);
         }

         const $hangmanPart = d.createElement("div");
         d.querySelectorAll(".hanged-man div")[2].appendChild($hangmanPart);

         if (count !== 7) return;

         d.querySelectorAll(".hanged-man div")[1].textContent = ` ͡° ͜ʖ ͡°`;
         addRestartBtn();

         const lostMsg = `You lost. The word was: ${randomWord}`;

         return setTimeout(() => alert(lostMsg), 300);
      });
   });
};

const addRestartBtn = () => {
   const $startBtn = d.createElement("btn");
   $startBtn.classList.add("btn", "btn-dark", "restart-btn");
   $startBtn.textContent = "Restart Game";
   d.querySelector(".play-zone").appendChild($startBtn);

   $startBtn.addEventListener("click", ({ target }) => {
      target.remove();
      startGame();
   });
};
