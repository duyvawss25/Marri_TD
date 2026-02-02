 window.addEventListener('load', function() {
            setTimeout(() => {
                document.getElementById('loadingScreen').classList.add('hidden');
            }, 1500);
        });

        // Hero Image Slideshow
        let currentSlide = 0;
        const slides = document.querySelectorAll('.hero-slide');
        const indicators = document.querySelectorAll('.indicator-dot');
        const slideInterval = 4000; // 4 seconds

        function showSlide(index) {
            // Remove active class from all slides and indicators
            slides.forEach(slide => slide.classList.remove('active'));
            indicators.forEach(indicator => indicator.classList.remove('active'));
            
            // Add active class to current slide and indicator
            slides[index].classList.add('active');
            indicators[index].classList.add('active');
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        // Auto-advance slideshow
        let slideshowTimer = setInterval(nextSlide, slideInterval);

        // Manual control via indicators
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
                // Reset the timer when manually changing slides
                clearInterval(slideshowTimer);
                slideshowTimer = setInterval(nextSlide, slideInterval);
            });
        });

        // Pause slideshow on hover (optional)
        const heroSection = document.querySelector('.hero');
        heroSection.addEventListener('mouseenter', () => {
            clearInterval(slideshowTimer);
        });
        heroSection.addEventListener('mouseleave', () => {
            slideshowTimer = setInterval(nextSlide, slideInterval);
        });

        // Countdown Timer
        function updateCountdown() {
            const weddingDate = new Date('2026-01-12T10:00:00').getTime();
            const now = new Date().getTime();
            const distance = weddingDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

            if (distance < 0) {
                document.getElementById('days').textContent = '00';
                document.getElementById('hours').textContent = '00';
                document.getElementById('minutes').textContent = '00';
                document.getElementById('seconds').textContent = '00';
            }
        }

        updateCountdown();
        setInterval(updateCountdown, 1000);

        // Form Submission
        document.getElementById('rsvpForm').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Cảm ơn bạn đã xác nhận tham dự! ❤️');
            this.reset();
        });

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all animated elements
        document.querySelectorAll('.gallery-card, .couple-card, .timeline-item, .love-story-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(el);
        });