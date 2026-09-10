"use strict";

/* =========================================================
   WEBSITE PROJECT BRIEF
   Vanilla JavaScript — no frameworks or libraries
========================================================= */

const STORAGE_KEY = "website_project_brief_draft";
const STORAGE_VERSION = 1;
const TOTAL_STEPS = 12;

/*
 * Web3Forms configuration.
 *
 * IMPORTANT:
 * Replace YOUR_WEB3FORMS_ACCESS_KEY with the Access Key generated
 * from your Web3Forms account.
 *
 * The recipient is also explicitly included in the request.
 * Web3Forms may additionally require the destination email to be
 * configured/authorized in the Web3Forms dashboard depending on
 * the account configuration.
 */
const EMAIL_CONFIG = {
  endpoint: "https://api.web3forms.com/submit",
  accessKey: "b3d368eb-d531-4308-b776-794898fc5d44",
  recipient: "earndeelimitedcompany@gmail.com"
};

const state = {
  currentStep: 0,
  lastSaved: null,
  isSubmitting: false,
  toastTimer: null
};

const elements = {};

/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener("DOMContentLoaded", initializeApp);

function initializeApp() {
  cacheElements();
  initializeForm();
  initializeNavigation();
  initializeConditionalFields();
  initializeAutosave();
  initializeResetControls();
  initializeColorInputs();
  initializeReviewEditing();

  elements.footerYear.textContent = new Date().getFullYear();

  const restored = restoreSavedForm();

  if (restored) {
    showResumePrompt();
  }

  updateProgress();
}

/* =========================================================
   CACHE DOM
========================================================= */

function cacheElements() {
  elements.welcome = document.getElementById("welcome");
  elements.startButton = document.getElementById("startButton");

  elements.resumeWrapper = document.getElementById("resumeWrapper");
  elements.resumeButton = document.getElementById("resumeButton");
  elements.discardDraftButton = document.getElementById("discardDraftButton");
  elements.resumeDescription = document.getElementById("resumeDescription");

  elements.briefApp = document.getElementById("briefApp");
  elements.projectForm = document.getElementById("projectForm");

  elements.formSteps = [...document.querySelectorAll(".form-step")];
  elements.stepNavItems = [...document.querySelectorAll(".step-nav-item")];

  elements.progressBar = document.getElementById("progressBar");
  elements.sidebarProgress = document.getElementById("sidebarProgress");

  elements.mobileStepKicker = document.getElementById("mobileStepKicker");
  elements.mobileStepTitle = document.getElementById("mobileStepTitle");
  elements.mobileStepPercent = document.getElementById("mobileStepPercent");

  elements.backButton = document.getElementById("backButton");
  elements.nextButton = document.getElementById("nextButton");
  elements.nextButtonText = document.getElementById("nextButtonText");

  elements.stepStatus = document.getElementById("stepStatus");
  elements.stepPercentage = document.getElementById("stepPercentage");

  elements.submitButton = document.getElementById("submitButton");
  elements.submitButtonText = document.getElementById("submitButtonText");
  elements.submitSpinner = document.getElementById("submitSpinner");

  elements.reviewContainer = document.getElementById("reviewContainer");
  elements.submitError = document.getElementById("submitError");

  elements.saveIndicator = document.getElementById("saveIndicator");
  elements.saveText = document.getElementById("saveText");

  elements.headerResetBtn = document.getElementById("headerResetBtn");

  elements.resetModal = document.getElementById("resetModal");
  elements.closeResetModal = document.getElementById("closeResetModal");
  elements.cancelReset = document.getElementById("cancelReset");
  elements.confirmReset = document.getElementById("confirmReset");

  elements.successSection = document.getElementById("successSection");
  elements.successName = document.getElementById("successName");
  elements.successBusiness = document.getElementById("successBusiness");
  elements.successDate = document.getElementById("successDate");

  elements.toast = document.getElementById("toast");
  elements.toastText = document.getElementById("toastText");

  elements.primaryColor = document.getElementById("primaryColor");
  elements.primaryColorText = document.getElementById("primaryColorText");

  elements.secondaryColor = document.getElementById("secondaryColor");
  elements.secondaryColorText = document.getElementById("secondaryColorText");
}

/* =========================================================
   FORM INITIALIZATION
========================================================= */

function initializeForm() {
  elements.projectForm.addEventListener("submit", handleSubmit);

  elements.projectForm.addEventListener("input", handleFormInteraction);
  elements.projectForm.addEventListener("change", handleFormInteraction);

  document.addEventListener("keydown", handleKeyboardNavigation);
}

/* =========================================================
   NAVIGATION
========================================================= */

function initializeNavigation() {
  elements.startButton.addEventListener("click", () => {
    openApplication();
    setStep(0);
  });

  elements.resumeButton.addEventListener("click", () => {
    openApplication();
    setStep(state.currentStep);
    hideResumePrompt();
  });

  elements.backButton.addEventListener("click", previousStep);
  elements.nextButton.addEventListener("click", nextStep);

  elements.stepNavItems.forEach((button) => {
    button.addEventListener("click", () => {
      const requestedStep = Number(button.dataset.step);

      if (requestedStep > state.currentStep) {
        return;
      }

      setStep(requestedStep);
    });
  });
}

function openApplication() {
  elements.welcome.hidden = true;
  elements.briefApp.hidden = false;
  elements.successSection.hidden = true;

  window.scrollTo({
    top: 0,
    behavior: prefersReducedMotion() ? "auto" : "smooth"
  });
}

function nextStep() {
  clearSubmitError();

  if (!validateCurrentStep()) {
    return;
  }

  if (state.currentStep < TOTAL_STEPS - 1) {
    state.currentStep += 1;

    if (state.currentStep === TOTAL_STEPS - 1) {
      renderReview();
    }

    saveFormData(false);
    setStep(state.currentStep);
  }
}

function previousStep() {
  clearSubmitError();

  if (state.currentStep > 0) {
    state.currentStep -= 1;
    saveFormData(false);
    setStep(state.currentStep);
  }
}

function setStep(stepIndex) {
  const nextStepIndex = Math.max(
    0,
    Math.min(stepIndex, TOTAL_STEPS - 1)
  );

  state.currentStep = nextStepIndex;

  elements.formSteps.forEach((step, index) => {
    step.classList.toggle("active", index === nextStepIndex);
  });

  elements.stepNavItems.forEach((item, index) => {
    item.classList.toggle("active", index === nextStepIndex);
    item.classList.toggle("completed", index < nextStepIndex);
  });

  elements.backButton.disabled = nextStepIndex === 0;

  const isReview = nextStepIndex === TOTAL_STEPS - 1;

  elements.nextButton.hidden = isReview;
  elements.submitButton.hidden = !isReview;

  if (isReview) {
    renderReview();
  }

  updateMobileStepHeader();
  updateProgress();

  if (nextStepIndex > 0) {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion() ? "auto" : "smooth"
    });
  }
}

/* =========================================================
   PROGRESS
========================================================= */

function updateProgress() {
  const percentage = Math.round(
    (state.currentStep / (TOTAL_STEPS - 1)) * 100
  );

  elements.progressBar.style.width = `${percentage}%`;
  elements.sidebarProgress.textContent = `${percentage}%`;
  elements.stepStatus.textContent =
    `Step ${state.currentStep + 1} of ${TOTAL_STEPS}`;
  elements.stepPercentage.textContent = `${percentage}% complete`;

  updateMobileStepHeader();
}

function updateMobileStepHeader() {
  const currentStep = elements.formSteps[state.currentStep];

  if (!currentStep) {
    return;
  }

  const kicker = currentStep.querySelector(".step-kicker");
  const heading = currentStep.querySelector("h2");

  const percentage = Math.round(
    (state.currentStep / (TOTAL_STEPS - 1)) * 100
  );

  elements.mobileStepKicker.textContent =
    `STEP ${String(state.currentStep + 1).padStart(2, "0")} OF ${TOTAL_STEPS}`;

  elements.mobileStepTitle.textContent =
    heading?.textContent || kicker?.textContent || "Project brief";

  elements.mobileStepPercent.textContent = `${percentage}%`;
}

/* =========================================================
   VALIDATION
========================================================= */

function validateCurrentStep() {
  const currentStep = elements.formSteps[state.currentStep];

  if (!currentStep) {
    return true;
  }

  clearValidation(currentStep);

  let firstInvalid = null;

  const requiredInputs = [
    ...currentStep.querySelectorAll(
      "input[data-required='true'], textarea[data-required='true'], select[data-required='true']"
    )
  ];

  requiredInputs.forEach((field) => {
    if (!isFieldVisible(field)) {
      return;
    }

    if (!field.value.trim()) {
      setFieldError(
        field,
        "This field is required."
      );

      firstInvalid ||= field;
    }
  });

  validateRequiredGroups(currentStep, firstInvalid);

  if (state.currentStep === 0) {
    validateEmailField(currentStep);
    validatePhoneField(currentStep);
  }

  validateURLFields(currentStep);

  if (state.currentStep === 8) {
    validateDomainField(currentStep);
  }

  if (state.currentStep === 11) {
    validateConsent(firstInvalid);
  }

  const firstError = findFirstError(currentStep);

  if (firstError) {
    firstError.focus({
      preventScroll: true
    });

    firstError.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "center"
    });

    return false;
  }

  return true;
}

function validateRequiredGroups(container, firstInvalid) {
  const requiredGroups = [
    {
      name: "contactMethod",
      error: "Choose your preferred contact method."
    },
    {
      name: "websitePurpose",
      error: "Select at least one website purpose."
    },
    {
      name: "websiteGoals",
      error: "Select at least one website goal."
    },
    {
      name: "visitorActions",
      error: "Select at least one visitor action."
    },
    {
      name: "pages",
      error: "Select at least one website page."
    },
    {
      name: "designStyle",
      error: "Select at least one visual style."
    },
    {
      name: "contentResponsibility",
      error: "Choose how content will be handled."
    },
    {
      name: "seoLevel",
      error: "Choose an SEO requirement."
    },
    {
      name: "budget",
      error: "Choose a budget range."
    },
    {
      name: "timeline",
      error: "Choose a preferred timeframe."
    }
  ];

  requiredGroups.forEach(({ name, error }) => {
    const fields = [
      ...container.querySelectorAll(`[name="${name}"]`)
    ];

    if (!fields.length) {
      return;
    }

    const visibleFields = fields.filter(isFieldVisible);

    if (!visibleFields.length) {
      return;
    }

    const selected = visibleFields.some((field) => field.checked);

    if (!selected) {
      const target = visibleFields[0];

      setGroupError(name, error, container);

      if (firstInvalid && !firstInvalid.value) {
        firstInvalid = target;
      }
    }
  });

  return firstInvalid;
}

function validateEmailField(container) {
  const email = container.querySelector("#email");

  if (!email || !email.value.trim()) {
    return;
  }

  const validEmail =
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email.value.trim());

  if (!validEmail) {
    setFieldError(email, "Enter a valid email address.");
  }
}

function validatePhoneField(container) {
  const phone = container.querySelector("#phone");

  if (!phone || !phone.value.trim()) {
    return;
  }

  const digits = phone.value.replace(/\D/g, "");

  if (digits.length < 7 || digits.length > 15) {
    setFieldError(
      phone,
      "Enter a valid phone number including the country code where possible."
    );
  }
}

function validateURLFields(container) {
  const urlFields = [
    container.querySelector("#currentWebsite"),
    container.querySelector("#referenceWebsites"),
    container.querySelector("#seoCompetitors")
  ].filter(Boolean);

  urlFields.forEach((field) => {
    if (!field.value.trim()) {
      return;
    }

    const lines = field.value
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const invalid = lines.some((line) => {
      try {
        const normalized = /^https?:\/\//i.test(line)
          ? line
          : `https://${line}`;

        const url = new URL(normalized);

        return !url.hostname.includes(".");
      } catch {
        return true;
      }
    });

    if (invalid) {
      setFieldError(
        field,
        "Please enter valid website URLs, one per line."
      );
    }
  });
}

function validateDomainField(container) {
  const hasDomain = getRadioValue("hasDomain");
  const domainField = container.querySelector("#domainName");

  if (
    hasDomain === "Yes" &&
    domainField &&
    !domainField.value.trim()
  ) {
    setFieldError(
      domainField,
      "Enter your domain name."
    );
  }
}

function validateConsent() {
  const consent = document.getElementById("consent");

  if (!consent?.checked) {
    setGroupError(
      "consent",
      "Please confirm that the information is accurate before submitting."
    );
  }
}

function setFieldError(field, message) {
  if (!field) {
    return;
  }

  const fieldWrapper = field.closest(".field");

  if (fieldWrapper) {
    fieldWrapper.classList.add("has-error");
  }

  const error = document.querySelector(
    `[data-error-for="${CSS.escape(field.name || field.id)}"]`
  );

  if (error) {
    error.textContent = message;
  }

  field.setAttribute("aria-invalid", "true");
}

function setGroupError(name, message, container = document) {
  const error = container.querySelector(
    `[data-error-for="${CSS.escape(name)}"]`
  );

  if (error) {
    error.textContent = message;
  }

  const fields = [
    ...container.querySelectorAll(`[name="${CSS.escape(name)}"]`)
  ];

  fields.forEach((field) => {
    field.setAttribute("aria-invalid", "true");
  });
}

function clearValidation(container) {
  container
    .querySelectorAll(".has-error")
    .forEach((field) => field.classList.remove("has-error"));

  container
    .querySelectorAll(".field-error")
    .forEach((error) => {
      error.textContent = "";
    });

  container
    .querySelectorAll("[aria-invalid='true']")
    .forEach((field) => {
      field.removeAttribute("aria-invalid");
    });
}

function findFirstError(container) {
  return container.querySelector(
    ".has-error input, .has-error textarea, .has-error select, [aria-invalid='true']"
  );
}

/* =========================================================
   FORM INTERACTION / AUTOSAVE
========================================================= */

function handleFormInteraction(event) {
  updateConditionalFields();

  const field = event.target;

  if (
    field.matches(
      "input, textarea, select"
    )
  ) {
    clearIndividualError(field);
  }

  scheduleSave();
}

let saveTimer = null;

function initializeAutosave() {
  window.addEventListener("beforeunload", () => {
    saveFormData(false);
  });
}

function scheduleSave() {
  elements.saveIndicator.classList.add("saving");
  elements.saveText.textContent = "Saving...";

  clearTimeout(saveTimer);

  saveTimer = setTimeout(() => {
    saveFormData(false);
  }, 450);
}

function saveFormData(showToast = true) {
  clearTimeout(saveTimer);

  const draft = {
    version: STORAGE_VERSION,
    currentStep: state.currentStep,
    lastSaved: new Date().toISOString(),
    data: collectFormData()
  };

  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(draft)
    );

    state.lastSaved = draft.lastSaved;

    elements.saveIndicator.classList.remove("saving");
    elements.saveText.textContent = "Saved locally";

    if (showToast) {
      showToastMessage("Your progress was saved locally.");
    }
  } catch (error) {
    console.error("Unable to save draft:", error);

    elements.saveIndicator.classList.remove("saving");
    elements.saveText.textContent = "Save unavailable";
  }
}

function restoreSavedForm() {
  let rawDraft;

  try {
    rawDraft = localStorage.getItem(STORAGE_KEY);
  } catch (error) {
    console.warn("localStorage is unavailable:", error);
    return false;
  }

  if (!rawDraft) {
    return false;
  }

  try {
    const draft = JSON.parse(rawDraft);

    if (
      !draft ||
      typeof draft !== "object" ||
      draft.version !== STORAGE_VERSION ||
      !draft.data ||
      typeof draft.data !== "object"
    ) {
      localStorage.removeItem(STORAGE_KEY);
      return false;
    }

    restoreFormData(draft.data);

    if (
      Number.isInteger(draft.currentStep) &&
      draft.currentStep >= 0 &&
      draft.currentStep < TOTAL_STEPS
    ) {
      state.currentStep = draft.currentStep;
    }

    state.lastSaved = draft.lastSaved || null;

    updateConditionalFields();

    return true;
  } catch (error) {
    console.warn("Corrupted saved draft detected:", error);

    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage removal failures.
    }

    return false;
  }
}

function restoreFormData(data) {
  Object.entries(data).forEach(([name, value]) => {
    const fields = [
      ...elements.projectForm.querySelectorAll(
        `[name="${CSS.escape(name)}"]`
      )
    ];

    if (!fields.length) {
      return;
    }

    if (Array.isArray(value)) {
      fields.forEach((field) => {
        field.checked = value.includes(field.value);
      });

      return;
    }

    if (fields[0].type === "radio") {
      fields.forEach((field) => {
        field.checked = field.value === value;
      });

      return;
    }

    if (fields[0].type === "checkbox") {
      fields[0].checked = Boolean(value);
      return;
    }

    fields[0].value = value ?? "";
  });
}

function clearSavedForm() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn("Unable to clear saved draft:", error);
  }
}

/* =========================================================
   COLLECT FORM DATA
========================================================= */

function collectFormData() {
  const data = {};
  const formData = new FormData(elements.projectForm);

  const groupedCheckboxes = new Set();

  elements.projectForm
    .querySelectorAll('input[type="checkbox"][name]')
    .forEach((checkbox) => {
      groupedCheckboxes.add(checkbox.name);
    });

  groupedCheckboxes.forEach((name) => {
    data[name] = [
      ...elements.projectForm.querySelectorAll(
        `input[type="checkbox"][name="${CSS.escape(name)}"]:checked`
      )
    ].map((checkbox) => checkbox.value);
  });

  const radioNames = new Set();

  elements.projectForm
    .querySelectorAll('input[type="radio"][name]')
    .forEach((radio) => {
      radioNames.add(radio.name);
    });

  radioNames.forEach((name) => {
    data[name] = getRadioValue(name) || "";
  });

  formData.forEach((value, key) => {
    const field = elements.projectForm.querySelector(
      `[name="${CSS.escape(key)}"]`
    );

    if (!field) {
      return;
    }

    if (
      field.type === "checkbox" ||
      field.type === "radio"
    ) {
      return;
    }

    data[key] = value;
  });

  data.consent = document.getElementById("consent")?.checked || false;

  return data;
}

function getRadioValue(name) {
  return elements.projectForm.querySelector(
    `input[name="${CSS.escape(name)}"]:checked`
  )?.value || "";
}

function getCheckedValues(name) {
  return [
    ...elements.projectForm.querySelectorAll(
      `input[type="checkbox"][name="${CSS.escape(name)}"]:checked`
    )
  ].map((input) => input.value);
}

/* =========================================================
   CONDITIONAL FIELDS
========================================================= */

function initializeConditionalFields() {
  updateConditionalFields();
}

function updateConditionalFields() {
  toggleOtherField(
    "websitePurpose",
    "Other",
    "purposeOtherWrap"
  );

  toggleOtherField(
    "websiteGoals",
    "Other",
    "goalOtherWrap"
  );

  toggleOtherField(
    "visitorActions",
    "Other",
    "actionOtherWrap"
  );

  toggleOtherField(
    "pages",
    "Other",
    "pageOtherWrap"
  );

  toggleOtherField(
    "designStyle",
    "Other",
    "styleOtherWrap"
  );

  toggleOtherField(
    "features",
    "Other",
    "featureOtherWrap"
  );

  const hasEcommerce =
    getCheckedValues("websitePurpose").includes("E-commerce Store") ||
    getCheckedValues("features").some((feature) =>
      [
        "Online payments",
        "Shopping cart",
        "Checkout",
        "Product reviews",
        "Product filtering",
        "Product search",
        "Wishlist"
      ].includes(feature)
    ) ||
    getCheckedValues("pages").some((page) =>
      [
        "Products",
        "Shop",
        "Product Details"
      ].includes(page)
    );

  document
    .querySelectorAll(".ecommerce-trigger, .ecommerce-feature")
    .forEach((element) => {
      element.classList.toggle("ecommerce-selected-context", hasEcommerce);
    });

  const hasDomain = getRadioValue("hasDomain");

  toggleVisibility(
    "domainWrap",
    hasDomain === "Yes"
  );

  const hasHosting = getRadioValue("hasHosting");

  toggleVisibility(
    "hostingWrap",
    hasHosting === "Yes"
  );

  const timeline = getRadioValue("timeline");

  toggleVisibility(
    "specificDateWrap",
    timeline === "Specific date"
  );
}

function toggleOtherField(
  groupName,
  expectedValue,
  wrapperId
) {
  const wrapper = document.getElementById(wrapperId);

  if (!wrapper) {
    return;
  }

  const selected = getCheckedValues(groupName).includes(
    expectedValue
  );

  wrapper.hidden = !selected;
}

function toggleVisibility(id, visible) {
  const element = document.getElementById(id);

  if (element) {
    element.hidden = !visible;
  }
}

function isFieldVisible(field) {
  if (!field) {
    return false;
  }

  const parentConditional = field.closest(".conditional-field");

  if (parentConditional?.hidden) {
    return false;
  }

  return !field.closest("[hidden]");
}

/* =========================================================
   COLOR INPUTS
========================================================= */

function initializeColorInputs() {
  if (
    !elements.primaryColor ||
    !elements.primaryColorText ||
    !elements.secondaryColor ||
    !elements.secondaryColorText
  ) {
    return;
  }

  elements.primaryColorText.value =
    elements.primaryColor.value.toUpperCase();

  elements.secondaryColorText.value =
    elements.secondaryColor.value.toUpperCase();

  elements.primaryColor.addEventListener("input", () => {
    elements.primaryColorText.value =
      elements.primaryColor.value.toUpperCase();

    scheduleSave();
  });

  elements.secondaryColor.addEventListener("input", () => {
    elements.secondaryColorText.value =
      elements.secondaryColor.value.toUpperCase();

    scheduleSave();
  });

  elements.primaryColorText.addEventListener("change", () => {
    syncColorText(
      elements.primaryColorText,
      elements.primaryColor
    );
  });

  elements.secondaryColorText.addEventListener("change", () => {
    syncColorText(
      elements.secondaryColorText,
      elements.secondaryColor
    );
  });
}

function syncColorText(textInput, colorInput) {
  const value = textInput.value.trim();

  if (/^#[0-9a-f]{6}$/i.test(value)) {
    colorInput.value = value;
    textInput.value = value.toUpperCase();
    scheduleSave();
  } else {
    textInput.value = colorInput.value.toUpperCase();
  }
}

/* =========================================================
   REVIEW
========================================================= */

function initializeReviewEditing() {
  elements.reviewContainer.addEventListener("click", (event) => {
    const editButton = event.target.closest("[data-edit-step]");

    if (!editButton) {
      return;
    }

    const step = Number(editButton.dataset.editStep);

    setStep(step);
  });
}

function renderReview() {
  const data = collectFormData();

  const sections = [
    {
      title: "Client information",
      step: 0,
      items: [
        ["Full name", data.fullName],
        ["Business / company", data.businessName],
        ["Email", data.email],
        ["Phone", data.phone],
        ["Country", data.country],
        ["City", data.city],
        ["Preferred contact", data.contactMethod]
      ]
    },
    {
      title: "Business information",
      step: 1,
      items: [
        ["Business description", data.businessDescription],
        ["Products / services", data.productsServices],
        ["Business age", data.businessAge],
        ["Current website", data.currentWebsite],
        ["Online presence", data.onlinePresence],
        ["Social links", data.socialLinks]
      ]
    },
    {
      title: "Website objectives",
      step: 2,
      items: [
        ["Website purpose", data.websitePurpose],
        ["Other purpose", data.purposeOther],
        ["Main goals", data.websiteGoals],
        ["Other goal", data.goalOther]
      ]
    },
    {
      title: "Target audience",
      step: 3,
      items: [
        ["Ideal customer", data.idealCustomer],
        ["Age range", data.ageRange],
        ["Gender", data.audienceGender],
        ["Location / market", data.audienceLocation],
        ["Customer type", data.customerType],
        ["Customer problems", data.audienceProblems],
        ["Visitor actions", data.visitorActions],
        ["Other action", data.actionOther]
      ]
    },
    {
      title: "Website pages",
      step: 4,
      items: [
        ["Requested pages", data.pages],
        ["Other page", data.pageOther],
        ["Most important pages", data.importantPages]
      ]
    },
    {
      title: "Design & branding",
      step: 5,
      items: [
        ["Logo", data.hasLogo],
        ["Brand colors", data.hasBrandColors],
        ["Brand guidelines", data.brandGuidelines],
        ["Primary color", data.primaryColor],
        ["Secondary color", data.secondaryColor],
        ["Visual style", data.designStyle],
        ["Other style", data.styleOther],
        ["Style description", data.visualStyle],
        ["Reference websites", data.referenceWebsites]
      ]
    },
    {
      title: "Website features",
      step: 6,
      items: [
        ["Features", data.features],
        ["Other feature", data.featureOther],
        ["Feature details", data.featureDetails]
      ]
    },
    {
      title: "Content",
      step: 7,
      items: [
        ["Content responsibility", data.contentResponsibility],
        ["Existing content", data.existingContent],
        ["Product descriptions", data.productDescriptions],
        ["About content", data.aboutContent],
        ["Testimonials", data.testimonialsContent],
        ["FAQs", data.faqContent],
        ["Other content", data.otherContent]
      ]
    },
    {
      title: "Domain & hosting",
      step: 8,
      items: [
        ["Has domain", data.hasDomain],
        ["Domain name", data.domainName],
        ["Has hosting", data.hasHosting],
        ["Hosting provider", data.hostingProvider],
        ["Technical requirements", data.technicalRequirements]
      ]
    },
    {
      title: "SEO & marketing",
      step: 9,
      items: [
        ["SEO requirement", data.seoLevel],
        ["Main keywords", data.seoKeywords],
        ["Target locations", data.seoLocations],
        ["Competitors", data.seoCompetitors],
        ["Google Business Profile", data.googleBusiness],
        ["Existing SEO information", data.existingSeo]
      ]
    },
    {
      title: "Budget & timeline",
      step: 10,
      items: [
        ["Estimated budget", data.budget],
        ["Desired timeframe", data.timeline],
        ["Specific date", data.specificDate]
      ]
    },
    {
      title: "Additional requirements",
      step: 11,
      items: [
        ["Additional requirements", data.additionalRequirements]
      ]
    }
  ];

  elements.reviewContainer.innerHTML = sections
    .map((section, index) => {
      const items = section.items
        .map(([label, value]) => {
          const displayValue = formatReviewValue(value);

          return `
            <div class="review-item">
              <strong>${escapeHTML(label)}</strong>
              <span class="${displayValue === "Not provided" ? "review-empty" : ""}">
                ${escapeHTML(displayValue)}
              </span>
            </div>
          `;
        })
        .join("");

      return `
        <article class="review-section">
          <div class="review-header">
            <div>
              <span class="review-index">${String(index + 1).padStart(2, "0")}</span>
              <h3>${escapeHTML(section.title)}</h3>
            </div>

            <button
              type="button"
              class="review-edit"
              data-edit-step="${section.step}">
              Edit
            </button>
          </div>

          <div class="review-body">
            ${items}
          </div>
        </article>
      `;
    })
    .join("");
}

function formatReviewValue(value) {
  if (Array.isArray(value)) {
    return value.length
      ? value.join(", ")
      : "Not provided";
  }

  if (
    value === undefined ||
    value === null ||
    String(value).trim() === ""
  ) {
    return "Not provided";
  }

  return String(value);
}

/* =========================================================
   SUBMISSION
========================================================= */

async function handleSubmit(event) {
  event.preventDefault();

  clearSubmitError();

  if (state.isSubmitting) {
    return;
  }

  if (!validateCurrentStep()) {
    return;
  }

  const data = collectFormData();

  if (!data.consent) {
    setGroupError(
      "consent",
      "Please confirm that the information is accurate."
    );

    return;
  }

  state.isSubmitting = true;
  setSubmittingState(true);

  try {
    const response = await submitToWeb3Forms(data);

    if (!response.ok) {
      throw new Error(
        response.message ||
        "The email service could not process the submission."
      );
    }

    /*
     * IMPORTANT:
     * localStorage is cleared ONLY after the email service
     * has confirmed a successful submission.
     */
    clearSavedForm();

    showSuccess(data);
  } catch (error) {
    console.error("Project brief submission failed:", error);

    showSubmitError(
      getSubmissionErrorMessage(error)
    );
  } finally {
    state.isSubmitting = false;
    setSubmittingState(false);
  }
}

async function submitToWeb3Forms(data) {
  if (
    !EMAIL_CONFIG.accessKey ||
    EMAIL_CONFIG.accessKey === "YOUR_WEB3FORMS_ACCESS_KEY"
  ) {
    throw new Error(
      "Web3Forms is not configured yet. Add your Web3Forms Access Key in script.js before submitting."
    );
  }

  const submissionDate = new Date().toLocaleString(
    undefined,
    {
      dateStyle: "medium",
      timeStyle: "short"
    }
  );

  const message = buildEmailMessage(
    data,
    submissionDate
  );

  const payload = {
    access_key: EMAIL_CONFIG.accessKey,
    email_to: EMAIL_CONFIG.recipient,

    subject:
      `New Website Project Brief — ${data.businessName || data.fullName || "Client"}`,

    from_name:
      `Website Project Brief — ${data.fullName || "Client"}`,

    replyto:
      data.email || EMAIL_CONFIG.recipient,

    message,

    botcheck: "",

    "Client Name": data.fullName || "",
    "Business Name": data.businessName || "",
    "Client Email": data.email || "",
    "Client Phone": data.phone || "",
    "Submission Date": submissionDate
  };

  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, 30000);

  try {
    const response = await fetch(
      EMAIL_CONFIG.endpoint,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(payload),
        signal: controller.signal
      }
    );

    let result;

    try {
      result = await response.json();
    } catch {
      throw new Error(
        "The email service returned an unreadable response."
      );
    }

    return {
      ok: response.ok && result.success === true,
      message:
        result.message ||
        (response.ok
          ? "Submission completed."
          : "Submission failed.")
    };
  } finally {
    clearTimeout(timeout);
  }
}

function buildEmailMessage(data, submissionDate) {
  return `
WEBSITE PROJECT BRIEF
=====================

SUBMISSION DATE
${submissionDate}


CLIENT INFORMATION
==================

Full Name:
${data.fullName || "Not provided"}

Business / Company:
${data.businessName || "Not provided"}

Email:
${data.email || "Not provided"}

Phone:
${data.phone || "Not provided"}

Country:
${data.country || "Not provided"}

City:
${data.city || "Not provided"}

Preferred Contact Method:
${data.contactMethod || "Not provided"}


BUSINESS INFORMATION
====================

Business Description:
${data.businessDescription || "Not provided"}

Products / Services:
${data.productsServices || "Not provided"}

Business Age:
${data.businessAge || "Not provided"}

Current Website:
${data.currentWebsite || "Not provided"}

Existing Online Presence:
${data.onlinePresence || "Not provided"}

Social Media Links:
${data.socialLinks || "Not provided"}


WEBSITE OBJECTIVES
==================

Website Purpose:
${formatEmailValue(data.websitePurpose)}

Other Website Purpose:
${data.purposeOther || "Not provided"}

Main Website Goals:
${formatEmailValue(data.websiteGoals)}

Other Goal:
${data.goalOther || "Not provided"}


TARGET AUDIENCE
===============

Ideal Customer:
${data.idealCustomer || "Not provided"}

Age Range:
${data.ageRange || "Not provided"}

Gender:
${data.audienceGender || "Not provided"}

Location / Market:
${data.audienceLocation || "Not provided"}

Profession / Customer Type:
${data.customerType || "Not provided"}

Customer Problems:
${data.audienceProblems || "Not provided"}

Desired Visitor Actions:
${formatEmailValue(data.visitorActions)}

Other Visitor Action:
${data.actionOther || "Not provided"}


REQUESTED PAGES
===============

Pages:
${formatEmailValue(data.pages)}

Other Page:
${data.pageOther || "Not provided"}

Most Important Pages:
${data.importantPages || "Not provided"}


DESIGN & BRANDING
=================

Has Logo:
${data.hasLogo || "Not provided"}

Has Brand Colors:
${data.hasBrandColors || "Not provided"}

Brand Guidelines:
${data.brandGuidelines || "Not provided"}

Primary Color:
${data.primaryColor || "Not provided"}

Secondary Color:
${data.secondaryColor || "Not provided"}

Preferred Website Style:
${formatEmailValue(data.designStyle)}

Other Style:
${data.styleOther || "Not provided"}

Visual Style Description:
${data.visualStyle || "Not provided"}

Reference Websites:
${data.referenceWebsites || "Not provided"}


WEBSITE FEATURES
================

Selected Features:
${formatEmailValue(data.features)}

Other Feature:
${data.featureOther || "Not provided"}

Feature Details / Integrations:
${data.featureDetails || "Not provided"}


E-COMMERCE REQUIREMENTS
======================

E-commerce is included when the client selected an e-commerce
purpose, e-commerce feature or product/shop page.

Approximate Number of Products:
${data.productCount || "Not provided"}

Product Categories:
${data.productCategories || "Not provided"}

Currency:
${data.currency || "Not provided"}

Payment Gateway:
${data.paymentGateway || "Not provided"}

Shipping / Delivery:
${data.shippingMethod || "Not provided"}

Countries / Locations Served:
${data.shippingLocations || "Not provided"}

Inventory Requirements:
${data.inventoryRequirements || "Not provided"}

Discount / Coupon Requirements:
${data.discountRequirements || "Not provided"}

Customer Account Requirements:
${data.customerAccountRequirements || "Not provided"}

Order Tracking Requirements:
${data.orderTrackingRequirements || "Not provided"}

Other E-commerce Requirements:
${data.ecommerceOther || "Not provided"}


CONTENT
=======

Content Responsibility:
${data.contentResponsibility || "Not provided"}

Existing Text / Content:
${data.existingContent || "Not provided"}

Product Descriptions:
${data.productDescriptions || "Not provided"}

About-us Content:
${data.aboutContent || "Not provided"}

Testimonials:
${data.testimonialsContent || "Not provided"}

Frequently Asked Questions:
${data.faqContent || "Not provided"}

Other Content Requirements:
${data.otherContent || "Not provided"}


DOMAIN & HOSTING
================

Has Domain:
${data.hasDomain || "Not provided"}

Domain:
${data.domainName || "Not provided"}

Has Hosting:
${data.hasHosting || "Not provided"}

Hosting Provider:
${data.hostingProvider || "Not provided"}

Technical Requirements:
${data.technicalRequirements || "Not provided"}


SEO & MARKETING
===============

SEO Requirement:
${data.seoLevel || "Not provided"}

Main Keywords:
${data.seoKeywords || "Not provided"}

Target Locations:
${data.seoLocations || "Not provided"}

Competitor Websites:
${data.seoCompetitors || "Not provided"}

Google Business Profile:
${data.googleBusiness || "Not provided"}

Existing SEO Information:
${data.existingSeo || "Not provided"}


BUDGET & TIMELINE
=================

Estimated Budget:
${data.budget || "Not provided"}

Desired Timeframe:
${data.timeline || "Not provided"}

Specific Completion Date:
${data.specificDate || "Not provided"}


ADDITIONAL REQUIREMENTS
=======================

${data.additionalRequirements || "Not provided"}


SECURITY NOTICE
===============

Client are adviced not to provide passwords, API keys,
payment card numbers, Carding credentials, hosting passwords,
authentication tokens or other sensitive credentials. Or the can contact the person 
that refered them. This is for security purpose.

 - EarnDee Limited.
`.trim();
}

function formatEmailValue(value) {
  if (Array.isArray(value)) {
    return value.length
      ? value.map((item) => `• ${item}`).join("\n")
      : "Not provided";
  }

  return value || "Not provided";
}

function setSubmittingState(isSubmitting) {
  elements.submitButton.disabled = isSubmitting;
  elements.nextButton.disabled = isSubmitting;
  elements.backButton.disabled = isSubmitting;

  elements.submitButton.classList.toggle(
    "loading",
    isSubmitting
  );

  elements.submitButtonText.textContent = isSubmitting
    ? "Sending..."
    : "Submit Project Brief";
}

function showSubmitError(message) {
  elements.submitError.hidden = false;
  elements.submitError.textContent = message;

  elements.submitError.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "center"
  });
}

function clearSubmitError() {
  elements.submitError.hidden = true;
  elements.submitError.textContent = "";
}

function getSubmissionErrorMessage(error) {
  if (error?.name === "AbortError") {
    return (
      "The request timed out. Your project brief has not been deleted. " +
      "Please check your internet connection and try again."
    );
  }

  if (
    error?.message?.includes("Web3Forms is not configured")
  ) {
    return error.message;
  }

  if (
    !navigator.onLine
  ) {
    return (
      "You appear to be offline. Your completed project brief is still " +
      "saved locally. Reconnect to the internet and try again."
    );
  }

  return (
    error?.message ||
    "We couldn't submit your project brief. Your saved information is safe. Please try again."
  );
}

/* =========================================================
   SUCCESS
========================================================= */

function showSuccess(data) {
  elements.briefApp.hidden = true;
  elements.welcome.hidden = true;
  elements.resumeWrapper.hidden = true;
  elements.successSection.hidden = false;

  elements.successName.textContent =
    data.fullName || "Client";

  elements.successBusiness.textContent =
    data.businessName || "Project";

  elements.successDate.textContent =
    new Date().toLocaleString(
      undefined,
      {
        dateStyle: "medium",
        timeStyle: "short"
      }
    );

  window.scrollTo({
    top: 0,
    behavior: prefersReducedMotion() ? "auto" : "smooth"
  });
}

/* =========================================================
   RESET / START OVER
========================================================= */

function initializeResetControls() {
  elements.headerResetBtn.addEventListener(
    "click",
    openResetModal
  );

  elements.discardDraftButton.addEventListener(
    "click",
    openResetModal
  );

  elements.closeResetModal.addEventListener(
    "click",
    closeResetModal
  );

  elements.cancelReset.addEventListener(
    "click",
    closeResetModal
  );

  elements.confirmReset.addEventListener(
    "click",
    resetApplication
  );

  elements.resetModal.addEventListener(
    "click",
    (event) => {
      if (event.target === elements.resetModal) {
        closeResetModal();
      }
    }
  );
}

function openResetModal() {
  elements.resetModal.hidden = false;

  setTimeout(() => {
    elements.cancelReset.focus();
  }, 20);
}

function closeResetModal() {
  elements.resetModal.hidden = true;
}

function resetApplication() {
  clearSavedForm();

  elements.projectForm.reset();

  if (elements.primaryColor) {
    elements.primaryColor.value = "#0f766e";
    elements.primaryColorText.value = "#0F766E";
  }

  if (elements.secondaryColor) {
    elements.secondaryColor.value = "#111827";
    elements.secondaryColorText.value = "#111827";
  }

  clearValidation(elements.projectForm);
  clearSubmitError();

  state.currentStep = 0;
  state.lastSaved = null;

  updateConditionalFields();
  setStep(0);

  elements.successSection.hidden = true;
  elements.briefApp.hidden = true;
  elements.welcome.hidden = false;
  elements.resumeWrapper.hidden = true;

  closeResetModal();

  showToastMessage("Saved draft removed. Starting fresh.");

  window.scrollTo({
    top: 0,
    behavior: prefersReducedMotion() ? "auto" : "smooth"
  });
}

/* =========================================================
   RESUME
========================================================= */

function showResumePrompt() {
  const percentage = Math.round(
    (state.currentStep / (TOTAL_STEPS - 1)) * 100
  );

  elements.resumeDescription.textContent =
    `You're on step ${state.currentStep + 1} of ${TOTAL_STEPS} (${percentage}% complete).`;

  elements.resumeWrapper.hidden = false;
}

function hideResumePrompt() {
  elements.resumeWrapper.hidden = true;
}

/* =========================================================
   ERROR CLEARING
========================================================= */

function clearIndividualError(field) {
  const wrapper = field.closest(".field");

  if (wrapper) {
    wrapper.classList.remove("has-error");
  }

  const key = field.name || field.id;

  const error = document.querySelector(
    `[data-error-for="${CSS.escape(key)}"]`
  );

  if (error) {
    error.textContent = "";
  }

  field.removeAttribute("aria-invalid");

  /*
   * Clear group error when the user changes a radio or checkbox
   * group. The complete group will still be validated on Continue.
   */
  if (
    field.type === "radio" ||
    field.type === "checkbox"
  ) {
    const groupError = document.querySelector(
      `[data-error-for="${CSS.escape(field.name)}"]`
    );

    if (groupError) {
      groupError.textContent = "";
    }
  }
}

/* =========================================================
   KEYBOARD ACCESS
========================================================= */

function handleKeyboardNavigation(event) {
  if (
    elements.briefApp.hidden ||
    state.isSubmitting
  ) {
    return;
  }

  if (
    event.key === "Enter" &&
    event.target.tagName !== "TEXTAREA" &&
    event.target.tagName !== "BUTTON" &&
    state.currentStep < TOTAL_STEPS - 1
  ) {
    event.preventDefault();
    nextStep();
  }

  if (
    event.key === "Escape" &&
    !elements.resetModal.hidden
  ) {
    closeResetModal();
  }
}

/* =========================================================
   TOAST
========================================================= */

function showToastMessage(message) {
  clearTimeout(state.toastTimer);

  elements.toastText.textContent = message;
  elements.toast.classList.add("show");

  state.toastTimer = setTimeout(() => {
    elements.toast.classList.remove("show");
  }, 2600);
}

/* =========================================================
   UTILITIES
========================================================= */

function prefersReducedMotion() {
  return window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
}

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/* =========================================================
   OPTIONAL E-COMMERCE DETAILS
   These fields are created dynamically inside the Features
   step only when an e-commerce requirement is selected.
========================================================= */

(function initializeEcommerceDetails() {
  const featureFieldset =
    document.querySelector(
      '.form-step[data-step="6"] .choice-fieldset'
    );

  if (!featureFieldset) {
    return;
  }

  const wrapper = document.createElement("div");

  wrapper.className = "ecommerce-panel conditional-field";
  wrapper.id = "ecommercePanel";

  wrapper.hidden = true;

  wrapper.innerHTML = `
    <div class="ecommerce-panel-heading">
      <span class="step-kicker">E-COMMERCE DETAILS</span>
      <h3>Tell us a little more about your store.</h3>
      <p>
        These details help estimate the complexity of product catalogue,
        checkout, inventory and order management.
      </p>
    </div>

    <div class="form-grid two-columns">
      <div class="field">
        <label for="productCount">Approximate number of products</label>
        <input
          id="productCount"
          name="productCount"
          type="text"
          placeholder="e.g. 50–100">
        <small>A rough estimate is enough.</small>
      </div>

      <div class="field">
        <label for="currency">Currency</label>
        <input
          id="currency"
          name="currency"
          type="text"
          placeholder="e.g. NGN, USD, GBP">
        <small>Currency customers should see at checkout.</small>
      </div>

      <div class="field">
        <label for="productCategories">Product categories</label>
        <textarea
          id="productCategories"
          name="productCategories"
          rows="3"
          placeholder="Example: Dresses, shirts, trousers, accessories"></textarea>
        <small>List your main product categories.</small>
      </div>

      <div class="field">
        <label for="paymentGateway">Payment gateway preference</label>
        <input
          id="paymentGateway"
          name="paymentGateway"
          type="text"
          placeholder="e.g. Paystack, Flutterwave, Stripe">
        <small>Tell us if you already have a preferred provider.</small>
      </div>

      <div class="field">
        <label for="shippingMethod">Delivery / shipping method</label>
        <textarea
          id="shippingMethod"
          name="shippingMethod"
          rows="3"
          placeholder="Example: Local courier in Lagos and nationwide delivery."></textarea>
        <small>Explain how customers should receive orders.</small>
      </div>

      <div class="field">
        <label for="shippingLocations">Countries / locations served</label>
        <input
          id="shippingLocations"
          name="shippingLocations"
          type="text"
          placeholder="e.g. Nigeria, Ghana and UK">
        <small>Where can customers place orders?</small>
      </div>

      <div class="field">
        <label for="inventoryRequirements">Inventory requirements</label>
        <textarea
          id="inventoryRequirements"
          name="inventoryRequirements"
          rows="3"
          placeholder="Example: Stock quantities should reduce automatically after orders."></textarea>
        <small>Explain how you currently manage stock.</small>
      </div>

      <div class="field">
        <label for="discountRequirements">Coupons / discounts</label>
        <textarea
          id="discountRequirements"
          name="discountRequirements"
          rows="3"
          placeholder="Example: Percentage discounts, seasonal codes and first-order coupon."></textarea>
        <small>Describe any promotional pricing needs.</small>
      </div>

      <div class="field">
        <label for="customerAccountRequirements">Customer accounts</label>
        <textarea
          id="customerAccountRequirements"
          name="customerAccountRequirements"
          rows="3"
          placeholder="Example: Customers should be able to save addresses and view order history."></textarea>
        <small>Describe account functionality if required.</small>
      </div>

      <div class="field">
        <label for="orderTrackingRequirements">Order tracking</label>
        <textarea
          id="orderTrackingRequirements"
          name="orderTrackingRequirements"
          rows="3"
          placeholder="Example: Customers should receive an order status and tracking number."></textarea>
        <small>Explain what customers should see after purchase.</small>
      </div>
    </div>

    <div class="field">
      <label for="ecommerceOther">Other e-commerce requirements</label>
      <textarea
        id="ecommerceOther"
        name="ecommerceOther"
        rows="4"
        placeholder="Describe any other store requirements, integrations or workflows."></textarea>
    </div>
  `;

  featureFieldset.appendChild(wrapper);

  const observer = new MutationObserver(() => {
    const hasEcommerce =
      getCheckedValues("websitePurpose").includes("E-commerce Store") ||
      getCheckedValues("features").some((feature) =>
        [
          "Online payments",
          "Shopping cart",
          "Checkout",
          "Product reviews",
          "Product filtering",
          "Product search",
          "Wishlist"
        ].includes(feature)
      ) ||
      getCheckedValues("pages").some((page) =>
        [
          "Products",
          "Shop",
          "Product Details"
        ].includes(page)
      );

    wrapper.hidden = !hasEcommerce;
  });

  observer.observe(
    elements.projectForm,
    {
      subtree: true,
      attributes: true,
      attributeFilter: ["checked"]
    }
  );

  elements.projectForm.addEventListener(
    "change",
    () => {
      const hasEcommerce =
        getCheckedValues("websitePurpose").includes("E-commerce Store") ||
        getCheckedValues("features").some((feature) =>
          [
            "Online payments",
            "Shopping cart",
            "Checkout",
            "Product reviews",
            "Product filtering",
            "Product search",
            "Wishlist"
          ].includes(feature)
        ) ||
        getCheckedValues("pages").some((page) =>
          [
            "Products",
            "Shop",
            "Product Details"
          ].includes(page)
        );

      wrapper.hidden = !hasEcommerce;
    }
  );
})();

/* =========================================================
   ADDITIONAL REQUIREMENTS FIELD
   Added to the final review step. Card
========================================================= */

(function addAdditionalRequirementsField() {
  const reviewStep =
    document.querySelector(
      '.form-step[data-step="11"]'
    );

  if (!reviewStep) {
    return;
  }

  const reviewContainer =
    reviewStep.querySelector("#reviewContainer");

  const field = document.createElement("div");

  field.className = "field additional-requirements-field";

  field.innerHTML = `
    <label for="additionalRequirements">
      Additional requirements
    </label>

    <textarea
      id="additionalRequirements"
      name="additionalRequirements"
      rows="6"
      placeholder="Tell us about any special requirements, ideas, integrations, concerns, or expectations that haven't been covered above."></textarea>

    <small>
      Include anything important that the project team should know before planning begins.
    </small>
  `;

  reviewStep.insertBefore(
    field,
    reviewContainer
  );
})();