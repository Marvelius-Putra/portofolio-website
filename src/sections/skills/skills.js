import { loadStyles } from "../../js/helper.js";

const DEVICON_BASE = "https://raw.githubusercontent.com/devicons/devicon/master/icons";

/**
 * Convert hex color to rgba string.
 */
function hexToRgba(hex, alpha = 0.12) {
  const cleaned = hex.replace("#", "");
  const r = parseInt(cleaned.substring(0, 2), 16);
  const g = parseInt(cleaned.substring(2, 4), 16);
  const b = parseInt(cleaned.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Render the icon element based on iconType.
 * - "fa"      → <i class="..."> with color style
 * - "devicon" → <img src="...devicons CDN">
 */
function renderIconEl(skill) {
  const color = skill.color || "#64748b";
  const bg = hexToRgba(color, 0.12);
  const border = hexToRgba(color, 0.2);

  let inner = "";
  if (skill.iconType === "devicon") {
    const src = `${DEVICON_BASE}/${skill.iconSlug}.svg`;
    inner = `<img src="${src}" alt="${skill.name}" width="28" height="28" loading="lazy" style="object-fit:contain;">`;
  } else {
    inner = `<i class="${skill.icon}" style="color:${color}; font-size:1.6rem;"></i>`;
  }

  return `
    <div class="skill-icon-box"
         style="background-color:${bg}; border-color:${border};">
      ${inner}
    </div>`;
}

function renderSkills(categories) {
  const grid = document.querySelector("#skills-grid");

  grid.innerHTML = categories
    .map(
      (category) => `
    <div class="skills-category">
      <div class="skills-category-header">
        <div class="skills-category-icon"><i class="${category.categoryIcon}"></i></div>
        <span class="skills-category-label">${category.category}</span>
      </div>
      <div class="skills-icons">
        ${category.skills
          .map(
            (skill) => `
          <div class="skill-item">
            ${renderIconEl(skill)}
            <span class="skill-name">${skill.name}</span>
          </div>`,
          )
          .join("")}
      </div>
    </div>`,
    )
    .join("");
}

export async function loadSkills() {
  try {
    const [htmlRes, dataRes] = await Promise.all([fetch("sections/skills/skills.html"), fetch("data/skills.json")]);

    if (!htmlRes.ok) throw new Error("Failed To Load Skills Section");
    if (!dataRes.ok) throw new Error("Failed To Load Skills Data");

    const html = await htmlRes.text();
    const categories = await dataRes.json();

    document.querySelector("#skills").innerHTML = html;
    loadStyles("sections/skills/skills.css");

    renderSkills(categories);
  } catch (error) {
    console.error("error fetching skills section:", error);
  }
}
