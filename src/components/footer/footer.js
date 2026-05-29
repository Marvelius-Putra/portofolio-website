import { loadStyles } from "../../js/helper.js";

export async function loadFooter() {
  try {
    const response = await fetch("components/footer/footer.html");
    if (!response.ok) throw new Error("Failed To Load Footer");

    const html = await response.text();
    document.querySelector("#contact").innerHTML = html;
    loadStyles("components/footer/footer.css");
  } catch (error) {
    console.error("Error fetching footer:", error);
  }
}
