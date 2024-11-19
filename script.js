// Function to create and manage sticky header for mobile
function createStickyHeader() {
    // Create sticky header element if it doesn't exist
    let stickyHeader = document.querySelector('.sticky-section-header');
    if (!stickyHeader) {
        stickyHeader = document.createElement('div');
        stickyHeader.className = 'sticky-section-header';
        document.body.appendChild(stickyHeader);
    }

    // Function to determine which section is currently in view
    function updateActiveSection() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const scrollPosition = window.scrollY;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Update nav links active state
                const correspondingLink = document.querySelector(`.nav-links a[href="#${section.id}"]`);
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }

                // Update sticky header for mobile
                if (window.innerWidth <= 480) {
                    const sectionTitle = section.querySelector('h2').textContent;
                    stickyHeader.innerHTML = `<h2>${sectionTitle}</h2>`;
                    
                    // Show sticky header only when scrolled past the header section
                    if (scrollPosition > 300) {
                        stickyHeader.classList.add('visible');
                    } else {
                        stickyHeader.classList.remove('visible');
                    }
                }
            }
        });
    }

    // Add scroll event listener
    window.addEventListener('scroll', updateActiveSection);
    
    // Add resize event listener to handle responsive changes
    window.addEventListener('resize', () => {
        if (window.innerWidth > 480) {
            stickyHeader.classList.remove('visible');
        }
    });

    // Run once on page load
    document.addEventListener('DOMContentLoaded', updateActiveSection);
}

// Initialize sticky header functionality
createStickyHeader();