import { loadStyles } from "../../js/helper.js";

export async function loadHero() {
  try {
    const response = await fetch("sections/hero/hero.html");
    if (!response.ok) throw new Error("Failed To Load Hero Section");

    const html = await response.text();
    document.querySelector("#home").innerHTML = html;
    loadStyles("sections/hero/hero.css");
  } catch (error) {
    console.error("Error fetching hero section:", error);
  }
}
