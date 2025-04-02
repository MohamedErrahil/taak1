const express = require('express');
const app = express();
const port = 3000;

// Statische bestanden serveren
app.use(express.static('public'));
app.use('/games_foto', express.static(__dirname + '/games_foto'));


// Data importeren
const games = require('./json-viewer/data/gameslijst.json');

// Route voor overzichtspagina
app.get('/games', (req, res) => {
    res.json(games);
});

app.get('/details/:id', (req, res) => {
    const gameId = req.params.id;
    const game = games.find(g => g.id === parseInt(gameId));
    if (game) {
        res.send(`
            <h1>${game.name}</h1>
            <p>Genre: ${game.category}</p>
            <p>Release Datum: ${game.releaseDate}</p>
            <p>Beschrijving: ${game.description}</p>
            <img src="${game.imageUrl}" alt="${game.name}" style="max-width: 100%;">
            <!-- Voeg meer details toe -->
        `);
    } else {
        res.status(404).send('Game not found');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});