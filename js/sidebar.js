const sidebar = document.getElementById("customSidebar");
const mainContent = document.getElementById("mainContent");
const toggleMe = document.getElementById("toggleMe");

const toggleSidebarMobile = document.getElementById("toggleSidebarMobile");
const toggleSidebarDesktop1 = document.getElementById("toggleSidebarDesktop1");
const toggleSidebarDesktop2 = document.getElementById("toggleSidebarDesktop2");
const closeSidebar = document.getElementById("closeSidebar");
const overlay = document.getElementById("sidebarOverlay");
const sidebarMenu = document.querySelector(".sidebar-menu");

const isMobile = () => window.innerWidth < 768;

function openSidebar() {
  if (isMobile()) {
    sidebar.classList.add("show-mobile");
    mainContent.classList.add("pushed");
    toggleMe.classList.add("pushed");
  } else {
    sidebar.classList.add("show-desktop");
    mainContent.classList.add("pushed");
    toggleMe.classList.add("pushed");
    localStorage.setItem("sidebarState", "open");
  }
}

function closeSidebarFunc() {
  if (isMobile()) {
    sidebar.classList.remove("show-mobile");
    mainContent.classList.remove("pushed");
    toggleMe.classList.remove("pushed");
  } else {
    sidebar.classList.remove("show-desktop");
    mainContent.classList.remove("pushed");
    toggleMe.classList.remove("pushed");
    localStorage.setItem("sidebarState", "closed");
  }
}

function toggleSidebar() {
  if (isMobile()) {
    sidebar.classList.toggle("show-mobile");
    mainContent.classList.toggle("pushed");
    toggleMe.classList.toggle("pushed");
  } else {
    const isOpen = sidebar.classList.contains("show-desktop");
    if (isOpen) {
      closeSidebarFunc();
    } else {
      openSidebar();
    }
  }
}

// Restore sidebar state on load
window.addEventListener("DOMContentLoaded", () => {
  if (!isMobile()) {
    const savedState = localStorage.getItem("sidebarState");
    if (savedState === "open") {
      sidebar.classList.add("show-desktop");
      mainContent.classList.add("pushed");
      toggleMe.classList.add("pushed");
    } else {
      sidebar.classList.remove("show-desktop");
      mainContent.classList.remove("pushed");
      toggleMe.classList.remove("pushed");
    }
  }
});

function openSidebar() {
  if (isMobile()) {
    sidebar.classList.add("show-mobile");
    mainContent.classList.add("pushed");
    toggleMe.classList.add("pushed");
    overlay.classList.add("show");
  } else {
    sidebar.classList.add("show-desktop");
    mainContent.classList.add("pushed");
    toggleMe.classList.add("pushed");
    localStorage.setItem("sidebarState", "open");
  }
}

function closeSidebarFunc() {
  if (isMobile()) {
    sidebar.classList.remove("show-mobile");
    mainContent.classList.remove("pushed");
    toggleMe.classList.remove("pushed");
    overlay.classList.remove("show");
  } else {
    sidebar.classList.remove("show-desktop");
    mainContent.classList.remove("pushed");
    toggleMe.classList.remove("pushed");
    localStorage.setItem("sidebarState", "closed");
  }
}

// Close on overlay click
overlay.addEventListener("click", closeSidebarFunc);

// Resize adjustments
window.addEventListener("resize", () => {
  if (!isMobile()) {
    overlay.classList.remove("show");
    const savedState = localStorage.getItem("sidebarState");
    if (savedState === "open") {
      sidebar.classList.add("show-desktop");
      mainContent.classList.add("pushed");
      toggleMe.classList.add("pushed");
    } else {
      sidebar.classList.remove("show-desktop");
      mainContent.classList.remove("pushed");
      toggleMe.classList.remove("pushed");
    }
    sidebar.classList.remove("show-mobile");
  } else {
    sidebar.classList.remove("show-desktop");
    mainContent.classList.remove("pushed");
    toggleMe.classList.remove("pushed");
  }
});

toggleSidebarMobile.addEventListener("click", toggleSidebar);
toggleSidebarDesktop1.addEventListener("click", toggleSidebar);
toggleSidebarDesktop2.addEventListener("click", toggleSidebar);
closeSidebar.addEventListener("click", closeSidebarFunc);

// Submenu toggles
document.querySelectorAll(".menu-item").forEach((menuItem) => {
  menuItem.addEventListener("click", () => {
    const menuKey = menuItem.getAttribute("data-menu");
    const submenu = document.getElementById(`submenu-${menuKey}`);
    const icon = menuItem.querySelector(".caret-icon");
    submenu.classList.toggle("show");
    icon.classList.toggle("rotate");
  });
});

// Nested submenu toggle
document.querySelectorAll(".submenu-item").forEach((item) => {
  item.addEventListener("click", () => {
    const submenuKey = item.getAttribute("data-submenu");
    const nested = document.getElementById(`submenu-${submenuKey}`);
    const icon = item.querySelector(".caret-icon");

    nested.classList.toggle("show");
    icon.classList.toggle("rotate");
  });
});

// Click outside on mobile to close
window.addEventListener("click", function (e) {
  if (isMobile() && sidebar.classList.contains("show-mobile")) {
    if (
      !sidebar.contains(e.target) &&
      !toggleSidebarMobile.contains(e.target)
    ) {
      closeSidebarFunc();
    }
  }
});

sidebarMenu.addEventListener("scroll", () => {
  if (sidebarMenu.scrollTop > 0) {
    sidebarMenu.classList.add("scrolling");
  } else {
    sidebarMenu.classList.remove("scrolling");
  }
});


// Dark mode toggle logic
const darkModeBtn = document.getElementById("toggleDarkModeBtn");
const darkModeIcon = document.getElementById("darkModeIcon");
const htmlEl = document.documentElement;

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

// Load preference on page load
(function () {
  const dark = localStorage.getItem("bsDarkMode") === "1";
  setDarkMode(dark);
})();

darkModeBtn.addEventListener("click", function () {
  const isDark = htmlEl.getAttribute("data-bs-theme") === "dark";
  setDarkMode(!isDark);
});