window.onload = function () {
  const grid = document.getElementById("productGrid");
  
  // Clear any existing content
  grid.innerHTML = "";

  // Loop through products (from data.js)
  products.forEach(p => {
    
    // 1. CREATE COLUMN
    const col = document.createElement("div");
    
    // CHANGE HERE: Changed 'col-lg-4' to 'col-lg-3'
    // col-12   = Mobile (1 item)
    // col-md-6 = Tablet (2 items)
    // col-lg-3 = Desktop (4 items) -> (12 / 3 = 4)
    col.className = "col-12 col-md-6 col-lg-3";

    // 2. STOCK BADGE LOGIC
    let badgeHTML = "";
    if (p.stock === 0) {
      badgeHTML = `<span class="badge bg-danger position-absolute top-0 end-0 m-2 shadow-sm">Out of Stock</span>`;
    } else if (p.stock < 5) {
      badgeHTML = `<span class="badge bg-warning text-dark position-absolute top-0 end-0 m-2 shadow-sm">Low Stock</span>`;
    }

    // 3. GENERATE CARD HTML
    col.innerHTML = `
      <div class="card h-100 shadow-sm border-0">
        
        <!-- IMAGE CONTAINER -->
        <div class="position-relative overflow-hidden">
          <img 
            src="${p.image}" 
            class="card-img-top" 
            alt="${p.name}" 
            style="width: 100%; height: 300px; object-fit: cover; object-position: top;"
          >
          ${badgeHTML}
        </div>

        <!-- CARD BODY -->
        <div class="card-body d-flex flex-column">
          <div class="d-flex justify-content-between align-items-start">
            <h5 class="card-title text-truncate" style="max-width: 70%;" title="${p.name}">${p.name}</h5>
            <span class="badge text-dark border">${p.category}</span>
          </div>
          
          <div class="mb-3">
             <span class="${p.stock === 0 ? 'text-danger fw-bold' : 'text-success fw-bold'}">
               Stock: ${p.stock}
             </span>
          </div>

          <!-- BUTTONS -->
          <div class="mt-auto d-flex gap-2">
            <button class="btn btn-outline-primary btn-sm flex-fill" onclick="editProduct(${p.id})">
              <i class="bi bi-pencil-square"></i> Edit
            </button>
            <button class="btn btn-outline-danger btn-sm flex-fill" onclick="deleteProduct(${p.id})">
              <i class="bi bi-trash"></i> Delete
            </button>
          </div>
        </div>
      </div>
    `;

    // 4. ADD TO GRID
    grid.appendChild(col);
  });
};

// Placeholder Functions
function editProduct(id) {
  alert("Go to Edit Page for ID: " + id);
}

function deleteProduct(id) {
  if(confirm("Are you sure you want to delete this product?")) {
    alert("Product " + id + " deleted!");
  }
}

/* ===========================
   DARK MODE TOGGLE LOGIC
   =========================== */
document.addEventListener("DOMContentLoaded", () => {
  const darkModeBtn = document.getElementById('toggleDarkModeBtn');
  const darkModeIcon = document.getElementById('darkModeIcon');
  const body = document.body;

  // 1. Check Local Storage
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    if(darkModeIcon) {
      darkModeIcon.classList.remove('bi-moon');
      darkModeIcon.classList.add('bi-sun');
    }
  }

  // 2. Toggle Event
  if (darkModeBtn) {
    darkModeBtn.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
      
      if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        if(darkModeIcon) {
          darkModeIcon.classList.remove('bi-moon');
          darkModeIcon.classList.add('bi-sun');
        }
      } else {
        localStorage.setItem('theme', 'light');
        if(darkModeIcon) {
          darkModeIcon.classList.remove('bi-sun');
          darkModeIcon.classList.add('bi-moon');
        }
      }
    });
  }
});