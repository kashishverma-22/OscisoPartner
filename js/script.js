/* =========================================================
   OCS ISO PARTNER - MAIN JAVASCRIPT
========================================================= */

/* =========================================================
   MOBILE MENU
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("menu-open");

    const icon = menuToggle.querySelector("i");

    if (mainNav.classList.contains("menu-open")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-xmark");
    } else {
      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
    }
  });

  // Close mobile menu after clicking a navigation link
  const navLinks = mainNav.querySelectorAll(".nav-link, .apply-btn");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("menu-open");

      const icon = menuToggle.querySelector("i");

      if (icon) {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
      }
    });
  });
}

/* =========================================================
   COUNTRY + PHONE COUNTRY CODE
========================================================= */

const countrySelect = document.getElementById("countrySelect");
const phoneCountryCode = document.getElementById("phoneCountryCode");

if (countrySelect && phoneCountryCode) {
  countrySelect.addEventListener("change", function () {
    const selectedOption = this.options[this.selectedIndex];

    const country = selectedOption.value;

    const matchingPhoneOption = phoneCountryCode.querySelector(
      `option[data-country="${country}"]`,
    );

    if (matchingPhoneOption) {
      phoneCountryCode.value = matchingPhoneOption.value;
    }
  });
}

/* =========================================================
   IAF / NON-IAF ACCREDITATION
========================================================= */

const iafOption = document.getElementById("iafOption");
const nonIafOption = document.getElementById("nonIafOption");
const accreditationSelection = document.getElementById(
  "accreditationSelection",
);
const accreditationSelect = document.getElementById("accreditationSelect");
const accreditationError = document.getElementById("accreditationError");

/* IAF selected */

if (iafOption) {
  iafOption.addEventListener("change", function () {
    if (this.checked) {
      accreditationSelection.style.display = "block";
      accreditationSelect.required = true;
    }
  });
}

/* Non-IAF selected */

if (nonIafOption) {
  nonIafOption.addEventListener("change", function () {
    if (this.checked) {
      accreditationSelection.style.display = "none";

      accreditationSelect.required = false;
      accreditationSelect.value = "";

      if (accreditationError) {
        accreditationError.textContent = "";
      }
    }
  });
}

/* =========================================================
   PARTNER FORM VALIDATION
========================================================= */

const partnerForm = document.getElementById("partnerForm");

if (partnerForm) {
  partnerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    /* -----------------------------------------------------
       GET FORM ELEMENTS
    ----------------------------------------------------- */

    const name = document.getElementById("partnerName");

    const email = document.getElementById("partnerEmail");

    const phone = document.getElementById("phoneNumber");

    const country = document.getElementById("countrySelect");

    /* -----------------------------------------------------
       ERROR ELEMENTS
    ----------------------------------------------------- */

    const nameError = document.getElementById("nameError");

    const emailError = document.getElementById("emailError");

    const phoneError = document.getElementById("phoneError");

    const countryError = document.getElementById("countryError");

    /* -----------------------------------------------------
       CLEAR PREVIOUS ERRORS
    ----------------------------------------------------- */

    nameError.textContent = "";
    emailError.textContent = "";
    phoneError.textContent = "";
    countryError.textContent = "";

    if (accreditationError) {
      accreditationError.textContent = "";
    }

    let isValid = true;

    /* =====================================================
       NAME VALIDATION
    ===================================================== */

    const nameValue = name.value.trim();

    if (nameValue === "") {
      nameError.textContent = "Please enter your name.";

      isValid = false;
    } else if (nameValue.length < 2) {
      nameError.textContent = "Please enter a valid name.";

      isValid = false;
    }

    /* =====================================================
       EMAIL VALIDATION
    ===================================================== */

    const emailValue = email.value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailValue === "") {
      emailError.textContent = "Please enter your email address.";

      isValid = false;
    } else if (!emailPattern.test(emailValue)) {
      emailError.textContent = "Please enter a valid email address.";

      isValid = false;
    }

    /* =====================================================
       PHONE VALIDATION
    ===================================================== */

    const phoneValue = phone.value.replace(/\D/g, "");

    if (phoneValue === "") {
      phoneError.textContent = "Please enter your phone number.";

      isValid = false;
    } else if (phoneValue.length < 7) {
      phoneError.textContent = "Please enter a valid phone number.";

      isValid = false;
    } else if (phoneValue.length > 15) {
      phoneError.textContent = "Please enter a valid phone number.";

      isValid = false;
    }

    /* =====================================================
       COUNTRY VALIDATION
    ===================================================== */

    if (country.value === "") {
      countryError.textContent = "Please select your country.";

      isValid = false;
    }

    /* =====================================================
       CERTIFICATION PREFERENCE
    ===================================================== */

    const selectedPreference = document.querySelector(
      'input[name="certificationPreference"]:checked',
    );

    if (!selectedPreference) {
      alert("Please select your certification preference.");

      isValid = false;
    }

    /* =====================================================
       IAF ACCREDITATION VALIDATION
    ===================================================== */

    if (selectedPreference && selectedPreference.value === "IAF") {
      if (!accreditationSelect || accreditationSelect.value === "") {
        if (accreditationError) {
          accreditationError.textContent = "Please select an accreditation.";
        }

        isValid = false;
      }
    }

    /* =====================================================
       STOP IF FORM IS INVALID
    ===================================================== */

    if (!isValid) {
      return;
    }

    /* =====================================================
       FORM SUCCESS
    ===================================================== */

    alert("Thank you! Your enquiry has been submitted successfully.");

    /* Reset form */

    partnerForm.reset();

    /* Reset accreditation */

    if (accreditationSelection) {
      accreditationSelection.style.display = "none";
    }

    if (accreditationSelect) {
      accreditationSelect.required = false;
      accreditationSelect.value = "";
    }

    /* Reset phone code to India */

    if (phoneCountryCode) {
      phoneCountryCode.value = "+91";
    }

    /* Clear errors */

    nameError.textContent = "";
    emailError.textContent = "";
    phoneError.textContent = "";
    countryError.textContent = "";

    if (accreditationError) {
      accreditationError.textContent = "";
    }
  });
}

/* =========================================================
   FAQ ACCORDION
========================================================= */

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");

  if (!question) return;

  question.addEventListener("click", () => {
    const isActive = item.classList.contains("active");

    /* Close all FAQ items */

    faqItems.forEach((faq) => {
      faq.classList.remove("active");
    });

    /* Open clicked item */

    if (!isActive) {
      item.classList.add("active");
    }
  });
});

/* =========================================================
   SHOW ALL FAQ QUESTIONS
========================================================= */

const showAllBtn = document.querySelector(".faq-show-all");

const showAllText = document.querySelector(".faq-show-text");

if (showAllBtn && showAllText) {
  showAllBtn.addEventListener("click", () => {
    const hiddenItems = document.querySelectorAll(".faq-hidden-item");

    const isOpen = showAllBtn.classList.contains("open");

    if (!isOpen) {
      /* Show hidden questions */

      hiddenItems.forEach((item) => {
        item.style.display = "block";
      });

      showAllText.textContent = "Hide extra questions";

      showAllBtn.classList.add("open");
    } else {
      /* Hide extra questions */

      hiddenItems.forEach((item) => {
        item.style.display = "none";

        item.classList.remove("active");
      });

      showAllText.textContent = "Show all 6 questions";

      showAllBtn.classList.remove("open");
    }
  });
}

/* =========================================================
   PHONE NUMBER - ALLOW ONLY NUMBERS
========================================================= */

const phoneNumber = document.getElementById("phoneNumber");

if (phoneNumber) {
  phoneNumber.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "");
  });
}

/* =========================================================
   REMOVE ERROR WHEN USER STARTS TYPING
========================================================= */

const partnerName = document.getElementById("partnerName");

const partnerEmail = document.getElementById("partnerEmail");

const partnerPhone = document.getElementById("phoneNumber");

if (partnerName) {
  partnerName.addEventListener("input", () => {
    const error = document.getElementById("nameError");

    if (error) {
      error.textContent = "";
    }
  });
}

if (partnerEmail) {
  partnerEmail.addEventListener("input", () => {
    const error = document.getElementById("emailError");

    if (error) {
      error.textContent = "";
    }
  });
}

if (partnerPhone) {
  partnerPhone.addEventListener("input", () => {
    const error = document.getElementById("phoneError");

    if (error) {
      error.textContent = "";
    }
  });
}

if (countrySelect) {
  countrySelect.addEventListener("change", () => {
    const error = document.getElementById("countryError");

    if (error) {
      error.textContent = "";
    }
  });
}

/* =========================================================
   ACCREDITATION ERROR CLEAR
========================================================= */

if (accreditationSelect) {
  accreditationSelect.addEventListener("change", () => {
    if (accreditationError) {
      accreditationError.textContent = "";
    }
  });
}
