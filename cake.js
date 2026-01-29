/* ===============================
   ELEMENTS
================================ */
const body = document.body;

// SWITCH
const switchBtn = document.getElementById("switch");

// CAKE & PARTS
const cake = document.querySelector(".cake-container");
const layers = document.querySelectorAll(".layer");
const sprinkles = document.querySelector(".sprinkles");
const candles = document.querySelectorAll(".candle");

// TEXT
const text = document.getElementById("typing-text");
const hint = document.getElementById("hint");

// CONFETTI
const confettiContainer = document.querySelector(".confetti-container");

// AUDIO
const horn = document.getElementById("horn");
const birthdayMusic = document.getElementById("birthday-music");

/* ===============================
   STATE
================================ */
let state = "OFF";
// OFF → ON → CANDLE_LIT → BLOWN

let cakeDropped = false;

/* ===============================
   SWITCH CLICK
================================ */
switchBtn.addEventListener("click", () => {
  if (state === "OFF") {
    turnOn();
  } else {
    turnOff();
  }
});

/* ===============================
   TURN ON (LIGHT ON)
================================ */
function turnOn() {
  state = "ON";

  body.classList.remove("dark");
  body.classList.add("light");

  setTimeout(() => {
    dropCake();
    createSprinkles();
    launchConfetti();
  }, 800);

  setTimeout(() => {
    showText();
  }, 2000);

  playAudioSequence();
}

/* ===============================
   TURN OFF (RESET)
================================ */
function turnOff() {
  state = "OFF";

  body.classList.remove("light");
  body.classList.add("dark");

  resetCake();
  clearSprinkles();
  clearText();

  hint.classList.add("hidden");

  stopAudio();

  candles.forEach(c => c.classList.remove("off"));
}

/* ===============================
   CAKE DROP
================================ */
function dropCake() {
  if (cakeDropped) return;

  cake.classList.remove("hidden");

  layers.forEach((layer, i) => {
    setTimeout(() => {
      layer.classList.add("drop");
    }, i * 600);
  });

  cakeDropped = true;
}

/* RESET CAKE */
function resetCake() {
  layers.forEach(layer => layer.classList.remove("drop"));
  cake.classList.add("hidden");
  cakeDropped = false;
}

/* ===============================
   TEXT TYPING
================================ */
function showText() {
  text.classList.add("show");
  typeText("Happy Birthday Bestiee! 🎂🥳", 100);
}

function typeText(str, speed) {
  let i = 0;
  text.textContent = "";

  const interval = setInterval(() => {
    text.textContent += str[i++];
    if (i >= str.length) clearInterval(interval);
  }, speed);
}

function clearText() {
  text.textContent = "";
  text.classList.remove("show");
}

/* ===============================
   SPRINKLES
================================ */
function createSprinkles() {
  const colors = ["#ffc8dd", "#ffafcc", "#bde0fe", "#cdb4db", "#ffd6a5"];
  sprinkles.innerHTML = "";

  for (let i = 0; i < 30; i++) {
    const s = document.createElement("span");
    s.style.background = colors[Math.floor(Math.random() * colors.length)];
    sprinkles.appendChild(s);
  }

  sprinkles.classList.add("show");
}

function clearSprinkles() {
  sprinkles.innerHTML = "";
  sprinkles.classList.remove("show");
}

/* ===============================
   CONFETTI
================================ */
function launchConfetti() {
  const colors = ["#ffc8dd", "#ffafcc", "#bde0fe", "#cdb4db", "#ffd6a5"];

  for (let i = 0; i < 60; i++) {
    const c = document.createElement("div");
    c.className = "confetti";
    c.style.left = Math.random() * 100 + "vw";
    c.style.background = colors[Math.floor(Math.random() * colors.length)];
    c.style.animationDuration = 2 + Math.random() * 3 + "s";

    confettiContainer.appendChild(c);
    setTimeout(() => c.remove(), 5000);
  }
}

/* ===============================
   AUDIO SEQUENCE
================================ */
function playAudioSequence() {
  horn.currentTime = 0;
  birthdayMusic.currentTime = 0;

  horn.play();

  horn.onended = () => {
    birthdayMusic.play();
  };

  birthdayMusic.onplay = () => {
    hint.classList.remove("hidden");
    hint.innerHTML = "Tekan <b>Spasi</b> untuk meniup lilin ✨";
    state = "CANDLE_LIT";
  };
}

function stopAudio() {
  horn.pause();
  horn.currentTime = 0;

  birthdayMusic.pause();
  birthdayMusic.currentTime = 0;
}

/* ===============================
   SPACE → BLOW CANDLES
================================ */
document.addEventListener("keydown", e => {
  if (e.code === "Space" && state === "CANDLE_LIT") {
    blowCandles();
  }
});

function blowCandles() {
  candles.forEach(candle => {
    candle.classList.add("off");
  });

  birthdayMusic.volume = 0.2;

  hint.innerHTML = "Semoga semua harapanmu terkabul 🤍";
  state = "BLOWN";
}
