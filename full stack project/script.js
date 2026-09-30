
// Mobile navigation
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(isOpen));
});

// Close menu when a link is clicked
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

// Highlight active navigation link
const sections = document.querySelectorAll("main section[id]");
const links = document.querySelectorAll(".nav-link");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(link => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${entry.target.id}`
        );
      });
    }
  });
}, {
  rootMargin: "-25% 0px -60% 0px"
});

sections.forEach(section => observer.observe(section));

// Automatically update copyright year
document.getElementById("year").textContent =
  new Date().getFullYear();

// Contact form
const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

contactForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !subject || !message) {
    formNote.textContent = "Please fill in all fields.";
    return;
  }

  // Replace this with your actual email address.
  const recipient = "your@email.com";

  const body =
    `Name: ${name}\n` +
    `Email: ${email}\n\n` +
    `Message:\n${message}`;

  const mailto =
    `mailto:${recipient}` +
    `?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`;

  formNote.textContent = "Opening your email application...";
  window.location.href = mailto;
});