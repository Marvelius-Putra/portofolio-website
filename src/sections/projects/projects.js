import { loadStyles, getTechIcon, getBadgeStyle } from "../../js/helper.js";

function renderProjects(projects) {
  const grid = document.querySelector("#projects-grid");
  const savedProjects = new Set(JSON.parse(localStorage.getItem("savedProjects") || "[]"));

  const savedList = projects.filter((p) => savedProjects.has(String(p.id))).slice(0, 3);

  const displayProjects = savedList.length > 0 ? savedList : projects.slice(0, 3);

  grid.innerHTML = displayProjects
    .map((project) => {
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

      return `
    <article class="pro-card">
      <div class="pro-card-img-wrapper">
        <img src="${project.image}" alt="${project.title}" loading="lazy" class="pro-card-img" />
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
            <div class="pro-card-section-title">
              <i class="fas fa-layer-group"></i> Tech Stack
            </div>
            <div class="pro-tech-stack">${techHtml}</div>
          </div>
        </div>

        <div class="pro-card-footer">
          <span class="pro-card-date">
            <i class="fas fa-calendar" aria-hidden="true"></i>
            ${project.date}
          </span>
          <a href="${project.link}" class="pro-card-link" target="_blank" rel="noopener" aria-label="View project: ${project.title}">
            View Project
            <i class="fas fa-arrow-right" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </article>
  `;
    })
    .join("");

  // Bookmark toggle events
  grid.querySelectorAll(".pro-card-bookmark").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = btn.dataset.id;
      const icon = btn.querySelector("i");
      const saved = new Set(JSON.parse(localStorage.getItem("savedProjects") || "[]"));
      if (saved.has(id)) {
        saved.delete(id);
        btn.classList.remove("saved");
        icon.className = "far fa-bookmark";
      } else {
        saved.add(id);
        btn.classList.add("saved");
        icon.className = "fas fa-bookmark";
      }
      localStorage.setItem("savedProjects", JSON.stringify([...saved]));
    });
  });
}

export async function loadProjects() {
  try {
    const [htmlResponse, dataResponse] = await Promise.all([fetch("sections/projects/projects.html"), fetch("data/projects.json")]);

    if (!htmlResponse.ok) throw new Error("Failed To Load Projects Section");
    if (!dataResponse.ok) throw new Error("Failed To Load Projects Data");

    const html = await htmlResponse.text();
    const projects = await dataResponse.json();

    document.querySelector("#projects").innerHTML = html;
    loadStyles("sections/projects/projects.css");
    renderProjects(projects);
  } catch (error) {
    console.error("error fetching projects section:", error);
  }
}
