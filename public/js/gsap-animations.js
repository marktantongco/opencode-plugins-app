// GSAP Animations for OpenCode Plugins Editorial Layout
// Using gsap.context() for proper cleanup and prefers-reduced-motion support

document.addEventListener('DOMContentLoaded', () => {
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    // Set all elements to visible without animation
    gsap.set(['#hero-title', '#hero-subtitle', '#hero-stats', '.plugin-card', '.section-reveal'], {
      autoAlpha: 1,
      y: 0,
      scale: 1
    });
    return;
  }
  
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin);
  
  // Create main animation context
  const ctx = gsap.context(() => {
    
    // ===== HERO ANIMATIONS =====
    const heroTl = gsap.timeline({ defaults: { ease: 'power2.out' } });
    
    // Hero title animation - split and reveal
    heroTl.from('#hero-title', {
      y: 60,
      opacity: 0,
      duration: 1,
      scale: 0.95
    })
    .from('#hero-subtitle', {
      y: 30,
      opacity: 0,
      duration: 0.8
    }, '-=0.5')
    .from('#hero-stats > div', {
      y: 20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6
    }, '-=0.4')
    .from('nav a', {
      y: -10,
      opacity: 0,
      stagger: 0.05,
      duration: 0.4
    }, '-=0.6');
    
    // ===== STATS COUNTER ANIMATION =====
    const statsValues = document.querySelectorAll('.stat-value[data-count]');
    statsValues.forEach(stat => {
      const target = parseInt(stat.dataset.count, 10);
      gsap.fromTo(stat, 
        { textContent: 0 },
        {
          textContent: target,
          duration: 2,
          ease: 'power1.out',
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: '#hero-stats',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });
    
    // ===== NAVBAR SCROLL EFFECT =====
    ScrollTrigger.create({
      start: 'top -80',
      end: 99999,
      onUpdate: (self) => {
        const navbar = document.getElementById('navbar');
        if (self.direction === 1 && self.scroll() > 80) {
          navbar.classList.add('bg-dark-900/90', 'backdrop-blur-lg', 'shadow-lg');
        } else if (self.scroll() < 80) {
          navbar.classList.remove('bg-dark-900/90', 'backdrop-blur-lg', 'shadow-lg');
        }
      }
    });
    
    // ===== PLUGIN CARDS STAGGER ANIMATION =====
    gsap.from('.plugin-card', {
      scrollTrigger: {
        trigger: '#plugins-grid',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      y: 60,
      opacity: 0,
      scale: 0.9,
      duration: 0.8,
      stagger: 0.1,
      ease: 'back.out(1.2)'
    });
    
    // ===== SECTION REVEAL ANIMATIONS =====
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      if (section.id === 'top') return; // Skip hero
      
      gsap.from(section.querySelectorAll('h2, p'), {
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        },
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out'
      });
    });
    
    // ===== ECOSYSTEM CARDS =====
    gsap.from('#ecosystem .plugin-card', {
      scrollTrigger: {
        trigger: '#ecosystem',
        start: 'top 75%'
      },
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out'
    });
    
    // ===== FOOTER =====
    gsap.from('footer', {
      scrollTrigger: {
        trigger: 'footer',
        start: 'top 90%'
      },
      y: 30,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out'
    });
    
    // ===== PARALLAX EFFECT ON HERO =====
    gsap.to('.hero-gradient', {
      scrollTrigger: {
        trigger: '#top',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      },
      y: 100,
      ease: 'none'
    });
    
  }); // End gsap.context
  
  // Expose for cleanup if needed
  window.gsapCtx = ctx;
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: target, offsetY: 80 },
        ease: 'power2.inOut'
      });
    }
  });
});
