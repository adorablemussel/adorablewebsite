document.getElementById('submit-password').addEventListener('click', function () {
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('password-error');

    fetch('/api/check-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            // Pobierz i wyświetl obrazy przez API
            const password = document.getElementById('password').value;
            const imageFilenames = [
                'elisajagodatransition.png',
                'finaldesign2.png',
                'elissadesign.png',
                'jagodadesign.png'
            ];
            const imageElements = document.querySelectorAll('.restricted .images img');
            imageFilenames.forEach((filename, idx) => {
                fetch('/api/restricted-image', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ password, filename })
                })
                .then(res => {
                    if (!res.ok) throw new Error();
                    return res.blob();
                })
                .then(blob => {
                    imageElements[idx].src = URL.createObjectURL(blob);
                })
                .catch(() => {
                    imageElements[idx].alt = 'Image unavailable';
                });
            });
            document.querySelector('.restricted').style.display = 'block';
            document.getElementById('password-form').style.display = 'none';
        } else {
            errorDiv.textContent = 'Incorrect password. Please try again.';
        }
    })
    .catch(() => {
        errorDiv.textContent = 'Server error. Please try again later.';
    });
});

document.getElementById('password').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        document.getElementById('submit-password').click();
    }
});