document.getElementById('submit-password').addEventListener('click', function () {
    const password = document.getElementById('password').value;
    const correctPassword = 'adorableConcept';
    const errorDiv = document.getElementById('password-error');

    if (password === correctPassword) {
        document.querySelector('.restricted').style.display = 'block';
        document.getElementById('password-form').style.display = 'none';
    } else {
        errorDiv.textContent = 'Incorrect password. Please try again.';
    }
});

document.getElementById('password').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        document.getElementById('submit-password').click();
    }
});