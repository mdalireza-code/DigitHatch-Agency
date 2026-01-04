(() => {
    "use strict";

    // ====== Navbar Shadow & Active Link ======
    const nav = document.querySelector(".dh-navbar");
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".dh-nav-links .nav-link");

    const handleScroll = () => {
        const scrollY = window.scrollY;

        // Navbar shadow toggle
        if (nav) nav.classList.toggle("shadow", scrollY > 50);

        // Active menu link
        let currentSection = "";
        sections.forEach(section => {
            if (scrollY >= section.offsetTop - 120) {
                currentSection = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle("active", link.getAttribute("href") === `#${currentSection}`);
        });
    };

    window.addEventListener("scroll", handleScroll);

    // ====== Hero Animation on Load ======
    window.addEventListener("load", () => {
        const heroSection = document.querySelector(".animate-hero");
        if (heroSection) {
            setTimeout(() => heroSection.classList.add("show"), 200);
        }
    });

    // ====== Intersection Observer Helper ======
    
    const observeElements = (selector, options = { threshold: 0.5 }) => {
        const elements = document.querySelectorAll(selector);
        if (!elements.length) return;

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    obs.unobserve(entry.target);
                }
            });
        }, options);

        elements.forEach(el => observer.observe(el));
    };

    // ====== Animate Sections ======
    observeElements(".animate-divider", { threshold: 0.5 });
    observeElements(".title-anim-wrap", { threshold: 0.5 });
    observeElements(".process-anim, .arrow-anim", { threshold: 0.4 });
    observeElements(".agency-anim-wrap", { threshold: 0.35 });
    observeElements(".results-anim-wrap", { threshold: 0.4 });

    


})();

const servicesWrap = document.querySelector(".services-anim-wrap");

if (servicesWrap) {
  const servicesObserver = new IntersectionObserver(
    ([entry], obs) => {
      if (entry.isIntersecting) {
        servicesWrap.classList.add("show");
        obs.unobserve(entry.target);
      }
    },
    {
      threshold: 0.15,                 // mobile-safe
      rootMargin: "0px 0px -80px 0px"  // triggers earlier
    }
  );

  servicesObserver.observe(servicesWrap);
}
// Result Sec
(() => {
  "use strict";

  // ====== Count Up Animation ======
  function animateCountUp(element, target, duration = 2000) {
    let start = 0;
    let startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const progressRatio = Math.min(progress / duration, 1);
      const current = Math.floor(progressRatio * target);

      // Format numbers
      if (target >= 1000) {
        element.textContent = (current / 1000).toFixed(0) + "K+";
      } else {
        element.textContent = current + "+";
      }

      if (progress < duration) {
        requestAnimationFrame(step);
      } else {
        // Ensure final value is exact
        if (target >= 1000) {
          element.textContent = (target / 1000) + "K+";
        } else {
          element.textContent = target + "+";
        }
      }
    }

    requestAnimationFrame(step);
  }

  // ====== Intersection Observer for Results Section ======
  const resultsWrap = document.querySelector(".results-anim-wrap") || document.querySelector(".results-grid");

  if (resultsWrap) {
    const observer = new IntersectionObserver(
      ([entry], obs) => {
        if (entry.isIntersecting) {
          // Animate each card's <h3>
          const cards = resultsWrap.querySelectorAll(".result-card h3");
          cards.forEach(card => {
            // Extract number from text (remove + or K)
            const text = card.textContent.replace(/[^\d]/g, "");
            const target = parseInt(text, 10);
            animateCountUp(card, target, 2000);
          });

          obs.unobserve(entry.target);
        }
      },
      {
        threshold: 0.5
      }
    );

    observer.observe(resultsWrap);
  }
})();
