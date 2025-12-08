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
    // 3. Initialize Service Area Map
    initMap();

    function initMap() {
        const mapDiv = document.getElementById('map');
        if (!mapDiv) return;

        // Coordinates: Centered between Auburn (Placer) and Placerville (El Dorado)
        const centerParams = [38.9, -121.0];
        const map = L.map('map').setView(centerParams, 8); // Zoom 8 shows the region

        // Add OSM Tiles
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        // Approximate Service Area Polygon (Placer, Nevada, El Dorado, Sacramento)
        // Adjust these coords for better precision if needed
        const serviceAreaCoords = [
            [39.55, -120.0], // NE Corner (near Nevada/Placer/Tahoe)
            [38.60, -119.8], // SE Corner (Tahoe South / El Dorado)
            [38.20, -121.3], // South (Sacramento / Elk Grove)
            [38.60, -121.6], // West (Sacramento / Airport)
            [39.30, -121.3], // NW (Nevada City / Grass Valley area)
            [39.55, -120.0]  // Close loop
        ];

        const polygon = L.polygon(serviceAreaCoords, {
            color: 'var(--pico-primary)',
            fillColor: 'var(--pico-primary)',
            fillOpacity: 0.2
        }).addTo(map);

        // Optional: Simple popup
        polygon.bindPopup("<b>Service Area</b><br>Placer, Nevada, El Dorado, Sacramento").openPopup();
    }
});