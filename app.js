/* ===============================
   PAGE ENTER ANIMATION
================================ */
document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("page-enter");
});

/* ===============================
   IMAGE POPUP
================================ */
const popup = document.getElementById("img-popup");
const popupImg = document.getElementById("popup-img");
const closePopup = document.getElementById("popup-close");

document.querySelectorAll(".certificate-img, .album-img").forEach(img => {
    img.addEventListener("click", () => {
        popupImg.src = img.getAttribute("data-full") || img.src;
        popup.style.display = "flex";
    });
});

if (closePopup) {
    closePopup.addEventListener("click", () => {
        popup.style.display = "none";
        popupImg.src = "";
    });
}

if (popup) {
    popup.addEventListener("click", e => {
        if (e.target === popup) {
            popup.style.display = "none";
            popupImg.src = "";
        }
    });
}

/* ===============================
   HEADER AUTO HIDE
================================ */
let lastScrollY = window.scrollY;
const header = document.querySelector("header");
const hoverZone = document.querySelector(".header-hover-zone");

window.addEventListener("scroll", () => {
    if (!header) return;

    if (window.scrollY > lastScrollY && window.scrollY > 120) {
        header.classList.add("nav-hidden");
    } else {
        header.classList.remove("nav-hidden");
    }

    lastScrollY = window.scrollY;
});

if (hoverZone && header) {
    hoverZone.addEventListener("mouseenter", () => {
        header.classList.remove("nav-hidden");
    });
}

/* ===============================
   SCROLL REVEAL ANIMATION
================================ */
const revealElements = document.querySelectorAll(
    ".hero-info, .about-me-container, .info-cards, .album-card, .tour-card, .album-big-card"
);

revealElements.forEach((el, i) => {
    el.classList.add("reveal");
    el.classList.add(`reveal-delay-${(i % 4) + 1}`);
});

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        }
    });
}, { threshold: 0.15 });

revealElements.forEach(el => observer.observe(el));

/* ===============================
   ABOUT IMAGE MOUSE PARALLAX
================================ */
const aboutImg = document.querySelector(".about-me-image img");

if (aboutImg) {
    window.addEventListener("mousemove", e => {
        const x = (window.innerWidth / 2 - e.clientX) / 30;
        const y = (window.innerHeight / 2 - e.clientY) / 30;
        aboutImg.style.transform = `translate(${x}px, ${y}px)`;
    });
}

/* ===============================
   CANVAS SETUP
================================ */
const canvas = document.getElementById("space-bg");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

/* ===============================
   🧲 MOUSE-REACTIVE GRID WARP
================================ */
let mouseX = -9999;
let mouseY = -9999;
let time = 0;

const gridSize = 50;
const warpRadius = 180;
const warpStrength = 40;

window.addEventListener("mousemove", e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

window.addEventListener("mouseleave", () => {
    mouseX = -9999;
    mouseY = -9999;
});

function drawWarpGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    /* ===== BLUE THEME BACKGROUND ===== */
    const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width
    );

    gradient.addColorStop(0, "#0b1d4d");
    gradient.addColorStop(0.6, "#050b24");
    gradient.addColorStop(1, "#020617");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    /* ===== GRID STYLE ===== */
    ctx.strokeStyle = "rgba(124, 138, 255, 0.28)";
    ctx.lineWidth = 1;

    time += 0.01;

    /* ===== VERTICAL LINES ===== */
    for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath();
        for (let y = 0; y <= canvas.height; y += 8) {
            const dx = x - mouseX;
            const dy = y - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            let offset = 0;
            if (dist < warpRadius) {
                offset =
                    Math.sin((warpRadius - dist) * 0.06 + time * 4) *
                    warpStrength *
                    (1 - dist / warpRadius);
            }

            ctx.lineTo(x + offset, y);
        }
        ctx.stroke();
    }

    /* ===== HORIZONTAL LINES ===== */
    for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath();
        for (let x = 0; x <= canvas.width; x += 8) {
            const dx = x - mouseX;
            const dy = y - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            let offset = 0;
            if (dist < warpRadius) {
                offset =
                    Math.cos((warpRadius - dist) * 0.06 + time * 4) *
                    warpStrength *
                    (1 - dist / warpRadius);
            }

            ctx.lineTo(x, y + offset);
        }
        ctx.stroke();
    }

    requestAnimationFrame(drawWarpGrid);
}

drawWarpGrid();

/* ===============================
   PAGE EXIT TRANSITION
================================ */
document.querySelectorAll("a").forEach(link => {
    const href = link.getAttribute("href");

    if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("http") ||
        link.target === "_blank"
    ) return;

    link.addEventListener("click", e => {
        e.preventDefault();
        document.body.classList.add("page-exit");

        setTimeout(() => {
            window.location.href = href;
        }, 500);
    });
});

const backBtn = document.querySelector('.back-btn');

window.addEventListener('scroll', () => {
    if (!backBtn) return;

    if (window.scrollY > lastScrollY) {
        // scrolling DOWN → hide
        backBtn.classList.add('hide');
    } else {
        // scrolling UP → show
        backBtn.classList.remove('hide');
    }

    lastScrollY = window.scrollY;
});

