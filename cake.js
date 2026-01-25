function dropCake() {
  const layers = document.querySelectorAll('.layer');
  const candle = document.querySelector('.candle');

  layers.forEach((layer, index) => {
    setTimeout(() => {
      layer.classList.add('drop');
    }, index * 600);
  });

  // Lilin muncul terakhir
  setTimeout(() => {
    candle.classList.add('show-candle');
  }, layers.length * 600 + 400);

  // Teks muncul setelah lilin
  setTimeout(() => {
    typeText("Happy Birthday Bestiee!🥳🥳🥳", "typing-text", 120);
  }, layers.length * 600 + 1000);
}

function typeText(text, elementId, speed = 120) {
  let i = 0;
  const element = document.getElementById(elementId);
  element.textContent = "";

  const interval = setInterval(() => {
    element.textContent += text[i];
    i++;

    if (i === text.length) {
      clearInterval(interval);
    }
  }, speed);
}
