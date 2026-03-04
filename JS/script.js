/**
 * script.js — Mangalam HDPE Landing Page
 * Vanilla JavaScript — No frameworks
 *
 * Sections:
 *  1. Sticky Header  — slides in on scroll-down past viewport/4, hides on scroll-up
 *  2. Mobile Menu    — hamburger toggle, backdrop, body-scroll lock
 *  3. Hero Carousel  — prev/next arrows, thumbnail click, keyboard nav
 *  4. Zoom on Hover  — cursor-tracking zoom panel on main image
 *  5. FAQ Accordion  — open/close with faq-icon-expanded/collapsed.svg images
 *  6. HDPE Stepper   — step chips (desktop), prev/next (mobile)
 *  7. Versatile      — horizontal scroll buttons
 *  8. Testimonials   — dynamic card injection
 *  9. Contact Form   — validation + success state
 */

document.addEventListener("DOMContentLoaded", () => {
  initStickyHeader();
  initMobileMenu();
  initCarousel();
  initFAQ();
  initHDPE();
  initVersatile();
  initTestimonials();
  initContactForm();
});

/* ==============================================
   1. STICKY HEADER
   Mirrors Header.tsx: isSticky true when scrollY > innerHeight/4 AND scrolling DOWN
   ============================================== */
function initStickyHeader() {
  const sticky = document.getElementById("sticky-header");
  if (!sticky) return;

  const threshold = window.innerHeight / 4;

  window.addEventListener(
    "scroll",
    () => {
      const y = window.scrollY;
      if (y > threshold) {
        sticky.classList.add("show");
      } else {
        sticky.classList.remove("show");
      }
    },
    { passive: true },
  );
}

/* ==============================================
   2. MOBILE MENU
   ============================================== */
function initMobileMenu() {
  const menu = document.getElementById("mobile-menu");
  const backdrop = document.getElementById("mobile-backdrop");
  const allHamburgers = [
    document.getElementById("sticky-hamburger"),
    document.getElementById("main-hamburger"),
  ].filter(Boolean);
  const closeX = document.getElementById("mobile-close-x");
  if (!menu) return;

  let open = false;

  function openMenu() {
    open = true;
    menu.classList.add("open");
    backdrop.classList.add("active");
    document.body.style.overflow = "hidden";
    allHamburgers.forEach((b) => {
      b.classList.add("open");
      b.setAttribute("aria-expanded", "true");
    });
  }
  function closeMenu() {
    open = false;
    menu.classList.remove("open");
    backdrop.classList.remove("active");
    document.body.style.overflow = "unset";
    allHamburgers.forEach((b) => {
      b.classList.remove("open");
      b.setAttribute("aria-expanded", "false");
    });
  }

  allHamburgers.forEach((b) =>
    b.addEventListener("click", () => (open ? closeMenu() : openMenu())),
  );
  backdrop.addEventListener("click", closeMenu);
  if (closeX) closeX.addEventListener("click", closeMenu);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && open) closeMenu();
  });
}

/* ==============================================
   3. HERO IMAGE CAROUSEL
   Image filenames match exactly as in HeroSection.tsx
   ============================================== */
function initCarousel() {
  // Exact image filenames from HeroSection.tsx
  const images = [
    { url: "./Assets/product-view-01.png", alt: "HDPE Pipes - View 1" },
    {
      url: "./Assets/product-view-02.jpg",
      alt: "Pipeline Infrastructure - View 2",
    },
    { url: "./Assets/product-view-03.jpg", alt: "Industrial Piping - View 3" },
    { url: "./Assets/product-view-04.jpg", alt: "Pipeline System - View 4" },
    { url: "./Assets/product-view-05.jpg", alt: "Modern Pipes - View 5" },
  ];

  let idx = 0;

  const mainImg = document.getElementById("main-hero-img");
  const counter = document.getElementById("img-counter");
  const thumbsWrap = document.getElementById("thumbnails");
  const prevBtn = document.getElementById("carousel-prev");
  const nextBtn = document.getElementById("carousel-next");
  const zoomPanel = document.getElementById("zoom-panel");
  const imgWrap = document.getElementById("main-img-wrap");

  if (!mainImg) return;

  // Build thumbnail buttons
  images.forEach((img, i) => {
    const btn = document.createElement("button");
    btn.className = "thumb-btn" + (i === 0 ? " active" : "");
    btn.setAttribute("role", "listitem");
    btn.setAttribute("aria-label", `View ${img.alt}`);
    btn.type = "button";
    const im = document.createElement("img");
    im.src = img.url;
    im.alt = img.alt;
    im.loading = "lazy";
    btn.appendChild(im);
    btn.addEventListener("click", () => goTo(i));
    thumbsWrap.appendChild(btn);
  });

  function goTo(i) {
    idx = ((i % images.length) + images.length) % images.length;
    mainImg.style.opacity = "0.5";

    requestAnimationFrame(() => {
      mainImg.src = images[idx].url;
      mainImg.alt = images[idx].alt;
      mainImg.onload = () => {
        mainImg.style.opacity = "1";
      };
      counter.textContent = `${idx + 1} / ${images.length}`;

      // Update zoom panel background
      zoomPanel.style.backgroundImage = `url(${images[idx].url})`;

      // Update thumb active state
      thumbsWrap.querySelectorAll(".thumb-btn").forEach((btn, j) => {
        btn.classList.toggle("active", j === idx);
        btn.setAttribute("aria-current", j === idx ? "true" : "false");
      });
    });
  }

  prevBtn.addEventListener("click", () => goTo(idx - 1));
  nextBtn.addEventListener("click", () => goTo(idx + 1));

  // Keyboard arrows
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") goTo(idx - 1);
    if (e.key === "ArrowRight") goTo(idx + 1);
  });

  /* ---- Zoom on hover (from HeroSection.tsx handleMouseMove) ---- */
  // Set initial bg
  zoomPanel.style.backgroundImage = `url(${images[0].url})`;

  const magnifierCursor = document.getElementById("magnifier-cursor");

  mainImg.addEventListener("mouseenter", () => {
    zoomPanel.style.display = "block";
    if (magnifierCursor) magnifierCursor.style.display = "flex";
  });
  mainImg.addEventListener("mouseleave", () => {
    zoomPanel.style.display = "none";
    if (magnifierCursor) magnifierCursor.style.display = "none";
  });
  mainImg.addEventListener("mousemove", (e) => {
    const rect = mainImg.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / mainImg.width) * 100;
    const y = ((e.clientY - rect.top) / mainImg.height) * 100;
    zoomPanel.style.backgroundPosition = `${x}% ${y}%`;
    if (magnifierCursor) {
      magnifierCursor.style.left = `${e.clientX - 40}px`;
      magnifierCursor.style.top = `${e.clientY - 40}px`;
    }
  });

  // Initial counter
  counter.textContent = `1 / ${images.length}`;
}

/* ==============================================
   4. FAQ ACCORDION
   Uses ./Assets/faq-icon-expanded.svg and ./Assets/faq-icon-collapsed.svg
   Exactly as in FAQSection.tsx
   ============================================== */
function initFAQ() {
  const list = document.getElementById("faq-list");
  if (!list) return;

  const faqs = [
    {
      question: "What is the purpose of a laser cutter for sheet metal?",
      answer:
        "It is designed to cut various types of sheet metal with precision, allowing for intricate designs and shapes that are essential in manufacturing processes.",
    },
    {
      question: "What is the purpose of a laser cutter for sheet metal?",
      answer:
        "It is designed to cut various types of sheet metal with precision, allowing for intricate designs and shapes that are essential in manufacturing processes.",
    },
    {
      question: "What is the purpose of a laser cutter for sheet metal?",
      answer:
        "It is designed to cut various types of sheet metal with precision, allowing for intricate designs and shapes that are essential in manufacturing processes.",
    },
  ];

  let openIdx = null;

  faqs.forEach((faq, i) => {
    const item = document.createElement("div");
    item.className = "faq-item";

    item.innerHTML = `
      <div class="faq-q" role="button" tabindex="0" aria-expanded="false">
        <p class="faq-q-text">${faq.question}</p>
        <img class="faq-toggle-img" src="./Assets/faq-icon-collapsed.svg" alt="" aria-hidden="true" />
      </div>
      <div class="faq-answer">
        <p>${faq.answer}</p>
      </div>
    `;

    const qEl = item.querySelector(".faq-q");
    const img = item.querySelector(".faq-toggle-img");

    function toggle() {
      const isNowOpen = !item.classList.contains("open");

      // Close previously open
      if (openIdx !== null && openIdx !== i) {
        const prev = list.children[openIdx];
        prev.classList.remove("open");
        prev.querySelector(".faq-q").setAttribute("aria-expanded", "false");
        prev.querySelector(".faq-toggle-img").src =
          "./Assets/faq-icon-collapsed.svg";
      }

      item.classList.toggle("open", isNowOpen);
      qEl.setAttribute("aria-expanded", isNowOpen.toString());
      img.src = isNowOpen
        ? "./Assets/faq-icon-expanded.svg"
        : "./Assets/faq-icon-collapsed.svg";
      openIdx = isNowOpen ? i : null;
    }

    qEl.addEventListener("click", toggle);
    qEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      }
    });

    list.appendChild(item);
  });
}

/* ==============================================
   5. HDPE MANUFACTURING STEPPER
   Exactly mirrors HDPESection.tsx
   ============================================== */
function initHDPE() {
  // Steps data exactly from HDPESection.tsx
  const steps = [
    {
      title: "Raw Material",
      heading: "High-Grade Raw Material Selection",
      content:
        "Vacuum sizing tanks ensure precise outer diameter while internal pressure maintains perfect roundness and wall thickness uniformity.",
      features: [
        "PE100 grade material",
        "Optimal molecular weight distribution",
      ],
      image: "./Assets/icon-high-grade.svg",
    },
    {
      title: "Extrusion",
      heading: "Advanced Extrusion Process",
      content:
        "State-of-the-art extrusion technology ensures consistent quality and optimal material properties.",
      features: ["Precision temperature control", "Uniform material flow"],
      image: "./Assets/icon-high-grade.svg",
    },
    {
      title: "Cooling",
      heading: "Controlled Cooling System",
      content:
        "Advanced cooling technology maintains structural integrity and dimensional accuracy.",
      features: ["Water bath cooling", "Temperature monitoring"],
      image: "./Assets/icon-high-grade.svg",
    },
    {
      title: "Sizing",
      heading: "Precision Sizing Process",
      content:
        "Vacuum sizing ensures exact diameter specifications and wall thickness.",
      features: ["Automated sizing control", "Quality verification"],
      image: "./Assets/icon-high-grade.svg",
    },
    {
      title: "Quality Control",
      heading: "Comprehensive Quality Testing",
      content:
        "Multiple quality checkpoints ensure every pipe meets international standards.",
      features: ["Pressure testing", "Dimensional inspection"],
      image: "./Assets/icon-high-grade.svg",
    },
    {
      title: "Marking",
      heading: "Product Identification",
      content:
        "Clear marking system for traceability and compliance verification.",
      features: ["Standard markings", "Batch tracking codes"],
      image: "./Assets/icon-high-grade.svg",
    },
    {
      title: "Cutting",
      heading: "Precision Cutting Process",
      content: "Automated cutting ensures accurate lengths and clean edges.",
      features: ["Length precision", "Clean cut edges"],
      image: "./Assets/icon-high-grade.svg",
    },
    {
      title: "Packaging",
      heading: "Protective Packaging",
      content: "Careful packaging ensures safe transportation and storage.",
      features: ["Protective wrapping", "Secure bundling"],
      image: "./Assets/icon-high-grade.svg",
    },
  ];

  let cur = 0;

  const chipsDesktop = document.getElementById("hdpe-chips-desktop");
  const chipMobile = document.getElementById("hdpe-chip-mobile");
  const heading = document.getElementById("hdpe-step-heading");
  const desc = document.getElementById("hdpe-step-desc");
  const featList = document.getElementById("hdpe-feat-list");
  const img = document.getElementById("hdpe-img");
  const prevBtn = document.getElementById("hdpe-prev");
  const nextBtn = document.getElementById("hdpe-next");
  if (!chipsDesktop) return;

  // Build desktop chips + connecting lines
  steps.forEach((step, i) => {
    const chip = document.createElement("button");
    chip.className = "step-chip" + (i === 0 ? " active" : "");
    chip.textContent = step.title;
    chip.type = "button";
    chip.setAttribute("role", "tab");
    chip.setAttribute("aria-selected", i === 0 ? "true" : "false");
    chip.addEventListener("click", () => setStep(i));
    chipsDesktop.appendChild(chip);

    if (i < steps.length - 1) {
      const line = document.createElement("div");
      line.className = "step-line";
      chipsDesktop.appendChild(line);
    }
  });

  function setStep(i) {
    cur = ((i % steps.length) + steps.length) % steps.length;
    const s = steps[cur];

    // Update content
    heading.textContent = s.heading;
    desc.textContent = s.content;
    featList.innerHTML = "";
    s.features.forEach((f) => {
      const li = document.createElement("li");
      li.className = "hdpe-feat-item";
      li.innerHTML = `<img src="./Assets/icon-check-circle.svg" alt="" aria-hidden="true" />${f}`;
      featList.appendChild(li);
    });
    img.src = s.image;
    img.alt = s.heading;

    // Mobile chip label (mirrors: Step {n}/{total}: {title})
    chipMobile.innerHTML = `<span class="mobile-chip">Step ${cur + 1}/${steps.length}: ${s.title}</span>`;

    // Update desktop chip states
    chipsDesktop.querySelectorAll(".step-chip").forEach((chip, j) => {
      const active = j === cur;
      chip.classList.toggle("active", active);
      chip.setAttribute("aria-selected", active.toString());
    });
  }

  prevBtn.addEventListener("click", () => setStep(cur - 1));
  nextBtn.addEventListener("click", () => setStep(cur + 1));

  setStep(0);
}

/* ==============================================
   6. VERSATILE SECTION — scroll buttons
   Scroll amount: 340 (exact from VersatileSection.tsx)
   ============================================== */
function initVersatile() {
  const carousel = document.getElementById("versatile-carousel");
  const prev = document.getElementById("versatile-prev");
  const next = document.getElementById("versatile-next");
  if (!carousel) return;

  const SCROLL = 340; // from VersatileSection.tsx
  prev.addEventListener("click", () =>
    carousel.scrollBy({ left: -SCROLL, behavior: "smooth" }),
  );
  next.addEventListener("click", () =>
    carousel.scrollBy({ left: SCROLL, behavior: "smooth" }),
  );
}

/* ==============================================
   7. PERFORMANCE / TESTIMONIALS — inject cards
   Uses ./Assets/icon-performance.svg from Testimonial.tsx
   ============================================== */
function initTestimonials() {
  const carousel = document.getElementById("perf-carousel");
  if (!carousel) return;

  // All 4 cards from Testimonial.tsx (same data repeated)
  const testimonials = [
    {
      image: "./Assets/icon-performance.svg",
      heading: "Revolutionized our FIBC production efficiency!",
      content:
        "Meera Industries' TFO machines have revolutionized our FIBC production efficiency. The precision engineering delivers the consistent yarn strength critical for our bulk container applications.",
      profileName: "Johann Mueller",
      profileTitle: "Production Director",
    },
    {
      image: "./Assets/icon-performance.svg",
      heading: "Revolutionized our FIBC production efficiency!",
      content:
        "Meera Industries' TFO machines have revolutionized our FIBC production efficiency. The precision engineering delivers the consistent yarn strength critical for our bulk container applications.",
      profileName: "Johann Mueller",
      profileTitle: "Production Director",
    },
    {
      image: "./Assets/icon-performance.svg",
      heading: "Revolutionized our FIBC production efficiency!",
      content:
        "Meera Industries' TFO machines have revolutionized our FIBC production efficiency. The precision engineering delivers the consistent yarn strength critical for our bulk container applications.",
      profileName: "Johann Mueller",
      profileTitle: "Production Director",
    },
    {
      image: "./Assets/icon-performance.svg",
      heading: "Revolutionized our FIBC production efficiency!",
      content:
        "Meera Industries' TFO machines have revolutionized our FIBC production efficiency. The precision engineering delivers the consistent yarn strength critical for our bulk container applications.",
      profileName: "Johann Mueller",
      profileTitle: "Production Director",
    },
  ];

  testimonials.forEach((t) => {
    const card = document.createElement("div");
    card.className = "perf-card";
    card.innerHTML = `
      <img src="${t.image}" alt="" class="perf-card-img" loading="lazy" />
      <div>
        <p class="perf-card-heading">${t.heading}</p>
        <p class="perf-card-content">${t.content}</p>
      </div>
      <div class="perf-profile">
        <div class="perf-avatar" aria-hidden="true"></div>
        <div>
          <p class="perf-name">${t.profileName}</p>
          <p class="perf-role">${t.profileTitle}</p>
        </div>
      </div>
    `;
    carousel.appendChild(card);
  });
}

/* ==============================================
   8. CONTACT FORM — basic validation
   ============================================== */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const fullName = form.fullName.value.trim();
    const email = form.email.value.trim();

    if (!fullName) {
      alert("Please enter your full name.");
      return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = "✓ Request Sent!";
    btn.disabled = true;
    btn.style.background = "#16a34a";

    setTimeout(() => {
      form.reset();
      btn.textContent = "Request Custom Quote";
      btn.disabled = false;
      btn.style.background = "";
    }, 3000);
  });
}
