// dashboard.js

document.addEventListener("DOMContentLoaded", () => {
  // KPI Cards
  const totalProducts = products.length;
  const totalCategories = categories.length;
  const lowStock = products.filter(p => p.stock > 0 && p.stock < 5).length;
  const outOfStock = products.filter(p => p.stock === 0).length;

  document.getElementById("totalProducts").textContent = totalProducts;
  document.getElementById("totalCategories").textContent = totalCategories;
  document.getElementById("lowStock").textContent = lowStock;
  document.getElementById("outOfStock").textContent = outOfStock;

  // Category Chart
  const categoryCounts = categories.map(cat => 
    products.filter(p => p.category === cat.name).length
  );

  const ctxCategory = document.getElementById("categoryChart");
  if (ctxCategory) {
    new Chart(ctxCategory, {
      type: "bar",
      data: {
        labels: categories.map(c => c.name),
        datasets: [{
          label: 'Products per Category',
          data: categoryCounts,
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

  // Top-Selling Products Chart
  const ctxTop = document.getElementById("topSellingChart");
  if (ctxTop) {
    new Chart(ctxTop, {
      type: "bar",
      data: {
        labels: products.map(p => p.name),
        datasets: [{
          label: "Units Sold",
          data: products.map(p => p.sold || 0), // default 0 if no sold value
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

  // Low Stock / Out of Stock Table
  const tableBody = document.getElementById("stockTableBody");
  if (tableBody) {
    products.forEach(p => {
      if (p.stock < 5) {
        const row = tableBody.insertRow();
        row.innerHTML = `
          <td>${p.name}</td>
          <td>${p.category}</td>
          <td>${p.stock}</td>
          <td>${p.stock === 0 ? "Out of Stock" : "Low Stock"}</td>
        `;
      }
    });
  }
});
