document.addEventListener("DOMContentLoaded", function() {
    const correctPassword = "123";

    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault(); 
        
        const passwordInput = document.getElementById('password').value;
        const errorElement = document.getElementById('error');
        
        if (passwordInput === correctPassword) {
            window.location.href = 'admin_panel.html';
        } else {
            errorElement.style.display = 'block';
        }
    });
});