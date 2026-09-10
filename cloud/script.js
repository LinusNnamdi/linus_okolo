/**
 * CloudForge — Client Discovery Questionnaire
 * Vanilla ES6+ · no frameworks
 */

(function () {
  "use strict";

  // ---------------------------------------------------------------------------
  // Constants
  // ---------------------------------------------------------------------------
  const TOTAL_STEPS = 8; // 0–6 form steps + 7 review
  const STEP_NAMES = [
    "Contact",
    "Project",
    "Infrastructure",
    "Architecture",
    "Containers",
    "CI/CD",
    "Monitoring",
    "Review",
  ];

  /** Required field names (or groups) per step index */
  const REQUIRED_BY_STEP = {
    0: ["full_name", "email", "preferred_contact"],
    1: ["main_objective", "application_type", "project_timeline", "success_criteria"],
    2: ["has_cloud", "current_hosting"],
    3: ["languages_frameworks"],
    4: ["docker_usage", "k8s_maintenance"],
    5: ["source_hosting", "on_push_behavior", "cicd_environments"],
    6: ["monitoring_components", "security_ops_requirements"],
  };

  // ---------------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------------
  let currentStep = 0;
  let isSubmitting = false;

  // ---------------------------------------------------------------------------
  // DOM refs
  // ---------------------------------------------------------------------------
  const form = document.getElementById("assessment-form");
  const progressWrap = document.getElementById("progress-wrap");
  const progressFill = document.getElementById("progress-fill");
  const progressLabel = document.getElementById("progress-label");
  const progressSectionName = document.getElementById("progress-section-name");
  const progressDots = document.getElementById("progress-dots");
  const reviewContent = document.getElementById("review-content");
  const submitBtn = document.getElementById("submit-btn");
  const submitError = document.getElementById("submit-error");
  const successScreen = document.getElementById("success-screen");
  const navToggle = document.getElementById("nav-toggle");
  const mainNav = document.getElementById("main-nav");
  const yearEl = document.getElementById("year");

  // ---------------------------------------------------------------------------
  // Init
  // ---------------------------------------------------------------------------
  function init() {
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
    buildProgressDots();
    bindNav();
    bindFormNavigation();
    bindConditionalLogic();
    bindSmoothScroll();
    showStep(0);
    updateProgress();
  }

  // ---------------------------------------------------------------------------
  // Navigation (mobile)
  // ---------------------------------------------------------------------------
  function bindNav() {
    if (!navToggle || !mainNav) return;

    navToggle.addEventListener("click", () => {
      const open = mainNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  function bindSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        const id = anchor.getAttribute("href");
        if (!id || id === "#") return;
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  }

  // ---------------------------------------------------------------------------
  // Progress
  // ---------------------------------------------------------------------------
  function buildProgressDots() {
    if (!progressDots) return;
    progressDots.innerHTML = "";
    for (let i = 0; i < TOTAL_STEPS; i++) {
      const dot = document.createElement("span");
      dot.className = "progress-dot";
      dot.dataset.step = String(i);
      progressDots.appendChild(dot);
    }
  }

  function updateProgress() {
    if (!progressWrap) return;
    progressWrap.hidden = false;

    const pct = Math.round((currentStep / (TOTAL_STEPS - 1)) * 100);
    progressFill.style.width = `${pct}%`;
    progressFill.parentElement.setAttribute("aria-valuenow", String(pct));

    if (currentStep < TOTAL_STEPS - 1) {
      progressLabel.textContent = `Step ${currentStep + 1} of ${TOTAL_STEPS - 1}`;
    } else {
      progressLabel.textContent = "Review";
    }
    progressSectionName.textContent = STEP_NAMES[currentStep] || "";

    progressDots.querySelectorAll(".progress-dot").forEach((dot) => {
      const s = Number(dot.dataset.step);
      dot.classList.remove("is-done", "is-current");
      if (s < currentStep) dot.classList.add("is-done");
      if (s === currentStep) dot.classList.add("is-current");
    });
  }

  // ---------------------------------------------------------------------------
  // Step visibility
  // ---------------------------------------------------------------------------
  function showStep(index) {
    currentStep = index;

    document.querySelectorAll(".form-step").forEach((el) => {
      const step = Number(el.dataset.step);
      const isActive = step === index;
      el.hidden = !isActive;
      el.classList.toggle("is-active", isActive);
    });

    updateProgress();

    // Focus first interactive element in step
    const active = document.querySelector(`.form-step[data-step="${index}"]`);
    if (active) {
      const focusable = active.querySelector(
        'input:not([type="hidden"]):not([type="radio"]):not([type="checkbox"]), select, textarea, button'
      );
      if (focusable) {
        setTimeout(() => focusable.focus({ preventScroll: true }), 50);
      }
    }

    // Scroll questionnaire into view gently
    const section = document.getElementById("questionnaire");
    if (section && index > 0) {
      const headerOffset = 80;
      const top = section.getBoundingClientRect().top + window.scrollY - headerOffset;
      if (window.scrollY > top + 100 || window.scrollY < top - 50) {
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  }

  // ---------------------------------------------------------------------------
  // Form navigation
  // ---------------------------------------------------------------------------
  function bindFormNavigation() {
    form.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-action]");
      if (!btn) return;

      const action = btn.dataset.action;
      if (action === "next") {
        if (validateStep(currentStep)) {
          if (currentStep === 6) {
            generateReview();
            showStep(7);
          } else {
            showStep(currentStep + 1);
          }
        }
      } else if (action === "prev") {
        if (currentStep > 0) showStep(currentStep - 1);
      }
    });

    form.addEventListener("submit", handleSubmit);

    document.getElementById("reset-form-btn")?.addEventListener("click", resetForm);
  }

  // ---------------------------------------------------------------------------
  // Validation
  // ---------------------------------------------------------------------------
  function clearStepErrors(stepIndex) {
    const stepEl = document.querySelector(`.form-step[data-step="${stepIndex}"]`);
    if (!stepEl) return;
    stepEl.querySelectorAll(".field-error").forEach((el) => {
      el.textContent = "";
    });
    stepEl.querySelectorAll(".has-error").forEach((el) => {
      el.classList.remove("has-error");
    });
  }

  function setFieldError(name, message) {
    const errEl = document.getElementById(`err-${name}`);
    if (errEl) errEl.textContent = message;

    // Mark parent field / fieldset
    const input = form.querySelector(`[name="${name}"]`);
    if (!input) return;
    const field = input.closest(".field") || input.closest(".nested-fieldset");
    if (field) field.classList.add("has-error");
  }

  function isVisible(el) {
    if (!el) return false;
    if (el.hidden) return false;
    let parent = el.parentElement;
    while (parent) {
      if (parent.hidden || (parent.classList && parent.classList.contains("conditional") && parent.hidden)) {
        return false;
      }
      // Also check if inside a hidden form-step
      if (parent.classList && parent.classList.contains("form-step") && parent.hidden) {
        return false;
      }
      parent = parent.parentElement;
    }
    return true;
  }

  function getValue(name) {
    const els = form.querySelectorAll(`[name="${name}"]`);
    if (!els.length) return "";

    const first = els[0];
    if (first.type === "radio") {
      const checked = form.querySelector(`[name="${name}"]:checked`);
      return checked ? checked.value : "";
    }
    if (first.type === "checkbox") {
      return Array.from(els)
        .filter((el) => el.checked)
        .map((el) => el.value);
    }
    return first.value.trim();
  }

  function validateEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function validateStep(stepIndex) {
    clearStepErrors(stepIndex);
    const required = REQUIRED_BY_STEP[stepIndex] || [];
    let valid = true;
    let firstInvalid = null;

    required.forEach((name) => {
      const els = form.querySelectorAll(`[name="${name}"]`);
      if (!els.length) return;

      // Skip validation if the control is inside a hidden conditional
      const first = els[0];
      if (!isVisible(first.closest(".field") || first.closest(".nested-fieldset") || first)) {
        return;
      }

      const value = getValue(name);

      if (Array.isArray(value)) {
        if (value.length === 0) {
          setFieldError(name, "Please select at least one option.");
          valid = false;
          if (!firstInvalid) firstInvalid = first;
        }
      } else if (!value) {
        setFieldError(name, "This field is required.");
        valid = false;
        if (!firstInvalid) firstInvalid = first;
      } else if (name === "email" && !validateEmail(value)) {
        setFieldError(name, "Please provide a valid email address.");
        valid = false;
        if (!firstInvalid) firstInvalid = first;
      }
    });

    if (!valid && firstInvalid) {
      firstInvalid.focus({ preventScroll: false });
      firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    return valid;
  }

  // ---------------------------------------------------------------------------
  // Conditional fields
  // ---------------------------------------------------------------------------
  function bindConditionalLogic() {
    form.addEventListener("change", (e) => {
      const target = e.target;
      if (!target.name) return;
      handleConditionalFields();
    });
    // Initial pass
    handleConditionalFields();
  }

  function handleConditionalFields() {
    document.querySelectorAll(".conditional[data-show-when]").forEach((el) => {
      const rule = el.dataset.showWhen; // e.g. "has_cloud:Yes,Partial / in progress"
      const shouldShow = evaluateShowWhen(rule);
      el.hidden = !shouldShow;

      // Clear values of hidden required-looking controls so they don't block submit
      // (we never mark conditionals as required in REQUIRED_BY_STEP when hidden)
      if (!shouldShow) {
        el.querySelectorAll("input, select, textarea").forEach((input) => {
          if (input.type === "checkbox" || input.type === "radio") {
            // leave user selection; just don't validate when hidden
          } else {
            // keep values — user might toggle back
          }
        });
      }
    });
  }

  function evaluateShowWhen(rule) {
    // Format: "field:value1,value2|field2:val"
    // Multiple conditions OR'd by | if present; within a field, values are OR
    if (!rule) return false;
    const groups = rule.split("|");
    return groups.some((group) => {
      const [field, valuesStr] = group.split(":");
      if (!field || !valuesStr) return false;
      const allowed = valuesStr.split(",").map((v) => v.trim());
      const current = getValue(field.trim());

      if (Array.isArray(current)) {
        return current.some((v) => allowed.includes(v));
      }
      return allowed.includes(current);
    });
  }

  // ---------------------------------------------------------------------------
  // Review summary
  // ---------------------------------------------------------------------------
  const REVIEW_SECTIONS = [
    {
      title: "Contact",
      step: 0,
      fields: [
        { name: "full_name", label: "Full name" },
        { name: "company", label: "Company" },
        { name: "email", label: "Email" },
        { name: "phone", label: "Phone" },
        { name: "website_url", label: "Website" },
        { name: "preferred_contact", label: "Preferred contact" },
        { name: "project_description", label: "Additional info" },
      ],
    },
    {
      title: "Project & business",
      step: 1,
      fields: [
        { name: "main_objective", label: "Main objective" },
        { name: "application_type", label: "Application type" },
        { name: "critical_functions", label: "Critical functions" },
        { name: "application_users", label: "Users" },
        { name: "expected_traffic", label: "Expected traffic" },
        { name: "project_timeline", label: "Timeline" },
        { name: "project_budget", label: "Budget" },
        { name: "availability_level", label: "Availability" },
        { name: "disaster_recovery", label: "Disaster recovery" },
        { name: "success_criteria", label: "Success criteria" },
      ],
    },
    {
      title: "Infrastructure",
      step: 2,
      fields: [
        { name: "has_cloud", label: "Has cloud env" },
        { name: "cloud_providers", label: "Cloud providers" },
        { name: "aws_services", label: "AWS services" },
        { name: "gcp_services", label: "GCP services" },
        { name: "azure_services", label: "Azure services" },
        { name: "current_cloud_services", label: "Cloud services" },
        { name: "iac_status", label: "IaC status" },
        { name: "env_separation", label: "Env separation" },
        { name: "current_hosting", label: "Current hosting" },
        { name: "has_diagram", label: "Has diagram" },
        { name: "infra_problems", label: "Infra problems" },
        { name: "planning_migration", label: "Planning migration" },
        { name: "multi_cloud", label: "Multi-cloud" },
      ],
    },
    {
      title: "Architecture",
      step: 3,
      fields: [
        { name: "languages_frameworks", label: "Languages / frameworks" },
        { name: "database_tech", label: "Database" },
        { name: "architecture_style", label: "Architecture style" },
        { name: "async_jobs", label: "Async / jobs" },
        { name: "serverless_needed", label: "Serverless needed" },
        { name: "external_apis", label: "External APIs" },
        { name: "stores_media", label: "Stores media" },
        { name: "resource_requirements", label: "Resource needs" },
        { name: "auto_scaling", label: "Auto-scaling" },
        { name: "performance_sensitive", label: "Perf-sensitive parts" },
      ],
    },
    {
      title: "Containers & Kubernetes",
      step: 4,
      fields: [
        { name: "docker_usage", label: "Docker usage" },
        { name: "has_dockerfiles", label: "Dockerfiles / Compose" },
        { name: "image_registry", label: "Image registry" },
        { name: "kubernetes_required", label: "Kubernetes required" },
        { name: "k8s_platform", label: "K8s platform" },
        { name: "workload_count", label: "Workload count" },
        { name: "k8s_scaling", label: "K8s scaling" },
        { name: "service_communication", label: "Service communication" },
        { name: "deployment_strategy", label: "Deploy strategy" },
        { name: "k8s_maintenance", label: "K8s maintenance" },
      ],
    },
    {
      title: "CI/CD",
      step: 5,
      fields: [
        { name: "source_hosting", label: "Source hosting" },
        { name: "on_push_behavior", label: "On push" },
        { name: "deploy_branches", label: "Deploy branches" },
        { name: "existing_tests", label: "Existing tests" },
        { name: "cicd_environments", label: "CI/CD environments" },
        { name: "prod_approval", label: "Prod approval" },
        { name: "secrets_management", label: "Secrets management" },
      ],
    },
    {
      title: "Monitoring & security",
      step: 6,
      fields: [
        { name: "monitoring_components", label: "Monitoring scope" },
        { name: "alert_events", label: "Alerts" },
        { name: "security_ops_requirements", label: "Security & ops" },
      ],
    },
  ];

  function formatValue(val) {
    if (Array.isArray(val)) return val.length ? val.join(", ") : "";
    return val || "";
  }

  function generateReview() {
    reviewContent.innerHTML = "";

    REVIEW_SECTIONS.forEach((section) => {
      const items = section.fields
        .map((f) => {
          const val = formatValue(getValue(f.name));
          return { label: f.label, value: val };
        })
        .filter((item) => item.value); // only show answered

      if (items.length === 0) return;

      const block = document.createElement("div");
      block.className = "review-section";
      block.innerHTML = `
        <div class="review-section-header">
          <h3>${escapeHtml(section.title)}</h3>
          <button type="button" class="review-edit" data-edit-step="${section.step}">Edit</button>
        </div>
        <ul class="review-items">
          ${items
            .map(
              (item) => `
            <li>
              <span class="review-label">${escapeHtml(item.label)}</span>
              <span class="review-value">${escapeHtml(item.value)}</span>
            </li>`
            )
            .join("")}
        </ul>
      `;
      reviewContent.appendChild(block);
    });

    reviewContent.querySelectorAll("[data-edit-step]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const step = Number(btn.dataset.editStep);
        showStep(step);
      });
    });
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  // ---------------------------------------------------------------------------
  // Submission (Web3Forms)
  // ---------------------------------------------------------------------------
  function collectAllAnswers() {
    const data = {};
    const names = new Set();
    form.querySelectorAll("[name]").forEach((el) => {
      if (el.name && el.name !== "botcheck" && el.name !== "access_key") {
        names.add(el.name);
      }
    });

    names.forEach((name) => {
      const val = getValue(name);
      if (Array.isArray(val)) {
        data[name] = val.join(", ");
      } else {
        data[name] = val;
      }
    });
    return data;
  }

  function buildSummaryText(data) {
    const lines = ["=== Cloud & DevOps Project Assessment ===", ""];
    REVIEW_SECTIONS.forEach((section) => {
      lines.push(`--- ${section.title} ---`);
      section.fields.forEach((f) => {
        const v = data[f.name];
        if (v) lines.push(`${f.label}: ${v}`);
      });
      lines.push("");
    });
    return lines.join("\n");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (isSubmitting) return;

    // Final validation of all required steps
    for (let s = 0; s <= 6; s++) {
      if (!validateStep(s)) {
        showStep(s);
        return;
      }
    }

    const accessKey = form.querySelector('[name="access_key"]')?.value;
    if (!accessKey || accessKey === "YOUR_WEB3FORMS_ACCESS_KEY") {
      showSubmitError(
        "Please replace YOUR_WEB3FORMS_ACCESS_KEY with your real Web3Forms access key before submitting."
      );
      return;
    }

    isSubmitting = true;
    submitBtn.classList.add("is-loading");
    submitBtn.disabled = true;
    submitError.hidden = true;

    const answers = collectAllAnswers();
    const summary = buildSummaryText(answers);

    document.getElementById("field-summary").value = summary;
    document.getElementById("field-metadata").value = JSON.stringify({
      submitted_at: new Date().toISOString(),
      form: "Cloud & DevOps Client Discovery Questionnaire",
      step_count: TOTAL_STEPS,
    });

    // Build FormData from the form (includes all named fields)
    const formData = new FormData(form);

    // Ensure multi-value checkboxes are represented as comma-separated if needed
    // (Web3Forms accepts repeated keys; we already set hidden summary)

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok && (result.success === true || result.success === "true")) {
        showSuccess();
      } else {
        const msg =
          result.message ||
          "We couldn't submit your assessment. Please check your connection and try again.";
        showSubmitError(msg);
      }
    } catch (err) {
      showSubmitError(
        "We couldn't submit your assessment. Please check your connection and try again."
      );
    } finally {
      isSubmitting = false;
      submitBtn.classList.remove("is-loading");
      submitBtn.disabled = false;
    }
  }

  function showSubmitError(message) {
    submitError.textContent = message;
    submitError.hidden = false;
    submitError.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function showSuccess() {
    form.hidden = true;
    progressWrap.hidden = true;
    successScreen.hidden = false;
    successScreen.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function resetForm() {
    form.reset();
    form.hidden = false;
    successScreen.hidden = true;
    submitError.hidden = true;
    handleConditionalFields();
    showStep(0);
    window.scrollTo({ top: document.getElementById("questionnaire").offsetTop - 80, behavior: "smooth" });
  }

  // ---------------------------------------------------------------------------
  // Boot
  // ---------------------------------------------------------------------------
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
