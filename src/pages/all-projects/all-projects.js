import { loadStyles, getTechIcon, getBadgeStyle } from "../js/helper.js";

export async function loadNavbar() {
  try {
    const response = await fetch("../components/navbar/navbar.html");

    if (!response.ok) {
      throw new Error("Failed To Load Navbar");
    }

    const html = await response.text();
    document.querySelector("#navbar").innerHTML = html;

    loadStyles("../components/navbar/navbar.css");

    const menuToggle = document.getElementById("menuToggle");
    const menuLink = document.getElementById("menuLink");

    if (menuToggle && menuLink) {
      menuToggle.addEventListener("click", () => {
        menuLink.classList.toggle("active");
      });

      document.querySelectorAll(".menu-link a").forEach((link) => {
        link.addEventListener("click", () => {
          menuLink.classList.remove("active");
        });
      });
    }
  } catch (error) {
    console.error("Error fetching navbar:", error);
  }
}

async function loadFooter() {
  try {
    const response = await fetch("../components/footer/footer.html");
    if (!response.ok) throw new Error("Failed to load Footer");
    const html = await response.text();
    document.querySelector("#contact").innerHTML = html;
    loadStyles("../components/footer/footer.css");
  } catch (error) {
    console.log("Error Fetch Footer", error);
  }
}

let allProjects = [];
let filteredProjects = [];
let activeCategory = "all";
let savedProjects = new Set(JSON.parse(localStorage.getItem("savedProjects") || "[]"));

// ---- Pagination State ----
let currentPage = 1;
let itemsPerPage = 6;

// ---- Load Data ----
async function loadProjects() {
  try {
    const response = await fetch("data/projects.json");
    if (!response.ok) throw new Error("Failed to load projects data");
    return await response.json();
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

// ---- Filter & Search ----
function handleSearch() {
  const keyword = document.getElementById("searchInput").value.trim().toLowerCase();

  filteredProjects = allProjects.filter((project) => {
    const projectId = String(project.id);
    const matchCategory = activeCategory === "all" ? true : activeCategory === "saved" ? savedProjects.has(projectId) : project.category === activeCategory;
    const matchSearch = keyword === "" || project.title.toLowerCase().includes(keyword) || project.type.toLowerCase().includes(keyword) || project.description.toLowerCase().includes(keyword);
    return matchCategory && matchSearch;
  });

  filteredProjects.sort((a, b) => {
    const aSaved = savedProjects.has(String(a.id));
    const bSaved = savedProjects.has(String(b.id));
    if (aSaved && !bSaved) return -1;
    if (!aSaved && bSaved) return 1;
    return 0;
  });

  currentPage = 1;
  renderAll();
}

function renderProjects(projects) {
  const projectList = document.getElementById("pro-list");
  const emptyState = document.getElementById("emptyState");

  projectList.innerHTML = "";

  if (projects.length === 0) {
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageProjects = projects.slice(start, end);

  pageProjects.forEach((project) => {
    const card = document.createElement("article");
    card.className = "pro-card";

    const projectId = String(project.id);
    const isSaved = savedProjects.has(projectId);
    const badgeStyle = getBadgeStyle(project.category);

    const featuresHtml = (project.features || [])
      .slice(0, 5)
      .map((f) => `<li>${f}</li>`)
      .join("");

    const techHtml = (project.techStack || [])
      .map((tech) => {
        const icon = getTechIcon(tech);
        return `
          <span class="tech-badge">
            <i class="${icon}"></i>
            ${tech}
          </span>`;
      })
      .join("");

    const hasDocumentation = project.documentation && project.documentation !== "#";
    const hasGithub = project.github && project.github !== "#";

    const actionsHtml = `
      <div class="pro-card-actions">
        ${
          hasGithub
            ? `
        <a href="${project.github}"
          class="pro-card-link pro-card-link-github"
          target="_blank"
          rel="noopener"
          aria-label="View GitHub: ${project.title}">
          <i class="fab fa-github" aria-hidden="true"></i>
          GitHub
        </a>`
            : ""
        }
        ${
          hasDocumentation
            ? `
        <a href="${project.documentation}"
          class="pro-card-link"
          target="_blank"
          rel="noopener"
          aria-label="View documentation: ${project.title}">
          View Project
          <i class="fas fa-arrow-right" aria-hidden="true"></i>
        </a>`
            : ""
        }
      </div>
    `;

    card.innerHTML = `
      <div class="pro-card-img-wrapper">
        <a href="${project.image}" target="_blank" rel="noopener">
          <img 
            src="${project.image}" 
            alt="${project.title}" 
            loading="lazy" 
            class="pro-card-img" 
          />
        </a>
        <span 
        class="pro-card-type-badge"
        style="
          background:${badgeStyle.bg};
          color:${badgeStyle.text};
          border-color:${badgeStyle.border};
        "
      >
        ${project.type}
      </span>
        <button class="pro-card-bookmark ${isSaved ? "saved" : ""}" data-id="${projectId}" aria-label="Bookmark project">
          <i class="fa${isSaved ? "s" : "r"} fa-bookmark"></i>
        </button>
      </div>
      <div class="pro-card-body">
        <div class="pro-card-header">
          <h2 class="pro-card-title">${project.title}</h2>
        </div>
        <p class="pro-card-desc">${project.description}</p>

        <div class="pro-card-detail">
          ${
            featuresHtml
              ? `
          <div>
            <div class="pro-card-section-title">
              <i class="fas fa-wand-magic-sparkles"></i> Key Features
            </div>
            <ul class="pro-card-features">${featuresHtml}</ul>
          </div>`
              : ""
          }

          <div>
            ${
              techHtml
                ? `
            <div class="pro-card-section-title">
              <i class="fas fa-layer-group"></i> Tech Stack
            </div>
            <div class="pro-tech-stack">${techHtml}</div>`
                : ""
            }
          </div>
        </div>

        <div class="pro-card-footer">
          <span class="pro-card-date">
            <i class="fas fa-calendar" aria-hidden="true"></i>
            ${project.date}
          </span>
          ${actionsHtml}
        </div>
      </div>
    `;

    card.querySelector(".pro-card-bookmark").addEventListener("click", (e) => {
      const btn = e.currentTarget;
      const id = btn.dataset.id;
      const icon = btn.querySelector("i");
      if (savedProjects.has(id)) {
        savedProjects.delete(id);
        btn.classList.remove("saved");
        icon.className = "far fa-bookmark";
      } else {
        savedProjects.add(id);
        btn.classList.add("saved");
        icon.className = "fas fa-bookmark";
      }
      localStorage.setItem("savedProjects", JSON.stringify([...savedProjects]));
    });

    projectList.appendChild(card);
  });
}

function renderPagination(totalItems) {
  const pagination = document.getElementById("pagination");
  const paginationInfo = document.getElementById("paginationInfo");
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const start = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  paginationInfo.textContent = totalItems === 0 ? "No projects found" : `Showing ${start}–${end} of ${totalItems} projects`;

  pagination.innerHTML = "";
  if (totalPages <= 1) return;

  const prevBtn = createPageBtn("", "prev");
  prevBtn.innerHTML = `<i class="fas fa-chevron-left"></i>`;
  prevBtn.disabled = currentPage === 1;
  prevBtn.setAttribute("aria-label", "Previous page");
  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderAll();
      scrollToTop();
    }
  });
  pagination.appendChild(prevBtn);

  getPageNumbers(currentPage, totalPages).forEach((page) => {
    if (page === "...") {
      pagination.appendChild(createPageBtn("...", "dots"));
    } else {
      const btn = createPageBtn(page);
      if (page === currentPage) btn.classList.add("active");
      btn.setAttribute("aria-label", `Page ${page}`);
      btn.addEventListener("click", () => {
        currentPage = page;
        renderAll();
        scrollToTop();
      });
      pagination.appendChild(btn);
    }
  });

  const nextBtn = createPageBtn("", "next");
  nextBtn.innerHTML = `<i class="fas fa-chevron-right"></i>`;
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.setAttribute("aria-label", "Next page");
  nextBtn.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderAll();
      scrollToTop();
    }
  });
  pagination.appendChild(nextBtn);
}

function createPageBtn(label, extraClass = "") {
  const btn = document.createElement("button");
  btn.className = `page-btn${extraClass ? " " + extraClass : ""}`;
  btn.textContent = label;
  return btn;
}

function getPageNumbers(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = [];
  if (current <= 4) {
    pages.push(1, 2, 3, 4, 5, "...", total);
  } else if (current >= total - 3) {
    pages.push(1, "...", total - 4, total - 3, total - 2, total - 1, total);
  } else {
    pages.push(1, "...", current - 1, current, current + 1, "...", total);
  }
  return pages;
}

function renderAll() {
  renderProjects(filteredProjects);
  renderPagination(filteredProjects.length);
}

function scrollToTop() {
  document.querySelector(".pro-detail").scrollIntoView({ behavior: "smooth", block: "start" });
}

function initPerPageDropdown() {
  const perpageBtn = document.getElementById("perpageBtn");
  const perpageDropdown = document.getElementById("perpageDropdown");
  const perpageLabel = document.getElementById("perpageLabel");
  const options = document.querySelectorAll(".perpage-option");

  perpageBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    perpageDropdown.classList.toggle("open");
  });

  document.addEventListener("click", () => {
    perpageDropdown.classList.remove("open");
  });

  options.forEach((option) => {
    option.addEventListener("click", () => {
      const value = parseInt(option.getAttribute("data-value"));
      itemsPerPage = value;
      currentPage = 1;
      perpageLabel.textContent = `${value} per page`;
      options.forEach((o) => o.classList.remove("active"));
      option.classList.add("active");
      perpageDropdown.classList.remove("open");
      renderAll();
    });
  });
}

function initEventListeners() {
  document.getElementById("searchInput").addEventListener("input", handleSearch);

  document.querySelectorAll(".pro-type-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeCategory = btn.getAttribute("data-type");
      document.querySelectorAll(".pro-type-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      handleSearch();
    });
  });

  initPerPageDropdown();
}

async function init() {
  await loadNavbar();
  await loadFooter();
  allProjects = await loadProjects();
  filteredProjects = [...allProjects];
  renderAll();
  initEventListeners();
}

document.addEventListener("DOMContentLoaded", init);
