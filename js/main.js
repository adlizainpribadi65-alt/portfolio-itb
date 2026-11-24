// main.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Ganti background navbar saat scroll
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Smooth Scrolling untuk link navigasi
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if(target) {
                // Untuk penyesuaian jika ada navbar fixed
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // 3. Simple Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if(hamburger) {
        hamburger.addEventListener('click', () => {
            // Animasi sangat sederhana untuk mengubah display navlinks
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '70px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'rgba(10, 10, 14, 0.95)';
                navLinks.style.padding = '2rem 0';
                navLinks.style.borderBottom = '1px solid rgba(255,255,255,0.05)';
            }
        });
    }

    // 4. Efek masuk untuk element yang di-scroll (Reveal Animation)
    const revealElements = document.querySelectorAll('.section-header, .about-text, .stat-card, .timeline-item, .project-card');
    
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                // Tambahkan class animasi sederhana dengan inline style
                entry.target.style.transition = 'all 0.8s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        // Inisialisasi posisi awal sebelum di reveal
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        revealOnScroll.observe(el);
    });
});
