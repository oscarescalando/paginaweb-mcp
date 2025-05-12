// Esperamos a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // Toggle del menú móvil
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
    
    // Cerrar menú al hacer clic en un enlace
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        });
    });
    
    // Demo interactiva CSS
    const demoButton = document.querySelector('.demo-button');
    const demoBox = document.querySelector('.demo-box');
    let isStyled = true;
    
    if (demoButton && demoBox) {
        demoButton.addEventListener('click', function() {
            if (isStyled) {
                demoBox.style.backgroundColor = '#ef4444';
                demoBox.style.transform = 'rotate(5deg) scale(1.1)';
                demoBox.style.borderRadius = '50%';
                demoBox.textContent = '¡Estilo cambiado!';
            } else {
                demoBox.style.backgroundColor = '';
                demoBox.style.transform = '';
                demoBox.style.borderRadius = '';
                demoBox.textContent = '¡Cambio con CSS!';
            }
            isStyled = !isStyled;
        });
    }
    
    // Demo API
    const apiButton = document.querySelector('.api-button');
    const apiResult = document.querySelector('.api-result');
    
    if (apiButton && apiResult) {
        apiButton.addEventListener('click', function() {
            // Simulamos una llamada a API
            apiButton.disabled = true;
            apiButton.textContent = 'Cargando...';
            apiResult.style.display = 'block';
            apiResult.textContent = 'Consultando API...';
            
            setTimeout(() => {
                const mockData = {
                    mensaje: 'Datos recibidos exitosamente',
                    usuarios: 3,
                    fecha: new Date().toLocaleDateString()
                };
                
                apiResult.textContent = JSON.stringify(mockData, null, 2);
                apiButton.disabled = false;
                apiButton.textContent = 'Obtener datos de API';
            }, 1500);
        });
    }
    
    // Cambio de vista de dispositivos
    const deviceButtons = document.querySelectorAll('.device-buttons button');
    const deviceScreen = document.querySelector('.device-screen');
    const deviceMockup = document.querySelector('.device-mockup');
    
    deviceButtons.forEach(button => {
        button.addEventListener('click', function() {
            const device = this.getAttribute('data-device');
            
            deviceButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            switch(device) {
                case 'mobile':
                    deviceMockup.style.maxWidth = '320px';
                    deviceScreen.innerHTML = '<p>Vista móvil</p><small>320px de ancho</small>';
                    break;
                case 'tablet':
                    deviceMockup.style.maxWidth = '768px';
                    deviceScreen.innerHTML = '<p>Vista tablet</p><small>768px de ancho</small>';
                    break;
                case 'desktop':
                    deviceMockup.style.maxWidth = '100%';
                    deviceScreen.innerHTML = '<p>Vista escritorio</p><small>1200px de ancho</small>';
                    break;
            }
        });
    });
    
    // Animación de scroll suave mejorada
    const smoothScroll = () => {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const headerOffset = 80;
                    const elementPosition = targetSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };
    
    smoothScroll();
    
    // Animación de aparición en scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observamos las secciones
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Clase para hacer visible
    const style = document.createElement('style');
    style.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
    document.head.appendChild(style);
    
    // Animación de código en el hero
    const codeAnimation = () => {
        const codeLines = [
            '&lt;html&gt;',
            '  &lt;head&gt;',
            '    &lt;title&gt;Mi Web&lt;/title&gt;',
            '  &lt;/head&gt;',
            '  &lt;body&gt;',
            '    &lt;h1&gt;¡Hola Mundo!&lt;/h1&gt;',
            '  &lt;/body&gt;',
            '&lt;/html&gt;'
        ];
        
        const codeContent = document.querySelector('.code-content pre code');
        if (codeContent) {
            let currentLine = 0;
            codeContent.innerHTML = '';
            
            const typeWriter = () => {
                if (currentLine < codeLines.length) {
                    codeContent.innerHTML += codeLines[currentLine] + (currentLine < codeLines.length - 1 ? '\n' : '');
                    currentLine++;
                    setTimeout(typeWriter, 300);
                }
            };
            
            typeWriter();
        }
    };
    
    // Activar animación de código cuando sea visible
    const codeWindow = document.querySelector('.code-window');
    if (codeWindow) {
        const codeObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    codeAnimation();
                    codeObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        codeObserver.observe(codeWindow);
    }
    
    // Contador de estadísticas animado
    const animateCounter = (element, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.innerText = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };
    
    // Ejemplo de uso del contador (puedes agregarlo a cualquier elemento con la clase .counter)
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(counter.getAttribute('data-target'));
                    animateCounter(counter, 0, target, 2000);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
    
    // Tooltips dinámicos
    const createTooltip = (element, text) => {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = text;
        tooltip.style.cssText = `
            position: absolute;
            background-color: #1f2937;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 0.25rem;
            font-size: 0.875rem;
            opacity: 0;
            transition: opacity 0.3s;
            pointer-events: none;
            z-index: 1000;
        `;
        
        element.addEventListener('mouseenter', (e) => {
            document.body.appendChild(tooltip);
            const rect = element.getBoundingClientRect();
            tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
            tooltip.style.opacity = '1';
        });
        
        element.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
            setTimeout(() => {
                if (tooltip.parentNode) {
                    tooltip.parentNode.removeChild(tooltip);
                }
            }, 300);
        });
    };
    
    // Añadir tooltips a elementos específicos
    const elementsWithTooltips = document.querySelectorAll('[data-tooltip]');
    elementsWithTooltips.forEach(element => {
        const tooltipText = element.getAttribute('data-tooltip');
        createTooltip(element, tooltipText);
    });
    
    // Función para copiar código
    const addCopyButton = () => {
        const codeExamples = document.querySelectorAll('.code-example');
        
        codeExamples.forEach(example => {
            const copyButton = document.createElement('button');
            copyButton.innerHTML = '<i class="fas fa-copy"></i>';
            copyButton.className = 'copy-button';
            copyButton.style.cssText = `
                position: absolute;
                top: 0.5rem;
                right: 0.5rem;
                background-color: transparent;
                color: white;
                border: 1px solid rgba(255, 255, 255, 0.3);
                padding: 0.5rem;
                border-radius: 0.25rem;
                cursor: pointer;
                opacity: 0;
                transition: opacity 0.3s;
            `;
            
            example.style.position = 'relative';
            example.appendChild(copyButton);
            
            example.addEventListener('mouseenter', () => {
                copyButton.style.opacity = '1';
            });
            
            example.addEventListener('mouseleave', () => {
                copyButton.style.opacity = '0';
            });
            
            copyButton.addEventListener('click', () => {
                const code = example.querySelector('pre code').textContent;
                navigator.clipboard.writeText(code).then(() => {
                    copyButton.innerHTML = '<i class="fas fa-check"></i>';
                    setTimeout(() => {
                        copyButton.innerHTML = '<i class="fas fa-copy"></i>';
                    }, 2000);
                });
            });
        });
    };
    
    addCopyButton();
    
    // Navegación activa según scroll
    const updateActiveNavigation = () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= (sectionTop - 100)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    };
    
    updateActiveNavigation();
    
    // Agregar estilos para navegación activa
    const activeNavStyle = document.createElement('style');
    activeNavStyle.textContent = `
        .nav-links a.active {
            color: #2563eb;
            position: relative;
        }
        .nav-links a.active::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            right: 0;
            height: 2px;
            background-color: #2563eb;
        }
    `;
    document.head.appendChild(activeNavStyle);
    
    // Efecto parallax para el hero
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // Inicializar todo cuando el DOM esté listo
    console.log('Página web educativa cargada correctamente');
});
