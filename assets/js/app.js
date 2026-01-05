(() => {
  "use strict";

  // ====== Helper Functions ======

  const select = (selector, all = false) =>
    all ? document.querySelectorAll(selector) : document.querySelector(selector);

  const on = (event, selector, handler, all = false) => {
    const elements = select(selector, all);
    if (!elements) return;
    if (all) elements.forEach(el => el.addEventListener(event, handler));
    else elements.addEventListener(event, handler);
  };

  const observeElements = (selector, options = { threshold: 0.5 }) => {
    const elements = select(selector, true);
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

  // ====== Navbar Shadow & Active Link ======
  const nav = select(".dh-navbar");
  const sections = select("section[id]", true);
  const navLinks = select(".dh-nav-links .nav-link", true);

  const handleNavScroll = () => {
    const scrollY = window.scrollY;

    if (nav) nav.classList.toggle("shadow", scrollY > 50);

    let currentSection = "";
    sections.forEach(section => {
      if (scrollY >= section.offsetTop - 120) currentSection = section.id;
    });

    navLinks.forEach(link => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${currentSection}`
      );
    });
  };
  window.addEventListener("scroll", handleNavScroll);

  // ====== Hero Animation on Load ======
  window.addEventListener("load", () => {
    const hero = select(".animate-hero");
    if (hero) setTimeout(() => hero.classList.add("show"), 200);
  });

  // ====== Section Animations ======
  observeElements(".animate-divider");
  observeElements(".title-anim-wrap");
  observeElements(".process-anim, .arrow-anim", { threshold: 0.4 });
  observeElements(".agency-anim-wrap", { threshold: 0.35 });
  observeElements(".results-anim-wrap", { threshold: 0.4 });
  observeElements(".testimonials-anim-wrap", { threshold: 0.4 });
  observeElements(".projects-anim-wrap", { threshold: 0.35 });
  observeElements(".services-anim-wrap", { threshold: 0.15, rootMargin: "0px 0px -80px 0px" });

  // ====== Count Up Animation ======
  const animateCountUp = (el, target, duration = 2000) => {
    let startTime = null;

    const step = timestamp => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const current = Math.floor(progress * target);

      el.textContent =
        target >= 1000
          ? `${Math.floor(current / 1000)}K+`
          : `${current}+`;

      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target >= 1000 ? `${target / 1000}K+` : `${target}+`;
    };

    requestAnimationFrame(step);
  };

  const resultsWrap = select(".results-anim-wrap") || select(".results-grid");
  if (resultsWrap) {
    const resultsObserver = new IntersectionObserver(([entry], obs) => {
      if (entry.isIntersecting) {
        resultsWrap.querySelectorAll(".result-card h3").forEach(card => {
          const target = parseInt(card.textContent.replace(/\D/g, ""), 10);
          animateCountUp(card, target, 2000);
        });
        obs.unobserve(resultsWrap);
      }
    }, { threshold: 0.5 });

    resultsObserver.observe(resultsWrap);
  }

  // ====== Testimonial Slider ======
  const track = select(".testimonial-cards");
  const prevBtn = select(".testimonial-nav .nav-btn:first-child");
  const nextBtn = select(".testimonial-nav .nav-btn:last-child");

  if (track && prevBtn && nextBtn) {
    const cards = track.children;
    let index = 0;

    const updateSlider = () => {
      const visibleCards = window.innerWidth <= 1024 ? 1 : 3;
      const maxIndex = cards.length - visibleCards;
      index = Math.min(Math.max(index, 0), maxIndex);

      const cardWidth = cards[0].offsetWidth + 28; // includes gap
      track.style.transform = `translateX(-${index * cardWidth}px)`;
    };

    nextBtn.addEventListener("click", () => { index++; updateSlider(); });
    prevBtn.addEventListener("click", () => { index--; updateSlider(); });
    window.addEventListener("resize", updateSlider);

    updateSlider();
  }

  // ====== Latest Post & Footer Animation ======
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.2 });

  ["latest-post-section", "footer-section"].forEach(selector => {
    const el = select(`.${selector}`);
    if (el) observer.observe(el);
  });

})();


(() => {
  "use strict";

  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  const sections = document.querySelectorAll("section[id]");

  // Smooth scroll (optional if CSS scroll-behavior is not used)
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const targetId = link.getAttribute("href").slice(1); // remove #
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 80, // adjust offset for sticky navbar
          behavior: "smooth"
        });
      }
    });
  });

  // Active link highlighting on scroll
  const handleActiveLink = () => {
    const scrollPos = window.scrollY + 90; // adjust for navbar height
    let currentSection = "";

    sections.forEach(section => {
      if (scrollPos >= section.offsetTop) {
        currentSection = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${currentSection}`
      );
    });
  };

  window.addEventListener("scroll", handleActiveLink);
  window.addEventListener("load", handleActiveLink);

})();
