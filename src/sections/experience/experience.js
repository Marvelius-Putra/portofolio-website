import { loadStyles } from "../../js/helper.js";

function renderTechBadge(tech) {
  return `
    <span class="tech-badge">
      <i class="${tech.icon}"></i> ${tech.label}
    </span>`;
}

function renderTechStack(techStack) {
  if (techStack.length === 0) return "";
  return `
    <hr class="tech-divider" />
    <div class="tech-stack">
      ${techStack.map(renderTechBadge).join("")}
    </div>`;
}

function renderJobdesk(jobdesk) {
  if (!jobdesk || jobdesk.length === 0) return "";
  return `
    <ul class="jobdesk-list">
      ${jobdesk.map((item) => `<li>${item}</li>`).join("")}
    </ul>
  `;
}

function renderExperienceCard(exp) {
  return `
    <div class="timeline-item">
      <time class="cards-time" datetime="${exp.datetime}">${exp.date}</time>
      <article class="cards-content">
        <div class="cards-icon" aria-hidden="true">
          <i class="fas fa-briefcase"></i>
        </div>
        <div class="cards-info">
          <h3 class="job-position">${exp.position}</h3>
          <h4 class="job-company">${exp.company}</h4>
          ${renderJobdesk(exp.jobdesk)}
          ${renderTechStack(exp.techStack)}
        </div>
      </article>
    </div>
  `;
}

function renderExperiences(data) {
  return data.map(renderExperienceCard).join("");
}

export async function loadExperience() {
  try {
    const [htmlResponse, dataResponse] = await Promise.all([
      fetch("sections/experience/experience.html"),
      fetch("data/experience.json"),
    ]);

    if (!htmlResponse.ok) throw new Error("Failed to load experience section");
    if (!dataResponse.ok) throw new Error("Failed to load experience data");

    const html = await htmlResponse.text();
    const experiences = await dataResponse.json();

    document.querySelector("#experience").innerHTML = html;
    document.querySelector(".timeline-cards").innerHTML = renderExperiences(experiences);

    loadStyles("sections/experience/experience.css");
  } catch (error) {
    console.error("error loading experience section:", error);
  }
}