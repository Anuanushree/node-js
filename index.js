require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = process.env.Port || 3001;

// middlewhere
app.use(cors());
app.use(express.json());

const url = process.env.ATLAS_URL;

mongoose.connect(url)
    .then(() => {
        console.log('connected to mongodb');
    })
    .catch((err) => {
        console.error(err);
    })

const userSchema = new mongoose.Schema({
    id: Number,
    Name: String,
    email: String,
    password: String,
    phn: Number,
    textarea: String
});

const User = mongoose.model('User', userSchema, 'user');
// to get all the notes
app.get('/user', (request, response) => {
    User.find({}, {})
        .then(user => {
            response.status(200).json(user);
        }).catch((err) => {
            console.log(err)
        })

});
app.get('/user/:id', (request, response) => {
    const id = request.params.id;

    User.findById(id)
        .then(deleteuser => {
            if (deleteuser) {
                response.status(200).json(User);
            } else {
                response.status(404).json({ message: 'id does not exists' })
            }
        })

});


app.post('/user', (request, response) => {
    const mentor = new User(request.body);
    mentor.save()
        .then(() => {
            response.status(201).json({ message: 'node created successfullt successfully' })
        })
})

app.delete('/user/:id', (request, response) => {
    const id = request.params.id;

    User.findByIdAndDelete(id)
        .then(deleteuser => {
            if (deleteuser) {
                response.status(200).json({ message: 'id deleted  ' });
            } else {
                response.status(404).json({ message: 'id does not exists' })
            }
        })

});

app.put('/user/:id', (request, response) => {
    const id = request.params.id;
    const userreplace = request.body;
    User.findByIdAndUpdate(id, userreplace)
        .then((updateuser) => {
            if (updateuser) {
                response.status(200).json({ message: 'note replaced' });
            } else {
                response.status(404).json({ message: 'id does not find' })
            }
        })
});
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, () => {
    console.log(`server running port ${PORT}`);
});

