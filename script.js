const daySelect = document.getElementById("day");
const monthSelect = document.getElementById("month");
const yearSelect = document.getElementById("year");

function updateDays() {
  const month = parseInt(monthSelect.value);

  let daysInMonth;

  if (month === 2) {
    daysInMonth = 28;
  } else if ([4, 6, 9, 11].includes(month)) {
    daysInMonth = 30;
  } else {
    daysInMonth = 31;
  }

  // Reset hari
  daySelect.innerHTML =
    `<option value="" selected disabled hidden>Hari</option>`;

  for (let i = 1; i <= daysInMonth; i++) {
    const day = i.toString().padStart(2, "0");
    daySelect.innerHTML += `<option value="${day}">${day}</option>`;
  }
}

// Event listener
monthSelect.addEventListener("change", updateDays);

