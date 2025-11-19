document.addEventListener("DOMContentLoaded", function() {
  populateProductsTable();

  if(document.getElementById("productChart")){
    window.productChart = new Chart(document.getElementById("productChart").getContext("2d"), {
      type:'bar',
      data:{
        labels: products.map(p=>p.name),
        datasets:[{ label:'Stock', data: products.map(p=>p.stock), backgroundColor:'rgba(255,99,132,0.7)' }]
      },
      options:{ responsive:true, scales:{ y:{ beginAtZero:true } } }
    });

    document.getElementById("updateProductChart").addEventListener("click", ()=>{
      productChart.data.datasets[0].data = products.map(p=>p.stock);
      productChart.update();
    });
  }
});
