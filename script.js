/* =======================
   GLOBALS
======================= */
let CONFIG = null;

/* =======================
   LOAD CONFIG
======================= */
fetch("./config.json")
  .then(res => {
    if (!res.ok) throw new Error("Config load failed");
    return res.json();
  })
  .then(cfg => {
    CONFIG = cfg;
    initPage();
    enterBtn.disabled = false;
  })
  .catch(err => console.error(err));

/* =======================
   INIT PAGE
======================= */
function initPage() {
  gateTitle.textContent = CONFIG.password.title;
  heroTitle.textContent = CONFIG.hero.title;
  heroSubtitle.textContent = CONFIG.hero.subtitle;
  successTitle.textContent = CONFIG.success.title;
  successText.textContent = CONFIG.success.text;
  letterText.textContent = CONFIG.letter.text;
  saveTitle.textContent = CONFIG.save.title;
  saveText.textContent = CONFIG.save.text;
  saveMsg.textContent = CONFIG.save.message;
  footerText.textContent = CONFIG.footer;

  musicSource.src = CONFIG.music.bg;
  sparkleSource.src = CONFIG.music.sparkle;

  buildCarousel();
}

/* =======================
   PASSWORD GATE
======================= */
enterBtn.onclick = () => {
  if (passwordInput.value === CONFIG.password.secret) {
    passwordGate.style.display = "none";
  } else {
    errorMsg.textContent = CONFIG.password.error;
  }
};

/* =======================
   FLOATING HEARTS
======================= */
const emojis = ["💕","💖","💗","💘","💝"];
setInterval(() => {
  const h = document.createElement("div");
  h.className = "heart";
  h.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  h.style.left = Math.random() * 100 + "%";
  hearts.appendChild(h);
  setTimeout(() => h.remove(), 16000);
}, 2500);

/* =======================
   YES / NO LOGIC
======================= */
let attempts = 0;

noBtn.addEventListener("mouseenter", () => {
  attempts++;

  const rect = buttons.getBoundingClientRect();
  noBtn.style.left = Math.random() * (rect.width - 100) + "px";
  noBtn.style.top = Math.random() * 80 + "px";

  yesBtn.style.transform = `scale(${1 + attempts * 0.15})`;

  if (attempts > 6) noBtn.style.display = "none";
});

yesBtn.onclick = () => {
  buttons.style.display = "none";
  success.classList.add("show");

  bgMusic.volume = 0.28;
  bgMusic.play().catch(()=>{});

  document.body.classList.add("night");
  success.scrollIntoView({ behavior: "smooth" });
};

/* =======================
   LETTER
======================= */
let opened = false;
envelope.onclick = () => {
  envelope.classList.toggle("open");

  if (!opened) {
    sparkleSound.play().catch(()=>{});
    opened = true;
  }
};

/* =======================
   CAROUSEL
======================= */
const track = document.getElementById("carouselTrack");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
let slideIndex = 0;

function buildCarousel() {
  track.innerHTML = "";

  CONFIG.carousel.forEach(item => {
    const slide = document.createElement("div");
    slide.className = "carousel-slide";

    slide.innerHTML = `
      <img src="./${item.image}" onerror="this.style.display='none'">
      <p>${item.caption}</p>
    `;

    track.appendChild(slide);
  });
}

function updateCarousel() {
  track.style.transform = `translateX(-${slideIndex * 100}%)`;
}

nextBtn.onclick = () => {
  slideIndex = (slideIndex + 1) % track.children.length;
  updateCarousel();
};

prevBtn.onclick = () => {
  slideIndex = (slideIndex - 1 + track.children.length) % track.children.length;
  updateCarousel();
};

/* Swipe support */
let startX = 0;
track.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});
track.addEventListener("touchend", e => {
  const endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) nextBtn.click();
  if (endX - startX > 50) prevBtn.click();
});

/* =======================
   MUSIC TOGGLE
======================= */
musicToggle.onclick = () => {
  if (bgMusic.paused) {
    bgMusic.play();
    musicToggle.textContent = "🔇 Mute";
  } else {
    bgMusic.pause();
    musicToggle.textContent = "🎵 Music";
  }
};

/* =======================
   SAVE MEMORY
======================= */
saveBtn.onclick = async () => {
  saveMsg.style.display = "block";

  if (navigator.vibrate) navigator.vibrate([50,30,50]);

  if (navigator.share) {
    try {
      await navigator.share({
        title: "Our Memory ❤️",
        url: location.href
      });
    } catch {}
  }
};
