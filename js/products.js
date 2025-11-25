window.onload = function () {
  const grid = document.getElementById("productGrid");

  products.forEach(p => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <div class="product-img">
        <img src="${p.image}" alt="${p.name}">
        ${p.stock < 5 ? `<span class="low-stock">LOW STOCK</span>` : ""}
      </div>

      <div class="product-info">
        <h3>${p.name}</h3>
        <p class="product-category">${p.category}</p>
        <p class="product-stock">Stock: <strong>${p.stock}</strong></p>
      </div>
    `;

    grid.appendChild(card);
  });
};
