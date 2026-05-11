const revealElements = document.querySelectorAll(".reveal");
const counterElements = document.querySelectorAll(".count");
const countdown = document.querySelector(".countdown-timer");

const revealOnScroll = () => {
  const triggerPoint = window.innerHeight * 0.85;
  revealElements.forEach((el) => {
    const top = el.getBoundingClientRect().top;
    if (top < triggerPoint) {
      el.classList.add("visible");
    }
  });
};

const animateCounters = () => {
  counterElements.forEach((el) => {
    if (el.dataset.animated) return;
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight * 0.85) {
      el.dataset.animated = "true";
      const target = Number(el.dataset.target || 0);
      let current = 0;
      const increment = Math.max(1, Math.floor(target / 80));

      const tick = () => {
        current += increment;
        if (current >= target) {
          el.textContent = target;
          return;
        }
        el.textContent = current;
        requestAnimationFrame(tick);
      };

      tick();
    }
  });
};

const updateCountdown = () => {
  if (!countdown) return;
  const deadline = new Date(countdown.dataset.deadline);
  const now = new Date();
  const diff = deadline - now;

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  if (diff <= 0) {
    [daysEl, hoursEl, minutesEl, secondsEl].forEach((el) => (el.textContent = "00"));
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  daysEl.textContent = String(days).padStart(2, "0");
  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(seconds).padStart(2, "0");
};

const smoothScrollButtons = document.querySelectorAll("[data-scroll]");

smoothScrollButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.querySelector(button.dataset.scroll);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

window.addEventListener("scroll", () => {
  revealOnScroll();
  animateCounters();
});

revealOnScroll();
animateCounters();
updateCountdown();
setInterval(updateCountdown, 1000);
