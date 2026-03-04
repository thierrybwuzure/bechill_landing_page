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

// Carousel

const track = document.querySelector(".carousel-track");
const cards = document.querySelectorAll(".review-card");

let index = 0;

function updateSlide() {
    track.style.transform = `translateX(-${index * 100}%)`;
}

document.querySelector(".next").onclick = function () {

    index++;

    if (index >= cards.length) {
        index = 0;
    }

    updateSlide();

};

document.querySelector(".prev").onclick = function () {

    index--;

    if (index < 0) {
        index = cards.length - 1;
    }

    updateSlide();

};

setInterval(() => {

    index++;

    if (index >= cards.length) {
        index = 0;
    }

    updateSlide();

}, 5000);

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