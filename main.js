// --- 1. GESTION DU SCROLL POUR LA BANNIÈRE ---
const mainNav = document.getElementById('mainNav');
const topBar = document.getElementById('topBar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        mainNav.classList.add('scrolled');
        topBar.classList.add('scrolled');
    } else {
        mainNav.classList.remove('scrolled');
        topBar.classList.remove('scrolled');
    }
});

// --- 2. GESTION DU DIAPORAMA ET DU TEXTE ---
const slides = document.querySelectorAll('.slide');
const heroTitle = document.getElementById('heroTitle');
const heroText = document.getElementById('heroText');
const pageLang = document.documentElement.lang || 'fr';

const slideData = pageLang === 'en' ? [
    {
        title: 'Welcome to Hama',
        text: 'An unforgettable dining experience where flavors meet elegance.'
    },
    {
        title: 'Authentic Cuisine',
        text: 'Fresh, seasonal ingredients prepared with passion by our chef.'
    },
    {
        title: 'A Warm Setting',
        text: 'Enjoy a convivial moment in our bright and contemporary atmosphere.'
    }
] : [
    {
        title: 'Bienvenue chez Hama',
        text: 'Une expérience gastronomique inoubliable, où les saveurs rencontrent l\'élégance.'
    },
    {
        title: 'Une Cuisine Authentique',
        text: 'Des ingrédients frais et de saison, préparés avec passion par notre chef.'
    },
    {
        title: 'Un Cadre Chaleureux',
        text: 'Profitez d\'un moment convivial dans notre atmosphère lumineuse et contemporaine.'
    }
];

let currentSlide = 0;

function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');

    heroTitle.style.animation = 'none';
    heroText.style.animation = 'none';

    setTimeout(() => {
        heroTitle.innerText = slideData[currentSlide].title;
        heroText.innerText = slideData[currentSlide].text;
        heroTitle.style.animation = 'fadeUp 1s ease-out';
        heroText.style.animation = 'fadeUp 1.5s ease-out';
    }, 50);
}

const dropdown = document.querySelector('.dropdown');
const dropdownLink = dropdown?.querySelector('a');

if (dropdown && dropdownLink) {
    dropdownLink.addEventListener('click', (event) => {
        if (window.innerWidth <= 768) {
            event.preventDefault();
            dropdown.classList.toggle('is-open');
        }
    });

    document.addEventListener('click', (event) => {
        if (!dropdown.contains(event.target)) {
            dropdown.classList.remove('is-open');
        }
    });
}

const reservationForm = document.getElementById('reservationForm');
const reservationMessage = document.getElementById('reservationMessage');

if (reservationForm) {
    reservationForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();

        if (!firstName || !lastName || !email) {
            reservationMessage.textContent = pageLang === 'en' ? 'Please fill in your name and email.' : 'Veuillez renseigner nom, prénom et email.';
            reservationMessage.style.color = '#c0392b';
            return;
        }

        reservationMessage.style.color = '#2a7a3e';
        reservationMessage.textContent = pageLang === 'en'
            ? `Thanks ${firstName}, your reservation request has been sent!`
            : `Merci ${firstName}, votre demande de réservation a bien été envoyée !`;
        reservationForm.reset();
    });
}

setInterval(nextSlide, 6000);
