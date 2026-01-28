const body = document.body;
const candle = document.querySelector(".candle");
const layers = document.querySelectorAll(".layer");
const sprinkles = document.querySelector(".sprinkles");
const confettiContainer = document.querySelector(".confetti-container");
const text = document.getElementById("typing-text");

let isOn = false;
let cakeDropped = false;

/* CLICK LILIN */
candle.addEventListener("click", () => {
  if (!isOn) {
    turnOn();
  } else {
    turnOff();
  }
});

/* SHOW SECONDARY ELEMENTS */
function showSecondary() {
  document.querySelector(".left").classList.add("show");
  setTimeout(() => {
    document.querySelector(".right").classList.add("show");
  }, 750);
  document.querySelector(".left .age").classList.remove("off");
  document.querySelector(".right .age").classList.remove("off");
}

function hideSecondary() {
  document.querySelector(".left").classList.remove("show");
  document.querySelector(".right").classList.remove("show");
  document.querySelector(".left .age").classList.add("off");
  document.querySelector(".right .age").classList.add("off");
}

/* TURN ON */
function turnOn() {
  isOn = true;
  candle.classList.add("on");
  body.classList.remove("dark");
  body.classList.add("light");

  if (!cakeDropped) {
    dropCake();
    createSprinkles();
    cakeDropped = true;
  }

  setTimeout(() => {
    showSecondary();
  }, 2000);
  launchConfetti();
  showText();
  playAudio();
}

/* TURN OFF */
function turnOff() {
  isOn = false;
  candle.classList.remove("on");
  body.classList.remove("light");
  body.classList.add("dark");
  
  sprinkles.classList.remove("show");
  text.classList.remove("show");

  hideSecondary();
  resetCake();
  clearSprinkles();
  clearText("typing-text");
  stopAudio();
}

/* DROP CAKE */
function dropCake() {
  layers.forEach((layer, i) => {
    setTimeout(() => {
      layer.classList.add("drop");
    }, i * 600);
  });

  setTimeout(() => {
    sprinkles.classList.add("show");
  }, layers.length * 600);
}

function resetCake() {
  layers.forEach((layer) => {
    layer.classList.remove("drop");
  });
  cakeDropped = false;
};

/* BIRTHDAY TEXT */
function showText() {
  text.classList.add("show");
  typeText("Happy Birthday Bestiee! 🎂🥳", "typing-text", 120);
}

function typeText(textStr, id, speed) {
  let i = 0;
  const el = document.getElementById(id);
  el.textContent = "";

  const interval = setInterval(() => {
    el.textContent += textStr[i++];
    if (i === textStr.length) clearInterval(interval);
  }, speed);
}

function clearText(id) {
  const el = document.getElementById(id);
  el.textContent = "";
  interval = null;
}

/* SPRINKLES */
function createSprinkles() {
  const colors = ["#ffc8dd", "#ffafcc", "#bde0fe", "#cdb4db", "#ffd6a5"];
  for (let i = 0; i < 30; i++) {
    const s = document.createElement("span");
    s.style.background = colors[Math.floor(Math.random() * colors.length)];
    sprinkles.appendChild(s);
  }
}

function clearSprinkles() {
  sprinkles.innerHTML = "";
}

/* CONFETTI */
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

/* AUDIO PLAYBACK */
const horn = document.getElementById("horn");
const birthdayMusic = document.getElementById("birthday-music");

function playAudio() {
  horn.play();
  setTimeout(() => {
    birthdayMusic.play();
  }, 1000);
};

function stopAudio() {
  horn.pause();
  horn.currentTime = 0;
  birthdayMusic.pause();
  birthdayMusic.currentTime = 0;
};