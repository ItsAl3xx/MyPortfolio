// Sticky Header Management
// - Creates and manages a sticky header for mobile devices
// - Shows/hides section headers based on scroll position
// - Only active on screens smaller than 480px
function createStickyHeader() {
    // Initialize sticky header element
    // - Creates the header if it doesn't exist
    // - Adds necessary classes and structure
    let stickyHeader = document.querySelector('.sticky-section-header');
    if (!stickyHeader) {
        stickyHeader = document.createElement('div');
        stickyHeader.className = 'sticky-section-header';
        stickyHeader.innerHTML = '<div class="container"><h2></h2></div>';
        document.body.appendChild(stickyHeader);
    }

    // Update Active Section Function
    // - Determines which section is currently in view
    // - Updates sticky header text and visibility
    // - Handles showing/hiding original section headers
    function updateActiveSection() {
        // Exit if not on mobile (<480px)
        if (window.innerWidth > 480) return;

        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY;
        const scrollThreshold = 50; // Pixels from top to trigger header

        // Reset sticky header at page top
        // - Hides sticky header
        // - Shows all original section headers
        if (scrollPosition <= scrollThreshold) {
            stickyHeader.classList.remove('visible');
            document.querySelectorAll('section h2').forEach(header => {
                header.classList.remove('hidden');
            });
            return;
        }

        // Find active section based on scroll position
        // - Checks each section's position relative to viewport
        // - Determines which section is currently being viewed
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

        // Update header visibility and content
        // - Shows/hides sticky header based on scroll position
        // - Updates sticky header text to match current section
        // - Handles original section header visibility
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
            // No active section in view
            // - Hides sticky header
            // - Shows all original section headers
            stickyHeader.classList.remove('visible');
            document.querySelectorAll('section h2').forEach(header => {
                header.classList.remove('hidden');
            });
        }
    }

    // Scroll Event Handler
    // - Uses requestAnimationFrame for performance
    // - Prevents multiple rapid updates
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

    // Resize Event Handler
    // - Resets header state on desktop
    // - Shows all original headers
    window.addEventListener('resize', () => {
        if (window.innerWidth > 480) {
            stickyHeader.classList.remove('visible');
            document.querySelectorAll('section h2').forEach(header => {
                header.classList.remove('hidden');
            });
        }
    });

    // Initial state check
    updateActiveSection();
}

// Initialize sticky header
createStickyHeader();

// Project Tab Navigation
// - Handles switching between project categories
// - Updates active states for buttons and grids
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const projectGrids = document.querySelectorAll('.projects-grid');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active states
            tabButtons.forEach(btn => btn.classList.remove('active'));
            projectGrids.forEach(grid => grid.classList.remove('active'));

            // Set new active states
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(`${tabId}-projects`).classList.add('active');
        });
    });
});