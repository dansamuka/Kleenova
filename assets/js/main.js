(() => {
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-nav]");

  if (menuToggle && nav) {
    const closeMenu = () => {
      nav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    };

    menuToggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(open));
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
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