import { loadStyles } from "../../js/helper.js";

export async function loadNavbar() {
  try {
    const response = await fetch("components/navbar/navbar.html");

    if (!response.ok) {
      throw new Error("Failed To Load Navbar");
    }

    const html = await response.text();

    document.querySelector("#navbar").innerHTML = html;

    loadStyles("components/navbar/navbar.css");
    const menuToggle = document.getElementById("menuToggle");
    const menuLink = document.getElementById("menuLink");

    menuToggle.addEventListener("click", () => {
      menuLink.classList.toggle("active");
    });
    document.querySelectorAll(".menu-link a").forEach((link) => {
      link.addEventListener("click", () => {
        menuLink.classList.remove("active");
      });
    });
  } catch (error) {
    console.error("Error fetching navbar:", error);
  }
}
