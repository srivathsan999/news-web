(function loadChart() {
  if (window.Chart) return;
  var script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.6/dist/chart.umd.min.js';
  script.defer = true;
  script.onload = function () {
    document.dispatchEvent(new CustomEvent('chart:loaded'));
  };
  document.head.appendChild(script);
})();
