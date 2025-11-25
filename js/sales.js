window.onload = function () {
  const prodSelect = document.getElementById("saleProduct");
  const salesBody = document.getElementById("salesTableBody");

  // Load products into dropdown
  products.forEach(p => {
    const op = document.createElement("option");
    op.value = p.name;
    op.textContent = p.name;
    prodSelect.appendChild(op);
  });

  const sales = [];

  document.getElementById("addSaleBtn").onclick = function () {
    const product = prodSelect.value;
    const qty = parseInt(document.getElementById("saleQty").value);
    const date = document.getElementById("saleDate").value;

    if (!qty || qty < 1 || !date) {
      alert("Please complete all fields.");
      return;
    }

    // Save Sale
    sales.push({ product, qty, date });

    // Add to table
    const row = `
      <tr>
        <td>${product}</td>
        <td>${qty}</td>
        <td>${date}</td>
      </tr>
    `;
    salesBody.innerHTML += row;

    updateChart(sales);
  };

  // Chart.js
  let chart;
  function updateChart(data) {
    const labels = data.map(x => x.product);
    const values = data.map(x => x.qty);

    if (chart) chart.destroy();

    chart = new Chart(document.getElementById("salesChart"), {
      type: "bar",
      data: {
        labels: labels,
        datasets: [{
          label: "Quantity Sold",
          data: values
        }]
      }
    });
  }
};
