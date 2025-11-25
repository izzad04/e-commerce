window.onload = function () {
  const grid = document.getElementById("productGrid");

  products.forEach(p => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    // Determine stock label
    let stockLabel = "";
    if (p.stock === 0) {
      stockLabel = `<span class="out-of-stock">OUT OF STOCK</span>`;
    } else if (p.stock < 5) {
      stockLabel = `<span class="low-stock">LOW STOCK</span>`;
    }

    card.innerHTML = `
      <div class="product-img">
        <img src="${p.image}" alt="${p.name}">
        ${stockLabel}
      </div>

      <div class="product-info">
        <h3>${p.name}</h3>
        <p class="product-category">${p.category}</p>
        <p class="product-stock">Stock: <strong>${p.stock}</strong></p>
        <div class="btn-group mt-2">
          <button class="btn btn-primary btn-sm" onclick="editProduct(${p.id})">Edit</button>
          <button class="btn btn-danger btn-sm" onclick="deleteProduct(${p.id})">Delete</button>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });
};
