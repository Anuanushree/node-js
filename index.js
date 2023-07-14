const express = require('express');
const app = express();
// const cors = require('cors');
const mongoose = require('mongoose');

// middlewhere
// app.use(cors);
app.use(express.json());
const url = 'mongodb+srv://anushree:Nsaatf4VgEFY6VtY@cluster0.f6ma1cw.mongodb.net/Student-Mentor?retryWrites=true&w=majority';

mongoose.connect(url)
    .then(() => {
        console.log('connected to mongodb');
    })
    .catch((err) => {
        console.error(err);
    })

const MentorSchema = new mongoose.Schema({
    id: Number,
    mentorName: String,
    email: String,
    student: [mongoose.Schema.Types.Array]
});

const Mentor = mongoose.model('Mentor', MentorSchema, 'mentor');
const studentSchema = new mongoose.Schema({
    id: Number,
    studentName: String,
    studentBatch: String,
    mentor: Array
});

const Student = mongoose.model('Student', studentSchema, 'student');
// to get all the notes
app.get('/api/mentor', (request, response) => {
    Mentor.find({}, {})
        .then(mentors => {
            response.status(200).json(mentors);
        });

});

// app.post('/api/mentor', (request, response) => {
//     const mentor = new Mentor(request.body);
//     mentor.save()
//         .then(() => {
//             response.status(201).json({ message: 'node created successfullt successfully' })
//         });
// });
app.get('/api/student', (req, res) => {
    Student.find({}, {})
        .then(datas => {
            res.status(200).json(datas)
        });
});
app.put('/api/mentor/1', (request, response) => {
    const { mentorId, studentId } = new Mentor(request.body);
    const id = request.params.id;
    Mentor.findByIdAndUpdate(id)
        .then(mentor => {
            mentor.student.push(new Array[studentId]);
            mentor.save()
                .then(() => response.json({ message: 'node created successfullt successfully' }))
                .catch(err => response.status(400).json('error: ' + err))

        })
        .catch(err => response.status(400).json('error: ' + err))
});
// app.post('/api/create', (request, response) => 
//     const {studentid,mentorid} = new Student(request.body);
//     student.save()
//         .then(() => {
//             response.status(201).json({ message: 'node created successfullt successfully' })
//         })
// })



// // fetch a single resource based on id

// app.get('/api/notes/:id', (request, response) => {
//     const id = request.params.id;
//     const note = notes.find(note => note.id == id);
//     if (note) {
//         response.status(200).json(note);
//     } else {
//         response.status(404).json({ message: 'id does not exists' })
//     }

// })

// app.delete('/api/notes/:id', (request, response) => {
//     const id = request.params.id;
//     const note = notes.find(note => note.id == id);
//     notes = notes.filter(note => note.id != id)
//     if (note) {
//         response.status(200).json(note);
//     } else {
//         response.status(404).json({ message: 'id does not exists' })
//     }
// });

// app.put('/api/notes/:id', (request, response) => {
//     const id = request.params.id;
//     const notereplace = request.body;
//     const note = notes.find(note => note.id == id);
//     notes = notes.map(note => note.id == id ? notereplace : note);

//     if (note) {
//         response.status(200).json({ message: 'note replaced' });
//     } else {
//         response.status(404).json({ message: 'id does not find' })
//     }
// });

// app.patch('/api/notes/:id', (request, response) => {
//     const id = request.params.id;
//     const notereplace = request.body;
//     const note = notes.find(note => note.id == id);
//     notes = notes.map(note => note.id == id ? { ...note, ...notereplace } : note);

//     if (note) {
//         response.status(200).json({ message: 'note replaced' });
//     } else {
//         response.status(404).json({ message: 'id does not find' })
//     }
// });
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`server running port ${PORT}`);
});

