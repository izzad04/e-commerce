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

// CHART
if (document.getElementById("categoryChart")) {
  new Chart(document.getElementById("categoryChart"), {
    type: 'pie',
    data: {
      labels: ['Electronics', 'Fashion', 'Sports', 'Beauty', 'Home'],
      datasets: [{
        data: [8, 10, 4, 2, 1],
        borderWidth: 1
      }]
    }
  });
}