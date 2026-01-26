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

  const day = document.getElementById("day");
  const month = document.getElementById("month");

  function changeDays() {

    month.querySelectorAll("div").forEach(el => {
      el.addEventListener("click", () => {
        const selectedMonth = el.getAttribute("data-value");
        let daysInMonth;
        if (["01", "03", "05", "07", "08", "10", "12"].includes(selectedMonth)) {
          daysInMonth = 31;
        } else if (["04", "06", "09", "11"].includes(selectedMonth)) {
          daysInMonth = 30;
        } else {
          daysInMonth = 28; // Februari
        }

        const daySelect = document.getElementById("day");
        daySelect.innerHTML =
          `<div class="options tanggal">`;

        for (let i = 1; i <= daysInMonth; i++) {
          const day = i.toString().padStart(2, "0");
          daySelect.innerHTML += `<div data-value="${day}">${day}</div>`;
        };

      });
    });

  };
  month.querySelectorAll("div").forEach(el => {
    el.addEventListener("click", changeDays);
  });

  // Klik di luar → tutup semua
  document.addEventListener("click", () => {
    document.querySelectorAll(".options.open").forEach(opt => {
      opt.classList.remove("open");
    });
  });

