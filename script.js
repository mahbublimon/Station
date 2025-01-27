document.addEventListener('DOMContentLoaded', () => {
    // Load navbar
    fetch('/navbar.html')
      .then((response) => response.text())
      .then((html) => {
        document.getElementById('navbar').innerHTML = html;
      });
  
    // Load footer
    fetch('/footer.html')
      .then((response) => response.text())
      .then((html) => {
        document.getElementById('footer').innerHTML = html;
      });
  });  