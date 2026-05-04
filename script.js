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
