document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("totalProducts").textContent = products.length;
  document.getElementById("totalCategories").textContent = categories.length;
  document.getElementById("topSeller").textContent = getTopSellingProducts()[0].name;

  if(document.getElementById("categoryChart")){
    window.categoryChart = renderCategoryChart("categoryChart");
    document.getElementById("refreshCategoryBtn").addEventListener("click", () => {
      categoryChart.destroy();
      window.categoryChart = renderCategoryChart("categoryChart");
    });
  }

  if(document.getElementById("topSellingChart")){
    window.topChart = renderTopSellingChart("topSellingChart");
    document.getElementById("refreshTopBtn").addEventListener("click", () => {
      topChart.destroy();
      window.topChart = renderTopSellingChart("topSellingChart");
    });
  }
});
