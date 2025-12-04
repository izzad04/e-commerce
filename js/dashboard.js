document.addEventListener("DOMContentLoaded", () => {
  
  // ============================================
  // 1. KPI DATA LOGIC
  // ============================================
  // Assuming 'products' and 'categories' come from data.js
  if (typeof products !== 'undefined' && typeof categories !== 'undefined') {
    const totalProducts = products.length;
    const totalCategories = categories.length;
    const lowStock = products.filter(p => p.stock > 0 && p.stock < 5).length;
    const outOfStock = products.filter(p => p.stock === 0).length;

    document.getElementById("totalProducts").textContent = totalProducts;
    document.getElementById("totalCategories").textContent = totalCategories;
    document.getElementById("lowStock").textContent = lowStock;
    document.getElementById("outOfStock").textContent = outOfStock;
  }

  // ============================================
  // 2. CHART CONFIGURATION
  // ============================================
  
  // -- REVENUE CHART (Area) --
  var revenueOptions = {
    series: [{
      name: 'Revenue',
      data: [1200, 1900, 1500, 2100, 1800, 2500, 2300]
    }],
    chart: {
      height: 350,
      type: 'area',
      toolbar: { show: false },
      background: 'transparent' // Important for dark mode
    },
    colors: ['#0d6efd'],
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth' },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.1,
        stops: [0, 90, 100]
      }
    },
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      labels: { style: { colors: '#6c757d' } } // Default gray
    },
    yaxis: {
      labels: { style: { colors: '#6c757d' } }
    },
    tooltip: {
      theme: 'light',
      y: { formatter: function (val) { return "RM " + val } }
    },
    grid: {
      borderColor: '#e7e7e7',
    }
  };

  var revenueChart = new ApexCharts(document.querySelector("#revenueChart"), revenueOptions);
  revenueChart.render();


  // -- ORDER STATUS CHART (Donut) --
  var orderOptions = {
    series: [45, 15, 5],
    labels: ['Delivered', 'Pending', 'Cancelled'],
    chart: {
      type: 'donut',
      height: 320,
      background: 'transparent'
    },
    colors: ['#198754', '#ffc107', '#dc3545'],
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            name: { color: '#6c757d' },
            value: { color: '#333' },
            total: {
              show: true,
              label: 'Total Orders',
              color: '#6c757d',
              formatter: function (w) {
                return w.globals.seriesTotals.reduce((a, b) => a + b, 0)
              }
            }
          }
        }
      }
    },
    legend: { position: 'bottom', labels: { colors: '#6c757d' } },
    dataLabels: { enabled: false }
  };

  var orderChart = new ApexCharts(document.querySelector("#orderStatusChart"), orderOptions);
  orderChart.render();


  // ============================================
  // 3. DARK MODE LOGIC (With Chart Updates)
  // ============================================
  const darkModeBtn = document.getElementById('toggleDarkModeBtn');
  const darkModeIcon = document.getElementById('darkModeIcon');
  const body = document.body;

  // Helper Function to Update Charts
  function updateCharts(isDark) {
    const textColor = isDark ? '#e0e0e0' : '#6c757d';
    const gridColor = isDark ? '#444' : '#e7e7e7';
    const valueColor = isDark ? '#fff' : '#333';
    const themeMode = isDark ? 'dark' : 'light';

    // Update Revenue Chart
    revenueChart.updateOptions({
      chart: { foreColor: textColor },
      xaxis: { labels: { style: { colors: textColor } } },
      yaxis: { labels: { style: { colors: textColor } } },
      grid: { borderColor: gridColor },
      tooltip: { theme: themeMode }
    });

    // Update Order Chart
    orderChart.updateOptions({
      chart: { foreColor: textColor },
      legend: { labels: { colors: textColor } },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              name: { color: textColor },
              value: { color: valueColor },
              total: { color: textColor }
            }
          }
        }
      }
    });
  }

  // Check Local Storage on Load
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    if (darkModeIcon) {
      darkModeIcon.classList.remove('bi-moon');
      darkModeIcon.classList.add('bi-sun');
    }
    // Apply dark settings to charts immediately
    updateCharts(true);
  }

  // Toggle Event
  if (darkModeBtn) {
    darkModeBtn.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
      const isDark = body.classList.contains('dark-mode');

      if (isDark) {
        localStorage.setItem('theme', 'dark');
        darkModeIcon.classList.remove('bi-moon');
        darkModeIcon.classList.add('bi-sun');
      } else {
        localStorage.setItem('theme', 'light');
        darkModeIcon.classList.remove('bi-sun');
        darkModeIcon.classList.add('bi-moon');
      }

      // TRIGGER CHART UPDATE
      updateCharts(isDark);
    });
  }
});