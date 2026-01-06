(() => {
  "use strict";

  /* =========================
     Helper Functions
  ========================== */
  const $ = (selector, all = false) =>
    all ? document.querySelectorAll(selector) : document.querySelector(selector);

  /* =========================
     Navbar Shadow + Active Page
  ========================== */
  const navbar = $(".dh-navbar");

  window.addEventListener("scroll", () => {
    if (navbar) {
      navbar.classList.toggle("shadow", window.scrollY > 50);
    }
  });

  /* =========================
     Smooth Scroll (ONLY #links)
  ========================== */
  document.querySelectorAll(".navbar-nav .nav-link").forEach(link => {
    link.addEventListener("click", e => {
      const href = link.getAttribute("href");

      // Only smooth-scroll for same-page anchors
      if (href && href.startsWith("#")) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          window.scrollTo({
            top: target.offsetTop - 80,
            behavior: "smooth"
          });
        }
      }
      // External pages (services.html etc) work normally
    });
  });

  /* =========================
     Active Nav Link (Multi-Page)
  ========================== */
  const currentPage = location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".navbar-nav .nav-link").forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("active");
    }
  });

  /* =========================
     Intersection Observer Helper
  ========================== */
  const observe = (selector, options = {}) => {
    const elements = $(selector, true);
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

  /* =========================
     Hero Animation
  ========================== */
  window.addEventListener("load", () => {
    const hero = $(".animate-hero");
    if (hero) {
      setTimeout(() => hero.classList.add("show"), 200);
    }
  });

  /* =========================
     Section Animations
  ========================== */
  observe(".animate-divider");
  observe(".title-anim-wrap");
  observe(".process-anim, .arrow-anim", { threshold: 0.4 });
  observe(".agency-anim-wrap", { threshold: 0.35 });
  observe(".results-anim-wrap", { threshold: 0.4 });
  observe(".testimonials-anim-wrap", { threshold: 0.4 });
  observe(".projects-anim-wrap", { threshold: 0.35 });
  observe(".services-anim-wrap", {
    threshold: 0.15,
    rootMargin: "0px 0px -80px 0px"
  });

  /* =========================
     Count-Up Animation
  ========================== */
  const animateCount = (el, target, duration = 2000) => {
    let start = null;

    const step = time => {
      if (!start) start = time;
      const progress = Math.min((time - start) / duration, 1);
      const value = Math.floor(progress * target);

      el.textContent =
        target >= 1000 ? `${Math.floor(value / 1000)}K+` : `${value}+`;

      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  const resultsWrap = $(".results-anim-wrap");
  if (resultsWrap) {
    const observer = new IntersectionObserver(([entry], obs) => {
      if (entry.isIntersecting) {
        resultsWrap.querySelectorAll(".result-card h3").forEach(el => {
          const target = parseInt(el.textContent.replace(/\D/g, ""), 10);
          animateCount(el, target);
        });
        obs.unobserve(resultsWrap);
      }
    }, { threshold: 0.5 });

    observer.observe(resultsWrap);
  }

  /* =========================
     Testimonial Slider
  ========================== */
  const track = $(".testimonial-cards");
  const prev = $(".testimonial-nav .nav-btn:first-child");
  const next = $(".testimonial-nav .nav-btn:last-child");

  if (track && prev && next) {
    let index = 0;

    const updateSlider = () => {
      const visible = window.innerWidth <= 1024 ? 1 : 3;
      const max = track.children.length - visible;
      index = Math.max(0, Math.min(index, max));

      const cardWidth = track.children[0].offsetWidth + 28;
      track.style.transform = `translateX(-${index * cardWidth}px)`;
    };

    prev.addEventListener("click", () => {
      index--;
      updateSlider();
    });

    next.addEventListener("click", () => {
      index++;
      updateSlider();
    });

    window.addEventListener("resize", updateSlider);
    updateSlider();
  }

  /* =========================
     Latest Post & Footer Fade-In
  ========================== */
  const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.2 });

  [".latest-post-section", ".footer-section"].forEach(sel => {
    const el = $(sel);
    if (el) fadeObserver.observe(el);
  });

})();




// =====================================================================================

// Set launch date (CHANGE THIS DATE)
  const launchDate = new Date("2026-02-01T00:00:00").getTime();

  const timer = setInterval(() => {
    const now = new Date().getTime();
    const distance = launchDate - now;

    if (distance < 0) {
      clearInterval(timer);
      document.querySelector(".countdown").innerHTML = "WE ARE LIVE!";
      return;
    }

    document.getElementById("days").textContent =
      Math.floor(distance / (1000 * 60 * 60 * 24));

    document.getElementById("hours").textContent =
      Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    document.getElementById("minutes").textContent =
      Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    document.getElementById("seconds").textContent =
      Math.floor((distance % (1000 * 60)) / 1000);
  }, 1000);
