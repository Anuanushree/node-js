const mongoose = require('mongoose');

const url = 'mongodb+srv://anushree:Nsaatf4VgEFY6VtY@cluster0.f6ma1cw.mongodb.net/NotesDb?retryWrites=true&w=majority';

mongoose.connect(url)
    .then(() => {
        console.log('connected to mongodb');
    })
    .catch((err) => {
        console.error(err);
    })

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
});

const Note = mongoose.model('Note', noteSchema, 'note');

const note = new Note({
    content: 'mongodb connection using mongoo libarray',
    important: false,
});

let notes = [
    {
        content: 'data1',
        important: false,
    },
    {
        content: 'data2',
        important: false,
    },
];
notes.forEach(note => {
    let noteModel = new Note(note);

    noteModel.save()
        .then(() => {
            console.log('note saved');
        })
})
note.save()
    .then((result) => {
        console.log('note saved');
        mongoose.connection.close();
    });  