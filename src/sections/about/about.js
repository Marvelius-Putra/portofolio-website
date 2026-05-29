import { loadStyles } from "../../js/helper.js";

export async function loadAbout() {
  try {
    const response = await fetch("sections/about/about.html");
    if (!response.ok) throw new Error("Failed To Load About Section");

    const html = await response.text();
    document.querySelector("#about").innerHTML = html;
    loadStyles("sections/about/about.css");
  } catch (error) {
    console.error("Error fetching about section:", error);
  }
}
