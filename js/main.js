
    // Activate all tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    [...tooltipTriggerList].forEach(el => new bootstrap.Tooltip(el));

    // Activate all popovers
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    [...popoverTriggerList].forEach(el => new bootstrap.Popover(el));

    // Toast trigger
    const toastBtn = document.getElementById('showToastBtn');
    const myToastEl = document.getElementById('myToast');
    if (toastBtn && myToastEl) {
      const bsToast = new bootstrap.Toast(myToastEl);
      toastBtn.addEventListener('click', () => bsToast.show());
    }

    // Smooth scrolling when clicking sidebar links (keeps focus)
    document.querySelectorAll('.sidebar a[href^="#"]').forEach(a=>{
      a.addEventListener('click', function(e){
        e.preventDefault();
        const id = this.getAttribute('href').slice(1);
        const target = document.getElementById(id);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // update active state in sidebar
          document.querySelectorAll('.sidebar .list-group a').forEach(x=>x.classList.remove('active'));
          this.classList.add('active');
        }
      });
    });

    // Optional: highlight currently visible section in sidebar while scrolling
    const sections = document.querySelectorAll('main .section[id]');
    const observer = new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        const id = entry.target.id;
        const link = document.querySelector('.sidebar a[href="#' + id + '"]');
        if (entry.isIntersecting) {
          document.querySelectorAll('.sidebar .list-group a').forEach(x=>x.classList.remove('active'));
          if (link) link.classList.add('active');
        }
      });
    }, { root: null, threshold: 0.45 });

    sections.forEach(sec => observer.observe(sec));