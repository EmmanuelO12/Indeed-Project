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
        return true;
      } catch (error) {
        return false;
      }
    },
  };

  const findJob = (id) => JOBS.find((job) => job.id === id);
  const icon = (name) => `<svg class="icon" aria-hidden="true"><use href="#${name}"></use></svg>`;

  const escapeHtml = (text) =>
    String(text).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);

  const wait = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));

  /* There is no real server, so data "requests" resolve after a short, realistic delay. */
  const NETWORK_DELAY = 600;
  const fetchJobs = () => wait(NETWORK_DELAY).then(() => JOBS);

  /* ---------- Loading buttons ---------- */
  function setBusy(element, busy, label) {
    if (busy) {
      if (element.classList.contains("is-loading")) return;
      element.dataset.idleHtml = element.innerHTML;
      if (label) element.innerHTML = `<span class="btn-spinner" aria-hidden="true"></span>${escapeHtml(label)}`;
      element.classList.add("is-loading");
      element.setAttribute("aria-busy", "true");
      if ("disabled" in element) element.disabled = true;
      else element.setAttribute("aria-disabled", "true");
    } else {
      if (!element.classList.contains("is-loading")) return;
      element.innerHTML = element.dataset.idleHtml;
      element.classList.remove("is-loading");
      element.removeAttribute("aria-busy");
      if ("disabled" in element) element.disabled = false;
      else element.removeAttribute("aria-disabled");
    }
  }

  /* Pages restored with the Back button keep their old DOM, so clear any stuck loading state. */
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) document.querySelectorAll(".is-loading").forEach((element) => setBusy(element, false));
  });

  /* ---------- Toast messages ---------- */
  let toastTimer;
  function showToast(message, tone) {
    let toast = document.querySelector(".toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "toast";
      toast.setAttribute("role", "status");
      document.body.appendChild(toast);
    }
    toast.classList.toggle("toast--error", tone === "error");
    toast.innerHTML = `${icon(tone === "error" ? "i-close" : "i-check")}<span>${escapeHtml(message)}</span>`;
    void toast.offsetWidth;
    toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 3200);
  }

  const skeletonJobCard = `
    <li class="job-card job-card--skeleton" aria-hidden="true">
      <span class="skeleton skeleton--title"></span>
      <span class="skeleton skeleton--line"></span>
      <span class="skeleton skeleton--line skeleton--short"></span>
    </li>`;

  const skeletonAppCard = `
    <li class="app-card app-card--skeleton" aria-hidden="true">
      <span class="skeleton skeleton--thumb"></span>
      <div class="app-card__body">
        <span class="skeleton skeleton--tag"></span>
        <span class="skeleton skeleton--title"></span>
        <span class="skeleton skeleton--line"></span>
      </div>
    </li>`;

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

      const markMatch = (text, query) => {
        const start = text.toLowerCase().indexOf(query);
        if (!query || start < 0) return escapeHtml(text);
        const end = start + query.length;
        return `${escapeHtml(text.slice(0, start))}<mark>${escapeHtml(text.slice(start, end))}</mark>${escapeHtml(text.slice(end))}`;
      };

      const render = () => {
        const typed = input.value.trim();
        const query = typed.toLowerCase();
        options = source.filter((item) => !query || item.toLowerCase().includes(query)).slice(0, 6);
        const exact = options.length === 1 && options[0].toLowerCase() === query;
        if (exact) options = [];
        active = -1;

        if (!options.length) {
          list.innerHTML =
            query && !exact
              ? `<li class="suggest__empty" role="option" aria-disabled="true" aria-selected="false">No matches for “${escapeHtml(typed)}”</li>`
              : "";
          setOpen(Boolean(list.innerHTML));
          return;
        }

        list.innerHTML = options
          .map(
            (item, i) => `
            <li id="${list.id}-${i}" class="suggest__item" role="option" aria-selected="false" data-index="${i}">
              ${icon(isWhere ? "i-pin" : "i-search")}<span>${markMatch(item, query)}</span>${isWhere ? icon("i-chevron-right") : ""}
            </li>`
          )
          .join("");
        setOpen(true);
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
        input.dispatchEvent(new Event("input", { bubbles: true }));
      };

      input.addEventListener("focus", render);
      input.addEventListener("click", () => list.hidden && render());
      input.addEventListener("input", () => (input.value.trim() ? render() : setOpen(false)));
      input.addEventListener("blur", () => setOpen(false));

      input.addEventListener("keydown", (event) => {
        if (list.hidden) {
          if (event.key === "ArrowDown") render();
          return;
        }
        if (event.key === "Escape") {
          setOpen(false);
          return;
        }
        if (!options.length) return;
        if (event.key === "ArrowDown") {
          event.preventDefault();
          highlight((active + 1) % options.length);
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          highlight(active <= 0 ? options.length - 1 : active - 1);
        } else if (event.key === "Enter" && active >= 0) {
          event.preventDefault();
          choose(active);
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
  const skeletonJobDetail = `
    <div aria-hidden="true">
      <p class="eyebrow">Selected Job Description</p>
      <span class="skeleton skeleton--heading"></span>
      <span class="skeleton skeleton--line"></span>
      <span class="skeleton skeleton--block"></span>
      <span class="skeleton skeleton--line skeleton--wide"></span>
      <span class="skeleton skeleton--line skeleton--wide"></span>
      <span class="skeleton skeleton--line"></span>
    </div>`;

  function renderJobDetail(job) {
    return `
      <div class="is-entering">
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
      </div>
      </div>`;
  }

  function initHome() {
    const detail = document.querySelector("[data-job-detail]");
    if (!detail) return;
    const cards = Array.from(document.querySelectorAll(".job-card[data-job-id]"));

    let request = 0;

    async function select(id, scroll) {
      const job = findJob(id);
      if (!job) return;
      const current = ++request;
      cards.forEach((card) => {
        const active = card.dataset.jobId === id;
        card.classList.toggle("is-selected", active);
        card.querySelector(".job-card__link").setAttribute("aria-pressed", String(active));
      });
      detail.innerHTML = skeletonJobDetail;
      detail.setAttribute("aria-busy", "true");
      detail.classList.add("is-visible");
      if (scroll && !DESKTOP_QUERY.matches) {
        detail.scrollIntoView({ behavior: "smooth", block: "start" });
        detail.focus({ preventScroll: true });
      }

      await wait(NETWORK_DELAY - 150);
      if (current !== request) return;
      detail.innerHTML = renderJobDetail(job);
      detail.removeAttribute("aria-busy");
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

    const form = document.querySelector("[data-search-page]");
    const summary = document.querySelector("[data-results-summary]");
    const submitButton = form && form.querySelector('button[type="submit"]');
    const params = new URLSearchParams(window.location.search);
    let jobs = null;
    let shownIds = null;

    if (form) {
      form.elements.q.value = (params.get("q") || "").trim();
      form.elements.l.value = (params.get("l") || "").trim();
    }

    const currentQuery = () => ({
      what: form ? form.elements.q.value.trim() : (params.get("q") || "").trim(),
      where: form ? form.elements.l.value.trim() : (params.get("l") || "").trim(),
    });

    function filterJobs(what, where) {
      const words = what.toLowerCase().split(/\s+/).filter(Boolean);
      const place = where === CURRENT_LOCATION ? "" : where.toLowerCase();
      return jobs.filter((job) => {
        const haystack = [job.title, job.company, ...job.keywords].join(" ").toLowerCase();
        const matchesWhat = words.every((word) => haystack.includes(word));
        const matchesWhere = !place || job.location.toLowerCase().includes(place);
        return matchesWhat && matchesWhere;
      });
    }

    const jobCard = (job, i) => `
      <li class="job-card is-entering" style="animation-delay: ${i * 50}ms">
        <h3 class="job-card__title"><a class="job-card__link" href="home.html?job=${job.id}">${job.title}</a></h3>
        <p class="job-card__meta">${job.company}</p>
        <p class="job-card__meta">${job.location}</p>
      </li>`;

    function showSkeleton() {
      shownIds = null;
      summary.textContent = "Loading jobs…";
      results.setAttribute("aria-busy", "true");
      results.innerHTML = skeletonJobCard.repeat(3);
    }

    function update() {
      const { what, where } = currentQuery();
      const matches = filterJobs(what, where);

      summary.textContent =
        what || where
          ? `${matches.length} ${matches.length === 1 ? "job" : "jobs"}` +
            (what ? ` for “${what}”` : "") +
            (where ? ` in ${where}` : "")
          : "Recommended jobs";

      try {
        const url = new URL(window.location.href);
        url.search = new URLSearchParams({ ...(what && { q: what }), ...(where && { l: where }) }).toString();
        window.history.replaceState(null, "", url);
      } catch (error) {
        /* Chrome blocks this on pages opened straight from a file; the search still works. */
      }

      // Only re-render when the set of jobs changes, so cards don't flicker on every keystroke.
      const ids = matches.length ? matches.map((job) => job.id).join() : `none:${what}|${where}`;
      if (ids === shownIds) return;
      shownIds = ids;
      results.removeAttribute("aria-busy");
      results.innerHTML = matches.length
        ? matches.map(jobCard).join("")
        : `<li class="panel empty-state is-entering">
            <span class="empty-state__icon">${icon("i-search")}</span>
            <h3>No jobs found</h3>
            <p>Nothing matches ${escapeHtml([what && `“${what}”`, where && `in ${where}`].filter(Boolean).join(" "))}. Try a different job title, keyword, or location.</p>
            <button type="button" class="btn btn-primary" data-clear-search>Clear search</button>
          </li>`;
    }

    async function load() {
      showSkeleton();
      if (submitButton) setBusy(submitButton, true, "Searching…");
      try {
        jobs = await fetchJobs();
        update();
      } catch (error) {
        summary.textContent = "Something went wrong";
        results.removeAttribute("aria-busy");
        results.innerHTML = `<li class="panel empty-state">
            <h3>We couldn't load jobs</h3>
            <p>Check your connection and try again.</p>
            <button type="button" class="btn btn-primary" data-retry-search>Try again</button>
          </li>`;
      } finally {
        if (submitButton) setBusy(submitButton, false);
      }
    }

    if (form) {
      form.addEventListener("input", () => jobs && update());
      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        if (!jobs) return;
        setBusy(submitButton, true, "Searching…");
        showSkeleton();
        await wait(NETWORK_DELAY - 200);
        update();
        setBusy(submitButton, false);
      });
    }

    results.addEventListener("click", (event) => {
      if (event.target.closest("[data-retry-search]")) load();
      if (event.target.closest("[data-clear-search]") && form) {
        form.reset();
        update();
        summary.setAttribute("tabindex", "-1");
        summary.focus();
      }
    });

    load();
  }

  /* ---------- My Applications ---------- */
  function initApplications() {
    const list = document.querySelector("[data-app-list]");
    const dialog = document.getElementById("status-dialog");
    if (!list || !dialog) return;

    const dialogForm = dialog.querySelector("form");
    const dialogJob = dialog.querySelector("[data-dialog-job]");
    const dialogError = dialog.querySelector("[data-dialog-error]");
    const saveButton = dialog.querySelector('button[value="save"]');
    const dialogButtons = Array.from(dialog.querySelectorAll("button"));
    let saving = false;
    const filterButtons = Array.from(document.querySelectorAll("[data-filter]"));
    const defaults = Object.fromEntries(APPLICATION_ORDER.map((id) => [id, "applied"]));
    const statuses = Object.assign(defaults, store.read("applicationStatuses", {}));
    let activeFilter = "all";
    let editingId = null;

    const card = (job, i) => `
      <li class="app-card is-entering" style="animation-delay: ${i * 50}ms">
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
      const previous = statuses[id];
      statuses[id] = status;
      if (!store.write("applicationStatuses", statuses)) {
        statuses[id] = previous;
        return false;
      }
      render();
      return true;
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
        dialogError.hidden = true;
        dialog.showModal();
      } else if (more) {
        const open = more.getAttribute("aria-expanded") !== "true";
        closeMenus(more);
        more.setAttribute("aria-expanded", String(open));
        more.nextElementSibling.hidden = !open;
      } else if (archive) {
        const job = findJob(archive.dataset.archive);
        if (save(job.id, "archived")) showToast(`${job.title} moved to Archived`);
        else showToast("Couldn't archive this application. Please try again.", "error");
      }
    });

    document.addEventListener("click", (event) => {
      if (!event.target.closest(".more")) closeMenus();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenus();
    });

    dialog.addEventListener("click", (event) => {
      if (event.target === dialog && !saving) dialog.close();
    });

    dialog.addEventListener("cancel", (event) => {
      if (saving) event.preventDefault();
    });

    dialogForm.addEventListener("submit", async (event) => {
      if (event.submitter !== saveButton) return;
      event.preventDefault();
      const chosen = dialog.querySelector('input[name="status"]:checked');
      if (!chosen || chosen.value === statuses[editingId]) {
        dialog.close();
        return;
      }

      saving = true;
      dialogError.hidden = true;
      dialogButtons.forEach((button) => (button.disabled = true));
      setBusy(saveButton, true, "Saving…");
      await wait(NETWORK_DELAY + 200);
      const job = findJob(editingId);
      const saved = save(editingId, chosen.value);
      saving = false;
      setBusy(saveButton, false);
      dialogButtons.forEach((button) => (button.disabled = false));

      if (saved) {
        dialog.close();
        showToast(`${job.title} marked as ${STATUS_LABELS[chosen.value]}`);
      } else {
        dialogError.textContent = "We couldn't save your status. Make sure your browser allows saving data, then try again.";
        dialogError.hidden = false;
      }
    });

    dialog.addEventListener("close", () => {
      const trigger = list.querySelector(`[data-update="${editingId}"]`);
      if (trigger) trigger.focus();
      editingId = null;
    });

    list.setAttribute("aria-busy", "true");
    list.innerHTML = skeletonAppCard.repeat(3);
    fetchJobs().then(() => {
      list.removeAttribute("aria-busy");
      render();
    });
  }

  /* ---------- Google sign-in ---------- */
  function initSignIn() {
    const form = document.getElementById("other-account");
    const toggles = document.querySelectorAll("[data-other-toggle]");
    if (!form || !toggles.length) return;

    const email = form.querySelector("input");
    const nextLink = document.querySelector("[data-signin-next]");
    let touched = false;

    toggles.forEach((toggle) => {
      toggle.addEventListener("click", () => {
        form.hidden = false;
        toggles.forEach((other) => other.setAttribute("aria-expanded", "true"));
        email.focus();
      });
    });

    function checkEmail() {
      const value = email.value.trim();
      let message = "";
      if (!value) message = "Enter your email or phone number.";
      else if (/[@A-Za-z]/.test(value)) message = SIGNUP_CHECKS.email(value);
      else message = SIGNUP_CHECKS.phone(value);
      return message;
    }

    email.addEventListener("blur", () => {
      touched = true;
      setFieldState(email, checkEmail());
    });

    email.addEventListener("input", () => {
      if (touched) setFieldState(email, checkEmail());
      else if (!checkEmail()) setFieldState(email, "");
      else clearFieldState(email);
    });

    async function continueTo(trigger) {
      if (trigger === nextLink && !form.hidden) {
        touched = true;
        const message = checkEmail();
        setFieldState(email, message);
        if (message) return email.focus();
      }
      setBusy(trigger, true, trigger === nextLink ? "Signing in…" : null);
      await wait(NETWORK_DELAY + 200);
      window.location.assign("welcome.html");
    }

    document.querySelectorAll('.google a[href="welcome.html"]').forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        if (!link.classList.contains("is-loading")) continueTo(link);
      });
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      continueTo(nextLink);
    });
  }

  /* ---------- Create account ---------- */
  const PASSWORD_RULES = {
    length: (value) => value.length >= 8,
    upper: (value) => /[A-Z]/.test(value),
    number: (value) => /\d/.test(value),
  };

  const phoneDigits = (value) => {
    const digits = value.replace(/\D/g, "");
    return digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;
  };

  const formatPhone = (value) => {
    const digits = phoneDigits(value);
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  };

  const SIGNUP_CHECKS = {
    name(value) {
      const name = value.trim();
      if (!name) return "Enter your full name.";
      if (!/^[A-Za-zÀ-ÖØ-öø-ÿ'. -]+$/.test(name)) return "Use letters only. Spaces, hyphens (-), apostrophes (') and periods (.) are okay.";
      if (name.length < 2) return "Name must be at least 2 letters long.";
      if (name.length > 50) return `Name can be at most 50 characters. Remove ${name.length - 50}.`;
      if (!/\S\s+\S/.test(name)) return "Enter your first and last name, with a space between them.";
      return "";
    },
    email(value) {
      const email = value.trim();
      if (!email) return "Enter your email address.";
      if (/\s/.test(email)) return "Email can't contain spaces. Remove any spaces.";
      if (!email.includes("@")) return "Email needs an @ symbol, like name@example.com.";
      const [user, domain, ...extra] = email.split("@");
      if (extra.length) return "Email can only have one @ symbol.";
      if (!user) return "Add your name before the @, like name@example.com.";
      if (!domain) return "Add the email provider after the @, like gmail.com.";
      if (domain.startsWith(".")) return "Add the email provider between the @ and the dot, like gmail.com.";
      if (!domain.includes(".") || domain.endsWith(".")) return "Email is missing its ending, like .com or .org.";
      if (!/^[A-Za-z]{2,}$/.test(domain.split(".").pop())) return "The ending after the last dot should be letters, like .com or .org.";
      return "";
    },
    phone(value) {
      const phone = value.trim();
      if (!phone) return "Enter your phone number.";
      if (/[^\d\s().+-]/.test(phone)) return "Phone number can only have numbers, spaces, dashes (-) and parentheses.";
      const count = phoneDigits(phone).length;
      if (count < 10) return `Phone number needs 10 digits, including the area code. You've entered ${count}.`;
      if (count > 10) return `Phone number has ${count} digits. Enter just 10, like (704) 555-0123.`;
      return "";
    },
    password(value) {
      if (!value) return "Create a password.";
      if (!PASSWORD_RULES.length(value)) return `Password must be at least 8 characters. Add ${8 - value.length} more.`;
      if (!PASSWORD_RULES.upper(value)) return "Add at least one uppercase letter (A–Z).";
      if (!PASSWORD_RULES.number(value)) return "Add at least one number (0–9).";
      return "";
    },
  };

  function setFieldState(input, message) {
    const field = input.closest(".field");
    const output = document.getElementById(`${input.id}-msg`);
    const icon = message ? "i-alert" : "i-check";
    field.classList.toggle("is-invalid", Boolean(message));
    field.classList.toggle("is-valid", !message);
    input.setAttribute("aria-invalid", String(Boolean(message)));
    output.innerHTML = `<svg class="icon" aria-hidden="true"><use href="#${icon}"></use></svg><span>${escapeHtml(message || input.dataset.success)}</span>`;
  }

  function clearFieldState(input) {
    input.closest(".field").classList.remove("is-invalid", "is-valid");
    input.removeAttribute("aria-invalid");
    document.getElementById(`${input.id}-msg`).textContent = "";
  }

  function updateFieldCount(form, formError) {
    if (formError.hidden) return;
    const count = form.querySelectorAll(".field.is-invalid").length;
    formError.textContent = count === 1 ? "Fix the 1 field marked in red above." : `Fix the ${count} fields marked in red above.`;
    formError.hidden = count === 0;
  }

  function updateRuleList(form, value) {
    form.querySelectorAll("[data-rule]").forEach((item) => {
      const met = PASSWORD_RULES[item.dataset.rule](value);
      item.classList.toggle("is-met", met);
      item.querySelector("[data-rule-status]").textContent = met ? ", done" : ", not yet";
    });
  }

  function initShowPassword(form) {
    form.querySelectorAll("[data-show-password]").forEach((button) => {
      const input = document.getElementById(button.getAttribute("aria-controls"));
      button.addEventListener("mousedown", (event) => event.preventDefault());
      button.addEventListener("click", () => {
        const show = input.type === "password";
        input.type = show ? "text" : "password";
        button.textContent = show ? "Hide" : "Show";
        button.setAttribute("aria-pressed", String(show));
      });
    });
  }

  function initSignup() {
    const form = document.querySelector("[data-signup]");
    if (!form) return;

    const inputs = Array.from(form.querySelectorAll(".field__input"));
    const { phone, password, confirm } = form.elements;
    const submit = form.querySelector('button[type="submit"]');
    const formError = form.querySelector("[data-form-error]");
    const touched = new Set();
    let submitting = false;

    const checks = {
      ...SIGNUP_CHECKS,
      confirm(value) {
        if (!value) return "Re-enter your password to confirm it.";
        if (value !== password.value) return "Passwords don't match. Make sure both are typed exactly the same.";
        return "";
      },
    };

    function check(input) {
      const message = checks[input.name](input.value);
      setFieldState(input, message);
      return !message;
    }

    const updateFormError = () => updateFieldCount(form, formError);
    const updatePasswordRules = () => updateRuleList(form, password.value);

    inputs.forEach((input) => {
      // Errors wait until the user leaves the field once, but a correct value is confirmed right away.
      input.addEventListener("input", () => {
        if (touched.has(input)) check(input);
        else if (!checks[input.name](input.value)) setFieldState(input, "");
        else clearFieldState(input);

        if (input === password) {
          updatePasswordRules();
          if (touched.has(confirm) || confirm.value) check(confirm);
        }
        updateFormError();
      });

      input.addEventListener("blur", () => {
        if (submitting) return;
        touched.add(input);
        if (check(input) && input === phone) phone.value = formatPhone(phone.value);
        updateFormError();
      });
    });

    initShowPassword(form);

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (submitting) return;

      inputs.forEach((input) => touched.add(input));
      const results = inputs.map(check);
      const firstInvalid = inputs[results.indexOf(false)];
      if (firstInvalid) {
        formError.hidden = false;
        updateFormError();
        firstInvalid.focus();
        return;
      }

      formError.hidden = true;
      submitting = true;
      inputs.forEach((input) => (input.readOnly = true));
      setBusy(submit, true, "Creating account…");
      await wait(NETWORK_DELAY + 200);

      const saved = store.write("profile", {
        name: form.elements.name.value.trim(),
        email: form.elements.email.value.trim(),
        phone: formatPhone(phone.value),
      });

      if (!saved) {
        submitting = false;
        inputs.forEach((input) => (input.readOnly = false));
        setBusy(submit, false);
        formError.textContent = "We couldn't create your account. Make sure your browser allows saving data, then try again.";
        formError.hidden = false;
        return;
      }

      window.location.assign("welcome.html");
    });
  }

  /* ---------- Edit profile ---------- */
  function initProfile() {
    const form = document.querySelector("[data-profile]");
    if (!form) return;

    const inputs = Array.from(form.querySelectorAll(".field__input"));
    const { name, email, phone, password, confirm } = form.elements;
    const submit = form.querySelector('button[type="submit"]');
    const formError = form.querySelector("[data-form-error]");
    const touched = new Set();
    let saved = store.read("profile", { name: "", email: "", phone: "" });
    let submitting = false;

    name.value = saved.name;
    email.value = saved.email;
    phone.value = saved.phone;

    // A null result means the field is optional and left empty, so it gets no state at all.
    const checks = {
      ...SIGNUP_CHECKS,
      password(value) {
        if (!value && !confirm.value) return null;
        if (!value) return "Enter your new password here too, or clear the Confirm box.";
        return SIGNUP_CHECKS.password(value);
      },
      confirm(value) {
        if (!value && !password.value) return null;
        if (!value) return "Re-enter your new password to confirm it.";
        if (value !== password.value) return "Passwords don't match. Make sure both are typed exactly the same.";
        return "";
      },
    };

    function check(input) {
      const message = checks[input.name](input.value);
      if (message === null) clearFieldState(input);
      else setFieldState(input, message);
      return !message;
    }

    const recheckPasswords = () => [password, confirm].forEach((input) => (touched.has(input) || input.value) && check(input));

    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        const message = checks[input.name](input.value);
        if (touched.has(input)) check(input);
        else if (message === "") setFieldState(input, "");
        else clearFieldState(input);

        if (input === password || input === confirm) {
          updateRuleList(form, password.value);
          recheckPasswords();
        }
        updateFieldCount(form, formError);
      });

      input.addEventListener("blur", () => {
        if (submitting) return;
        touched.add(input);
        if (check(input) && input === phone && phone.value) phone.value = formatPhone(phone.value);
        updateFieldCount(form, formError);
      });
    });

    initShowPassword(form);

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (submitting) return;

      inputs.forEach((input) => touched.add(input));
      const results = inputs.map(check);
      const firstInvalid = inputs[results.indexOf(false)];
      if (firstInvalid) {
        formError.hidden = false;
        updateFieldCount(form, formError);
        firstInvalid.focus();
        return;
      }
      formError.hidden = true;

      const next = { name: name.value.trim(), email: email.value.trim(), phone: formatPhone(phone.value) };
      const passwordChanged = Boolean(password.value);
      const detailsChanged = Object.keys(next).some((key) => next[key] !== saved[key]);
      if (!detailsChanged && !passwordChanged) {
        showToast("No changes to save");
        return;
      }

      submitting = true;
      inputs.forEach((input) => (input.readOnly = true));
      setBusy(submit, true, "Saving…");
      await wait(NETWORK_DELAY + 200);
      submitting = false;
      inputs.forEach((input) => (input.readOnly = false));
      setBusy(submit, false);

      if (!store.write("profile", next)) {
        formError.textContent = "We couldn't save your profile. Make sure your browser allows saving data, then try again.";
        formError.hidden = false;
        return;
      }

      saved = next;
      phone.value = next.phone;
      password.value = "";
      confirm.value = "";
      touched.clear();
      inputs.forEach(clearFieldState);
      updateRuleList(form, "");
      showToast(passwordChanged ? "Profile and password updated" : "Profile updated");
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
  initSignup();
  initProfile();
  initWelcome();
})();
