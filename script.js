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
