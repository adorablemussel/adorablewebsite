document.getElementById('submit-password').addEventListener('click', function () {
    const password = document.getElementById('password').value;
    const correctPassword = 'adorableConcept';

    if (password === correctPassword) {
        document.querySelector('.restricted').style.display = 'block';
        document.getElementById('password-form').style.display = 'none';
    } else {
        alert('Incorrect password. Please try again.');
    }
});