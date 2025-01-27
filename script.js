// Dynamically load the navbar and footer on each page
document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.getElementById("navbar");
    const footer = document.getElementById("footer");
  
    // Load navbar
    fetch("navbar.html")
      .then((response) => response.text())
      .then((data) => {
        navbar.innerHTML = data;
      });
  
    // Load footer
    fetch("footer.html")
      .then((response) => response.text())
      .then((data) => {
        footer.innerHTML = data;
      });
  });  