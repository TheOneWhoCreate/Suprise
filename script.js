let currentIndex = 0;
let paletteIndex = 0;
const slides = document.getElementById("slides");
const totalSlides = slides.children.length;
const dotsContainer = document.getElementById("dots");

// ---------- SLIDE UPDATE ----------
function updateSlide() {
    slides.style.transform = `translateX(${-currentIndex * 100}%)`;

    document.querySelectorAll(".dot").forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
    });
}

// ---------- MOVE SLIDE ----------
function moveSlide(direction) {
    currentIndex = (currentIndex + direction + totalSlides) % totalSlides;
    updateSlide();
}

// ---------- AUTO SLIDE ----------
let autoSlide = setInterval(() => moveSlide(1), 4000);

// ---------- DOTS ----------
function createDots() {
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        dot.addEventListener("click", () => {
            clearInterval(autoSlide);
            currentIndex = i;
            updateSlide();
            autoSlide = setInterval(() => moveSlide(1), 4000);
        });
        dotsContainer.appendChild(dot);
    }
}

// ---------- PINKISH COLOR PALETTES ----------
const palettes = {
    blush: ["#ffb3c6", "#ffd1e6", "#ff9eb5", "#ff8da1", "#ff6b8a", "#ff4d6d"],
    rose: ["#ffe4e1", "#ffd9e8", "#fbb1c0", "#f883a0", "#f65b7c", "#e63e6b"],
    cottonCandy: ["#ffd0e4", "#ffc0cb", "#ffb3d1", "#ffa5c3", "#ff96b5", "#ff88a7"],
    bubblegum: ["#ffb3ba", "#ffdfb3", "#ffffb3", "#b3ffb3", "#b3ffff", "#ffb3ff"],
    magenta: ["#ff77a9", "#ff5e8b", "#ff4477", "#ff2b63", "#ff114f", "#ff003b"],
    cherry: ["#ffb7c5", "#ff9eb2", "#ff859f", "#ff6c8c", "#ff5379", "#ff3a66"]
};

const paletteNames = Object.keys(palettes);

const isMobile = window.innerWidth < 768;

// ---------- CONFETTI ----------
const wrapper = document.getElementById("confetti-wrapper");
function createConfetti() {
    const CONFETTI_COUNT = isMobile ? 30 : 80;
    // Pick palette in sequence
    const selectedPalette = palettes[paletteNames[paletteIndex]];
    paletteIndex = (paletteIndex + 1) % paletteNames.length;

    for (let i = 0; i < CONFETTI_COUNT; i++) {
        const confetti = document.createElement("div");
        confetti.className = "confetti";
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.backgroundColor =
            selectedPalette[Math.floor(Math.random() * selectedPalette.length)];
        confetti.style.animationDuration = Math.random() * 3 + 2 + "s";
        confetti.style.opacity = Math.random() * 0.3 + 0.7;
        confetti.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";
        const size = Math.random() * 6 + 6;
        confetti.style.width = confetti.style.height = size + "px";
        confetti.style.boxShadow = "0 0 5px rgba(255, 105, 180, 0.5)";

        wrapper.appendChild(confetti);
        confetti.addEventListener("animationend", () => confetti.remove());
    }
}

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

let isPlaying = false;
let fadeInterval = null;

musicBtn.addEventListener("click", () => {
    if (!isPlaying) {
        // ▶ PLAY with FADE-IN
        music.volume = 0;
        music.muted = false;
        music.play();

        let v = 0;
        fadeInterval = setInterval(() => {
            v += 0.05;
            music.volume = Math.min(v, 0.5);
            if (v >= 0.5) clearInterval(fadeInterval);
        }, 100);

        musicBtn.textContent = "⏸ Pause Music";
        isPlaying = true;

    } else {
        // ⏸ PAUSE (stop fade if running)
        if (fadeInterval) clearInterval(fadeInterval);
        music.pause();
        musicBtn.textContent = "▶ Play Music";
        isPlaying = false;
    }
});

// Add to script.js
function typeWriter() {
    const messageElement = document.querySelector('.message');
    const originalText = messageElement.textContent;
    messageElement.textContent = '';
    
    let i = 0;
    function type() {
        if (i < originalText.length) {
            messageElement.textContent += originalText.charAt(i);
            i++;
            setTimeout(type, 50);
        }
    }
    type();
}

// Create confetti periodically
setInterval(createConfetti, 3000); // Slightly faster for more pink confetti
updateSlide();
createDots();
typeWriter();

// Add pink overlay to confetti wrapper for extra pink vibes
const style = document.createElement('style');
style.textContent = `
    #confetti-wrapper::after {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        background: radial-gradient(circle at 50% 50%, rgba(255, 200, 220, 0.1), transparent 70%);
        z-index: 1002;
    }
`;
document.head.appendChild(style);