"use strict";

// Progressive enhancement: every page and project link works without JavaScript.
document.documentElement.classList.add("js");

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");
function setMenu(open) {
  if (!menuButton || !navigation) return;
  menuButton.setAttribute("aria-expanded", String(open));
  navigation.classList.toggle("is-open", open);
  const label = menuButton.querySelector(".menu-label");
  if (label) label.textContent = open ? "Close" : "Menu";
}
if (menuButton && navigation) {
  menuButton.addEventListener("click", () => setMenu(menuButton.getAttribute("aria-expanded") !== "true"));
  navigation.querySelectorAll("a").forEach(link => link.addEventListener("click", () => setMenu(false)));
  document.addEventListener("click", event => {
    if (menuButton.getAttribute("aria-expanded") === "true" && !event.target.closest(".site-header")) setMenu(false);
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
      setMenu(false);
      menuButton.focus();
    }
  });
  window.addEventListener("resize", () => { if (window.innerWidth > 900) setMenu(false); });
}

document.querySelectorAll("[data-year]").forEach(item => { item.textContent = new Date().getFullYear(); });

const filterButtons = Array.from(document.querySelectorAll("[data-filter]"));
const projectCards = Array.from(document.querySelectorAll("[data-project-category]"));
const filterStatus = document.querySelector("#filter-status");
function filterProjects(category) {
  if (!filterButtons.some(button => button.dataset.filter === category)) category = "all";
  let count = 0;
  projectCards.forEach(card => {
    const visible = category === "all" || card.dataset.projectCategory === category;
    card.hidden = !visible;
    if (visible) count += 1;
  });
  filterButtons.forEach(button => button.setAttribute("aria-pressed", String(button.dataset.filter === category)));
  if (filterStatus) filterStatus.textContent = `Showing ${count} ${count === 1 ? "project" : "projects"}.`;
}
if (filterButtons.length) {
  filterProjects(new URLSearchParams(window.location.search).get("filter") || "all");
  filterButtons.forEach(button => button.addEventListener("click", () => {
    filterProjects(button.dataset.filter);
    // Keep the chosen filter shareable; direct file opening still works.
    try {
      const url = new URL(window.location.href);
      if (button.dataset.filter === "all") url.searchParams.delete("filter");
      else url.searchParams.set("filter", button.dataset.filter);
      window.history.replaceState(null, "", url);
    } catch (_) { /* Some file:// environments restrict history updates. */ }
  }));
}

document.querySelectorAll("[data-copy-email]").forEach(button => {
  button.addEventListener("click", async () => {
    const email = button.dataset.copyEmail;
    const status = document.querySelector("#copy-status");
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
      } else {
        const input = document.createElement("textarea");
        input.value = email;
        input.setAttribute("aria-label", "Email address to copy");
        input.style.cssText = "position:fixed;left:-9999px;top:0";
        document.body.append(input);
        let copied = false;
        try { input.select(); copied = document.execCommand("copy"); }
        finally { input.remove(); button.focus(); }
        if (!copied) throw new Error("Clipboard unavailable");
      }
      if (status) status.textContent = "Email address copied.";
    } catch (_) {
      if (status) status.textContent = `Please copy this address: ${email}`;
    }
  });
});

const emailForm = document.querySelector("#email-form");
if (emailForm) {
  emailForm.addEventListener("submit", event => {
    event.preventDefault();
    if (!emailForm.reportValidity()) return;
    const data = new FormData(emailForm);
    const name = String(data.get("name") || "").trim();
    const replyEmail = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    const status = document.querySelector("#form-status");
    if (!name || !message) {
      if (status) status.textContent = "Please add your name and a message.";
      return;
    }
    const subject = `${data.get("subject")} — ${name}`;
    const body = `Hi Stephanie,\n\n${message}\n\nBest regards,\n${name}\nReply email: ${replyEmail}`;
    window.location.href = `mailto:${emailForm.dataset.recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    if (status) status.textContent = "Your email draft is ready. Send it from your email app. If it did not open, use the Email me button.";
  });
}

const lightbox = document.querySelector("#image-lightbox");
const galleryLinks = Array.from(document.querySelectorAll(".gallery-trigger"));
if (lightbox && typeof lightbox.showModal === "function" && galleryLinks.length) {
  const image = lightbox.querySelector(".lightbox-image");
  const caption = lightbox.querySelector(".lightbox-caption");
  const counter = lightbox.querySelector("#image-counter");
  let activeIndex = 0;
  let opener = null;
  function showImage(index) {
    activeIndex = (index + galleryLinks.length) % galleryLinks.length;
    const link = galleryLinks[activeIndex];
    image.src = link.href;
    image.alt = link.querySelector("img").alt;
    caption.textContent = link.dataset.caption || image.alt;
    counter.textContent = `Image ${activeIndex + 1} of ${galleryLinks.length}`;
  }
  galleryLinks.forEach((link, index) => link.addEventListener("click", event => {
    event.preventDefault();
    opener = link;
    showImage(index);
    lightbox.showModal();
  }));
  lightbox.querySelector("[data-lightbox-close]").addEventListener("click", () => lightbox.close());
  lightbox.querySelector("[data-lightbox-prev]").addEventListener("click", () => showImage(activeIndex - 1));
  lightbox.querySelector("[data-lightbox-next]").addEventListener("click", () => showImage(activeIndex + 1));
  lightbox.addEventListener("close", () => { if (opener) opener.focus(); });
  lightbox.addEventListener("click", event => {
    const bounds = lightbox.getBoundingClientRect();
    if (event.target === lightbox && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) lightbox.close();
  });
  document.addEventListener("keydown", event => {
    if (!lightbox.open) return;
    if (event.key === "ArrowLeft") { event.preventDefault(); showImage(activeIndex - 1); }
    if (event.key === "ArrowRight") { event.preventDefault(); showImage(activeIndex + 1); }
  });
}

const backTop = document.querySelector(".back-top");
if (backTop) {
  const updateBackTop = () => backTop.classList.toggle("visible", window.scrollY > 600);
  window.addEventListener("scroll", updateBackTop, { passive: true });
  updateBackTop();
  backTop.addEventListener("click", () => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
    document.querySelector("main").focus({ preventScroll: true });
  });
}
