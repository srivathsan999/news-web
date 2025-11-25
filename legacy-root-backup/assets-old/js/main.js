document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const nav = document.querySelector('.site-nav');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const overlayLinks = document.querySelectorAll('.site-nav a');
  const themeControls = document.querySelectorAll('[data-theme-toggle]');
  const rtlToggle = document.querySelector('[data-rtl-toggle]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.animate').forEach(el => observer.observe(el));

  // Navigation toggle
  menuToggle?.addEventListener('click', () => {
    nav?.classList.toggle('open');
  });

  overlayLinks.forEach(link =>
    link.addEventListener('click', () => nav?.classList.remove('open'))
  );

  // Theme handling
  const savedTheme = localStorage.getItem('news-theme') || 'light';
  setTheme(savedTheme);

  themeControls.forEach(btn =>
    btn.addEventListener('click', () => setTheme(btn.dataset.mode || 'light'))
  );

  function setTheme(mode) {
    if (mode === 'dark') {
      body.setAttribute('data-theme', 'dark');
    } else {
      body.removeAttribute('data-theme');
    }
    localStorage.setItem('news-theme', mode);
    themeControls.forEach(btn => btn.classList.toggle('active', btn.dataset.mode === mode));
  }

  // RTL toggle
  const savedDir = localStorage.getItem('news-dir') || 'ltr';
  setDirection(savedDir);

  rtlToggle?.addEventListener('click', () => {
    const nextDir = body.getAttribute('dir') === 'rtl' ? 'ltr' : 'rtl';
    setDirection(nextDir);
  });

  function setDirection(dir) {
    body.setAttribute('dir', dir);
    localStorage.setItem('news-dir', dir);
    if (rtlToggle) rtlToggle.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
  }

  // Pricing toggle
  const pricingWrapper = document.querySelector('[data-pricing-wrapper]');
  const pricingBtns = document.querySelectorAll('[data-pricing-mode]');
  pricingBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      pricingBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      pricingWrapper?.setAttribute('data-billing', btn.dataset.pricingMode);
      updatePricingValues(btn.dataset.pricingMode);
    });
  });

  function updatePricingValues(mode) {
    document.querySelectorAll('[data-price]').forEach(el => {
      const monthly = el.dataset.priceMonthly;
      const yearly = el.dataset.priceYearly;
      el.textContent = mode === 'yearly' ? yearly : monthly;
    });
  }

  // Blog search & filter
  const blogSearch = document.querySelector('[data-blog-search]');
  const blogFilter = document.querySelector('[data-blog-filter]');
  const blogPosts = document.querySelectorAll('[data-blog-post]');

  function filterPosts() {
    const query = blogSearch?.value.toLowerCase() || '';
    const category = blogFilter?.value || 'all';
    blogPosts.forEach(post => {
      const matchesQuery = post.textContent.toLowerCase().includes(query);
      const matchesCategory = category === 'all' || post.dataset.category === category;
      post.style.display = matchesQuery && matchesCategory ? '' : 'none';
    });
  }

  blogSearch?.addEventListener('input', filterPosts);
  blogFilter?.addEventListener('change', filterPosts);

  // List/Grid toggle
  const listWrapper = document.querySelector('[data-blog-list]');
  const viewControls = document.querySelectorAll('[data-view]');

  viewControls.forEach(btn => {
    btn.addEventListener('click', () => {
      viewControls.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      listWrapper?.classList.toggle('list-view', btn.dataset.view === 'list');
    });
  });

  // Service filtering
  const serviceFilters = document.querySelectorAll('[data-service-filter] button');
  const serviceCards = document.querySelectorAll('[data-service-item]');
  serviceFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      serviceFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.dataset.filter;
      serviceCards.forEach(card => {
        card.style.display = target === 'all' || card.dataset.serviceItem === target ? '' : 'none';
      });
    });
  });

  // Form validation
  document.querySelectorAll('[data-validate]').forEach(form => {
    form.addEventListener('submit', e => {
      let valid = true;
      form.querySelectorAll('[required]').forEach(field => {
        const error = field.nextElementSibling;
        if (!field.value.trim()) {
          valid = false;
          if (error?.classList.contains('form-error')) {
            error.textContent = 'This field is required';
            error.style.display = 'block';
          }
        } else if (error?.classList.contains('form-error')) {
          error.style.display = 'none';
        }
      });
      if (!valid) {
        e.preventDefault();
      }
    });
  });

  // Password toggles
  document.querySelectorAll('[data-password-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
      const field = btn.previousElementSibling;
      if (field && field.type === 'password') {
        field.type = 'text';
        btn.textContent = 'Hide';
      } else if (field) {
        field.type = 'password';
        btn.textContent = 'Show';
      }
    });
  });

  // Newsletter stub
  document.querySelectorAll('[data-newsletter]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (input && input.validity.valid) {
        form.reset();
        form.querySelector('.form-success')?.classList.add('visible');
      }
    });
  });

  // Maintenance countdown
  const countdown = document.querySelector('[data-countdown]');
  if (countdown) {
    const target = Date.now() + 1000 * 60 * 60 * 24 * 14; // 14 days
    const updateCountdown = () => {
      const diff = target - Date.now();
      if (diff <= 0) return;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
      const minutes = Math.floor(diff / (1000 * 60)) % 60;
      const seconds = Math.floor(diff / 1000) % 60;
      countdown.querySelector('[data-days]').textContent = days.toString().padStart(2, '0');
      countdown.querySelector('[data-hours]').textContent = hours.toString().padStart(2, '0');
      countdown.querySelector('[data-minutes]').textContent = minutes.toString().padStart(2, '0');
      countdown.querySelector('[data-seconds]').textContent = seconds.toString().padStart(2, '0');
    };
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  // Scroll to top button optional
  const topBtn = document.querySelector('[data-scroll-top]');
  if (topBtn) {
    window.addEventListener('scroll', () => {
      topBtn.classList.toggle('visible', window.scrollY > 400);
    });
    topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }
});
