// Menu burger JS
const burgerBtn = document.getElementById('burgerBtn');
const burgerMenu = document.getElementById('burgerMenu');

burgerBtn.addEventListener('click', () => {
    burgerMenu.classList.toggle('open');
});

// Optionally close menu when clicking outside
window.addEventListener('click', (e) => {
    if (!burgerBtn.contains(e.target) && !burgerMenu.contains(e.target)) {
        burgerMenu.classList.remove('open');
    }
});

// Reviews: a slow continuous scroll that loops, paused while the pointer or the focus is on the strip

const track = document.querySelector(".carousel-track");

if (track) {
    const viewport = track.parentElement;
    const originals = Array.from(track.children);
    const total = originals.length;
    const SPEED = 28; // pixels per second: slow on purpose
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Clone the first cards at the end, so the strip is never empty while it wraps around
    originals.slice(0, Math.min(total, 4)).forEach((card) => {
        const clone = card.cloneNode(true);
        clone.setAttribute("aria-hidden", "true");
        track.appendChild(clone);
    });

    // The scrolling is done here, frame by frame, so the CSS transition is not wanted
    track.classList.add("no-transition");

    let loop = 0;       // width of the real cards plus their gaps: the distance after which the strip repeats
    let offset = 0;     // how far the strip has scrolled, between 0 and loop
    let hovering = false;
    let focused = false;
    let dragging = false;
    let last = null;

    function measure() {
        const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
        const step = track.children[0].getBoundingClientRect().width + gap;
        loop = step * total;
    }

    function wrap() {
        if (loop > 0) {
            offset = ((offset % loop) + loop) % loop;
        }
    }

    function paint() {
        track.style.transform = `translateX(${-offset}px)`;
    }

    function frame(now) {
        if (last !== null) {
            const dt = Math.min(now - last, 100) / 1000;
            if (!hovering && !focused && !dragging && !reducedMotion.matches && !document.hidden) {
                offset += SPEED * dt;
                wrap();
                paint();
            }
        }
        last = now;
        requestAnimationFrame(frame);
    }

    // Pause while the user hovers or focuses the strip
    viewport.addEventListener("mouseenter", () => { hovering = true; });
    viewport.addEventListener("mouseleave", () => { hovering = false; });
    viewport.addEventListener("focusin", () => { focused = true; });
    viewport.addEventListener("focusout", () => { focused = false; });

    // Drag the strip with the mouse or a finger; it follows the pointer and keeps going from where it was left
    let drag = null;

    viewport.addEventListener("pointerdown", (e) => {
        if (e.pointerType === "mouse" && e.button !== 0) {
            return;
        }
        dragging = true;
        drag = { x: e.clientX, from: offset };
        viewport.classList.add("is-dragging");
        viewport.setPointerCapture(e.pointerId);
    });

    viewport.addEventListener("pointermove", (e) => {
        if (drag) {
            offset = drag.from - (e.clientX - drag.x);
            wrap();
            paint();
        }
    });

    function endDrag() {
        if (!drag) {
            return;
        }
        drag = null;
        dragging = false;
        viewport.classList.remove("is-dragging");
    }

    viewport.addEventListener("pointerup", endDrag);
    viewport.addEventListener("pointercancel", endDrag);

    window.addEventListener("resize", () => {
        measure();
        wrap();
        paint();
    });

    measure();
    // The webfonts change the height and width of the cards once loaded
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
            measure();
            wrap();
            paint();
        });
    }
    requestAnimationFrame(frame);
}

// Back to top button: appears once the visitor has scrolled past the first screen

const toTop = document.getElementById("toTop");

if (toTop) {
    let ticking = false;

    function updateToTop() {
        ticking = false;
        toTop.classList.toggle("is-visible", window.scrollY > window.innerHeight * 0.8);
    }

    window.addEventListener("scroll", () => {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(updateToTop);
        }
    }, { passive: true });

    updateToTop();
}

// Header scroll background
/* window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

CSS
header.scrolled {
    background: #2d2d2d;
    transition: background 0.3s ease;
} */