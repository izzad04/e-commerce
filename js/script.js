// LOGIN FUNCTION
function login() {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;

    if (!user || !pass) {
        alert("Please enter username and password.");
        return;
    }

    if (user === "admin" && pass === "123") {
        localStorage.setItem("loggedIn", "true");
        window.location.href = "dashboard.html";
    } else {
        document.getElementById("loginError").classList.remove("d-none");
    }
}

function hideError() {
    document.getElementById("loginError")?.classList.add("d-none");
}

document.getElementById("username")?.addEventListener("input", hideError);
document.getElementById("password")?.addEventListener("input", hideError);

// SESSION CHECK
if (!window.location.href.includes("index.html")) {
    if (!localStorage.getItem("loggedIn")) {
        window.location.href = "index.html";
    }
}

// LOGOUT BUTTON
const logoutBtn = document.getElementById("confirmLogoutBtn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("loggedIn");
        window.location.href = "index.html";
    });
}

// DASHBOARD CHARTS
document.addEventListener("DOMContentLoaded", () => {
    const ctxBar = document.getElementById("categoryChart");
    if (ctxBar) {
        new Chart(ctxBar, {
            type: "bar",
            data: {
                labels: categories.map(c => c.name),
                datasets: [{
                    label: 'Number of Products',
                    data: categories.map(c => c.totalProducts),
                    backgroundColor: "rgba(54, 162, 235, 0.7)",
                    borderColor: "#000",
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false }, title: { display: true, text: 'Products per Category' } },
                scales: { y: { beginAtZero: true } }
            }
        });
    }

    const ctxTop = document.getElementById("topSellingChart");
    if (ctxTop) {
        new Chart(ctxTop, {
            type: "bar",
            data: {
                labels: products.map(p => p.name),
                datasets: [{
                    label: "Units Sold",
                    data: products.map(p => p.sold),
                    backgroundColor: "rgba(255, 99, 132, 0.7)",
                    borderColor: "#000",
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: "y",
                responsive: true,
                plugins: { legend: { display: false }, title: { display: true, text: "Top-Selling Products" } },
                scales: { x: { beginAtZero: true } }
            }
        });
    }
});

// ADD PRODUCT / CATEGORY
function addProduct() {
    const table = document.getElementById("productsTable")?.getElementsByTagName('tbody')[0];
    if (!table) return;
    const name = prompt("Product Name:");
    const price = prompt("Price:");
    const stock = prompt("Stock:");
    const category = prompt("Category:");
    if (!name || !price || !stock || !category) return;
    const row = table.insertRow();
    row.innerHTML = `<td>${table.rows.length}</td><td>${name}</td><td>${price}</td><td>${stock}</td><td>${category}</td>`;
}

function addCategory() {
    const table = document.getElementById("categoriesTable")?.getElementsByTagName('tbody')[0];
    if (!table) return;
    const name = prompt("Category Name:");
    const total = prompt("Total Products:");
    const status = prompt("Status:");
    if (!name || !total || !status) return;
    const row = table.insertRow();
    row.innerHTML = `<td>${name}</td><td>${total}</td><td>${status}</td>`;
}
