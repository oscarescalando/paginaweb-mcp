document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling para anclas
    const navLinks = document.querySelectorAll('nav ul li a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Considerar la altura del header fijo
                const headerOffset = 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                // Cerrar menú móvil si está abierto
                if (navUl.classList.contains('active')) {
                    navUl.classList.remove('active');
                    menuToggle.querySelector('i').classList.remove('fa-times');
                    menuToggle.querySelector('i').classList.add('fa-bars');
                }
            }
        });
    });

    // Menú hamburguesa para móvil
    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('nav ul');

    menuToggle.addEventListener('click', () => {
        navUl.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (navUl.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            menuToggle.setAttribute('aria-label', 'Cerrar menú');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            menuToggle.setAttribute('aria-label', 'Abrir menú');
        }
    });

    // Animación de entrada para secciones al hacer scroll
    const sections = document.querySelectorAll('.content-section, .hero-section');
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% de la sección visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // observer.unobserve(entry.target); // Opcional: dejar de observar una vez animado
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });


    // Active link highlighting on scroll (más avanzado)
    const contentSections = document.querySelectorAll('main section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        contentSections.forEach(section => {
            const sectionTop = section.offsetTop - 80; // Ajustar por header y un poco de margen
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current) && current !== '') {
                 link.classList.add('active');
            } else if (current === '' && link.getAttribute('href') === '#hero') { // Para cuando está al inicio
                link.classList.add('active');
            }
        });
         // Activar "Inicio" si no hay otra sección activa y estamos cerca del tope
        if (current === '' && pageYOffset < 200) {
             document.querySelector('nav ul li a[href="#hero"]').classList.add('active');
        }
    });
     // Activar "Inicio" al cargar la página
    if (window.pageYOffset < 200) {
        document.querySelector('nav ul li a[href="#hero"]').classList.add('active');
    }

});