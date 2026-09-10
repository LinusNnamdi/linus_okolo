(function () {
  'use strict';

  const TOTAL_SECTIONS = 11;
  const STORAGE_KEY = 'nexus_flutter_brief_draft';
  const ACCESS_KEY_PLACEHOLDER = 'YOUR_WEB3_FORMS_ACCESS_KEY';

  let currentSection = 1;
  let isSubmitting = false;

  // DOM refs
  const form = document.getElementById('appBriefForm');
  const sections = () => Array.from(document.querySelectorAll('.form-section'));
  const progressFill = document.getElementById('progressFill');
  const progressText = document.getElementById('progressText');
  const progressBar = document.getElementById('progressBar');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const submitBtn = document.getElementById('submitBtn');
  const draftNotice = document.getElementById('draftNotice');
  const clearDraftBtn = document.getElementById('clearDraftBtn');
  const successState = document.getElementById('successState');
  const errorState = document.getElementById('errorState');
  const errorMessage = document.getElementById('errorMessage');
  const retryBtn = document.getElementById('retryBtn');

  function initializeApp() {
    setupNavigation();
    initializeForm();
    setupConditionalFields();
    restoreDraft();
    setupSampleButtons();
    setupClearDraft();
    updateProgress();
    showSection(1);
  }

  function initializeForm() {
    if (!form) return;
    form.addEventListener('submit', handleFormSubmit);
    form.addEventListener('input', debounce(saveDraft, 400));
    form.addEventListener('change', () => {
      saveDraft();
      setupConditionalFields();
    });
  }

  function setupNavigation() {
    const navToggle = document.getElementById('navToggle');
    const mainNav = document.getElementById('mainNav');
    if (navToggle && mainNav) {
      navToggle.addEventListener('click', () => {
        const open = mainNav.classList.toggle('is-open');
        navToggle.setAttribute('aria-expanded', open);
      });
    }

    if (prevBtn) prevBtn.addEventListener('click', goPrev);
    if (nextBtn) nextBtn.addEventListener('click', goNext);
    if (retryBtn) retryBtn.addEventListener('click', () => {
      errorState.hidden = true;
      form.hidden = false;
      document.querySelector('.progress-wrap').hidden = false;
      document.querySelector('.form-nav').hidden = false;
    });
  }

  function showSection(n) {
    currentSection = n;
    sections().forEach((sec) => {
      const num = Number(sec.dataset.section);
      const active = num === n;
      sec.hidden = !active;
      sec.classList.toggle('is-active', active);
    });
    prevBtn.hidden = n === 1;
    nextBtn.hidden = n === TOTAL_SECTIONS;
    submitBtn.hidden = n !== TOTAL_SECTIONS;
    updateProgress();
    window.scrollTo({ top: document.getElementById('questionnaire').offsetTop - 80, behavior: 'smooth' });
  }

  function updateProgress() {
    const pct = Math.round((currentSection / TOTAL_SECTIONS) * 100);
    if (progressFill) progressFill.style.width = pct + '%';
    if (progressBar) progressBar.setAttribute('aria-valuenow', pct);
    if (progressText) progressText.textContent = `Section ${currentSection} of ${TOTAL_SECTIONS}`;
  }

  function goNext() {
    if (!validateSection(currentSection)) return;
    if (currentSection < TOTAL_SECTIONS) showSection(currentSection + 1);
  }

  function goPrev() {
    if (currentSection > 1) showSection(currentSection - 1);
  }

  // ---------- Validation ----------
  function validateSection(sectionNum) {
    const section = document.querySelector(`.form-section[data-section="${sectionNum}"]`);
    if (!section) return true;

    let valid = true;
    let firstInvalid = null;

    // Clear previous errors in this section
    section.querySelectorAll('.field.has-error').forEach((f) => f.classList.remove('has-error'));
    section.querySelectorAll('.field-error').forEach((e) => (e.textContent = ''));

    // Required text / textarea / select / email / tel
    section.querySelectorAll('[required]').forEach((el) => {
      if (el.closest('.conditional') && el.closest('.conditional').hidden) return;
      if (el.type === 'radio' || el.type === 'checkbox') return;

      const field = el.closest('.field');
      if (!field) return;

      let ok = true;
      const val = (el.value || '').trim();

      if (!val) {
        ok = false;
        setError(field, 'This field is required.');
      } else if (el.type === 'email' && !isValidEmail(val)) {
        ok = false;
        setError(field, 'Please enter a valid email address.');
      } else if (el.type === 'tel' && val.length < 7) {
        ok = false;
        setError(field, 'Please enter a valid phone number.');
      }

      if (!ok) {
        valid = false;
        if (!firstInvalid) firstInvalid = el;
      }
    });

    // Required radio groups
    const radioNames = new Set();
    section.querySelectorAll('input[type="radio"][required]').forEach((r) => {
      if (r.closest('.conditional') && r.closest('.conditional').hidden) return;
      radioNames.add(r.name);
    });
    radioNames.forEach((name) => {
      const checked = section.querySelector(`input[name="${name}"]:checked`);
      const field = section.querySelector(`input[name="${name}"]`)?.closest('.field');
      if (!checked && field) {
        valid = false;
        setError(field, 'Please select an option.');
        if (!firstInvalid) firstInvalid = section.querySelector(`input[name="${name}"]`);
      }
    });

    // Required checkbox groups
    section.querySelectorAll('[data-required-group]').forEach((group) => {
      if (group.closest('.conditional') && group.closest('.conditional').hidden) return;
      const name = group.dataset.requiredGroup;
      const any = section.querySelectorAll(`input[name="${name}"]:checked`).length > 0;
      const field = group.closest('.field');
      if (!any && field) {
        valid = false;
        setError(field, 'Please select at least one option.');
        if (!firstInvalid) firstInvalid = group.querySelector('input');
      }
    });

    // Special: backend "need_backend" only when visible
    const backendNeeded = document.getElementById('backend_needed');
    if (backendNeeded && !backendNeeded.hidden && sectionNum === 6) {
      const need = section.querySelector('input[name="need_backend"]:checked');
      if (!need) {
        valid = false;
        setError(backendNeeded, 'Please select an option.');
        if (!firstInvalid) firstInvalid = backendNeeded.querySelector('input');
      }
    }

    if (!valid && firstInvalid) {
      firstInvalid.focus({ preventScroll: true });
      firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return valid;
  }

  function setError(field, msg) {
    field.classList.add('has-error');
    const err = field.querySelector('.field-error');
    if (err) err.textContent = msg;
  }

  function isValidEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  // ---------- Conditional fields ----------
  function setupConditionalFields() {
    // Search details
    toggleConditional('requires_search', 'Yes', 'search_details');
    // Backend
    const hasBackend = form.querySelector('input[name="has_backend"]:checked')?.value;
    const existing = document.getElementById('backend_existing');
    const needed = document.getElementById('backend_needed');
    if (existing && needed) {
      existing.hidden = hasBackend !== 'Yes';
      needed.hidden = !(hasBackend === 'No' || hasBackend === 'Not sure');
      // clear required state on hidden radios
      needed.querySelectorAll('input').forEach((i) => {
        if (needed.hidden) i.removeAttribute('required');
        else if (i.value) i.setAttribute('required', ''); // we validate manually
      });
    }
    // Payments
    toggleConditional('requires_payments', 'Yes', 'payment_methods');
    // Push notifications
    toggleConditional('push_notifications', 'Yes', 'notification_events');
  }

  function toggleConditional(radioName, showValue, targetId) {
    const checked = form.querySelector(`input[name="${radioName}"]:checked`)?.value;
    const target = document.getElementById(targetId);
    if (target) target.hidden = checked !== showValue;
  }

  // ---------- Sample style buttons ----------
  function setupSampleButtons() {
    document.querySelectorAll('.choose-style').forEach((btn) => {
      btn.addEventListener('click', () => {
        const style = btn.dataset.style;
        populateSamplePreference(style);
      });
    });
  }

  function populateSamplePreference(style) {
    const select = document.getElementById('sample_preference');
    const visual = document.getElementById('visual_style');
    if (!select) return;

    if (style === 'Fintech') {
      select.value = 'Sample 1 — Fintech & Wallet';
      if (visual && !visual.value) visual.value = 'Fintech';
    } else if (style === 'Service & Workforce') {
      select.value = 'Sample 2 — Service & Workforce';
      if (visual && !visual.value) visual.value = 'Modern';
    }
    saveDraft();
    // gentle feedback
    const note = document.createElement('div');
    note.className = 'draft-notice';
    note.style.marginTop = '0.75rem';
    note.textContent = 'Style preference applied to the questionnaire.';
    btn.parentElement.appendChild(note);
    setTimeout(() => note.remove(), 2500);
    // jump toward questionnaire
    document.getElementById('questionnaire')?.scrollIntoView({ behavior: 'smooth' });
  }

  // ---------- Draft / localStorage ----------
  function saveDraft() {
    if (!form) return;
    const data = {};
    const fd = new FormData(form);
    // collect all named fields (including unchecked we skip)
    form.querySelectorAll('[name]').forEach((el) => {
      const name = el.name;
      if (!name || name === 'access_key' || name === 'botcheck') return;
      if (el.type === 'checkbox') {
        if (!data[name]) data[name] = [];
        if (el.checked) data[name].push(el.value);
      } else if (el.type === 'radio') {
        if (el.checked) data[name] = el.value;
      } else {
        data[name] = el.value;
      }
    });
    data.__section = currentSection;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      if (draftNotice) draftNotice.hidden = false;
    } catch (e) {
      /* ignore quota */
    }
  }

  function restoreDraft() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const data = JSON.parse(raw);
      Object.keys(data).forEach((name) => {
        if (name === '__section') return;
        const val = data[name];
        if (Array.isArray(val)) {
          val.forEach((v) => {
            const el = form.querySelector(`input[name="${name}"][value="${CSS.escape(v)}"]`);
            if (el) el.checked = true;
          });
        } else {
          const els = form.querySelectorAll(`[name="${name}"]`);
          els.forEach((el) => {
            if (el.type === 'radio' || el.type === 'checkbox') {
              if (el.value === val) el.checked = true;
            } else {
              el.value = val;
            }
          });
        }
      });
      if (data.__section) currentSection = Math.min(Number(data.__section) || 1, TOTAL_SECTIONS);
      setupConditionalFields();
      if (draftNotice) draftNotice.hidden = false;
    } catch (e) {
      /* ignore */
    }
  }

  function clearDraft() {
    if (!confirm('Clear all saved answers on this device? This cannot be undone.')) return;
    localStorage.removeItem(STORAGE_KEY);
    form.reset();
    setupConditionalFields();
    showSection(1);
    if (draftNotice) draftNotice.hidden = true;
  }

  function setupClearDraft() {
    if (clearDraftBtn) clearDraftBtn.addEventListener('click', clearDraft);
  }

  // ---------- Submit ----------
  async function handleFormSubmit(e) {
    e.preventDefault();
    if (isSubmitting) return;
    if (!validateSection(currentSection)) return;

    // final full-form required check (contact section already validated)
    const keyInput = form.querySelector('input[name="access_key"]');
    if (!keyInput || keyInput.value === ACCESS_KEY_PLACEHOLDER || !keyInput.value.trim()) {
      showErrorState('Please replace YOUR_WEB3FORMS_ACCESS_KEY with your real Web3Forms access key before submitting.');
      return;
    }

    isSubmitting = true;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting…';

    // Build a readable message body for the email
    const payload = buildReadablePayload();

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        localStorage.removeItem(STORAGE_KEY);
        showSuccessState();
      } else {
        showErrorState(json.message || 'Submission failed. Please try again.');
      }
    } catch (err) {
      showErrorState('Network error. Please check your connection and try again.');
    } finally {
      isSubmitting = false;
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit Project Brief';
    }
  }

  function buildReadablePayload() {
    const data = {
      access_key: form.querySelector('[name="access_key"]').value,
      subject: form.querySelector('[name="subject"]').value,
      from_name: form.querySelector('[name="from_name"]').value,
      botcheck: '',
    };

    // Flatten all form values into a clean text body
    const lines = [];
    const labels = {
      app_name: 'App name',
      business_problem: 'Problem solved',
      primary_purpose: 'Main purpose',
      business_goals: 'Business goals',
      business_goals_other: 'Business goals (other)',
      differentiators: 'Differentiators',
      app_owner: 'Owner / manager',
      business_model: 'Business model',
      regions: 'Regions',
      languages: 'Languages',
      platforms: 'Platforms',
      primary_users: 'Primary users',
      user_characteristics: 'User characteristics',
      user_roles: 'User roles',
      role_capabilities: 'Role capabilities',
      admin_dashboard: 'Admin dashboard',
      self_registration: 'Self registration',
      registration_fields: 'Registration fields',
      auth_methods: 'Auth methods',
      forgot_password: 'Forgot password flow',
      biometrics: 'Biometrics',
      device_verification: 'Device verification',
      special_security: 'Special security',
      top_actions: 'Top user actions',
      mvp_features: 'MVP features',
      later_features: 'Later features',
      user_journey: 'User journey',
      first_screen: 'First screen',
      dashboard_actions: 'Dashboard actions',
      requires_search: 'Requires search',
      search_targets: 'Search targets',
      filtering_sorting: 'Filtering / sorting',
      ugc: 'User-generated content',
      workflows: 'Transactions / workflows',
      has_logo: 'Has logo',
      has_brand_colors: 'Has brand colors',
      design_reference: 'Design reference',
      visual_style: 'Visual style',
      sample_preference: 'Sample preference',
      design_inspiration: 'Design inspiration',
      dark_mode: 'Dark mode',
      nav_style: 'Navigation style',
      animation_level: 'Animation level',
      data_stored: 'Data stored',
      has_backend: 'Has backend',
      backend_tech_existing: 'Existing backend tech',
      need_backend: 'Need backend from us',
      preferred_backend: 'Preferred backend',
      realtime: 'Real-time data',
      offline: 'Offline support',
      requires_payments: 'Requires payments',
      payment_methods: 'Payment methods',
      integrations: 'Integrations',
      location: 'Location / GPS',
      maps: 'Maps',
      chat: 'Chat / messaging',
      push_notifications: 'Push notifications',
      notification_triggers: 'Notification triggers',
      security_requirements: 'Security requirements',
      role_permissions: 'Role-based permissions',
      admin_actions: 'Admin actions',
      sensitive_data: 'Sensitive data',
      regulatory: 'Regulatory requirements',
      audit_logs: 'Audit logs',
      admin_metrics: 'Admin metrics',
      analytics: 'Analytics',
      downloadable_reports: 'Downloadable reports',
      kpis: 'KPIs',
      launch_date: 'Launch date',
      budget_range: 'Budget range',
      dev_priority: 'Development priority',
      existing_infra: 'Existing infra',
      content_provider: 'Content provider',
      store_deployment: 'Store deployment',
      maintenance: 'Post-launch maintenance',
      future_features: 'Future features',
      additional_notes: 'Additional notes',
      client_name: 'Client name',
      client_company: 'Company',
      client_email: 'Email',
      client_phone: 'Phone',
      contact_method: 'Preferred contact',
      best_time: 'Best time to contact',
    };

    const fd = new FormData(form);
    const collected = {};
    for (const [k, v] of fd.entries()) {
      if (['access_key', 'subject', 'from_name', 'botcheck'].includes(k)) continue;
      if (!collected[k]) collected[k] = [];
      collected[k].push(v);
    }

    Object.keys(labels).forEach((key) => {
      const vals = collected[key];
      if (!vals || !vals.length) return;
      const joined = vals.filter(Boolean).join(', ');
      if (!joined.trim()) return;
      lines.push(`${labels[key]}: ${joined}`);
      data[key] = joined;
    });

    data.message = lines.join('\n');
    return data;
  }

  function showSuccessState() {
    form.hidden = true;
    document.querySelector('.progress-wrap').hidden = true;
    document.querySelector('.form-nav').hidden = true;
    successState.hidden = false;
    errorState.hidden = true;
    window.scrollTo({ top: successState.offsetTop - 100, behavior: 'smooth' });
  }

  function showErrorState(msg) {
    if (errorMessage) errorMessage.textContent = msg || 'Submission failed.';
    errorState.hidden = false;
    // keep form visible so they can retry
  }

  function debounce(fn, ms) {
    let t;
    return function (...args) {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), ms);
    };
  }

  // Boot
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
  } else {
    initializeApp();
  }
})();