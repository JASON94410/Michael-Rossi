// Hamburger
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });
}

// Formulaire Formspree sans redirection
const form = document.getElementById("contactForm");
const successMessage = document.getElementById("success-message");

if (form) {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const btn = form.querySelector(".btn-submit");
    const data = new FormData(form);

    btn.textContent = "Envoi en cours...";
    btn.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        form.reset();

        if (successMessage) {
          successMessage.classList.add("show");
        }

        btn.textContent = "✓ Demande envoyée";
      } else {
        btn.textContent = "Envoyer ma demande";
        btn.disabled = false;
        alert("Une erreur est survenue. Veuillez réessayer.");
      }
    } catch (error) {
      console.error(error);
      btn.textContent = "Envoyer ma demande";
      btn.disabled = false;
      alert("Une erreur est survenue. Veuillez réessayer.");
    }
  });
}

// Carrousel avis
(function () {
  const track = document.getElementById("avisTrack");
  const dotsEl = document.getElementById("avisDots");
  const prevBtn = document.getElementById("avisPrev");
  const nextBtn = document.getElementById("avisNext");

  if (!track || !dotsEl || !prevBtn || !nextBtn) return;

  const cards = Array.from(track.querySelectorAll(".avis-card"));
  let current = 0;

  function visibleCount() {
    const w = window.innerWidth;
    if (w <= 600) return 1;
    if (w <= 900) return 2;
    return 3;
  }

  function maxIndex() {
    return Math.max(0, cards.length - visibleCount());
  }

  function buildDots() {
    dotsEl.innerHTML = "";

    const total = maxIndex() + 1;

    for (let i = 0; i < total; i++) {
      const d = document.createElement("button");

      d.className = "avis-dot" + (i === current ? " active" : "");
      d.setAttribute("aria-label", "Avis " + (i + 1));

      d.addEventListener("click", () => {
        goTo(i);
      });

      dotsEl.appendChild(d);
    }
  }

  function goTo(idx) {
    if (!cards[0]) return;

    current = Math.max(0, Math.min(idx, maxIndex()));

    const cardW = cards[0].offsetWidth + 24;

    track.style.transform = `translateX(-${current * cardW}px)`;

    dotsEl.querySelectorAll(".avis-dot").forEach((d, i) => {
      d.classList.toggle("active", i === current);
    });

    prevBtn.disabled = current === 0;
    nextBtn.disabled = current >= maxIndex();
  }

  prevBtn.addEventListener("click", () => {
    goTo(current - 1);
  });

  nextBtn.addEventListener("click", () => {
    goTo(current + 1);
  });

  buildDots();
  goTo(0);

  window.addEventListener("resize", () => {
    buildDots();
    goTo(Math.min(current, maxIndex()));
  });
})();