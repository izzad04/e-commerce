// LOGIN FUNCTION
function login() {
  let user = document.getElementById("username").value;
  let pass = document.getElementById("password").value;

  if (user === "admin" && pass === "123") {
    window.location.href = "dashboard.html";
  } else {
    document.getElementById("loginError").classList.remove("d-none");
  }
}

// Hide error when typing
document.getElementById("username").addEventListener("input", hideError);
document.getElementById("password").addEventListener("input", hideError);

function hideError() {
  document.getElementById("loginError").classList.add("d-none");
}

// CHART
const ctx = document.getElementById("categoryChart");
if (ctx) {
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Electronics', 'Fashion', 'Sports', 'Beauty', 'Home'],
      datasets: [{
        data: [8, 10, 4, 2, 1],
        backgroundColor: [
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 99, 132, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)'
        ],
        borderColor: 'rgba(255, 255, 255, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'bottom' }
      }
    }
  });
}
