// ==============================
// CUSTOM CURSOR
// ==============================
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  follower.style.transform = `translate(${followerX}px, ${followerY}px) translate(-50%, -50%)`;
  requestAnimationFrame(animateFollower);
}
animateFollower();

// Scale cursor on interactive elements
const interactives = document.querySelectorAll('a, button, input, textarea, .project-card, .skill-category');
interactives.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform += ' scale(2)';
    follower.style.transform += ' scale(1.5)';
    follower.style.borderColor = 'var(--accent2)';
  });
  el.addEventListener('mouseleave', () => {
    follower.style.borderColor = 'var(--accent)';
  });
});

// ==============================
// NAVBAR SCROLL
// ==============================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ==============================
// MOBILE MENU
// ==============================
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');
let menuOpen = false;

menuBtn.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
  const spans = menuBtn.querySelectorAll('span');
  if (menuOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
    spans[1].style.transform = 'rotate(-45deg) translate(4px, -4px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.transform = '';
  }
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    mobileMenu.classList.remove('open');
    const spans = menuBtn.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.transform = '';
  });
});

// ==============================
// HERO TITLE REVEAL
// ==============================
window.addEventListener('load', () => {
  const lines = document.querySelectorAll('.reveal-line');
  lines.forEach((line, i) => {
    setTimeout(() => {
      line.classList.add('visible');
    }, 200 + i * 180);
  });
});

// ==============================
// SCROLL REVEAL
// ==============================
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 0.08}s`;
  revealObserver.observe(el);
});

// ==============================
// SKILL BARS ANIMATION
// ==============================
const bars = document.querySelectorAll('.bar-fill');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target;
      const width = fill.getAttribute('data-width');
      setTimeout(() => {
        fill.style.width = width + '%';
      }, 200);
      barObserver.unobserve(fill);
    }
  });
}, { threshold: 0.5 });

bars.forEach(bar => barObserver.observe(bar));

// ==============================
// ACTIVE NAV LINKS
// ==============================
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchors.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--accent)' : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));





// ==============================
// SMOOTH SCROLL OFFSET (for fixed nav)
// ==============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ==============================
// PARALLAX ON HERO BG TEXT
// ==============================
const heroBgText = document.querySelector('.hero-bg-text');
window.addEventListener('scroll', () => {
  if (heroBgText) {
    const y = window.scrollY * 0.3;
    heroBgText.style.transform = `translateY(calc(-50% + ${y}px))`;
  }
});