/* ============================================================
   SIDDHARTH SOMISETTY — Portfolio
   JavaScript: Scroll animations, counters, nav effects, mobile menu
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Scroll-triggered Reveal Animations ----------
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));


  // ---------- Animated Counters ----------
  const counters = document.querySelectorAll('.counter');
  let countersAnimated = false;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersAnimated) {
        countersAnimated = true;
        animateCounters();
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  if (counters.length > 0) {
    counterObserver.observe(counters[0].closest('.stats-grid'));
  }

  function animateCounters() {
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = 1800;
      const start = performance.now();

      function update(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * target);

        counter.textContent = current;

        if (progress < 1) {
          requestAnimationFrame(update);
        }
      }

      requestAnimationFrame(update);
    });
  }


  // ---------- Navbar Scroll Effect ----------
  const nav = document.getElementById('nav');
  const hero = document.getElementById('hero');
  let lastScrollY = 0;

  function handleNavScroll() {
    const scrollY = window.scrollY;

    if (scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    lastScrollY = scrollY;
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // Initialize


  // ---------- Active Nav Link Highlighting ----------
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link:not(.nav-cta)');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '-80px 0px -50% 0px'
  });

  sections.forEach(section => sectionObserver.observe(section));


  // ---------- Smooth Scroll for Anchor Links ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 70;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });

        // Close mobile menu if open
        closeMobileMenu();
      }
    });
  });


  // ---------- Mobile Menu ----------
  const navToggle = document.getElementById('navToggle');
  const navLinksContainer = document.getElementById('navLinks');
  const navOverlay = document.getElementById('navOverlay');

  function openMobileMenu() {
    navToggle.classList.add('active');
    navLinksContainer.classList.add('open');
    navOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    navToggle.classList.remove('active');
    navLinksContainer.classList.remove('open');
    navOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  navToggle.addEventListener('click', () => {
    if (navLinksContainer.classList.contains('open')) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  navOverlay.addEventListener('click', closeMobileMenu);


  // ---------- Experience "Show More" Toggle ----------
  document.querySelectorAll('.timeline-achievements-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const list = document.getElementById(targetId);
      const hiddenItems = list.querySelectorAll('.hidden-achievement');
      const isExpanded = btn.classList.contains('expanded');

      if (isExpanded) {
        // Collapse
        hiddenItems.forEach((item, i) => {
          item.classList.remove('show');
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        });
        btn.classList.remove('expanded');
        btn.childNodes[0].textContent = 'Show more ';
      } else {
        // Expand
        hiddenItems.forEach((item, i) => {
          item.style.display = 'list-item';
          // Stagger animation
          setTimeout(() => {
            item.classList.add('show');
          }, i * 60);
        });
        btn.classList.add('expanded');
        btn.childNodes[0].textContent = 'Show less ';
      }
    });
  });


  // ---------- Keyboard Navigation ----------
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileMenu();
    }
  });

});
