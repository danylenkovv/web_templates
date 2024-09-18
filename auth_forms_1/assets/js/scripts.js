document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.nav-links a');
    const currentPage = window.location.pathname;

    links.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        link.classList.toggle('active', linkPath === currentPage);
        link.classList.toggle('inactive', linkPath !== currentPage);
    });

    document.querySelectorAll('.password-toggle').forEach(toggle => {
        toggle.addEventListener('click', () => {
            const passwordInput = toggle.previousElementSibling;
            const isPassword = passwordInput.type === 'password';
            passwordInput.type = isPassword ? 'text' : 'password';
            toggle.classList.toggle('fa-eye', isPassword);
            toggle.classList.toggle('fa-eye-slash', !isPassword);
        });
    });
});



