const express = require('express');

const app = express();

// middlewhere

app.use(express.json());

let notes = [
    {
        id: 1,
        content: "backend seerver using nodejs",
        important: true
    },
    {
        id: 2,
        content: "backend restfull usigng nodejs will grow complex",
        important: false
    },
    {
        id: 3,
        content: "content-3",
        important: true
    }
];

// endpoints and  / route
app.get('/', (request, response) => {
    response.send('<h1>hello world</h1>')
})

// to get all the notes
app.get('/api/notes', (request, response) => {
    response.status(200).json(notes);
});

// post endpoint

app.post('/api/notes', (request, response) => {
    notes = notes.concat(request.body);
    response.status(201).json({ message: 'node created successfullt successfully' })
})

// fetch a single resource based on id

app.get('/api/notes/:id', (request, response) => {
    const id = request.params.id;
    const note = notes.find(note => note.id == id);
    if (note) {
        response.status(200).json(note);
    } else {
        response.status(404).json({ message: 'id does not exists' })
    }

})

app.delete('/api/notes/:id', (request, response) => {
    const id = request.params.id;
    const note = notes.find(note => note.id == id);
    notes = notes.filter(note => note.id != id)
    if (note) {
        response.status(200).json(note);
    } else {
        response.status(404).json({ message: 'id does not exists' })
    }
});

app.put('/api/notes/:id', (request, response) => {
    const id = request.params.id;
    const notereplace = request.body;
    const note = notes.find(note => note.id == id);
    notes = notes.map(note => note.id == id ? notereplace : note);

    if (note) {
        response.status(200).json({ message: 'note replaced' });
    } else {
        response.status(404).json({ message: 'id does not find' })
    }
});

app.patch('/api/notes/:id', (request, response) => {
    const id = request.params.id;
    const notereplace = request.body;
    const note = notes.find(note => note.id == id);
    notes = notes.map(note => note.id == id ? { ...note, ...notereplace } : note);

    if (note) {
        response.status(200).json({ message: 'note replaced' });
    } else {
        response.status(404).json({ message: 'id does not find' })
    }
});
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`server running port ${PORT}`);
});

