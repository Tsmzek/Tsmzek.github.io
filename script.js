// Check if an element is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
}

function downloadResume() {
    // Path to the resume file
    const resumeUrl = 'RAHIM AJMAL IKHLAS_CV.pdf'; // Replace with the actual file path

    // Create a temporary anchor element
    const a = document.createElement('a');
    a.href = resumeUrl;
    a.download = 'RAHIM AJMAL IKHLAS_CV.pdf'; // Name of the downloaded file
    document.body.appendChild(a);

    // Trigger the download
    a.click();

    // Remove the temporary element
    document.body.removeChild(a);
}


// Animate skill bars
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-fill');
    skillBars.forEach((bar) => {
        if (isInViewport(bar)) {
            const targetWidth = bar.getAttribute('data-fill');
            bar.style.width = targetWidth;
        }
    });
}

// Animate timeline items
// Function to check if an element is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top < window.innerHeight &&
        rect.bottom > 0
    );
}

// Function to animate timeline items when they enter the viewport
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item) => {
        if (isInViewport(item)) {
            item.classList.add('visible'); // Add the visible class to trigger animation
        }
    });
}

// Trigger animation on scroll and page load
window.addEventListener('scroll', animateTimeline);
document.addEventListener('DOMContentLoaded', animateTimeline);

// Navbar fade-in/out on scroll
let lastScrollY = window.scrollY;
const navbar = document.querySelector('.styled-navbar');

if (navbar) {
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY + 5) {
            navbar.classList.add('hidden');
        } else if (currentScrollY < lastScrollY - 5) {
            navbar.classList.remove('hidden');
        }
        lastScrollY = currentScrollY;
    });
}

// Attach scroll listeners
window.addEventListener('scroll', () => {
    animateSkillBars();
    animateTimeline();
});

// Initial animations on page load
document.addEventListener('DOMContentLoaded', () => {
    animateSkillBars();
    animateTimeline();
});
