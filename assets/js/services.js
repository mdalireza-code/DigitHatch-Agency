document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".animate-hero");
  setTimeout(() => {
    hero.classList.add("show");
  }, 300);
});

// Services Section

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".animate-service");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0.2 });

  cards.forEach(card => observer.observe(card));
});

// 

// Animate on scroll benefit Section
const whySection = document.querySelector('.why-choose-section');
const observer = new IntersectionObserver(([entry]) => {
  if (entry.isIntersecting) {
    document.querySelector('.why-content').classList.add('show');
    document.querySelector('.why-image').classList.add('show');
  }
}, { threshold: 0.3 });

observer.observe(whySection);

