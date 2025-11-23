// 1. Auto-Update Copyright Year
// This finds the element with id="year" and sets it to the current year (e.g., 2025)
document.addEventListener('DOMContentLoaded', () => {
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    console.log("Steinley Forestry Site Loaded Successfully");
});