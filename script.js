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

// Reviews: looping strip, one card at a time, no arrows

const track = document.querySelector(".carousel-track");

if (track) {
    const viewport = track.parentElement;
    const originals = Array.from(track.children);
    const total = originals.length;
    const AUTO_MS = 8000;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Clone the first cards at the end, so the last real card is followed by the first ones
    originals.slice(0, Math.min(total, 4)).forEach((card) => {
        const clone = card.cloneNode(true);
        clone.setAttribute("aria-hidden", "true");
        track.appendChild(clone);
    });

    let index = 0;
    let timer = null;

    function cardStep() {
        const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
        return track.children[0].getBoundingClientRect().width + gap;
    }

    function go(i, animate) {
        track.classList.toggle("no-transition", !animate);
        index = i;
        track.style.transform = `translateX(-${index * cardStep()}px)`;
    }

    // After sliding onto the clones, jump back to the matching real card without animating
    function settle() {
        if (index >= total) {
            go(index - total, false);
        }
    }

    function next() {
        go(index + 1, true);
        if (reducedMotion.matches) {
            settle();
        }
    }

    function prev() {
        if (index === 0) {
            go(total, false);
            void track.offsetWidth;
        }
        go(index - 1, true);
    }

    function start() {
        stop();
        timer = setInterval(() => {
            if (!document.hidden) {
                next();
            }
        }, AUTO_MS);
    }

    function stop() {
        clearInterval(timer);
        timer = null;
    }

    track.addEventListener("transitionend", (e) => {
        if (e.target === track) {
            settle();
        }
    });

    // Pause while the user hovers or focuses the strip
    viewport.addEventListener("mouseenter", stop);
    viewport.addEventListener("mouseleave", start);
    viewport.addEventListener("focusin", stop);
    viewport.addEventListener("focusout", start);

    // Drag the strip with the mouse or a finger; it follows the pointer and snaps to the nearest card
    let drag = null;

    viewport.addEventListener("pointerdown", (e) => {
        if (e.pointerType === "mouse" && e.button !== 0) {
            return;
        }
        stop();
        // The clones look the same as the first cards, so start from them to allow dragging backwards
        if (index === 0) {
            go(total, false);
        }
        drag = { x: e.clientX, base: index * cardStep(), step: cardStep() };
        track.classList.add("no-transition");
        viewport.classList.add("is-dragging");
        viewport.setPointerCapture(e.pointerId);
    });

    viewport.addEventListener("pointermove", (e) => {
        if (drag) {
            track.style.transform = `translateX(${e.clientX - drag.x - drag.base}px)`;
        }
    });

    function endDrag(e) {
        if (!drag) {
            return;
        }
        const moved = Math.round((e.clientX - drag.x) / drag.step);
        const target = Math.min(Math.max(index - moved, 0), total + 1);
        drag = null;
        viewport.classList.remove("is-dragging");
        go(target, true);
        if (reducedMotion.matches) {
            settle();
        }
        // A mouse is still over the strip, so autoplay resumes on mouseleave; a finger has left it
        if (e.pointerType !== "mouse") {
            start();
        }
    }

    viewport.addEventListener("pointerup", endDrag);
    viewport.addEventListener("pointercancel", endDrag);

    window.addEventListener("resize", () => go(index, false));

    start();
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