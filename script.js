// Function to create and manage sticky header for mobile
function createStickyHeader() {
    // Create sticky header element if it doesn't exist
    let stickyHeader = document.querySelector('.sticky-section-header');
    if (!stickyHeader) {
        stickyHeader = document.createElement('div');
        stickyHeader.className = 'sticky-section-header';
        // Create inner container to match main layout
        stickyHeader.innerHTML = '<div class="container"><h2></h2></div>';
        document.body.appendChild(stickyHeader);
    }

    function updateActiveSection() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionHeader = section.querySelector('h2');
            
            if (scrollPosition >= sectionTop - 50 && 
                scrollPosition < sectionTop + sectionHeight) {
                
                if (window.innerWidth <= 480) {
                    // Get section title and update sticky header
                    const sectionTitle = sectionHeader.textContent;
                    stickyHeader.querySelector('h2').textContent = sectionTitle;
                    
                    // Show sticky header only when section header is about to be scrolled out
                    const headerPosition = sectionHeader.getBoundingClientRect().top;
                    if (headerPosition < 50) {
                        stickyHeader.classList.add('visible');
                        sectionHeader.classList.add('hidden');
                    } else {
                        stickyHeader.classList.remove('visible');
                        sectionHeader.classList.remove('hidden');
                    }
                }
            }
        });
    }

    // Add scroll event listener with throttling
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateActiveSection();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Handle resize events
    window.addEventListener('resize', () => {
        if (window.innerWidth > 480) {
            stickyHeader.classList.remove('visible');
            document.querySelectorAll('section h2').forEach(header => {
                header.classList.remove('hidden');
            });
        }
    });

    // Initial check
    updateActiveSection();
}

// Initialize sticky header functionality
createStickyHeader();