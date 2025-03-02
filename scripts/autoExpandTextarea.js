//AUTOMATICALLY EXPAND TEXTAREA ON CONTACT FORM

document.addEventListener('DOMContentLoaded', function() {
    const textareas = document.querySelectorAll('.contact-form textarea');
    textareas.forEach(textarea => {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    });
});
