document.addEventListener('DOMContentLoaded', function () {
  
  const salesGrid = document.getElementById('salesGrid');
  // Store chart instances to update them later for Dark Mode
  const chartInstances = []; 

  // 1. DATA
  const yearlyData = [
    { year: 2020, color: "#FF5733", data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 130, 140, 150] },
    { year: 2021, color: "#33FF57", data: [50, 60, 55, 70, 65, 80, 85, 100, 110, 120, 130, 145] },
    { year: 2022, color: "#3357FF", data: [60, 75, 70, 85, 80, 95, 110, 120, 130, 140, 155, 170] },
    { year: 2023, color: "#F333FF", data: [80, 90, 85, 100, 110, 120, 130, 140, 150, 165, 180, 195] },
    { year: 2024, color: "#FFC300", data: [100, 120, 115, 130, 140, 155, 160, 175, 185, 195, 210, 230] },
    { year: 2025, color: "#00E5FF", data: [120, 135, 130, 145, 155, 170, 180, 195, 210, 220, 240, 260] }
  ];

  // 2. RENDER GRID
  yearlyData.forEach(item => {
    const col = document.createElement('div');
    col.className = 'col-12 col-md-6';
    const chartId = `chart-${item.year}`;

    col.innerHTML = `
      <div class="card h-100">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h5 class="mb-0">Sales Report: ${item.year}</h5>
          <span class="badge bg-secondary">Annual</span>
        </div>
        <div class="card-body">
          <div id="${chartId}"></div>
        </div>
      </div>
    `;
    salesGrid.appendChild(col);
    renderChart(chartId, item.year, item.data, item.color);
  });

  // 3. CHART FUNCTION
  function renderChart(elementId, year, dataArray, lineColor) {
    // Check if dark mode is already active for initial render
    const isDark = document.body.classList.contains('dark-mode');
    const textColor = isDark ? '#e0e0e0' : '#333';

    var options = {
      series: [{ name: `Sales ${year}`, data: dataArray }],
      chart: {
        height: 350,
        type: 'line',
        zoom: { enabled: false },
        toolbar: { show: false },
        background: 'transparent'
      },
      colors: [lineColor],
      dataLabels: { enabled: false },
      stroke: { curve: 'straight', width: 3 },
      title: {
        text: `Product Trends (${year})`,
        align: 'left',
        style: { color: textColor }
      },
      grid: {
        borderColor: isDark ? '#444' : '#e7e7e7',
        row: {
          colors: ['transparent', 'transparent'],
          opacity: 0.5
        },
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        labels: { style: { colors: textColor } }
      },
      yaxis: {
        title: { text: 'Units Sold', style: { color: textColor } },
        labels: { style: { colors: textColor } }
      },
      theme: { mode: isDark ? 'dark' : 'light' }
    };

    var chart = new ApexCharts(document.querySelector("#" + elementId), options);
    chart.render();
    chartInstances.push(chart); // Save to update later
  }

  // 4. DARK MODE LOGIC
  const darkModeBtn = document.getElementById('toggleDarkModeBtn');
  const icon = document.getElementById('darkModeIcon');
  const body = document.body;

  // Check Local Storage
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    icon.classList.replace('bi-moon', 'bi-sun');
    updateCharts(true);
  }

  darkModeBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');

    // Update Icon
    if (isDark) {
      localStorage.setItem('theme', 'dark');
      icon.classList.replace('bi-moon', 'bi-sun');
    } else {
      localStorage.setItem('theme', 'light');
      icon.classList.replace('bi-sun', 'bi-moon');
    }

    // Update Charts dynamically
    updateCharts(isDark);
  });

  function updateCharts(isDark) {
    const textColor = isDark ? '#e0e0e0' : '#333';
    const gridColor = isDark ? '#444' : '#e7e7e7';

    chartInstances.forEach(chart => {
      chart.updateOptions({
        chart: { foreColor: textColor },
        title: { style: { color: textColor } },
        xaxis: { labels: { style: { colors: textColor } } },
        yaxis: { 
            title: { style: { color: textColor } },
            labels: { style: { colors: textColor } } 
        },
        grid: { borderColor: gridColor },
        theme: { mode: isDark ? 'dark' : 'light' }
      });
    });
  }

});