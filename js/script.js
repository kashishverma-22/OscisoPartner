/* =========================================================
   OCS Certification Partner - MAIN JAVASCRIPT
========================================================= */

/* =========================================================
   MOBILE MENU
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {
  const menuIcon = menuToggle.querySelector("i");

  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("menu-open");

    if (menuIcon) {
      menuIcon.classList.toggle("fa-bars", !isOpen);
      menuIcon.classList.toggle("fa-xmark", isOpen);
    }

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  const navLinks = mainNav.querySelectorAll(".nav-link, .apply-btn");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("menu-open");

      if (menuIcon) {
        menuIcon.classList.remove("fa-xmark");
        menuIcon.classList.add("fa-bars");
      }

      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open menu");
    });
  });
}

/* =========================================================
   COUNTRY + PHONE COUNTRY CODE
========================================================= */

const countrySelect = document.getElementById("countrySelect");
const phoneCountryCode = document.getElementById("phoneCountryCode");

function updatePhoneCountryCode() {
  if (!countrySelect || !phoneCountryCode) return;

  const selectedCountry = countrySelect.value;

  const matchingOption = Array.from(phoneCountryCode.options).find(
    (option) => option.dataset.country === selectedCountry,
  );

  if (matchingOption) {
    phoneCountryCode.value = matchingOption.value;
  }
}

if (countrySelect && phoneCountryCode) {
  countrySelect.addEventListener("change", updatePhoneCountryCode);
}

/* =========================================================
   FORM ELEMENTS
========================================================= */

const partnerForm = document.getElementById("partnerForm");

const partnerName = document.getElementById("partnerName");
const companyName = document.getElementById("companyName");
const partnerEmail = document.getElementById("partnerEmail");
const cityInput = document.getElementById("city");
const stateInput = document.getElementById("state");
const phoneNumber = document.getElementById("phoneNumber");

const iafOption = document.getElementById("iafOption");
const nonIafOption = document.getElementById("nonIafOption");

/* =========================================================
   ERROR ELEMENTS
   City and State errors are created if not present in HTML.
========================================================= */

function getOrCreateError(input, errorId) {
  if (!input) return null;

  let error = document.getElementById(errorId);

  if (!error) {
    error = document.createElement("small");
    error.id = errorId;
    error.className = "form-error";
    input.insertAdjacentElement("afterend", error);
  }

  return error;
}

const nameError = getOrCreateError(partnerName, "nameError");
const emailError = getOrCreateError(partnerEmail, "emailError");
const phoneError = getOrCreateError(phoneNumber, "phoneError");
const countryError = getOrCreateError(countrySelect, "countryError");
const cityError = getOrCreateError(cityInput, "cityError");
const stateError = getOrCreateError(stateInput, "stateError");

/* =========================================================
   CLEAR FORM ERRORS
========================================================= */

function clearError(error) {
  if (error) {
    error.textContent = "";
  }
}

function clearAllFormErrors() {
  [
    nameError,
    emailError,
    phoneError,
    countryError,
    cityError,
    stateError,
  ].forEach(clearError);
}

/* =========================================================
   CERTIFICATION PREFERENCE
   IAF and Non-IAF can both be selected.
   No accreditation dropdown is required.
========================================================= */

function getSelectedPreferences() {
  const preferences = [];

  if (iafOption && iafOption.checked) {
    preferences.push("IAF");
  }

  if (nonIafOption && nonIafOption.checked) {
    preferences.push("Non-IAF");
  }

  return preferences;
}

/* =========================================================
   PARTNER FORM VALIDATION + SUBMIT
========================================================= */

if (partnerForm) {
  partnerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    clearAllFormErrors();

    let isValid = true;

    /* NAME VALIDATION */

    const nameValue = partnerName ? partnerName.value.trim() : "";

    if (!nameValue) {
      if (nameError) {
        nameError.textContent = "Please enter your name.";
      }

      isValid = false;
    } else if (nameValue.length < 2) {
      if (nameError) {
        nameError.textContent = "Please enter a valid name.";
      }

      isValid = false;
    }

    /* EMAIL VALIDATION */

    const emailValue = partnerEmail ? partnerEmail.value.trim() : "";

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailValue) {
      if (emailError) {
        emailError.textContent = "Please enter your email address.";
      }

      isValid = false;
    } else if (!emailPattern.test(emailValue)) {
      if (emailError) {
        emailError.textContent = "Please enter a valid email address.";
      }

      isValid = false;
    }

    /* COUNTRY VALIDATION */

    if (countrySelect && !countrySelect.value) {
      if (countryError) {
        countryError.textContent = "Please select your country.";
      }

      isValid = false;
    }

    /* CITY VALIDATION */

    const cityValue = cityInput ? cityInput.value.trim() : "";

    if (!cityValue) {
      if (cityError) {
        cityError.textContent = "Please enter your city.";
      }

      isValid = false;
    }

    /* STATE VALIDATION */

    const stateValue = stateInput ? stateInput.value.trim() : "";

    if (!stateValue) {
      if (stateError) {
        stateError.textContent = "Please enter your state or province.";
      }

      isValid = false;
    }

    /* PHONE VALIDATION */

    const phoneValue = phoneNumber ? phoneNumber.value.replace(/\D/g, "") : "";

    if (!phoneValue) {
      if (phoneError) {
        phoneError.textContent = "Please enter your phone number.";
      }

      isValid = false;
    } else if (phoneValue.length < 7 || phoneValue.length > 15) {
      if (phoneError) {
        phoneError.textContent = "Please enter a valid phone number.";
      }

      isValid = false;
    }

    /* CERTIFICATION PREFERENCE VALIDATION */

    const selectedPreferences = getSelectedPreferences();

    if (selectedPreferences.length === 0) {
      alert("Please select IAF, Non-IAF, or both certification preferences.");

      isValid = false;
    }

    /* STOP IF INVALID */

    if (!isValid) {
      const firstError = partnerForm.querySelector(".form-error:not(:empty)");

      if (firstError) {
        firstError.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }

      return;
    }

    /* =====================================================
       COLLECT FORM DATA

       These values are available for connecting a mail service.
    ===================================================== */

    const formData = {
      name: nameValue,
      company: companyName ? companyName.value.trim() : "",
      email: emailValue,
      country: countrySelect
        ? countrySelect.options[countrySelect.selectedIndex].text
        : "",
      city: cityValue,
      state: stateValue,
      countryCode: phoneCountryCode ? phoneCountryCode.value : "",
      phone: phoneValue,
      certificationPreference: selectedPreferences.join(", "),
    };

    console.log("Partner Enquiry Data:", formData);

    /* =====================================================
       CURRENT FORM SUCCESS BEHAVIOUR
    ===================================================== */

    alert("Form validation successful!");

    partnerForm.reset();

    clearAllFormErrors();

    /* Reset country calling code */

    if (phoneCountryCode) {
      phoneCountryCode.value = "+91";
    }

    /* Reset both certification checkboxes */

    if (iafOption) {
      iafOption.checked = false;
    }

    if (nonIafOption) {
      nonIafOption.checked = false;
    }
  });
}

/* =========================================================
   REMOVE ERRORS WHEN USER TYPES
========================================================= */

function clearErrorOnInput(input, error) {
  if (!input || !error) return;

  input.addEventListener("input", () => {
    clearError(error);
  });

  input.addEventListener("change", () => {
    clearError(error);
  });
}

clearErrorOnInput(partnerName, nameError);
clearErrorOnInput(partnerEmail, emailError);
clearErrorOnInput(phoneNumber, phoneError);
clearErrorOnInput(countrySelect, countryError);
clearErrorOnInput(cityInput, cityError);
clearErrorOnInput(stateInput, stateError);

/* =========================================================
   PHONE NUMBER - ALLOW ONLY NUMBERS
========================================================= */

if (phoneNumber) {
  phoneNumber.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "");
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
    const wasActive = item.classList.contains("active");

    /* Close all questions */

    faqItems.forEach((faq) => {
      faq.classList.remove("active");
    });

    /* Toggle clicked question */

    if (!wasActive) {
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
      hiddenItems.forEach((item) => {
        item.style.display = "block";
      });

      showAllText.textContent = "Hide extra questions";
      showAllBtn.classList.add("open");
    } else {
      hiddenItems.forEach((item) => {
        item.style.display = "none";
        item.classList.remove("active");
      });

      showAllText.textContent = "Show all 6 questions";
      showAllBtn.classList.remove("open");
    }
  });
}
