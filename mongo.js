const mongoose = require('mongoose');

const url = 'mongodb+srv://anushree:Nsaatf4VgEFY6VtY@cluster0.f6ma1cw.mongodb.net/Student-Mentor?retryWrites=true&w=majority';

mongoose.connect(url)
    .then(() => {
        console.log('connected to mongodb');
    })
    .catch((err) => {
        console.error(err);
    })

const Mentor = new mongoose.Schema({
    id: Number,
    mentorName: String,
    email:String,
    student:[mongoose.id]
});

const Note = mongoose.model('Note', Mentor, 'note');

const note = new Note({
    id: 1,
    mentorName:"sathish",
    email: "sathish@gmail.com",
    student: [mongoose.Schema.Types.id]
});


note.save()
    .then((result) => {
        console.log('note saved');
        mongoose.connection.close();
    });  