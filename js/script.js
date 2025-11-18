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

// CHART
const ctx = document.getElementById("categoryChart");
if (ctx) {
  new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Electronics", "Fashion", "Sports", "Beauty", "Home"],
      datasets: [
        {
          data: [8, 10, 4, 2, 1],
          backgroundColor: [
            "rgba(54, 162, 235, 0.7)",
            "rgba(255, 99, 132, 0.7)",
            "rgba(255, 206, 86, 0.7)",
            "rgba(75, 192, 192, 0.7)",
            "rgba(153, 102, 255, 0.7)",
          ],
          borderColor: "#fff",
          borderWidth: 1,
        },
      ],
    },
    options: { responsive: true, plugins: { legend: { position: "bottom" } } },
  });
}

// ADD ITEM BUTTON HANDLER (demo)
function addItem(type) {
  alert(`Add new ${type} functionality goes here!`);
}
