// JavaScript for smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

//  parallax effect to headshot background
const headshotBg = document.querySelector(".headshot-background");
window.addEventListener("mousemove", (e) => {
  const moveX = (e.clientX / window.innerWidth) * 20;
  const moveY = (e.clientY / window.innerHeight) * 20;
  headshotBg.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

// hamburger menu implemetation

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.querySelector(".mobile-menu");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    mobileMenu.classList.toggle("active");

    // body scroll when menu is open
    if (mobileMenu.classList.contains("active")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  });

  // Select ALL links within the mobile menu
  const allMobileLinks = document.querySelectorAll(".mobile-menu a");

  allMobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      mobileMenu.classList.remove("active");
      document.body.style.overflow = "auto";
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (
      mobileMenu.classList.contains("active") &&
      !hamburger.contains(e.target) &&
      !mobileMenu.contains(e.target)
    ) {
      hamburger.classList.remove("active");
      mobileMenu.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });
});

// --------------------------------------------------------------------------
// Skills section functions
// Portfolio cards slightly up
document.addEventListener("DOMContentLoaded", function () {
  const featureCards = document.querySelectorAll(".feature-card");

  featureCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const exploreButton = document.querySelector(".explore-button");
  const portfolioSection = document.getElementById("portfolio");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  // Explore button functionality
  exploreButton.addEventListener("click", function () {
    // Change button text to indicate action
    const originalText = this.innerHTML;
    this.innerHTML = "EXPLORING...";
    this.disabled = true;

    // Scroll to portfolio section
    portfolioSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    // Reset button text after 1.5 seconds
    setTimeout(() => {
      this.innerHTML = originalText;
      this.disabled = false;
    }, 1500);
  });
});

// Animate skills on scroll
document.addEventListener("DOMContentLoaded", function () {
  const skillItems = document.querySelectorAll(".skill-item");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  skillItems.forEach((item) => {
    item.style.opacity = 0;
    item.style.transform = "translateY(30px)";
    item.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(item);
  });

  //code background animation
  const codeBg = document.querySelector(".code-bg");
  const codeSnippets = [
    `// Warning: Clicking this may cause awesomeness overflow 🚀\nfunction unleashPower() {\n  console.log("🔥 Skills activated!");\n}`,
    `const developer = {\n  name: 'Rachid Imiche',\n  superpowers: ['Crafting Code', 'Pixel Perfect UI', 'Debugging in the Dark'],\n  motto: "Eat. Code. Repeat. 💻"\n};`,
    `@mixin party-mode {\n  animation: dance 2s infinite;\n  background: confetti;\n  mood: 100%;\n}`,
  ];

  let currentSnippet = 0;

  function rotateCodeSnippet() {
    if (codeBg) {
      codeBg.textContent = codeSnippets[currentSnippet];
      currentSnippet = (currentSnippet + 1) % codeSnippets.length;
    }
  }

  if (codeBg) {
    rotateCodeSnippet();
    setInterval(rotateCodeSnippet, 5000);
  }
});

// Portfolio filter function

document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");
  const mobileFilterToggle = document.getElementById("mobile-filter-toggle");
  const filtersContainer = document.getElementById("filters-container");

  // For mobile
  if (mobileFilterToggle) {
    mobileFilterToggle.addEventListener("click", function () {
      this.classList.toggle("active");
      filtersContainer.classList.toggle("active");
    });
  }

  // --- Filter functoin ---
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filterValue = this.getAttribute("data-filter");

      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      // Filter portfolio items (Data category on html)
      portfolioItems.forEach((item) => {
        const itemCategory = item.getAttribute("data-category");

        if (filterValue === "all" || itemCategory === filterValue) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });

      if (
        window.innerWidth <= 768 &&
        filtersContainer.classList.contains("active")
      ) {
        mobileFilterToggle.classList.remove("active");
        filtersContainer.classList.remove("active");
      }
    });
  });

  document.addEventListener("click", function (e) {
    if (
      filtersContainer &&
      !filtersContainer.contains(e.target) &&
      !mobileFilterToggle.contains(e.target)
    ) {
      mobileFilterToggle.classList.remove("active");
      filtersContainer.classList.remove("active");
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.2 }
  );

  portfolioItems.forEach((item) => {
    item.style.opacity = 0;
    item.style.transform = "translateY(40px)";
    item.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    observer.observe(item);
  });
});

//  EmailJS for my contacts
emailjs.init(emailjs_keys.publicKey);

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");
  const statusMessage = document.getElementById("statusMessage");
  const loader = document.getElementById("loader");

  form.addEventListener("submit", function (e) {
    // Prevent default form submission behavior
    e.preventDefault();

    // Clear previous status
    statusMessage.textContent = "";
    statusMessage.className = "status-message";

    // Simple validation
    let isValid = true;
    const requiredFields = form.querySelectorAll("[required]");

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        isValid = false;
        field.style.borderColor = "#ff6b6b";
      } else {
        field.style.borderColor = "#ffffff";
      }
    });
    requiredFields.forEach((field) => {
      setTimeout(() => {
        field.style.borderColor = "#000000";
      }, 3000);
    });

    if (!isValid) {
      statusMessage.textContent = "Please fill in all required fields";
      statusMessage.classList.add("error");
      return;
    }

    // Change button text to indicate sending
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "SENDING...";
    submitBtn.disabled = true;

    // Prepare email parameters
    const templateParams = {
      to_email: "rachid.imiche@edu.uiz.ac.ma",
      from_name: document.getElementById("name").value,
      from_email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      message: document.getElementById("message").value,
      "g-recaptcha-response": grecaptcha.getResponse(),
    };
    // Check if reCAPTCHA is completed
    if (!templateParams["g-recaptcha-response"]) {
      statusMessage.textContent = "Please complete the reCAPTCHA.";
      statusMessage.classList.add("error");
      submitBtn.disabled = false;
      return;
    }

    // Send email using EmailJS
    emailjs
      .send(emailjs_keys.serviceID, emailjs_keys.templateID, templateParams)
      .then(
        function (response) {
          statusMessage.textContent = "Message sent successfully!";
          statusMessage.classList.add("success");

          // Change button to success state
          submitBtn.textContent = "SENT!";
          submitBtn.style.color = "#4ade80";

          // Reset form after 3 seconds
          setTimeout(() => {
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.style.color = "#ffffff";
            requiredFields.style.borderColor = "#000000";
            submitBtn.disabled = false;
            statusMessage.textContent = "";
          }, 3000);
        },
        function (error) {
          // Error handling
          statusMessage.textContent =
            "Failed to send message. Please try again.";
          statusMessage.classList.add("error");
          console.error("EmailJS Error:", error);

          // Reset button
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }
      );
  });
});

// Smooth scroll to top functionality
document.querySelector(".back-to-top").addEventListener("click", function (e) {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
