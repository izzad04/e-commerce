document.addEventListener("DOMContentLoaded", function () {
  const navbar = `
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="dashboard.html">E-Commerce App</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item"><a class="nav-link" href="dashboard.html">Dashboard</a></li>
          <li class="nav-item"><a class="nav-link" href="products.html">Products</a></li>
          <li class="nav-item"><a class="nav-link" href="categories.html">Categories</a></li>
          <li class="nav-item"><a class="nav-link text-danger" href="#" id="logoutBtn">Logout</a></li>
        </ul>
      </div>
    </div>
  </nav>
  `;
  document.getElementById("navbar").innerHTML = navbar;

  // Logout logic
  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("loggedIn");
    window.location.href = "index.html";
  });
});
