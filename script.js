(function () {
  "use strict";

  const WHATSAPP_NUMBER = "2348148478414"; 
  
  const BUDGET_SERVICES = [
    { id: "flutter", name: "Flutter Mobile App", price: 550000 },
    { id: "business-web", name: "Business Website", price: 100000 },
    { id: "real-estate-web", name: "Real Estate Website", price: 150000 },
    { id: "E-commerce-web", name: "E-commerce Responsive Web Application", price: 1200000 },
    { id: "aws", name: "AWS Infrastructure Setup", price: 150000 },
    { id: "server-mon", name: "Server Monitoring Setup", price: 75000 },
    { id: "datadog", name: "Datadog Monitoring Setup", price: 75000 },
    { id: "docker", name: "Docker Setup", price: 75000 },
    { id: "GitHub Action", name: "GitHub Actions CI/CD Setup", price: 75000 },
  ];
  
  function formatNaira(amount) {
    return "₦" + amount.toLocaleString("en-NG");
  }

  function openWhatsApp(message) {
    if (!WHATSAPP_NUMBER || WHATSAPP_NUMBER === "YOUR_WHATSAPP_NUMBER") {
      alert(
        "WhatsApp number is not configured yet.\n\nPlease set WHATSAPP_NUMBER in script.js to your number (e.g. 2348012345678)."
      );
      return;
    }
    const url =
      "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function initNav() {
    const toggle = document.getElementById("navToggle");
    const menu = document.getElementById("navMenu");
    if (!toggle || !menu) return;

    function closeMenu() {
      toggle.setAttribute("aria-expanded", "false");
      menu.classList.remove("is-open");
      document.body.style.overflow = "";
    }

    function openMenu() {
      toggle.setAttribute("aria-expanded", "true");
      menu.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }

    toggle.addEventListener("click", function () {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      if (expanded) closeMenu();
      else openMenu();
    });

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }
  
  function initTerminal() {
    const output = document.getElementById("terminalOutput");
    const input = document.getElementById("terminalInput");
    const body = document.getElementById("terminalBody");
    if (!output || !input || !body) return;

    const history = [];
    let historyIndex = -1;

    const commands = {
      clear: function () {
        output.innerHTML = "";
        return null;
      },
      pwd: function () {
        return "linus_portfolio/";
      },
      "--help": function () {
        return [
          "Available commands:",
          "",
          "  about        Learn about Linus",
          "  skills       View technical capabilities",
          "  projects     Explore selected projects",
          "  experience   Professional experience",
          "  contact      Contact Linus",
          "  whoami       Identity summary",
          "  ls -la       List technical capabilities",
          "  pwd          Current path",
          "  clear        Clear terminal",
          "  --help       Show this help",
        ].join("\n");
      },
      help: function () {
        return commands["--help"]();
      },
      "ls -la": function () {
        return [
          "drwxr-xr-x  Flutter/",
          "drwxr-xr-x  Web-Development/",
          "drwxr-xr-x  AWS/",
          "drwxr-xr-x  Azure/",
          "drwxr-xr-x  GCP/",
          "drwxr-xr-x  Datadog/",
          "drwxr-xr-x  Observability/",
          "drwxr-xr-x  Docker/",
          "drwxr-xr-x  GitHub-Actions/",
          "drwxr-xr-x  Firebase/",
          "drwxr-xr-x  JavaScript/",
        ].join("\n");
      },
      ls: function () {
        return commands["ls -la"]();
      },
      skills: function () {
        return [
          "Mobile:  Flutter, Dart, Firebase",
          "Web:     HTML5, CSS3, Vanilla JavaScript",
          "Cloud:   AWS (strongest), Azure, GCP",
          "Observability: Datadog, server monitoring, Slack alerts",
          "Automation: Docker , GitHub Actions CI/CD pipeline, Kubernetes",
        ].join("\n");
      },
      projects: function () {
        return [
          "Featured: The Aisle (Flutter · Google Play)",
          "  — Public app with auth, wallet, marketplace, payments, ads",
          "  — Worker & admin companion apps",
          "",
          "Web (freelance / unpaid):",
          "  — Tabs Mobile Business",
          "  — BonaVee Real Estate Services",
          "  — Oma Thrift Vendor remote hub",
        ].join("\n");
      },
      about: function () {
        return [
          "",
          "Linus Nnamdi Okolo · Software Engineer · Nigeria",
          "",
          "Build → Test → Deploy → Monitor → Troubleshoot → Improve",
          "",
          "Primary focus: Flutter mobile development.",
          "Also: web (HTML/CSS/JS), cloud infrastructure (AWS, GCP, and Azure),",
          "server monitoring and observability (Datadog).",
          "Other CI/CD pipeline, Docker, Kubernetes.",
        ].join("\n");
      },
      experience: function () {
        return [
          "EarnDee Limited — Software Engineer",
          "November 9, 2023 – Present",
          "",
          "  Flutter apps · Google Play · Firebase · APIs",
          "  Worker/admin apps · Responsive websites",
          "  Cloud infrastructure · Server monitoring",
        ].join("\n");
      },
      contact: function () {
        return "Scroll to the Contact section or use Create Your button.\nWhatsApp message is generated from the contact form.";
      },
      whoami: function () {
        return "linus — Software Engineer | Flutter & Mobile | Cloud | Datadog Observability | Docker | Kubernetes | AWS Lambda";
      },
    };

    function appendLine(text, className) {
      const div = document.createElement("div");
      div.className = "terminal-line" + (className ? " " + className : "");
      div.textContent = text;
      output.appendChild(div);
      body.scrollTop = body.scrollHeight;
    }

    function appendMultiline(text, className) {
      text.split("\n").forEach(function (line) {
        appendLine(line || " ", className);
      });
    }

    function runCommand(raw) {
      const cmd = raw.trim();
      if (!cmd) return;

      appendLine("linus@portfolio:~$ " + cmd);

      const handler = commands[cmd] || commands[cmd.toLowerCase()];
      if (handler) {
        const result = handler();
        if (result !== null && result !== undefined) {
          appendMultiline(result);
        }
      } else {
        appendLine(
          'Command not found: "' + cmd + '". Type --help for available commands.',
          "terminal-error"
        );
      }
    }

    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        const value = input.value;
        if (value.trim()) {
          history.push(value);
          historyIndex = history.length;
        }
        runCommand(value);
        input.value = "";
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (history.length === 0) return;
        historyIndex = Math.max(0, historyIndex - 1);
        input.value = history[historyIndex] || "";
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (historyIndex < history.length - 1) {
          historyIndex += 1;
          input.value = history[historyIndex] || "";
        } else {
          historyIndex = history.length;
          input.value = "";
        }
      }
    });

    body.addEventListener("click", function () {
      input.focus();
    });
  }

  // ============================================================
  
  function initBudget() {
    const optionsEl = document.getElementById("budgetOptions");
    const selectedEl = document.getElementById("budgetSelected");
    const totalEl = document.getElementById("budgetTotal");
    const contactBtn = document.getElementById("budgetContact");
    const resetBtn = document.getElementById("budgetReset");
    if (!optionsEl || !selectedEl || !totalEl || !contactBtn || !resetBtn) return;

    const selected = new Set();

    function renderOptions() {
      optionsEl.innerHTML = "";
      BUDGET_SERVICES.forEach(function (svc) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "budget-option" + (selected.has(svc.id) ? " selected" : "");
        btn.setAttribute("aria-pressed", selected.has(svc.id) ? "true" : "false");
        btn.dataset.id = svc.id;
        btn.innerHTML =
          '<span class="budget-option-check" aria-hidden="true">✓</span>' +
          '<span class="budget-option-info">' +
          '<span class="budget-option-name">' +
          svc.name +
          "</span>" +
          '<span class="budget-option-price">Starting estimate: ' +
          formatNaira(svc.price) +
          "</span>" +
          "</span>";
        btn.addEventListener("click", function () {
          if (selected.has(svc.id)) selected.delete(svc.id);
          else selected.add(svc.id);
          update();
        });
        optionsEl.appendChild(btn);
      });
    }

    function getSelectedServices() {
      return BUDGET_SERVICES.filter(function (s) {
        return selected.has(s.id);
      });
    }

    function total() {
      return getSelectedServices().reduce(function (sum, s) {
        return sum + s.price;
      }, 0);
    }

    function update() {
      renderOptions();
      const list = getSelectedServices();
      selectedEl.innerHTML = "";
      if (list.length === 0) {
        const li = document.createElement("li");
        li.className = "budget-empty";
        li.textContent = "No services selected yet.";
        selectedEl.appendChild(li);
        contactBtn.disabled = true;
      } else {
        list.forEach(function (svc) {
          const li = document.createElement("li");
          li.innerHTML =
            "<span>" +
            svc.name +
            "</span>" +
            "<span>" +
            formatNaira(svc.price) +
            ' <button type="button" class="budget-remove" data-id="' +
            svc.id +
            '" aria-label="Remove ' +
            svc.name +
            '">✕</button></span>';
          selectedEl.appendChild(li);
        });
        selectedEl.querySelectorAll(".budget-remove").forEach(function (btn) {
          btn.addEventListener("click", function (e) {
            e.stopPropagation();
            selected.delete(btn.dataset.id);
            update();
          });
        });
        contactBtn.disabled = false;
      }
      totalEl.textContent = formatNaira(total());
    }

    contactBtn.addEventListener("click", function () {
      const list = getSelectedServices();
      if (list.length === 0) return;
      const lines = list.map(function (s) {
        return "• " + s.name + " — " + formatNaira(s.price) + " (starting estimate)";
      });
      const message = [
        "Hello Linus,",
        "",
        "I would like to discuss a project based on the following estimated services:",
        "",
        lines.join("\n"),
        "",
        "Estimated total (starting): " + formatNaira(total()),
        "",
        "These are approximate starting estimates. I would like to discuss scope and a formal quote.",
        "",
        "Thank you.",
      ].join("\n");
      openWhatsApp(message);
    });

    resetBtn.addEventListener("click", function () {
      selected.clear();
      update();
    });

    update();
  }

  // ============================================================

  function initContactForm() {
    const form = document.getElementById("contactForm");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = (document.getElementById("contactName") || {}).value || "";
      const service = (document.getElementById("contactService") || {}).value || "";
      const details = (document.getElementById("contactDetails") || {}).value || "";

      const nameTrim = name.trim();
      const serviceTrim = service.trim();
      const detailsTrim = details.trim();

      if (!nameTrim || !serviceTrim || !detailsTrim) {
        alert("Please fill in Name/Business, Service, and Project Details.");
        return;
      }

      const message = [
        "Hello Linus,",
        "",
        "I would like to discuss a project.",
        "",
        "Name/Business:",
        nameTrim,
        "",
        "Service:",
        serviceTrim,
        "",
        "Project details:",
        detailsTrim,
        "",
        "Please let me know how we can discuss the project.",
        "",
        "Thank you.",
      ].join("\n");

      openWhatsApp(message);
    });
  }

  // ============================================================
  // SCROLL REVEAL (subtle)
  // ============================================================
  function initReveal() {
    const els = document.querySelectorAll(
      ".skill-card, .service-card, .why-card, .project-card, .timeline-item, .stat-card"
    );
    if (!els.length || !("IntersectionObserver" in window)) return;

    els.forEach(function (el) {
      el.classList.add("reveal");
    });

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    els.forEach(function (el) {
      observer.observe(el);
    });
  }

  function init() {
    initNav();
    initTerminal();
    initBudget();
    initContactForm();
    initReveal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
