/* Indeed responsive build – shared behaviour for every page. */
(function () {
  "use strict";

  const DESKTOP_QUERY = window.matchMedia("(min-width: 1100px)");

  const JOBS = [
    {
      id: "data-analyst",
      title: "Data Analyst",
      company: "Northwind Analytics",
      location: "Charlotte, NC",
      type: "Full-time",
      pay: "$68,000 – $82,000 a year",
      keywords: ["data", "analytics", "sql", "excel", "tableau"],
      summary:
        "Turn raw data into clear insights that help product and operations teams make better decisions.",
      duties: [
        "Build and maintain dashboards in Tableau and Excel",
        "Write SQL queries to clean and combine data from multiple sources",
        "Present findings to stakeholders in plain language",
      ],
    },
    {
      id: "ux-ui-designer",
      title: "UX/UI Designer",
      company: "Brightline Studio",
      location: "Remote",
      type: "Full-time",
      pay: "$72,000 – $90,000 a year",
      keywords: ["design", "figma", "ux", "ui", "product", "prototype"],
      summary:
        "Design simple, accessible experiences for web and mobile products used by thousands of people every day.",
      duties: [
        "Run user interviews and usability tests",
        "Create wireframes, prototypes, and polished UI in Figma",
        "Work closely with engineers to ship responsive designs",
      ],
    },
    {
      id: "software-engineer",
      title: "Software Engineer",
      company: "Summit Software",
      location: "Raleigh, NC",
      type: "Full-time",
      pay: "$95,000 – $120,000 a year",
      keywords: ["developer", "javascript", "react", "engineering", "code", "web"],
      summary: "Build and improve the web applications that power our customer platform.",
      duties: [
        "Develop features with JavaScript, React, and Node.js",
        "Review code and write automated tests",
        "Collaborate with designers and product managers",
      ],
    },
    {
      id: "product-designer",
      title: "Product Designer",
      company: "Lumen Health",
      location: "Durham, NC",
      type: "Full-time",
      pay: "$80,000 – $98,000 a year",
      keywords: ["design", "figma", "ux", "ui", "prototype", "research"],
      summary:
        "Shape the end-to-end experience of a patient scheduling app, from early research to final hand-off.",
      duties: [
        "Map user journeys and turn them into flows and wireframes",
        "Maintain and grow the team's Figma design system",
        "Test ideas with real users and iterate quickly",
      ],
    },
    {
      id: "front-end-developer",
      title: "Front End Developer",
      company: "Pixel Forge",
      location: "Greensboro, NC",
      type: "Full-time",
      pay: "$75,000 – $95,000 a year",
      keywords: ["frontend", "developer", "html", "css", "javascript", "react", "web", "responsive"],
      summary: "Turn designs into fast, accessible, responsive websites that work on every screen size.",
      duties: [
        "Build mobile-first layouts with HTML, CSS, and JavaScript",
        "Create reusable React components",
        "Fix accessibility and cross-browser issues",
      ],
    },
    {
      id: "business-analyst",
      title: "Business Analyst",
      company: "Carolina Financial Group",
      location: "Charlotte, NC",
      type: "Full-time",
      pay: "$70,000 – $85,000 a year",
      keywords: ["business", "analyst", "requirements", "data", "excel", "process"],
      summary:
        "Connect business teams and IT by gathering requirements and finding ways to improve everyday processes.",
      duties: [
        "Interview stakeholders and document business requirements",
        "Analyze workflows and recommend improvements",
        "Track project progress and report results",
      ],
    },
    {
      id: "project-manager",
      title: "Project Manager",
      company: "Piedmont Builders",
      location: "Salisbury, NC",
      type: "Full-time",
      pay: "$78,000 – $92,000 a year",
      keywords: ["project", "manager", "management", "agile", "planning", "scrum"],
      summary: "Lead projects from kickoff to delivery, keeping teams on schedule and on budget.",
      duties: [
        "Plan timelines, budgets, and resources",
        "Run weekly status meetings with the team and clients",
        "Identify risks early and keep everyone informed",
      ],
    },
    {
      id: "customer-service-representative",
      title: "Customer Service Representative",
      company: "Bluebird Telecom",
      location: "Remote",
      type: "Part-time",
      pay: "$17 – $21 an hour",
      keywords: ["customer", "service", "support", "call center", "representative", "help desk"],
      summary: "Help customers by phone, chat, and email, solving problems with a friendly attitude.",
      duties: [
        "Answer customer questions about billing and accounts",
        "Troubleshoot basic service issues",
        "Log every conversation accurately in our support system",
      ],
    },
  ];

  const WHAT_SUGGESTIONS = [
    "Data Analyst",
    "UX/UI Designer",
    "Software Engineer",
    "Product Designer",
    "Front End Developer",
    "Business Analyst",
    "Project Manager",
    "Customer Service Representative",
  ];

  const CURRENT_LOCATION = "Current Location";
  const WHERE_SUGGESTIONS = [
    CURRENT_LOCATION,
    "Charlotte, NC",
    "Salisbury, NC",
    "Greensboro, NC",
    "Raleigh, NC",
    "Durham, NC",
    "Remote",
  ];

  const APPLICATION_ORDER = ["data-analyst", "software-engineer", "ux-ui-designer"];

  const STATUS_LABELS = {
    applied: "Applied",
    interviewing: "Interviewing",
    offer: "Offer Received",
    hired: "Hired",
    "not-selected": "Not selected",
    "not-interested": "No longer interested",
    archived: "Archived",
  };

  const FILTERS = {
    all: null,
    applied: ["applied"],
    interviewing: ["interviewing"],
    offers: ["offer", "hired"],
    archived: ["not-selected", "not-interested", "archived"],
  };

  const store = {
    read(key, fallback) {
      try {
        const value = localStorage.getItem(key);
        return value === null ? fallback : JSON.parse(value);
      } catch (error) {
        return fallback;
      }
    },
    write(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        /* Storage can be unavailable (e.g. private browsing); the page still works without saving. */
      }
    },
  };

  const findJob = (id) => JOBS.find((job) => job.id === id);
  const icon = (name) => `<svg class="icon" aria-hidden="true"><use href="#${name}"></use></svg>`;

  /* ---------- Light / dark mode ---------- */
  function initTheme() {
    const button = document.querySelector("[data-theme-toggle]");
    if (!button) return;
    const root = document.documentElement;

    const sync = () => button.setAttribute("aria-pressed", String(root.dataset.theme === "dark"));

    button.addEventListener("click", () => {
      root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
      try {
        localStorage.setItem("theme", root.dataset.theme);
      } catch (error) {
        /* ignore */
      }
      sync();
    });
    sync();
  }

  /* ---------- Hamburger menu ---------- */
  function initNav() {
    const toggle = document.querySelector(".menu-toggle");
    const nav = document.getElementById("site-nav");
    if (!toggle || !nav) return;

    const setOpen = (open) => {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      nav.classList.toggle("is-open", open);
    };

    toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));

    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) setOpen(false);
    });

    document.addEventListener("click", (event) => {
      if (nav.classList.contains("is-open") && !nav.contains(event.target) && !toggle.contains(event.target)) {
        setOpen(false);
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      }
    });

    DESKTOP_QUERY.addEventListener("change", (event) => {
      if (event.matches) setOpen(false);
    });
  }

  /* ---------- Small dropdown menus (language, What's Trending) ---------- */
  function initDropdowns() {
    const dropdowns = Array.from(document.querySelectorAll("[data-dropdown]"));
    if (!dropdowns.length) return;

    const parts = (dropdown) => ({
      toggle: dropdown.querySelector("[data-dropdown-toggle]"),
      menu: dropdown.querySelector(".dropdown__menu"),
    });

    const setOpen = (dropdown, open) => {
      const { toggle, menu } = parts(dropdown);
      toggle.setAttribute("aria-expanded", String(open));
      menu.hidden = !open;
    };

    dropdowns.forEach((dropdown) => {
      const { toggle, menu } = parts(dropdown);

      toggle.addEventListener("click", () => {
        const open = toggle.getAttribute("aria-expanded") !== "true";
        dropdowns.forEach((other) => other !== dropdown && setOpen(other, false));
        setOpen(dropdown, open);
      });

      menu.addEventListener("click", (event) => {
        const option = event.target.closest("[data-lang]");
        if (!option) return;
        dropdown.querySelector("[data-lang-label]").textContent = option.dataset.lang;
        toggle.setAttribute("aria-label", `Language: ${option.dataset.langName}`);
        menu.querySelectorAll("[data-lang]").forEach((item) => item.setAttribute("aria-pressed", String(item === option)));
        setOpen(dropdown, false);
        toggle.focus();
      });
    });

    document.addEventListener("click", (event) => {
      dropdowns.forEach((dropdown) => {
        if (!dropdown.contains(event.target)) setOpen(dropdown, false);
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      dropdowns.forEach((dropdown) => {
        const { toggle } = parts(dropdown);
        if (toggle.getAttribute("aria-expanded") === "true") {
          setOpen(dropdown, false);
          toggle.focus();
        }
      });
    });
  }

  /* ---------- Search suggestions (job title + location) ---------- */
  function initSuggestions() {
    document.querySelectorAll("input[data-suggest]").forEach((input, index) => {
      const isWhere = input.dataset.suggest === "where";
      const source = isWhere ? WHERE_SUGGESTIONS : WHAT_SUGGESTIONS;
      const field = input.closest(".search-field");
      const list = document.createElement("ul");
      list.className = "suggest";
      list.id = `suggest-${index}`;
      list.setAttribute("role", "listbox");
      list.hidden = true;
      field.appendChild(list);

      input.setAttribute("role", "combobox");
      input.setAttribute("aria-autocomplete", "list");
      input.setAttribute("aria-expanded", "false");
      input.setAttribute("aria-controls", list.id);

      let options = [];
      let active = -1;

      const setOpen = (open) => {
        list.hidden = !open;
        input.setAttribute("aria-expanded", String(open));
        if (!open) input.removeAttribute("aria-activedescendant");
      };

      const render = () => {
        const query = input.value.trim().toLowerCase();
        options = source.filter((item) => !query || item.toLowerCase().includes(query)).slice(0, 6);
        if (options.length === 1 && options[0].toLowerCase() === query) options = [];
        active = -1;
        list.innerHTML = options
          .map(
            (item, i) => `
            <li id="${list.id}-${i}" class="suggest__item" role="option" aria-selected="false" data-index="${i}">
              ${icon(isWhere ? "i-pin" : "i-search")}<span>${item}</span>${isWhere ? icon("i-chevron-right") : ""}
            </li>`
          )
          .join("");
        setOpen(options.length > 0);
      };

      const highlight = (i) => {
        active = i;
        Array.from(list.children).forEach((item, n) => item.setAttribute("aria-selected", String(n === i)));
        input.setAttribute("aria-activedescendant", list.children[i].id);
        list.children[i].scrollIntoView({ block: "nearest" });
      };

      const choose = (i) => {
        input.value = options[i];
        setOpen(false);
      };

      input.addEventListener("focus", render);
      input.addEventListener("click", () => list.hidden && render());
      input.addEventListener("input", render);
      input.addEventListener("blur", () => setOpen(false));

      input.addEventListener("keydown", (event) => {
        if (list.hidden) {
          if (event.key === "ArrowDown") render();
          return;
        }
        if (event.key === "ArrowDown") {
          event.preventDefault();
          highlight((active + 1) % options.length);
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          highlight(active <= 0 ? options.length - 1 : active - 1);
        } else if (event.key === "Enter" && active >= 0) {
          event.preventDefault();
          choose(active);
        } else if (event.key === "Escape") {
          setOpen(false);
        }
      });

      // mousedown (not click) so the choice lands before the input loses focus.
      list.addEventListener("mousedown", (event) => {
        const item = event.target.closest(".suggest__item");
        if (!item) return;
        event.preventDefault();
        choose(Number(item.dataset.index));
      });

      field.addEventListener("click", (event) => {
        if (!list.contains(event.target)) input.focus();
      });
    });
  }

  /* ---------- Home: job cards + selected job description ---------- */
  function renderJobDetail(job) {
    return `
      <p class="eyebrow">Selected Job Description</p>
      <h2 class="job-detail__title">${job.title}</h2>
      <p class="job-detail__meta">${job.company} · ${job.location}</p>
      <ul class="job-detail__facts">
        <li class="tag">${job.type}</li>
        <li class="tag">${job.pay}</li>
      </ul>
      <p>${job.summary}</p>
      <h3>What you'll do</h3>
      <ul class="job-detail__list">${job.duties.map((duty) => `<li>${duty}</li>`).join("")}</ul>
      <div class="job-detail__actions">
        <a class="btn btn-primary" href="applications.html">Apply now</a>
        <a class="btn btn-outline" href="search.html?q=${encodeURIComponent(job.title)}">Similar jobs</a>
      </div>`;
  }

  function initHome() {
    const detail = document.querySelector("[data-job-detail]");
    if (!detail) return;
    const cards = Array.from(document.querySelectorAll(".job-card[data-job-id]"));

    function select(id, scroll) {
      const job = findJob(id);
      if (!job) return;
      cards.forEach((card) => {
        const active = card.dataset.jobId === id;
        card.classList.toggle("is-selected", active);
        card.querySelector(".job-card__link").setAttribute("aria-pressed", String(active));
      });
      detail.innerHTML = renderJobDetail(job);
      detail.classList.add("is-visible");
      if (scroll && !DESKTOP_QUERY.matches) {
        detail.scrollIntoView({ behavior: "smooth", block: "start" });
        detail.focus({ preventScroll: true });
      }
    }

    cards.forEach((card) => {
      card.querySelector(".job-card__link").addEventListener("click", () => select(card.dataset.jobId, true));
    });

    const requested = new URLSearchParams(window.location.search).get("job");
    if (requested) select(requested, true);
  }

  /* ---------- Search ---------- */
  function initSearch() {
    const results = document.querySelector("[data-search-results]");
    if (!results) return;

    const params = new URLSearchParams(window.location.search);
    const what = (params.get("q") || "").trim();
    const where = (params.get("l") || "").trim();

    const form = document.querySelector("[data-search-page]");
    if (form) {
      form.elements.q.value = what;
      form.elements.l.value = where;
    }

    const words = what.toLowerCase().split(/\s+/).filter(Boolean);
    const place = where === CURRENT_LOCATION ? "" : where.toLowerCase();
    const matches = JOBS.filter((job) => {
      const haystack = [job.title, job.company, ...job.keywords].join(" ").toLowerCase();
      const matchesWhat = words.every((word) => haystack.includes(word));
      const matchesWhere = !place || job.location.toLowerCase().includes(place);
      return matchesWhat && matchesWhere;
    });

    const summary = document.querySelector("[data-results-summary]");
    if (what || where) {
      summary.textContent =
        `${matches.length} ${matches.length === 1 ? "job" : "jobs"}` +
        (what ? ` for “${what}”` : "") +
        (where ? ` in ${where}` : "");
    }

    results.innerHTML = matches.length
      ? matches
          .map(
            (job) => `
        <li class="job-card">
          <h3 class="job-card__title"><a class="job-card__link" href="home.html?job=${job.id}">${job.title}</a></h3>
          <p class="job-card__meta">${job.company}</p>
          <p class="job-card__meta">${job.location}</p>
        </li>`
          )
          .join("")
      : `<li class="panel empty-state">
          <h3>No jobs found</h3>
          <p>Try a different job title, keyword, or location.</p>
          <a class="btn btn-primary" href="search.html">Clear search</a>
        </li>`;
  }

  /* ---------- My Applications ---------- */
  function initApplications() {
    const list = document.querySelector("[data-app-list]");
    const dialog = document.getElementById("status-dialog");
    if (!list || !dialog) return;

    const live = document.querySelector("[data-live]");
    const dialogJob = dialog.querySelector("[data-dialog-job]");
    const filterButtons = Array.from(document.querySelectorAll("[data-filter]"));
    const defaults = Object.fromEntries(APPLICATION_ORDER.map((id) => [id, "applied"]));
    const statuses = Object.assign(defaults, store.read("applicationStatuses", {}));
    let activeFilter = "all";
    let editingId = null;

    const card = (job) => `
      <li class="app-card">
        <div class="app-card__thumb">${icon("i-image")}</div>
        <div class="app-card__body">
          <span class="tag">${STATUS_LABELS[statuses[job.id]]}</span>
          <h2 class="app-card__title">${job.title}</h2>
          <p class="app-card__meta">${job.company}<br>${job.location}</p>
        </div>
        <div class="app-card__actions">
          <button type="button" class="btn btn-primary btn-sm" data-update="${job.id}">Update Your Status</button>
          <div class="more">
            <button type="button" class="icon-btn" data-more aria-expanded="false" aria-label="More options for ${job.title}">${icon("i-dots")}</button>
            <div class="more__menu" hidden>
              <a class="more__item" href="home.html?job=${job.id}">View job</a>
              <button type="button" class="more__item" data-archive="${job.id}">Archive</button>
            </div>
          </div>
        </div>
      </li>`;

    function render() {
      const allowed = FILTERS[activeFilter];
      const visible = APPLICATION_ORDER.map(findJob).filter((job) => !allowed || allowed.includes(statuses[job.id]));
      list.innerHTML = visible.length
        ? visible.map(card).join("")
        : `<li class="panel empty-state"><h2>Nothing here yet</h2><p>No applications match this filter.</p></li>`;
    }

    function save(id, status) {
      statuses[id] = status;
      store.write("applicationStatuses", statuses);
      render();
      live.textContent = `${findJob(id).title} marked as ${STATUS_LABELS[status]}.`;
    }

    function closeMenus(except) {
      list.querySelectorAll("[data-more]").forEach((button) => {
        if (button === except) return;
        button.setAttribute("aria-expanded", "false");
        button.nextElementSibling.hidden = true;
      });
    }

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        activeFilter = button.dataset.filter;
        filterButtons.forEach((other) => other.setAttribute("aria-pressed", String(other === button)));
        render();
      });
    });

    list.addEventListener("click", (event) => {
      const update = event.target.closest("[data-update]");
      const more = event.target.closest("[data-more]");
      const archive = event.target.closest("[data-archive]");

      if (update) {
        editingId = update.dataset.update;
        const job = findJob(editingId);
        dialogJob.textContent = `${job.title} · ${job.company}`;
        dialog.querySelectorAll('input[name="status"]').forEach((input) => {
          input.checked = input.value === statuses[editingId];
        });
        dialog.returnValue = "";
        dialog.showModal();
      } else if (more) {
        const open = more.getAttribute("aria-expanded") !== "true";
        closeMenus(more);
        more.setAttribute("aria-expanded", String(open));
        more.nextElementSibling.hidden = !open;
      } else if (archive) {
        save(archive.dataset.archive, "archived");
      }
    });

    document.addEventListener("click", (event) => {
      if (!event.target.closest(".more")) closeMenus();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenus();
    });

    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });

    dialog.addEventListener("close", () => {
      const chosen = dialog.querySelector('input[name="status"]:checked');
      if (dialog.returnValue === "save" && chosen && editingId && chosen.value !== statuses[editingId]) {
        save(editingId, chosen.value);
      }
      const trigger = list.querySelector(`[data-update="${editingId}"]`);
      if (trigger) trigger.focus();
      editingId = null;
    });

    render();
  }

  /* ---------- Google sign-in ---------- */
  function initSignIn() {
    const form = document.getElementById("other-account");
    const toggles = document.querySelectorAll("[data-other-toggle]");
    if (!form || !toggles.length) return;

    toggles.forEach((toggle) => {
      toggle.addEventListener("click", () => {
        form.hidden = false;
        toggles.forEach((other) => other.setAttribute("aria-expanded", "true"));
        form.querySelector("input").focus();
      });
    });
  }

  /* ---------- Loading -> Welcome -> Home ---------- */
  function initWelcome() {
    const splash = document.querySelector("[data-welcome]");
    if (!splash) return;
    window.setTimeout(() => splash.classList.add("is-welcome"), 1400);
    window.setTimeout(() => window.location.assign("home.html"), 2800);
  }

  initTheme();
  initNav();
  initDropdowns();
  initSuggestions();
  initHome();
  initSearch();
  initApplications();
  initSignIn();
  initWelcome();
})();
