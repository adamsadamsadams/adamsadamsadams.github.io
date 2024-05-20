document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Fetch form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Simple form validation
        if (name && email && message) {
            alert(`Thank you for your message, ${name}!`);
            form.reset();
        } else {
            alert('Please fill out all fields.');
        }
    });
});
