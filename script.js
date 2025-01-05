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
        // Only proceed if we're on mobile
        if (window.innerWidth > 480) return;

        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY;
        const scrollThreshold = 50; // Distance from top to trigger header changes

        // Reset sticky header if we're at the very top of the page
        if (scrollPosition <= scrollThreshold) {
            stickyHeader.classList.remove('visible');
            document.querySelectorAll('section h2').forEach(header => {
                header.classList.remove('hidden');
            });
            return;
        }

        let activeSection = null;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionHeader = section.querySelector('h2');
            
            if (scrollPosition >= sectionTop - scrollThreshold && 
                scrollPosition < sectionTop + sectionHeight - scrollThreshold) {
                activeSection = section;
            }
        });

        // Update sticky header based on active section
        if (activeSection) {
            const sectionHeader = activeSection.querySelector('h2');
            const headerPosition = sectionHeader.getBoundingClientRect().top;
            
            if (headerPosition < scrollThreshold) {
                stickyHeader.querySelector('h2').textContent = sectionHeader.textContent;
                stickyHeader.classList.add('visible');
                sectionHeader.classList.add('hidden');
            } else {
                stickyHeader.classList.remove('visible');
                sectionHeader.classList.remove('hidden');
            }
        } else {
            // No active section found, hide sticky header
            stickyHeader.classList.remove('visible');
            document.querySelectorAll('section h2').forEach(header => {
                header.classList.remove('hidden');
            });
        }
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

document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const projectGrids = document.querySelectorAll('.projects-grid');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and grids
            tabButtons.forEach(btn => btn.classList.remove('active'));
            projectGrids.forEach(grid => grid.classList.remove('active'));

            // Add active class to clicked button and corresponding grid
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(`${tabId}-projects`).classList.add('active');
        });
    });
});