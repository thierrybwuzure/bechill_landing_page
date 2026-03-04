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


// Header scroll background
/* window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});


header.scrolled {
    background: #2d2d2d;
    transition: background 0.3s ease;
} */