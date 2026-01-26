const selectedList = document.querySelectorAll(".selected");

selectedList.forEach(selected => {
  const options = selected.nextElementSibling; // ⬅️ options milik selected ini

  // Klik selected → buka options miliknya
  selected.addEventListener("click", (e) => {
    e.stopPropagation();

    // Tutup semua options lain
    document.querySelectorAll(".options.open").forEach(opt => {
      if (opt !== options) opt.classList.remove("open");
    });

    options.classList.toggle("open");
  });

  // Klik option di dalamnya
  options.querySelectorAll("div").forEach(option => {
    option.addEventListener("click", (e) => {
      e.stopPropagation();
      selected.textContent = option.textContent;
      options.classList.remove("open");
    });
  });
});

// Klik di luar → tutup semua
document.addEventListener("click", () => {
  document.querySelectorAll(".options.open").forEach(opt => {
    opt.classList.remove("open");
  });
});

const month = document.getElementById("month");

function changeDays() {

  selectedList.forEach(selected => {

  const option = selected.nextElementSibling;
  let daysInMonth;

  option.querySelectorAll("div").forEach(element => {
    element.addEventListener("click", (e) => {
      if (selected.textContent === "Februari") {
        daysInMonth = 28;
      } else if (selected.textContent === "April" || selected.textContent === "Juni" || selected.textContent === "September" || selected.textContent === "November") {
        daysInMonth = 30;
      } else {
        daysInMonth = 31;
      }
    });
  });
  
  const daySelect = document.getElementById("day");
  daySelect.innerHTML =
    `<div class="options tanggal">`;

  for (let i = 1; i <= daysInMonth; i++) {
    const day = i.toString().padStart(2, "0");
    daySelect.innerHTML += `<div data-value="${day}">${day}</div>`;
  };

  });

};

month.querySelectorAll("div").forEach(el => {
  el.addEventListener("click", changeDays);
});
