// Mute/Unmute Toggle
let isMuted = false;

document.querySelector("#sound-toggle").addEventListener("click", () => {
  isMuted = !isMuted;
  document.querySelector("#sound-toggle").innerText = isMuted ? "🔇" : "🔊";
});
// Load sounds
const clickSound = new Audio("sounds/click.wav");
const winSound = new Audio("sounds/win.wav");
const drawSound = new Audio("sounds/draw.wav");

const playSound = (sound) => {
  if (!isMuted) {
    sound.currentTime = 0;
    sound.play();
  }
};

//Theme toggle - light/dark
let isDark = false;

document.querySelector("#theme-toggle").addEventListener("click", () => {
  isDark = !isDark;
  document.body.classList.toggle("dark", isDark);
  document.querySelector("#theme-toggle").innerText = isDark ? "🌞" : "🌙";
});

let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnX = true; // X's turn
let count = 0;

// Winning combinations
const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // columns
  [0,4,8], [2,4,6]           // diagonals
];

const resetGame = () => {
  turnX = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.remove("show");
};

const enableBoxes = () => {
  boxes.forEach(box => {
    box.disabled = false;
    box.innerText = "";
    box.style.backgroundColor = "#fff";
  });
};

const disableBoxes = () => {
  boxes.forEach(box => box.disabled = true);
};

const showWinner = (winner, pattern) => {
  playSound(winSound);
  msg.innerText = `🎉 Winner: ${winner}`;
  msgContainer.classList.add("show");
  pattern.forEach(index => {
    boxes[index].style.backgroundColor = "#a5d6a7"; // green highlight
  });
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;
    if (
      boxes[a].innerText &&
      boxes[a].innerText === boxes[b].innerText &&
      boxes[b].innerText === boxes[c].innerText
    ) {
      showWinner(boxes[a].innerText, pattern);
      return;
    }
  }

  if (count === 9) {
    playSound(drawSound);
    msg.innerText = `😶 It's a Draw!`;
    msgContainer.classList.add("show");
  }
};

boxes.forEach(box => {
  box.addEventListener("click", () => {
    playSound(clickSound);
    if (turnX) {
      box.innerText = "X";
      box.style.color = "#e53935";
    } else {
      box.innerText = "O";
      box.style.color = "#1e88e5";
    }
    box.disabled = true;
    turnX = !turnX;
    count++;
    checkWinner();
  });
});

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);

