// Ambient sound toggle
const playAmbientBtn = document.getElementById('playAmbient');
const ambientAudio = document.getElementById('ambientAudio');
let isPlaying = false;

playAmbientBtn.addEventListener('click', () => {
  if (isPlaying) {
    ambientAudio.pause();
    playAmbientBtn.textContent = '▶ Play Space Ambience';
  } else {
    ambientAudio.play(); 
    playAmbientBtn.textContent = '⏸ Pause Ambience';
  }
  isPlaying = !isPlaying;
});

// Gallery lightbox
const galleryImgs = document.querySelectorAll('.gallery-grid img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const closeLightbox = document.querySelector('.close-lightbox');

galleryImgs.forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightboxCaption.textContent = img.dataset.caption;
    lightbox.classList.add('show');
  });
});

closeLightbox.addEventListener('click', () => {
  lightbox.classList.remove('show');
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove('show');
  }
});

// Sound cards
const soundCards = document.querySelectorAll('.sound-card');
let currentAudio = null;
let currentBtn = null;

soundCards.forEach(card => {
  const btn = card.querySelector('.play-btn');
  const soundUrl = card.dataset.sound;

  btn.addEventListener('click', () => {
    if (currentAudio && !currentAudio.paused) {
      currentAudio.pause();
      currentBtn.textContent = '▶';
      currentBtn.classList.remove('playing');

      if (currentBtn === btn) {
        currentAudio = null;
        currentBtn = null;
        return;
      }
    }

    currentAudio = new Audio(soundUrl);
    currentAudio.loop = true;
    currentAudio.play();
    currentBtn = btn;
    btn.textContent = '⏸';
    btn.classList.add('playing');

    currentAudio.addEventListener('ended', () => {
      btn.textContent = '▶';
      btn.classList.remove('playing');
    });
  });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Animate timeline items on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      entry.target.style.animationDelay = `${index * 0.1}s`;
      entry.target.style.opacity = '1';
    }
  });
});

document.querySelectorAll('.timeline-item').forEach(item => {
  item.style.opacity = '0';
  observer.observe(item);
});

// Space Facts
const spaceFacts = [
  "The universe is about 13.8 billion years old, and our solar system formed about 4.6 billion years ago.",
  "A day on Venus is longer than its year. It takes 243 Earth days to rotate once, but only 225 days to orbit the Sun.",
  "There are more possible games of chess than there are atoms in the observable universe.",
  "The Sun accounts for 99.86% of the mass in our solar system.",
  "Neutron stars are so dense that a teaspoon of neutron star material would weigh about 10 million tons.",
  "The International Space Station travels at about 17,500 miles per hour, orbiting Earth every 90 minutes.",
  "Jupiter's Great Red Spot is a storm that has been raging for at least 400 years, possibly much longer.",
  "Light from the Sun takes about 8 minutes to reach Earth, but light from the nearest star takes 4.24 years.",
  "The Moon is slowly moving away from Earth at a rate of about 3.8 cm per year.",
  "There are more stars in the universe than grains of sand on all the beaches on Earth.",
  "The coldest temperature ever recorded in the universe is -273.15°C (absolute zero), achieved in laboratories on Earth.",
  "Black holes can have the mass of millions of suns but be smaller than a city.",
  "The first image of a black hole was captured in 2019 by the Event Horizon Telescope.",
  "Mars has the largest volcano in the solar system: Olympus Mons, which is about 13.6 miles high.",
  "Saturn's rings are made mostly of ice particles, with some rocky debris and dust."
];
