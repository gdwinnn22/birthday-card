/* ===============================
   ELEMENTS
================================ */
const body = document.body;

/* SWITCH */
const switchBtn = document.getElementById("switch");

/* CAKE & PARTS */
const cake = document.querySelector(".cake-container");
const layers = document.querySelectorAll(".layer");
const sprinkles = document.querySelector(".sprinkles");

// CANDLES
const candles = document.querySelectorAll(".candle");
const leftCandle = document.querySelector(".candle.left");
const midCandle = document.querySelector(".candle.middle");
const rightCandle = document.querySelector(".candle.right");

/* TEXT */
const text = document.getElementById("typing-text");
const hint = document.getElementById("hint");

/* CONFETTI */
const confettiContainer = document.querySelector(".confetti-container");

/* AUDIO */
const horn = document.getElementById("horn");
const birthdayMusic = document.getElementById("music");

/* STATE */
let state = "OFF";
// OFF → ON → CANDLE_LIT → BLOWN

let cakeDropped = false;

/* SWITCH CLICKED */
switchBtn.addEventListener("click", () => {
  if (state === "OFF") {
    turnOn();
  } else {
    turnOff();
  }
});

/* TURN ON */
function turnOn() {
  state = "ON";

  body.classList.remove("dark");
  body.classList.add("light");

  setTimeout(() => {
    dropCake();
    createSprinkles();
    setTimeout(() => {
      dropCandles();
    }, 1700);
    launchConfetti();
  }, 800);

  setTimeout(() => {
    showText();
  }, 2000);

  playAudioSequence();
}

/* TURN OFF (RESET) */
function turnOff() {
  state = "OFF";

  body.classList.remove("light");
  body.classList.add("dark");

  resetCake();
  clearSprinkles();
  resetCandles();
  clearText();

  hint.classList.add("hidden");
  hint.innerHTML = "Klik pada <b>Lilin</b> untuk meniup lilin ✨";

  stopAudio();
  candles.forEach(candle => {
    candle.classList.remove("off");
    candleBlown = 0
  })
}

/* TEXT TYPING */
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

// DROP LAYER
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

// RESET LAYER
function resetCake() {
  layers.forEach(layer => layer.classList.remove("drop"));
  cake.classList.add("hidden");
  cakeDropped = false;
}

// SPRINKLES
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

// CONFETTI
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

// DROP CANDLES
function dropCandles() {
  leftCandle.classList.add("drop");

  setTimeout(() => {
    rightCandle.classList.add("drop");
    setTimeout(() => {
      leftCandle.querySelector(".flame").classList.remove("off");
      leftCandle.querySelector(".flame").classList.add("on");
    }, 1000)

    setTimeout(() => {
      midCandle.classList.add("drop");

      setTimeout(() => {
        rightCandle.querySelector(".flame").classList.remove("off");
        rightCandle.querySelector(".flame").classList.add("on");

        setTimeout(() => {
          midCandle.querySelector(".flame").classList.remove("off");
          midCandle.querySelector(".flame").classList.add("on");
        }, 500);
      }, 1000);

    }, 500);

  }, 500);
};

function resetCandles() {
  leftCandle.classList.remove("drop");
  midCandle.classList.remove("drop");
  rightCandle.classList.remove("drop");

  leftCandle.querySelector(".flame").classList.remove("on");
  midCandle.querySelector(".flame").classList.remove("on");
  rightCandle.querySelector(".flame").classList.remove("on");

  leftCandle.querySelector(".flame").classList.add("off");
  midCandle.querySelector(".flame").classList.add("off");
  rightCandle.querySelector(".flame").classList.add("off");
}

/* BLOW CANDLES */
let candleBlown = 0;

candles.forEach(candle => {

  candle.addEventListener("click", e => {
    e.stopPropagation();

    if (state !== "CANDLE_LIT") return;

    candle.querySelector(".flame.on").classList.remove("on");
    if (!candle.querySelector(".flame").classList.contains("on")) {
      candle.querySelector(".flame").classList.add("off");
    };
    candleBlown++;
    
    if (candleBlown >= 3) {
      candlesBlowned();
    }
    
  });
});

function candlesBlowned() {
  hint.innerHTML = "Selamat ulang tahun yang ke-15!!, Semoga semua harapanmu terkabul yaa 🤍";
  state = "BLOWN";

  birthdayMusic.play();
  fadeOut(birthdayMusic, 5000);
}

/* AUDIO */
function playAudioSequence() {
  horn.currentTime = 0;
  birthdayMusic.currentTime = 0;

  horn.play();
  horn.volume = 0.1;

  setTimeout(() => {
    birthdayMusic.play();
    birthdayMusic.volume = 0.1;
  }, 1000);

  birthdayMusic.onplay = () => {
    setTimeout(() => {
      hint.classList.remove("hidden");
    }, 5000);
    
    state = "CANDLE_LIT";
  };
}

function stopAudio() {
  horn.pause();
  horn.currentTime = 0;

  birthdayMusic.pause();
  birthdayMusic.currentTime = 0;
}

function fadeOut(audio, duration = 2000) {
  const step = 0.05;
  const intervalTime = duration * step;

  const fade = setInterval(() => {
    if (audio.volume > 0.035) {
      audio.volume = Math.max(audio.volume - step, 0.035);
    } else {
      clearInterval(fade);
    }
  }, intervalTime);
}



