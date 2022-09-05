const express = require('express');
const path = require('path');
const notes = require('./db/db.json');

// const { clog } = require('./middleware/clog');
// const api = require('./routes/index.js');

const PORT = process.env.PORT || 3001;

const app = express();

// Import custom middleware, "cLog"
// app.use(clog);

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/api', api);

app.use(express.static('public'));

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.get('/api/notes', (req, res) =>
    res.json(notes)
);

app.get('/api/notes/:id', (req, res) =>
    res.json(notes)
);

app.post('/api/notes', (req, res) => {
    console.info(req.body)
    console.info(notes)
    notes.push(req.body)
    console.info(notes)
    res.json(notes)
    // let note;

    // note = {
    //     title: req.body.title,
    //     text: req.body.text,
    // };
});

// app.post('/api/notes', (req, res) =>
//     req.body(notes)
// );

// app.delete('/api/notes', (req, res) =>

// );

// app.delete('/api/notes/:id', (req, res) => (

// );

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);
