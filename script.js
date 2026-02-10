let CONFIG;

/* LOAD CONFIG */

fetch("config.json")
.then(r => r.json())
.then(cfg => {
  CONFIG = cfg;
  initPage();
});

/* INIT PAGE */

function initPage() {

  document.getElementById("gateTitle").textContent = CONFIG.password.title;

  document.getElementById("heroTitle").textContent = CONFIG.hero.title;
  document.getElementById("heroSubtitle").textContent = CONFIG.hero.subtitle;

  document.getElementById("successTitle").textContent = CONFIG.success.title;
  document.getElementById("successText").textContent = CONFIG.success.text;

  document.getElementById("letterText").textContent = CONFIG.letter.text;

  document.getElementById("saveTitle").textContent = CONFIG.save.title;
  document.getElementById("saveText").textContent = CONFIG.save.text;
  document.getElementById("saveMsg").textContent = CONFIG.save.message;

  document.getElementById("footerText").textContent = CONFIG.footer;

  document.getElementById("musicSource").src = CONFIG.music.bg;
  document.getElementById("sparkleSource").src = CONFIG.music.sparkle;

  buildCarousel();
}

/* PASSWORD */

function checkPassword() {
  const input = document.getElementById("passwordInput").value;

  if (input === CONFIG.password.secret) {
    document.getElementById("passwordGate").style.display = "none";
  } else {
    document.getElementById("errorMsg").textContent = CONFIG.password.error;
  }
}

/* CAROUSEL */

function buildCarousel() {
  const track = document.getElementById("carouselTrack");

  CONFIG.carousel.forEach(item => {
    const slide = document.createElement("div");
    slide.className = "carousel-slide";
    slide.innerHTML = `
      <img src="${item.image}" loading="lazy">
      <p>${item.caption}</p>
    `;
    track.appendChild(slide);
  });
}

/* YES BUTTON */

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const success = document.getElementById("success");

let attempts=0;

noBtn.addEventListener("mouseenter",()=>{
  attempts++;
  noBtn.style.left=Math.random()*200-100+"px";
  noBtn.style.top=Math.random()*80+"px";
});

const bgMusic=document.getElementById("bgMusic");

yesBtn.onclick=()=>{
  document.getElementById("buttons").style.display="none";
  success.classList.add("show");
  bgMusic.play().catch(()=>{});
};

/* LETTER */

let opened=false;

document.getElementById("envelope").onclick=()=>{
  const env=document.getElementById("envelope");
  env.classList.toggle("open");

  if(!opened){
    document.getElementById("sparkleSound").play().catch(()=>{});
    opened=true;
  }
};

/* MUSIC TOGGLE */

document.getElementById("musicToggle").onclick=()=>{
  if(bgMusic.paused){
    bgMusic.play();
  } else {
    bgMusic.pause();
  }
};

/* SAVE */

document.getElementById("saveBtn").onclick=()=>{
  document.getElementById("saveMsg").style.display="block";
};
