// js/logout.js
document.addEventListener("DOMContentLoaded", () => {
  // modal confirm logout
  const confirmBtn = document.getElementById("confirmLogoutBtn");
  if (confirmBtn) {
    confirmBtn.addEventListener("click", () => {
      // clear login flag if you used one
      localStorage.removeItem("loggedIn");
      window.location.href = "index.html";
    });
  }
});
