const selectedList = document.querySelectorAll(".selected");
const dayOptions = document.getElementById("day");
const monthOptions = document.getElementById("month");

/* ===============================
   DROPDOWN OPEN / CLOSE
================================ */
selectedList.forEach(selected => {
  const options = selected.nextElementSibling;

  selected.addEventListener("click", e => {
    e.stopPropagation();

    document.querySelectorAll(".options.open").forEach(opt => {
      if (opt !== options) opt.classList.remove("open");
    });

    options.classList.toggle("open");
  });
});

/* ===============================
   EVENT DELEGATION OPTIONS
================================ */
document.addEventListener("click", e => {
  const option = e.target.closest(".options div");
  if (!option) return;

  const optionsBox = option.parentElement;
  const selectedBox = optionsBox.previousElementSibling;

  selectedBox.textContent = option.textContent;
  optionsBox.classList.remove("open");

  if (optionsBox.id === "day") {
    selectedDay = option.dataset.value;
  }
  if (optionsBox.id === "month") {
    selectedMonth = option.dataset.value;
    updateDays(selectedMonth);
  }
  if (optionsBox.id === "year") {
    selectedYear = option.textContent;
  }

});

/* ===============================
   UPDATE DAYS FUNCTION
================================ */
function updateDays(monthValue) {
  let daysInMonth = 31;

  if (["04", "06", "09", "11"].includes(monthValue)) {
    daysInMonth = 30;
  } else if (monthValue === "02") {
    daysInMonth = 28;
  }

  // Simpan tanggal lama
  const previousDay = selectedDay ? parseInt(selectedDay, 10) : null;

  // Render ulang options tanggal
  dayOptions.innerHTML = "";
  for (let i = 1; i <= daysInMonth; i++) {
    const day = String(i).padStart(2, "0");
    dayOptions.innerHTML += `<div data-value="${day}">${day}</div>`;
  }

  // 🔥 LOGIKA PENTING: reset HANYA jika tidak valid
  if (previousDay && previousDay <= daysInMonth) {
    // Masih valid → pertahankan
    selectedDay = String(previousDay).padStart(2, "0");
    document.querySelector(".selected.tanggal").textContent = selectedDay;
  } else {
    // Tidak valid → reset
    selectedDay = null;
    document.querySelector(".selected.tanggal").textContent = "Tanggal";
  }
}


/* ===============================
   CLICK OUTSIDE
================================ */
document.addEventListener("click", () => {
  document.querySelectorAll(".options.open").forEach(opt => {
    opt.classList.remove("open");
  });
});

let selectedDay = null;
let selectedMonth = null;
let selectedYear = null;

const form = document.getElementById("birthday-form");

form.addEventListener("submit", function (e) {
  e.preventDefault(); // ⛔ hentikan submit dulu

  // 1️⃣ CEK APAKAH SUDAH DIPILIH SEMUA
  if (!selectedDay || !selectedMonth || !selectedYear) {
    alert("Silakan lengkapi tanggal lahir terlebih dahulu.");
    return;
  }

  // 2️⃣ KONFIRMASI
  const yakin = confirm(
    `Tanggal lahirmu: ${selectedDay}-${selectedMonth}-${selectedYear}\n\nApakah kamu yakin?`
  );

  if (!yakin) return;

  // 3️⃣ VALIDASI TANGGAL KHUSUS
  if (
    selectedDay === "24" &&
    selectedMonth === "01" &&
    selectedYear === "2011"
  ) {
    // ✅ BOLEH MASUK
    window.location.href = "cake.html";
  } else {
    // ❌ DITOLAK
    alert(
      "Tanggal lahir tidak dikenali, kamu tidak diperbolehkan masuk.\nMohon coba lagi nanti."
    );
  }
});

/* ================================
   AKTIVATE EASTEREGG
================================ */

function showEasterEgg() {
  const egg = document.getElementById("easterEgg");
  const text = document.getElementById("birthdayText");

  egg.classList.add("show");

  const message = "🎉 Selamat Ulang Tahun 🎂";
  let index = 0;
  text.textContent = "";

  const typing = setInterval(() => {
    text.textContent += message[index];
    index++;
    if (index === message.length) clearInterval(typing);
  }, 100);

  // Redirect setelah animasi
  setTimeout(() => {
    window.location.href = "cake.html";
  }, 6000);
}

