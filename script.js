// Initialize particles for landing page background
function initParticlesBackground() {
    const particlesContainer = document.getElementById('particles-container');
    
    if (particlesContainer) {
        // Clear any existing particles
        particlesContainer.innerHTML = '';
        
        // Create particles
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random position
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            
            // Random size
            const size = Math.random() * 5 + 2;
            
            // Random opacity
            const opacity = Math.random() * 0.5 + 0.1;
            
            // Random animation duration
            const duration = Math.random() * 20 + 10;
            
            // Set styles
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.opacity = opacity;
            particle.style.animationDuration = `${duration}s`;
            
            // Add to container
            particlesContainer.appendChild(particle);
        }
    }
}

// Function to handle loading screen
function initLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    
    if (loadingScreen) {
        // Add a staggered animation effect to the letters
        const letters = document.querySelectorAll('.animated-logo .letter');
        
        // Initial animation for letters
        gsap.from(letters, {
            y: -50,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "back.out(1.7)",
            onComplete: function() {
                // Add a pulse effect after the initial animation
                gsap.to(letters, {
                    scale: 1.1,
                    stagger: 0.05,
                    duration: 0.3,
                    repeat: 1,
                    yoyo: true,
                    ease: "power1.inOut"
                });
            }
        });
        
        // Special animation for the name part (DILIP)
        const specialLetters = document.querySelectorAll('.animated-logo .special-letter');
        gsap.to(specialLetters, {
            color: "var(--primary)",
            textShadow: "0 0 20px rgba(var(--primary-rgb), 0.8)",
            stagger: 0.2,
            duration: 0.8,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut"
        });

        // Force hide loading screen after a short delay
        setTimeout(function() {
            loadingScreen.classList.add('loaded');
            document.body.style.overflow = 'visible';
            
            // Refresh ScrollTrigger after loading screen is hidden
            if (typeof ScrollTrigger !== 'undefined') {
                ScrollTrigger.refresh();
            }
        }, 3000); // Show loading animation for 3 seconds
    }
}

// Function to initialize mobile menu toggle
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', function() {
            // Toggle active class on menu button
            this.classList.toggle('active');
            
            // Toggle mobile nav
            mobileNav.classList.toggle('active');
            
            // Toggle body class to prevent scrolling when menu is open
            document.body.classList.toggle('nav-open');
        });
    }
}

// Main initialization function
document.addEventListener('DOMContentLoaded', function() {
    // Initialize loading screen (and hide it)
    initLoadingScreen();
    
    // Initialize particles background
    initParticlesBackground();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize custom cursor
    initCustomCursor();
    
    // Initialize GSAP animations
    initGSAPAnimations();
    
    // Initialize smooth scrolling for navigation links
    initSmoothScrolling();
    
    // Initialize work filters
    initWorkFilters();
    
    // Initialize email copy functionality
    initEmailCopy();
    
    // Initialize footer date and time
    initFooterDateTime();
    
    // Fix contact section visibility
    fixContactSectionVisibility();
    
    // Fix project visibility
    fixProjectVisibility();
    
    // Fix work section layout
    fixWorkSectionLayout();
    
    // Add scroll event listener to ensure elements remain visible
    window.addEventListener('scroll', function() {
        fixProjectVisibility();
        fixContactSectionVisibility();
        fixWorkSectionLayout();
    });
    
    // Add a small delay to ensure everything is visible after animations
    setTimeout(function() {
        fixProjectVisibility();
        fixContactSectionVisibility();
        fixWorkSectionLayout();
        
        // Hide loading screen again (just to be sure)
        const loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('loaded');
            document.body.style.overflow = 'visible';
        }
    }, 1000);
});

// Custom Cursor
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    
    if (cursor) {
        // Create cursor follower element
        const follower = document.createElement('div');
        follower.className = 'cursor-follower';
        document.body.appendChild(follower);
        
        // Variables for cursor animation
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;
        let followerX = 0;
        let followerY = 0;
        let speed = 0.2; // Cursor speed
        let followerSpeed = 0.1; // Follower speed
        
        // Update cursor position on mouse move
        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Show cursor when mouse moves
            cursor.classList.add('active');
            follower.classList.add('active');
        });
        
        // Hide cursor when mouse leaves window
        document.addEventListener('mouseleave', function() {
            cursor.classList.remove('active');
            follower.classList.remove('active');
        });
        
        // Add hover effect for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .bento-item, .skill-icon-wrapper, .project-item, .social-item, .gradient-btn');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', function() {
                cursor.classList.add('hover');
                follower.classList.add('hover');
            });
            
            el.addEventListener('mouseleave', function() {
                cursor.classList.remove('hover');
                follower.classList.remove('hover');
            });
        });
        
        // Animate cursor with requestAnimationFrame for smooth movement
        function animateCursor() {
            // Calculate cursor position with easing
            cursorX += (mouseX - cursorX) * speed;
            cursorY += (mouseY - cursorY) * speed;
            
            // Calculate follower position with easing (slower than cursor)
            followerX += (mouseX - followerX) * followerSpeed;
            followerY += (mouseY - followerY) * followerSpeed;
            
            // Apply positions
            cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
            follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
            
            // Continue animation loop
            requestAnimationFrame(animateCursor);
        }
        
        // Start animation
        animateCursor();
    }
}

// GSAP ScrollTrigger Animations
function initGSAPAnimations() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    
    // Get project items once for use in multiple functions
    const projectItems = document.querySelectorAll('.project-item');
    
    // Hero section animations
    const heroText = document.querySelectorAll('.hero-text .animate-text');
    gsap.set(heroText, { y: 50, opacity: 0 });
    
    const heroTl = gsap.timeline();
    heroTl.to(heroText, {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out"
    });
    
    // Typing effect for hero section
    initTypingEffect();
    
    // Scroll down animation
    initScrollDownAnimation();
    
    // About section animations with improved ScrollTrigger
    gsap.utils.toArray('.bento-item').forEach((item, index) => {
        gsap.from(item, {
            y: 50,
            opacity: 0,
            duration: 1,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: item,
                start: "top 80%",
                end: "top 30%",
                toggleActions: "play none none reverse",
                markers: false,
                id: `about-item-${index}`
            }
        });
    });
    
    // Add specific animations for about text elements
    if (document.querySelector('.about-text')) {
        const aboutTextTl = gsap.timeline({
            scrollTrigger: {
                trigger: '.about-text',
                start: "top 75%",
                end: "top 25%",
                toggleActions: "play none none reverse",
                markers: false,
                id: "about-text-animation"
            }
        });
        
        aboutTextTl
            .from('.about-text h3', {
                x: -50,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            })
            .from('.about-text h3::after', {
                width: 0,
                duration: 0.6,
                ease: "power3.inOut"
            }, "-=0.4")
            .from('.about-text p', {
                y: 30,
                opacity: 0,
                stagger: 0.2,
                duration: 0.8,
                ease: "power3.out"
            }, "-=0.4");
    }
    
    // Work section animations with improved ScrollTrigger
    projectItems.forEach((item, index) => {
        gsap.from(item, {
            y: 50,
            opacity: 0,
            scale: 0.95,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: item,
                start: "top 85%",
                end: "top 35%",
                toggleActions: "play none none reverse",
                markers: false,
                id: `project-item-${index}`
            }
        });
    });
    
    // Skills section animations with improved ScrollTrigger
    gsap.utils.toArray('.skill-icon-wrapper').forEach((item, index) => {
        gsap.from(item, {
            y: 30,
            opacity: 0,
            scale: 0.8,
            duration: 0.6,
            delay: index * 0.05,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: '.skills-container',
                start: "top 80%",
                end: "top 30%",
                toggleActions: "play none none reverse",
                markers: false,
                id: "skills-animation"
            }
        });
    });
    
    // Contact section animations with improved ScrollTrigger
    gsap.utils.toArray('.contact-bento > *').forEach((item, index) => {
        gsap.from(item, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: item,
                start: "top 85%",
                end: "top 35%",
                toggleActions: "play none none reverse",
                markers: false,
                id: `contact-item-${index}`
            }
        });
    });
    
    // Section titles animation
    gsap.utils.toArray('.section-title-container').forEach((item) => {
        const title = item.querySelector('.section-title');
        const line = item.querySelector('.section-line');
        
        const titleTl = gsap.timeline({
            scrollTrigger: {
                trigger: item,
                start: "top 80%",
                end: "top 50%",
                toggleActions: "play none none reverse",
                markers: false,
                id: "section-title-animation"
            }
        });
        
        titleTl.from(title, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        })
        .from(line, {
            width: 0,
            duration: 0.6,
            ease: "power3.inOut"
        }, "-=0.4");
    });
    
    // Navbar scroll effect
    ScrollTrigger.create({
        start: "top -80",
        end: 99999,
        toggleClass: {className: 'scrolled', targets: 'nav'}
    });
    
    // Parallax effect for hero section
    gsap.to('.hero-section::before', {
        backgroundPosition: '100% 100%',
        ease: "none",
        scrollTrigger: {
            trigger: '.hero-section',
            start: "top top",
            end: "bottom top",
            scrub: true,
            markers: false,
            id: "hero-parallax"
        }
    });
}

// Typing effect for hero section
function initTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const roles = ["Full Stack Developer", "UI/UX Designer", "Problem Solver", "Tech Enthusiast"];
        let currentRole = 0;
        let currentChar = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        function typeText() {
            const role = roles[currentRole];
            
            if (isDeleting) {
                typingElement.textContent = role.substring(0, currentChar - 1);
                currentChar--;
            } else {
                typingElement.textContent = role.substring(0, currentChar + 1);
                currentChar++;
            }
            
            // Adjust typing speed
            if (isDeleting) {
                typingSpeed = 50; // Faster when deleting
            } else {
                typingSpeed = 100; // Normal speed when typing
            }
            
            // Pause at the end of typing or deleting
            if (!isDeleting && currentChar === role.length) {
                typingSpeed = 1500; // Pause at the end
                isDeleting = true;
            } else if (isDeleting && currentChar === 0) {
                isDeleting = false;
                currentRole = (currentRole + 1) % roles.length; // Move to next role
                typingSpeed = 500; // Pause before starting new word
            }
            
            setTimeout(typeText, typingSpeed);
        }
        
        // Start typing animation
        setTimeout(typeText, 1000);
    }
}

// Scroll Down Animation
function initScrollDownAnimation() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const mouseWheel = document.querySelector('.wheel');
    
    if (scrollIndicator && mouseWheel) {
        // Animate the mouse wheel
        gsap.to(mouseWheel, {
            y: 10,
            repeat: -1,
            duration: 1.5,
            ease: "power2.inOut",
            yoyo: true
        });
        
        // Make the scroll indicator clickable
        scrollIndicator.addEventListener('click', function() {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: aboutSection,
                        offsetY: 80
                    },
                    ease: "power3.inOut"
                });
            }
        });
        
        // Hide scroll indicator when scrolled down
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollIndicator.classList.add('hidden');
            } else {
                scrollIndicator.classList.remove('hidden');
            }
        });
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Close mobile menu if open
                const mobileNav = document.querySelector('.mobile-nav');
                const menuToggle = document.querySelector('.menu-toggle');
                
                if (mobileNav && mobileNav.classList.contains('active')) {
                    mobileNav.classList.remove('active');
                    menuToggle.classList.remove('active');
                    document.body.classList.remove('nav-open');
                }
                
                // Scroll to section
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: targetSection,
                        offsetY: 80
                    },
                    ease: "power3.inOut"
                });
            }
        });
    });
}

// Function to initialize work filters
function initWorkFilters() {
    const workFilters = document.querySelectorAll('.work-filter');
    const projectItems = document.querySelectorAll('.project-item');
    
    if (workFilters.length > 0 && projectItems.length > 0) {
        // Set all filters and projects to be visible
        workFilters.forEach(filter => {
            filter.style.visibility = 'visible';
            filter.style.opacity = '1';
            filter.style.zIndex = '3';
        });
        
        projectItems.forEach(item => {
            item.style.visibility = 'visible';
            item.style.opacity = '1';
            item.style.zIndex = '2';
            item.style.display = 'flex';
        });
        
        // Add click event listeners to filters
        workFilters.forEach(filter => {
            filter.addEventListener('click', function() {
                // Remove active class from all filters
                workFilters.forEach(f => f.classList.remove('active'));
                
                // Add active class to clicked filter
                this.classList.add('active');
                
                const category = this.getAttribute('data-filter');
                
                // Filter projects
                projectItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');
                    
                    // Reset visibility first
                    item.style.visibility = 'visible';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                    item.style.display = 'flex';
                    
                    if (category === 'all' || category === itemCategory) {
                        // Show matching items with animation
                        gsap.to(item, {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            duration: 0.4,
                            ease: "power2.out",
                            clearProps: "visibility",
                            onStart: function() {
                                item.style.visibility = 'visible';
                                item.style.display = 'flex';
                            }
                        });
                    } else {
                        // Hide non-matching items with animation
                        gsap.to(item, {
                            opacity: 0,
                            y: 20,
                            scale: 0.95,
                            duration: 0.4,
                            ease: "power2.out",
                            onComplete: function() {
                                item.style.visibility = 'hidden';
                                item.style.display = 'none';
                            }
                        });
                    }
                });
            });
        });
    }
}

// Email Copy Functionality
function initEmailCopy() {
    const copyEmailBtn = document.getElementById('copy-email-btn');
    const emailDisplay = document.getElementById('email-display');
    const copyAlert = document.getElementById('copy-alert');
    
    if (copyEmailBtn && emailDisplay && copyAlert) {
        copyEmailBtn.addEventListener('click', function() {
            // Get the email value from the hidden input
            const emailValue = emailDisplay.value;
            
            // Copy the email to clipboard
            navigator.clipboard.writeText(emailValue)
                .then(() => {
                    // Show the alert
                    copyAlert.classList.add('show');
                    
                    // Add a subtle animation to the button
                    copyEmailBtn.classList.add('active');
                    setTimeout(() => {
                        copyEmailBtn.classList.remove('active');
                    }, 300);
                    
                    // Hide the alert after 3 seconds
                    setTimeout(() => {
                        copyAlert.classList.remove('show');
                    }, 3000);
                })
                .catch(err => {
                    console.error('Failed to copy: ', err);
                });
        });
    }
}

// Footer Date and Time Functionality
function initFooterDateTime() {
    // Update current year
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        const currentYear = new Date().getFullYear();
        currentYearElement.textContent = currentYear;
    }
    
    // Update footer time
    const footerTimeElement = document.getElementById('footer-time');
    
    if (footerTimeElement) {
        function updateFooterTime() {
            const now = new Date();
            const options = { 
                weekday: 'long',
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit', 
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            };
            footerTimeElement.textContent = now.toLocaleString('en-US', options);
        }
        
        // Update time immediately and then every second
        updateFooterTime();
        setInterval(updateFooterTime, 1000);
    }
}

// Function to ensure contact section elements are visible
function fixContactSectionVisibility() {
    // Get all elements in the contact section
    const contactSection = document.querySelector('.contact-section');
    
    if (contactSection) {
        // Make sure the contact section is visible
        contactSection.style.visibility = 'visible';
        contactSection.style.opacity = '1';
        contactSection.style.zIndex = '5';
        
        // Get all bento items in the contact section
        const bentoItems = contactSection.querySelectorAll('.bento-item');
        
        // Make sure all bento items are visible
        bentoItems.forEach(item => {
            item.style.visibility = 'visible';
            item.style.opacity = '1';
            item.style.zIndex = '6';
            
            // Get all buttons in the bento item
            const buttons = item.querySelectorAll('button, .gradient-btn, a');
            
            // Make sure all buttons are visible and clickable
            buttons.forEach(button => {
                button.style.visibility = 'visible';
                button.style.opacity = '1';
                button.style.zIndex = '7';
                button.style.pointerEvents = 'auto';
                
                // Ensure the button is clickable by adding a click event listener
                if (!button.hasAttribute('data-click-handler-added')) {
                    const originalOnClick = button.onclick;
                    
                    button.onclick = function(e) {
                        if (originalOnClick) {
                            originalOnClick.call(this, e);
                        }
                        
                        // If it's the email copy button
                        if (button.id === 'copy-email-btn') {
                            const emailDisplay = document.getElementById('email-display');
                            const copyAlert = document.getElementById('copy-alert');
                            
                            if (emailDisplay && copyAlert) {
                                // Copy the email to clipboard
                                navigator.clipboard.writeText(emailDisplay.value)
                                    .then(() => {
                                        // Show the alert
                                        copyAlert.style.visibility = 'visible';
                                        copyAlert.style.opacity = '1';
                                        copyAlert.style.zIndex = '10';
                                        copyAlert.style.position = 'absolute';
                                        copyAlert.style.bottom = '1.5rem';
                                        copyAlert.style.left = '50%';
                                        copyAlert.style.transform = 'translateX(-50%) translateY(100%)';
                                        copyAlert.classList.add('show');
                                        
                                        // Add a subtle animation to the button
                                        button.classList.add('active');
                                        setTimeout(() => {
                                            button.classList.remove('active');
                                        }, 300);
                                        
                                        // Hide the alert after 3 seconds
                                        setTimeout(() => {
                                            copyAlert.classList.remove('show');
                                        }, 3000);
                                    })
                                    .catch(err => {
                                        console.error('Failed to copy: ', err);
                                    });
                            }
                        }
                    };
                    
                    button.setAttribute('data-click-handler-added', 'true');
                }
            });
            
            // Get all headings and paragraphs
            const textElements = item.querySelectorAll('h3, p, span');
            
            // Make sure all text elements are visible
            textElements.forEach(element => {
                element.style.visibility = 'visible';
                element.style.opacity = '1';
            });
        });
        
        // Ensure the copy alert is properly styled
        const copyAlert = document.getElementById('copy-alert');
        if (copyAlert) {
            copyAlert.style.zIndex = '10';
            copyAlert.style.position = 'absolute';
            copyAlert.style.bottom = '1.5rem';
            copyAlert.style.left = '50%';
            copyAlert.style.transform = 'translateX(-50%) translateY(100%)';
        }
    }
}

// Function to ensure project items remain visible after scrolling
function fixProjectVisibility() {
    const projectItems = document.querySelectorAll('.project-item');
    
    if (projectItems.length > 0) {
        projectItems.forEach(item => {
            // Force visibility
            item.style.visibility = 'visible';
            item.style.opacity = '1';
            item.style.zIndex = '2';
            
            // Make sure border effect is visible
            const beforeElement = item.querySelector('::before');
            const afterElement = item.querySelector('::after');
            
            if (beforeElement) {
                beforeElement.style.visibility = 'visible';
                beforeElement.style.opacity = '1';
            }
            
            if (afterElement) {
                afterElement.style.visibility = 'visible';
                afterElement.style.opacity = '1';
            }
            
            // Make sure all child elements are visible
            const childElements = item.querySelectorAll('*');
            childElements.forEach(child => {
                child.style.visibility = 'visible';
                child.style.opacity = '1';
            });
        });
    }
}

// Function to ensure work section layout is perfect
function fixWorkSectionLayout() {
    // Get the work section
    const workSection = document.querySelector('.work-section');
    
    if (workSection) {
        // Make sure the work section is visible
        workSection.style.visibility = 'visible';
        workSection.style.opacity = '1';
        workSection.style.zIndex = '1';
        
        // Get the projects bento container
        const projectsBento = workSection.querySelector('.projects-bento');
        
        if (projectsBento) {
            // Make sure the projects bento is visible
            projectsBento.style.visibility = 'visible';
            projectsBento.style.opacity = '1';
            projectsBento.style.zIndex = '2';
            
            // Get all project items
            const projectItems = projectsBento.querySelectorAll('.project-item');
            
            // Make sure all project items are visible
            projectItems.forEach(item => {
                item.style.visibility = 'visible';
                item.style.opacity = '1';
                item.style.zIndex = '2';
                item.style.display = 'flex';
                
                // Get all elements inside the project item
                const projectElements = item.querySelectorAll('*');
                
                // Make sure all elements are visible
                projectElements.forEach(element => {
                    element.style.visibility = 'visible';
                    element.style.opacity = '1';
                });
            });
        }
        
        // Get the work filters
        const workFilters = workSection.querySelectorAll('.work-filter');
        
        // Make sure all work filters are visible
        workFilters.forEach(filter => {
            filter.style.visibility = 'visible';
            filter.style.opacity = '1';
            filter.style.zIndex = '3';
        });
        
        // Get the view more container
        const viewMoreContainer = workSection.querySelector('.view-more-container');
        
        if (viewMoreContainer) {
            // Make sure the view more container is visible
            viewMoreContainer.style.visibility = 'visible';
            viewMoreContainer.style.opacity = '1';
            viewMoreContainer.style.zIndex = '3';
            
            // Get the view more button
            const viewMoreBtn = viewMoreContainer.querySelector('.view-more-btn');
            
            if (viewMoreBtn) {
                // Make sure the view more button is visible
                viewMoreBtn.style.visibility = 'visible';
                viewMoreBtn.style.opacity = '1';
                viewMoreBtn.style.zIndex = '3';
            }
        }
    }
}

// Global failsafe to ensure the page doesn't get stuck in loading
(function() {
    // Try to hide loading screen immediately
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.add('loaded');
        document.body.style.overflow = 'visible';
    }
    
    // Also set a timeout as a backup
    setTimeout(function() {
        const loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('loaded');
            document.body.style.overflow = 'visible';
            console.log('Loading screen hidden by global failsafe');
        }
        
        // Refresh ScrollTrigger to ensure animations work correctly
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
            console.log('ScrollTrigger refreshed');
        }
    }, 1500);
    
    // Add a listener for the window load event
    window.addEventListener('load', function() {
        const loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('loaded');
            document.body.style.overflow = 'visible';
            console.log('Loading screen hidden by window load event');
        }
        
        // Refresh ScrollTrigger again after window load
        if (typeof ScrollTrigger !== 'undefined') {
            setTimeout(function() {
                ScrollTrigger.refresh();
                console.log('ScrollTrigger refreshed after window load');
            }, 500);
        }
    });
})();
