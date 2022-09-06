const { info } = require('console');
const express = require('express');
const path = require('path');
const notes = require('./db/db.json');
const generateUniqueId = require('generate-unique-id');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.get('/api/notes', (req, res) => {
    console.info(notes)
    res.json(notes)
});

app.get('/api/notes/:id', (req, res) => {
    res.json(notes)
});

app.post('/api/notes', (req, res) => {

    const uniqueId = generateUniqueId({
        length: 32,
        useLetters: false
    });

    req.body.id = uniqueId
    notes.push(req.body)
    console.info(notes)
    res.json(notes)
});

app.delete('/api/notes/:id', (req, res) => {
    // console.info(notes[0])
    // console.info(`req body:${req.body}`)
    // let id = req.params.id
    // console.info(id)
    // res.json(notes[0])
});

app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);


app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);
