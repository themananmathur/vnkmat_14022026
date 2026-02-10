let CONFIG = null;

/* LOAD CONFIG */
fetch("./config.json")
  .then(r => r.json())
  .then(cfg => {
    CONFIG = cfg;
    initPage();
    document.getElementById("enterBtn").disabled = false;
  });

/* INIT PAGE */
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

/* PASSWORD */
enterBtn.onclick = () => {
  if (passwordInput.value === CONFIG.password.secret) {
    passwordGate.style.display = "none";
  } else {
    errorMsg.textContent = CONFIG.password.error;
  }
};

/* FLOATING HEARTS */
const emojis = ["💕","💖","💗","💘","💝"];
setInterval(() => {
  const h = document.createElement("div");
  h.className = "heart";
  h.textContent = emojis[Math.floor(Math.random()*emojis.length)];
  h.style.left = Math.random()*100 + "%";
  hearts.appendChild(h);
  setTimeout(() => h.remove(), 16000);
}, 2500);

/* YES / NO */
let attempts = 0;
noBtn.onmouseenter = () => {
  attempts++;
  noBtn.style.left = Math.random()*200 - 100 + "px";
  noBtn.style.top = Math.random()*80 + "px";
  yesBtn.style.transform = `scale(${1 + attempts*0.15})`;
  if (attempts > 6) noBtn.style.display = "none";
};

yesBtn.onclick = () => {
  buttons.style.display = "none";
  success.classList.add("show");
  bgMusic.volume = 0.28;
  bgMusic.play().catch(()=>{});
  document.body.classList.add("night");
};

/* LETTER */
let opened = false;
envelope.onclick = () => {
  envelope.classList.toggle("open");
  if (!opened) {
    sparkleSound.play().catch(()=>{});
    opened = true;
  }
};

/* CAROUSEL */
let index = 0;
function buildCarousel() {
  CONFIG.carousel.forEach(item => {
    const slide = document.createElement("div");
    slide.className = "carousel-slide";
    slide.innerHTML = `<img src="./${item.image}"><p>${item.caption}</p>`;
    carouselTrack.appendChild(slide);
  });
}
next.onclick = () => {
  index = (index + 1) % CONFIG.carousel.length;
  carouselTrack.style.transform = `translateX(-${index * 100}%)`;
};
prev.onclick = () => {
  index = (index - 1 + CONFIG.carousel.length) % CONFIG.carousel.length;
  carouselTrack.style.transform = `translateX(-${index * 100}%)`;
};

/* MUSIC */
musicToggle.onclick = () => {
  bgMusic.paused ? bgMusic.play() : bgMusic.pause();
};

/* SAVE */
saveBtn.onclick = async () => {
  saveMsg.style.display = "block";
  if (navigator.vibrate) navigator.vibrate([50,30,50]);
  if (navigator.share) {
    try {
      await navigator.share({ title: "Our Memory ❤️", url: location.href });
    } catch {}
  }
};
