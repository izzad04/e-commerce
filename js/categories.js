document.addEventListener("DOMContentLoaded", function() {
  populateCategoriesTable();

  if(document.getElementById("categoryPageChart")){
    window.catChart = new Chart(document.getElementById("categoryPageChart").getContext("2d"), {
      type:'pie',
      data:{
        labels: categories.map(c=>c.name),
        datasets:[{ data: getCategoryCounts().map(c=>c.total), backgroundColor:['red','blue','green','orange','purple'] }]
      },
      options:{ responsive:true }
    });

    document.getElementById("updateCategoryChart").addEventListener("click", ()=>{
      catChart.data.datasets[0].data = getCategoryCounts().map(c=>c.total);
      catChart.update();
    });
  }
});
