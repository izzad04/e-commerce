window.onload = function () {

  // ---- 1. Display table ----
  const table = document.getElementById("salesTable");

  sales.forEach(s => {
    table.innerHTML += `
      <tr>
        <td>${s.date}</td>
        <td>${s.product}</td>
        <td>${s.qty}</td>
        <td>RM ${s.total.toFixed(2)}</td>
      </tr>
    `;
  });

  // ---- 2. Prepare chart data ----
  const dates = sales.map(s => s.date);
  const totals = sales.map(s => s.total);

  // ---- 3. Create Chart ----
  new Chart(document.getElementById("salesChart"), {
    type: "bar",
    data: {
      labels: dates,
      datasets: [{
        label: "Total Sales (RM)",
        data: totals,
        borderWidth: 2
      }]
    }
  });

};
