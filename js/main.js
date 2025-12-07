// 1. Auto-Update Copyright Year
document.addEventListener('DOMContentLoaded', () => {
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    console.log("Steinley Forestry Site Loaded Successfully");

    // 2. Handle Contact Form Submission (Cloudflare Pages)
    const contactForm = document.getElementById('contactForm');
    const statusDiv = document.getElementById('form-status');
    const submitBtn = document.getElementById('submitBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent page reload

            // Disable button and show loading state
            submitBtn.setAttribute('aria-busy', 'true');
            submitBtn.textContent = 'Sending...';
            statusDiv.style.display = 'none';

            // Gather data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            try {
                // Post to the Cloudflare Function endpoint
                const response = await fetch('/api/submit', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    statusDiv.innerHTML = '<article class="pico-background-jade-100" style="color:var(--pico-primary)">✅ Message sent successfully! We will be in touch shortly.</article>';
                    contactForm.reset();
                } else {
                    throw new Error('Server responded with error');
                }
            } catch (error) {
                console.error('Error:', error);
                statusDiv.innerHTML = '<article class="pico-background-red-100" style="color:var(--pico-color-red-600)">❌ Failed to send message. Please try emailing us directly.</article>';
            } finally {
                // Reset button state
                submitBtn.setAttribute('aria-busy', 'false');
                submitBtn.textContent = 'Send Message';
                statusDiv.style.display = 'block';
            }
        });
    }
});