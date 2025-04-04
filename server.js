const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// Configuratie
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/games_foto', express.static(path.join(__dirname, 'games_foto')));

// Routes
app.get('/test', (req, res) => {
  res.send('Server basiswerking OK!');
});

app.get('/', (req, res) => {
  res.redirect('/games');
});

app.get('/games', (req, res) => {
  try {
    const gamesData = fs.readFileSync(
      path.join(__dirname, 'json-viewer', 'data', 'gameslijst.json'),
      'utf-8'
    );
    const games = JSON.parse(gamesData);
    res.render('index', { 
      title: 'Game Overzicht',
      games: games 
    });
  } catch (err) {
    console.error('Fout bij laden games:', err);
    res.status(500).send('Fout: Kon games niet laden');
  }
});

app.get('/details/:id', (req, res) => {
  try {
    const gamesData = fs.readFileSync(
      path.join(__dirname, 'json-viewer', 'data', 'gameslijst.json'),
      'utf-8'
    );
    const games = JSON.parse(gamesData);
    const game = games.find(g => g.id === parseInt(req.params.id));
    
    if (game) {
      res.render('details', { game });
    } else {
      res.status(404).send('Game niet gevonden');
    }
  } catch (err) {
    console.error('Fout bij details:', err);
    res.status(500).send('Serverfout');
  }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server gestart op http://localhost:${PORT}`);
});