// sidebar.js
// Elements
const sidebar = document.getElementById("customSidebar");
const mainContent = document.getElementById("mainContent");
const topNavbar = document.getElementById("topNavbar");
const overlay = document.getElementById("sidebarOverlay");
const toggleSidebarMobile = document.getElementById("toggleSidebarMobile");
const toggleSidebarDesktop = document.getElementById("toggleSidebarDesktop");
const closeSidebarBtn = document.getElementById("closeSidebar");
const darkModeBtn = document.getElementById("toggleDarkModeBtn");
const darkModeIcon = document.getElementById("darkModeIcon");
const htmlEl = document.documentElement;

const isMobile = () => window.innerWidth < 768;

// Functions
function openSidebar() {
  if (isMobile()) {
    sidebar.classList.add("show-mobile");
    overlay.classList.add("show");
  } else {
    sidebar.classList.add("show-desktop");
    mainContent.classList.add("pushed");
    topNavbar.classList.add("pushed");
    localStorage.setItem("sidebarState", "open");
  }
}

function closeSidebar() {
  if (isMobile()) {
    sidebar.classList.remove("show-mobile");
    overlay.classList.remove("show");
  } else {
    sidebar.classList.remove("show-desktop");
    mainContent.classList.remove("pushed");
    topNavbar.classList.remove("pushed");
    localStorage.setItem("sidebarState", "closed");
  }
}

function toggleSidebar() {
  if (isMobile()) {
    sidebar.classList.toggle("show-mobile");
    overlay.classList.toggle("show");
  } else {
    if (sidebar.classList.contains("show-desktop")) {
      closeSidebar();
    } else {
      openSidebar();
    }
  }
}

// Restore sidebar state on load (desktop only)
window.addEventListener("DOMContentLoaded", () => {
  if (!isMobile()) {
    const savedState = localStorage.getItem("sidebarState");
    if (savedState === "open") {
      openSidebar();
    } else {
      closeSidebar();
    }
  }
});

// Event listeners
if (toggleSidebarMobile) {
  toggleSidebarMobile.addEventListener("click", toggleSidebar);
}

if (toggleSidebarDesktop) {
  toggleSidebarDesktop.addEventListener("click", toggleSidebar);
}

if (closeSidebarBtn) {
  closeSidebarBtn.addEventListener("click", closeSidebar);
}

// Overlay click (mobile)
if (overlay) {
  overlay.addEventListener("click", closeSidebar);
}

// Resize adjustments
window.addEventListener("resize", () => {
  if (!isMobile()) {
    overlay.classList.remove("show");
    const savedState = localStorage.getItem("sidebarState");
    if (savedState === "open") {
      openSidebar();
    } else {
      closeSidebar();
    }
    sidebar.classList.remove("show-mobile");
  } else {
    sidebar.classList.remove("show-desktop");
    mainContent.classList.remove("pushed");
    topNavbar.classList.remove("pushed");
  }
});

// Dark mode functions
function setDarkMode(enabled) {
  if (enabled) {
    htmlEl.setAttribute("data-bs-theme", "dark");
    darkModeIcon.classList.remove("bi-moon");
    darkModeIcon.classList.add("bi-sun-fill");
    localStorage.setItem("bsDarkMode", "1");
  } else {
    htmlEl.setAttribute("data-bs-theme", "light");
    darkModeIcon.classList.remove("bi-sun-fill");
    darkModeIcon.classList.add("bi-moon");
    localStorage.setItem("bsDarkMode", "0");
  }
}

// Load dark mode preference on page load
(function() {
  const dark = localStorage.getItem("bsDarkMode") === "1";
  setDarkMode(dark);
})();

// Toggle dark mode
if (darkModeBtn) {
  darkModeBtn.addEventListener("click", () => {
    const isDark = htmlEl.getAttribute("data-bs-theme") === "dark";
    setDarkMode(!isDark);
  });
}