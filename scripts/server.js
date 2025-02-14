const express = require('express');
const fetch = require('node-fetch'); // Poprawny import node-fetch
const path = require('path');
const app = express();
const port = 3000;

// Serwowanie plików statycznych z katalogu głównego projektu
app.use(express.static(path.join(__dirname, '../')));

// Trasa dla strony głównej
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/portfolio.html'));
});

app.get('/api/portfolio', async (req, res) => {
    try {
        console.log('Fetching data from ArtStation...');
        const response = await fetch('https://api.codetabs.com/v1/proxy?quest=' + encodeURIComponent('https://www.artstation.com/users/adorablemussel/projects.json'));
        console.log('Response status:', response.status);
        const artStationData = await response.json();
        res.json(artStationData);
    } catch (error) {
        console.error('Error fetching portfolio data:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
