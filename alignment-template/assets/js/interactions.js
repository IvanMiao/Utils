function initLimitTabs(limits) {
  const tabs = document.querySelectorAll(".tab");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((item) => item.setAttribute("aria-selected", "false"));
      tab.setAttribute("aria-selected", "true");

      const selected = limits.find((limit) => limit.id === tab.dataset.limitId);
      renderLimitDetail(selected);
    });
  });
}

function initOutputCards() {
  const cards = document.querySelectorAll(".matrix-card");
  cards.forEach((card) => {
    const toggle = () => {
      const isOpen = card.getAttribute("aria-expanded") === "true";
      card.setAttribute("aria-expanded", String(!isOpen));
    };

    card.addEventListener("click", toggle);
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggle();
      }
    });
  });
}

function initOutputToggle() {
  const currentButton = document.querySelector("#toggleOutputs");
  const button = currentButton.cloneNode(true);
  currentButton.replaceWith(button);

  button.addEventListener("click", () => {
    const cards = document.querySelectorAll(".matrix-card");
    const shouldOpen = button.getAttribute("aria-pressed") === "false";
    cards.forEach((card) => card.setAttribute("aria-expanded", String(shouldOpen)));
    button.setAttribute("aria-pressed", String(shouldOpen));
    button.textContent = shouldOpen ? "Tout masquer" : "Tout afficher";
  });
}

function initProgress(steps) {
  const progress = document.querySelector("#progressFill");
  const cards = document.querySelectorAll(".step-card");

  const observer = new IntersectionObserver(
    (entries) => {
      const visibleIndexes = entries
        .filter((entry) => entry.isIntersecting)
        .map((entry) => Number(entry.target.dataset.index));

      if (!visibleIndexes.length) return;
      const current = Math.max(...visibleIndexes) + 1;
      progress.style.width = `${(current / steps.length) * 100}%`;
    },
    { threshold: 0.45 },
  );

  cards.forEach((card, index) => {
    card.dataset.index = index;
    observer.observe(card);
  });
}
