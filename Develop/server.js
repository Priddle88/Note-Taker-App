// const { info } = require('console');
const express = require('express');
const path = require('path');
let notes = require('./db/db.json');

// generates a random id using node
const generateUniqueId = require('generate-unique-id');

// PORT number
const PORT = process.env.PORT || 3001;

// creates app variables from express
const app = express();

// Middleware to use json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware for the public files
app.use(express.static('public'));

// Makes the url contain /notes to display the notes html
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/notes.html'))
);

// data from notes
app.get('/api/notes', (req, res) => {
    res.json(notes)
});

// data from the notes id
app.get('/api/notes/:id', (req, res) => {
    res.json(notes)
});

// posts the notes data
app.post('/api/notes', (req, res) => {

    const uniqueId = generateUniqueId({
        length: 32,
        useLetters: false
    });

    req.body.id = uniqueId
    notes.push(req.body)
    res.json(notes)
});

// deletes the notes
app.delete('/api/notes/:id', (req, res) => {

    for (i = 0; i < notes.length; i++) {
        if (notes[i].id == req.params.id) {
            notes.splice(i, 1)
        }
    }

    res.json(notes)
});

// displays the index.html page
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// PORTS the server
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);
