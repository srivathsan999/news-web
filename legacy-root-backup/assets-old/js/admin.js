(function () {
  const chartTargets = document.querySelectorAll('[data-chart]');
  if (!chartTargets.length) return;

  function bootCharts() {
    if (!window.Chart) return;
    chartTargets.forEach(canvas => {
      if (canvas.dataset.chartReady) return;
      const type = canvas.dataset.chart;
      canvas.dataset.chartReady = 'true';
      makeChart(canvas, type);
    });
  }

  function makeChart(canvas, type) {
    const context = canvas.getContext('2d');
    const palette = ['#5c6ef8', '#1fb6ff', '#ff8f70', '#0fd78a'];
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

    switch (type) {
      case 'line':
        // eslint-disable-next-line no-new
        new Chart(context, {
          type: 'line',
          data: {
            labels,
            datasets: [
              {
                label: 'Revenue',
                data: [12, 19, 15, 22, 28, 32],
                borderColor: palette[0],
                backgroundColor: 'rgba(92, 110, 248, 0.2)',
                tension: 0.4,
                fill: true,
              },
            ],
          },
          options: { responsive: true, maintainAspectRatio: false },
        });
        break;
      case 'bar':
        new Chart(context, {
          type: 'bar',
          data: {
            labels,
            datasets: [
              {
                label: 'Active Users',
                data: [18, 21, 25, 30, 28, 34],
                backgroundColor: palette,
              },
            ],
          },
          options: { responsive: true, maintainAspectRatio: false },
        });
        break;
      default:
        new Chart(context, {
          type: 'doughnut',
          data: {
            labels: ['New', 'Returning', 'Churned'],
            datasets: [
              {
                data: [55, 30, 15],
                backgroundColor: palette,
              },
            ],
          },
          options: { responsive: true, cutout: '70%' },
        });
    }
  }

  if (window.Chart) {
    bootCharts();
  } else {
    document.addEventListener('chart:loaded', bootCharts);
  }

  // table filtering for admin lists
  const filterInput = document.querySelector('[data-admin-search]');
  const rows = document.querySelectorAll('[data-admin-row]');
  filterInput?.addEventListener('input', () => {
    const value = filterInput.value.toLowerCase();
    rows.forEach(row => {
      row.style.display = row.textContent.toLowerCase().includes(value) ? '' : 'none';
    });
  });
})();
