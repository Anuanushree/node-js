// const mongoose = require('mongoose');

// const { default: mongoose } = require("mongoose");

// const url = 'mongodb+srv://anushree:Nsaatf4VgEFY6VtY@cluster0.f6ma1cw.mongodb.net/Student-Mentor?retryWrites=true&w=majority';

// mongoose.connect(url)
//     .then(() => {
//         console.log('connected to mongodb');
//     })
//     .catch((err) => {
//         console.error(err);
//     })

// const MentorSchema = new mongoose.Schema({
//     id: Number,
//     mentorName: String,
//     email:String,
//     student: [mongoose.Schema.Types.Array]
// });

// const Mentor = mongoose.model('Mentor', MentorSchema, 'mentor');

// const mentor = new Mentor({
//     id: 1,
//     mentorName:"sathish",
//     email: "sathish@gmail.com",
//     student: [mongoose.Schema.Types.Array]
// });

// mentor.save()
//     .then((result) => {
//         console.log('mentor saved');
//         mongoose.connection.close();
//     });  

const studentSchema = new mongoose.Schema({
    id: Number,
    studentName: String,
    studentBatch: String,
    mentor: [mongoose.Schema.Types.Array]
});

const Student = mongoose.model('Student', studentSchema, 'student');
const student = new Student({
    id: 1,
    studentName: "anu",
    studentBatch: "b47",
    mentor: [mongoose.Schema.Types.Array]
});
student.save()
    .then((result) => {
        console.log('student saved');
        mongoose.connection.close();
    
});
Student.find({},{})
  .then(data=>{
    data.forEach(note=>{
        console.log(note);
    });
    mongoose.connection.close
  })