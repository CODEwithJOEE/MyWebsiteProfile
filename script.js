// Mobile nav toggle with accessibility
      const hamburger = document.getElementById("hamburger");
      const nav = document.getElementById("primary-nav");

      function toggleMenu(force) {
        const wantOpen =
          typeof force === "boolean"
            ? force
            : !nav.classList.contains("active");
        nav.classList.toggle("active", wantOpen);
        hamburger.setAttribute("aria-expanded", String(wantOpen));
      }

      hamburger.addEventListener("click", () => toggleMenu());
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") toggleMenu(false);
      });

      // Typed effect with reduced-motion respect
      document.addEventListener("DOMContentLoaded", function () {
        const typedElement = document.querySelector(".typed");
        if (!typedElement) return;

        const prefersReduced = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;
        let items = typedElement.getAttribute("data-typed-items") || "";
        items = items
          .split(",")
          .map((i) => i.trim())
          .filter(Boolean);
        if (!items.length) return;

        if (prefersReduced) {
          typedElement.textContent = items[0];
          return;
        }

        let index = 0,
          charIndex = 0,
          isDeleting = false;

        function typeEffect() {
          const current = items[index % items.length];
          typedElement.textContent = isDeleting
            ? current.substring(0, charIndex--)
            : current.substring(0, charIndex++);

          if (!isDeleting && charIndex === current.length) {
            setTimeout(() => (isDeleting = true), 1000);
          } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            index++;
          }
          setTimeout(typeEffect, isDeleting ? 30 : 120);
        }
        typeEffect();
      });

            document
        .getElementById("copyEmail")
        .addEventListener("click", async () => {
          const email = "bunalanjohnclerk@gmail.com";
          try {
            await navigator.clipboard.writeText(email);
            document.getElementById("copyEmail").textContent = "Copied!";
            setTimeout(
              () =>
                (document.getElementById("copyEmail").textContent =
                  "Copy email"),
              1500
            );
          } catch (e) {}
        });

      // Mailto form (no backend)
      document.getElementById("contactForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value.trim();
        const reply = document.getElementById("reply").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        const bodyLines = [`Name: ${name}`, `Email: ${reply}`, "", message];
        const body = encodeURIComponent(bodyLines.join("\\n"));
        const mailto = `mailto:bunalanjohnclerk@gmail.com?subject=${encodeURIComponent(
          subject
        )}&body=${body}`;
        window.location.href = mailto;
      });