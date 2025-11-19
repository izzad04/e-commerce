// footer.js
function addFooter() {
    const footerHTML = `
        <footer class="bg-dark text-white text-center py-3 mt-4">
            &copy; 2025 E-Commerce App. All rights reserved.
        </footer>
    `;
    document.body.insertAdjacentHTML("beforeend", footerHTML);
}

// Make sure footer is added after page fully loads
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", addFooter);
} else {
    addFooter();
}
