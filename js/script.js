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

// DASHBOARD CHART (Bar Chart)
const ctxBar = document.getElementById("categoryChart");
if (ctxBar) {
  new Chart(ctxBar, {
    type: "bar",
    data: {
      labels: ["Electronics", "Fashion", "Sports", "Beauty", "Home"],
      datasets: [{
        label: 'Number of Products',
        data: [8, 10, 4, 2, 1],
        backgroundColor: [
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 99, 132, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(153, 102, 255, 0.7)"
        ],
        borderColor: "#000",
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        title: { display: true, text: 'Products per Category' }
      },
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}

// ADD ITEM FUNCTIONS
function addProduct() {
  const table = document.getElementById("productsTable").getElementsByTagName('tbody')[0];
  const productName = prompt("Enter product name:");
  if (!productName) return;

  const price = prompt("Enter price:");
  if (!price) return;

  const stock = prompt("Enter stock quantity:");
  if (!stock) return;

  const category = prompt("Enter category:");
  if (!category) return;

  const row = table.insertRow();
  row.innerHTML = `<td>${table.rows.length}</td>
                   <td>${productName}</td>
                   <td>${price}</td>
                   <td>${stock}</td>
                   <td>${category}</td>`;
}

function addCategory() {
  const table = document.getElementById("categoriesTable").getElementsByTagName('tbody')[0];
  const categoryName = prompt("Enter category name:");
  if (!categoryName) return;

  const totalProducts = prompt("Enter total products:");
  if (!totalProducts) return;

  const status = prompt("Enter status (Active/Low Stock):");
  if (!status) return;

  const row = table.insertRow();
  row.innerHTML = `<td>${categoryName}</td>
                   <td>${totalProducts}</td>
                   <td>${status}</td>`;
}
