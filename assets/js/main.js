(() => {
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-nav]");

  if (menuToggle && nav) {
    const menuLabel = menuToggle.querySelector(".sr-only");
    const setMenuState = (open) => {
      nav.classList.toggle("is-open", open);
      menuToggle.setAttribute("aria-expanded", String(open));
      if (menuLabel) menuLabel.textContent = open ? "Close navigation" : "Open navigation";
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

  const ctaBar = document.querySelector("[data-mobile-cta]");
  const hero = document.getElementById("top");
  const quoteSection = document.getElementById("quote");
  const footer = document.querySelector(".site-footer");

  if (ctaBar && hero && quoteSection && footer && "IntersectionObserver" in window) {
    const state = { hero: true, quote: false, footer: false };

    const updateBar = () => {
      const shouldShow = !state.hero && !state.quote && !state.footer;
      ctaBar.classList.toggle("is-visible", shouldShow);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === hero) state.hero = entry.isIntersecting;
        if (entry.target === quoteSection) state.quote = entry.isIntersecting;
        if (entry.target === footer) state.footer = entry.isIntersecting;
      });
      updateBar();
    }, { threshold: 0 });

    observer.observe(hero);
    observer.observe(quoteSection);
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