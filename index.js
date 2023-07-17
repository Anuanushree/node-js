require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

// middleware
app.use(cors());
app.use(express.json());

const url = process.env.ATLAS_URI;

mongoose.connect(url)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error(err);
    });

const Note = require('./models/note');


/*
    endpoints

    URL             Request Type    Functionality
    /api/notes      GET             fetches all the notes
    /api/notes/10   GET             fetches a single note
    /api/notes      POST            creates a new note based on the request data
    /api/notes/10   DELETE          deletes a note identified by id
    /api/notes/10   PUT             replaces the entire note identified by id with the request data
    /api/notes/10   PATCH           replaces a part of the note identified by id with the request data
*/

// set the endpoints

// endpoint to get all the notes
app.use('/api/notes', require('./routes/getAllNotes'));

// creates a new resource based on the request data
app.post('/api/notes', (request, response) => {
    // prepare an object to store it in the collection
    const note = new Note(request.body);

    note.save()
        .then(() => {
            response.status(201).json({ message: 'note created successfully' });
        });
});

// fetches a single resource based on id
app.get('/api/notes/:id', (request, response) => {
    const id = request.params.id;

    Note.findById(id)
        .then(note => {
            if (note) {
                response.status(200).json(note);
            } else {
                response.status(404).json({ message: 'id does not exists' });
            }
        });
});

// deletes a single resource based on id
app.delete('/api/notes/:id', (request, response) => {
    // get the id
    const id = request.params.id;

    Note.findByIdAndDelete(id)
        .then((deletedNote) => {
            if (deletedNote) {
                response.status(204).json({ message: 'note deleted successfully' });
            } else {
                response.status(404).json({ message: 'id does not exists' });
            }
        });
});

// replaces the entire note object identified by an id
app.put('/api/notes/:id', (request, response) => {
    const id = request.params.id;
    const noteToReplace = request.body;

    Note.findByIdAndUpdate(id, noteToReplace)
        .then((updatedNote) => {
            if (updatedNote) {
                response.status(200).json({ message: 'note updated successfully' });
            } else {
                response.status(404).json({ message: 'id does not exists' });
            }
        });
});

app.patch('/api/notes/:id', (request, response) => {
    const id = request.params.id;
    const noteToPatch = request.body;

    Note.findByIdAndUpdate(id, noteToPatch)
        .then((updatedNote) => {
            if (updatedNote) {
                response.status(200).json({ message: 'note updated successfully' });
            } else {
                response.status(404).json({ message: 'id does not exists' });
            }
        });
});


const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});