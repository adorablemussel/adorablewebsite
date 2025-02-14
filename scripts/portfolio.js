document.addEventListener("DOMContentLoaded", function() {
    console.log('DOM fully loaded and parsed');
    const portfolioSection = document.getElementById('portfolio');

    if (!portfolioSection) {
        console.error('Portfolio section not found');
        return;
    }

    const url = '/api/portfolio';
    console.log('Fetching data from URL:', url);

    fetch(url)
        .then(response => {
            console.log('Response status:', response.status);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched data:', data);
            if (!data.data || data.data.length === 0) {
                portfolioSection.innerHTML = '<p>No portfolio items found.</p>';
                return;
            }
            data.data.forEach(project => {
                const projectElement = document.createElement('div');
                projectElement.classList.add('portfolio-item');
                projectElement.innerHTML = `
                    <a href="${project.permalink}" target="_blank">
                        <img src="${project.cover.url}" alt="${project.title}">
                        <h3>${project.title}</h3>
                    </a>
                `;
                portfolioSection.appendChild(projectElement);
            });
        })
        .catch(error => {
            console.error('Error fetching portfolio data:', error);
            portfolioSection.innerHTML = `<p>Failed to load portfolio items. Error: ${error.message}</p>`;
        });
});
