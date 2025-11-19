// =========================
// LOGIN
// =========================
function login() {
  const user = document.getElementById("username")?.value;
  const pass = document.getElementById("password")?.value;

  if (!user || !pass) { alert("Enter username and password"); return; }

  if (user === "admin" && pass === "123") {
    localStorage.setItem("loggedIn", "true");
    window.location.href = "dashboard.html";
  } else {
    document.getElementById("loginError")?.classList.remove("d-none");
  }
}

function hideError() { document.getElementById("loginError")?.classList.add("d-none"); }
document.getElementById("username")?.addEventListener("input", hideError);
document.getElementById("password")?.addEventListener("input", hideError);

// SESSION CHECK
if (!window.location.href.includes("index.html")) {
  if (!localStorage.getItem("loggedIn")) window.location.href = "index.html";
}

// =========================
// TABLE POPULATION
// =========================
function populateProductsTable() {
  const tbody = document.querySelector("#productsTable tbody");
  if (!tbody) return;
  tbody.innerHTML = "";
  products.forEach((p,i) => {
    tbody.innerHTML += `<tr>
      <td>${i+1}</td>
      <td>${p.name}</td>
      <td>RM ${p.price}</td>
      <td>${p.stock}</td>
      <td>${p.category}</td>
    </tr>`;
  });
}

function populateCategoriesTable() {
  const tbody = document.querySelector("#categoriesTable tbody");
  if (!tbody) return;
  tbody.innerHTML = "";
  categories.forEach((c) => {
    const total = products.filter(p => p.category === c.name).length;
    const status = total < 5 ? "Low Stock" : "Active";
    tbody.innerHTML += `<tr>
      <td>${c.name}</td>
      <td>${total}</td>
      <td>${status}</td>
    </tr>`;
  });
}

// =========================
// CHARTS
// =========================
function renderCategoryChart(chartId) {
  const ctx = document.getElementById(chartId)?.getContext("2d");
  if (!ctx) return;
  const counts = categories.map(c => products.filter(p => p.category === c.name).length);
  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels: categories.map(c => c.name),
      datasets: [{ label: 'Total Products', data: counts, backgroundColor: 'rgba(54,162,235,0.7)' }]
    },
    options: { responsive:true, scales:{ y:{ beginAtZero:true } } }
  });
}

function renderTopSellingChart(chartId) {
  const ctx = document.getElementById(chartId)?.getContext("2d");
  if (!ctx) return;
  const top = [...products].sort((a,b)=>b.stock-a.stock).slice(0,5);
  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels: top.map(p=>p.name),
      datasets: [{ label: 'Stock', data: top.map(p=>p.stock), backgroundColor: 'rgba(255,99,132,0.7)' }]
    },
    options: { indexAxis: 'y', responsive:true, plugins:{ legend:{ display:false } }, scales:{ x:{ beginAtZero:true } } }
  });
}

// =========================
// ADD PRODUCT / CATEGORY
// =========================
function addProduct() {
  const name = prompt("Product name:");
  const price = Number(prompt("Price:"));
  const stock = Number(prompt("Stock:"));
  const category = prompt("Category:");
  if (!name || !price || !stock || !category) return;
  products.push({ name, price, stock, category });
  populateProductsTable();
}

function addCategory() {
  const name = prompt("Category name:");
  if (!name) return;
  categories.push({ name });
  populateCategoriesTable();
}

// =========================
// INITIALIZE PAGES
// =========================
document.addEventListener("DOMContentLoaded", () => {
  populateProductsTable();
  populateCategoriesTable();

  if(document.getElementById("categoryChart")) window.categoryChart = renderCategoryChart("categoryChart");
  if(document.getElementById("topSellingChart")) window.topChart = renderTopSellingChart("topSellingChart");
});
