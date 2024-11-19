// Function to determine which section is currently in view
function updateActiveSection() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100; // Offset for better trigger point
        const sectionHeight = section.offsetHeight;
        const scrollPosition = window.scrollY;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            const correspondingLink = document.querySelector(`.nav-links a[href="#${section.id}"]`);
            
            // Remove active class from all links
            navLinks.forEach(link => link.classList.remove('active'));
            
            // Add active class to current section's link
            if (correspondingLink) {
                correspondingLink.classList.add('active');
            }
        }
    });
}

// Add scroll event listener
window.addEventListener('scroll', updateActiveSection);
// Run once on page load
document.addEventListener('DOMContentLoaded', updateActiveSection);