document.addEventListener('DOMContentLoaded', () => {
  // Accordion functionality
  const accButtons = document.querySelectorAll('.accordion-btn');
  accButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      content.style.display = content.style.display === 'block' ? 'none' : 'block';
    });
  });

  // Contact form submission
  const contactForm = document.getElementById('contact-form');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Message sent! We’ll get back to you soon.');
    contactForm.reset();
  });

  // Placeholder for downloadable guide
  document.getElementById('download-guide').addEventListener('click', (e) => {
    e.preventDefault();
    alert('Download feature coming soon!');
  });
});