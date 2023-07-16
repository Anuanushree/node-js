require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

// middlewhere
app.use(cors());
app.use(express.json());
const url =process.env.ATLAS_URL;

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
    student: Array
});

const Mentor = mongoose.model('Mentor', MentorSchema, 'mentor');
const studentSchema = new mongoose.Schema({
    id: Number,
    studentName: String,
    studentBatch: String,
    previewsMentor:String,
    mentor: Array
});

const Student = mongoose.model('Student', studentSchema, 'student');
// to get all the notes
app.get('/', (request, response) => {
            response.send(`
            => to add mentor = /api/mentor,
            =>to add student=/api/student,
            =>to assign a mentor for student=/api/mentor-student,
            =>to assign or change a mentor for student=/api/student-mentor,
            =>to show all student for a particular mentor,
            =>to show the previously assigned mentor for a particular student,
            `);
        

});
app.get('/api/mentor', (request, response) => {
    Mentor.find({}, {})
        .then(mentors => {
            response.status(200).json(mentors);
        });

});

// 1. write api to create mentor

app.post('/api/mentor', (request, response) => {
    const mentor = new Mentor(request.body);
    mentor.save()
        .then(() => {
            response.status(201).json({ message: 'node created successfullt successfully' })
        });
});
app.get('/api/student', (req, res) => {
    Student.find({}, {})
        .then(datas => {
            res.status(200).json(datas)
        });
});

// 2.write api to create student

app.post('/api/student', (request, response) => {
    const student = new Student(request.body);
    student.save()
        .then(() => {
            response.status(201).json({ message: 'node created successfullt successfully' })
        });
});
// 3. write api to assigna student to mentor

app.post('/api/mentor-student', (request, response) => {
    const { mentorid, studentname } = request.body;
    Mentor.findById(request.body.mentorid)
        .then(mentor => {
            mentor.student.push(request.body.studentname);
            mentor.save()
                .then(() => response.json({ message: 'node created successfully' }))
                .catch(err => response.status(400).json('error: ' + err))

        })
        .catch(err => response.status(400).json('error: ' + err))
});

//4.  write a assign or change mentor for particular student

app.post('/api/student-mentor', (request, response) => {
    const { studentid, mentorname } = request.body;
    Student.findById(request.body.studentid)
        .then(student => {
            if (student.mentor.length == 0) {
                student.mentor.push(request.body.mentorname);
                student.save()
                    .then(() => response.json({ message: 'node created successfully' }))
                    .catch(err => response.status(400).json('error: ' + err))
                return;
            } else {

                student.previewsMentor=`${student.mentor}`;
                student.mentor.pop();
                student.mentor.push(request.body.mentorname);
                student.save()
                    .then(() => response.json({ message: 'node created successfully' }))
                    .catch(err => response.status(400).json('error: ' + err))
            }
        })

        .catch(err => response.status(400).json('error: ' + err))
});

// 5 . write api to show all student for a particular mentor 

app.get('/api/mentor/:name',(request,response)=>{
    Student.find({ mentor: request.params.name }, { _id: 0, studentName: 1, studentBatch: 1 })
      .then(studentdata=>{
        response.status(200).json(studentdata)
      })
});

// 6 write an api to show the previously assigned mentor for a particular student

app.get('/api/student/:name', (request, response) => {
    Student.find({ studentName: request.params.name }, { _id: 0, studentName: 1,previewsMentor:1 })
        .then(studentdata => {
            response.status(200).json(studentdata)
        })
});
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`server running port ${PORT}`);
});

