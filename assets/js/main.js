(() => {
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-nav]");
  const header = document.querySelector("[data-header]");

  if (menuToggle && nav) {
    const menuLabel = menuToggle.querySelector(".sr-only");
    const setMenuState = (open) => {
      nav.classList.toggle("is-open", open);
      menuToggle.setAttribute("aria-expanded", String(open));
      if (menuLabel) menuLabel.textContent = open ? "Close navigation" : "Open navigation";
      if (open && header) header.classList.remove("is-hidden");
    };
    const closeMenu = () => setMenuState(false);

    menuToggle.addEventListener("click", () => {
      setMenuState(!nav.classList.contains("is-open"));
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }

  if (header) {
    let lastScrollY = window.scrollY;
    let scrollTicking = false;

    const updateHeader = () => {
      const currentY = window.scrollY;
      const isMobile = window.matchMedia("(max-width: 760px)").matches;
      const menuOpen = nav && nav.classList.contains("is-open");

      if (!isMobile || currentY < 80 || menuOpen) {
        header.classList.remove("is-hidden");
      } else if (currentY > lastScrollY + 6) {
        header.classList.add("is-hidden");
      } else if (currentY < lastScrollY - 6) {
        header.classList.remove("is-hidden");
      }

      lastScrollY = currentY;
      scrollTicking = false;
    };

    window.addEventListener("scroll", () => {
      if (!scrollTicking) {
        window.requestAnimationFrame(updateHeader);
        scrollTicking = true;
      }
    }, { passive: true });
  }

  const ctaBar = document.querySelector("[data-mobile-cta]");
  const hero = document.getElementById("top");
  const quoteSection = document.getElementById("quote");
  const finalCta = document.querySelector(".final-cta");
  const footer = document.querySelector(".site-footer");

  if (ctaBar && hero && quoteSection && finalCta && footer && "IntersectionObserver" in window) {
    const state = { hero: true, quote: false, final: false, footer: false };

    const updateBar = () => {
      const shouldShow = !state.hero && !state.quote && !state.final && !state.footer;
      ctaBar.classList.toggle("is-visible", shouldShow);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === hero) state.hero = entry.isIntersecting;
        if (entry.target === quoteSection) state.quote = entry.isIntersecting;
        if (entry.target === finalCta) state.final = entry.isIntersecting;
        if (entry.target === footer) state.footer = entry.isIntersecting;
      });
      updateBar();
    }, { threshold: 0 });

    observer.observe(hero);
    observer.observe(quoteSection);
    observer.observe(finalCta);
    observer.observe(footer);
  }

  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });

  const form = document.querySelector("[data-quote-form]");
  const serviceSelect = document.querySelector("[data-service-select]");

  document.querySelectorAll("[data-service-link]").forEach((link) => {
    link.addEventListener("click", () => {
      if (serviceSelect) {
        serviceSelect.value = link.getAttribute("data-service-link") || "";
      }
    });
  });

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!form.reportValidity()) return;

      const data = new FormData(form);
      const clean = (key) => String(data.get(key) || "").trim();

      const lines = [
        "Hello Kleenova, I'd like a cleaning quote.",
        "",
        `Name: ${clean("name")}`,
        `Phone: ${clean("phone")}`,
        `Service: ${clean("service")}`,
        `Area: ${clean("location")}`,
        `Preferred date: ${clean("date") || "Flexible"}`,
        `Preferred timing: ${clean("timing") || "Flexible"}`,
        `Notes: ${clean("notes") || "None provided"}`
      ];

      const url = `https://wa.me/254717826866?text=${encodeURIComponent(lines.join("\n"))}`;
      const newWindow = window.open(url, "_blank", "noopener,noreferrer");
      if (!newWindow) window.location.href = url;
    });
  }
})();