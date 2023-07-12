const express = require('express');
// const room = require('./Room');
// const bookingroom = require('./bookingRoom');
const app = express();

// middlewhere

app.use(express.json());
let room = [

    {
        id: 1,
        roomName: "The Spiral Gardens",
        numberOfSeatsAvailaible: 100,
        amenties: ["ac,fan,generator"],
        chargeForPerHour: 5000,
    },
    {
        id: 2,
        roomName: "La Maria",
        numberOfSeatsAvailaible: 50,
        amenties: ["ac,fan,generator,homet theater"],
        chargeForPerHour: 7000,
    },
    {
        id: 3,
        roomName: "Acacia Gardens",
        numberOfSeatsAvailaible: 150,
        amenties: ["ac,fan,generator"],
        chargeForPerHour: 8000,
    },
    {
       id: 4,
        roomName: "Elliot",
        numberOfSeatsAvailaible: 70,
        amenties: ["ac,fan,generator,lightning"],
        chargeForPerHour :6000,
    },
    {
        id: 5,
        roomName: "Bloom Function Halls",
        numberOfSeatsAvailaible: 200,
        amenties: ["ac,fan,generator"],
        chargeForPerHour: 9000,
    },
    {
         id: 6,
        roomName: "Bloom Function Halls",
        numberOfSeatsAvailaible: 100,
        amenties: ["ac,fan,generator"],
        hargeForPerHour: 7000,
    },
];

let bookingroom = [
    {
        id: 1,
        customerName: "anu",
        date: new Date().toLocaleDateString(),
        startTime: "12.00 pm",
        endTime: "5.00 pm",
        status: "booked"
    }
];

app.get('/', (request, response) => {
    response.send('<h1>hello world</h1>')
})

app.get('/api/room', (request, response) => {
    response.status(200).json(room);
});


app.post('/api/room', (request, response) => {
    room = room.concat(request.body);
    console.log(request.body);
    response.status(201).json({ message: 'node created successfullt successfully' })
})

app.get('/api/bookroom', (request, response) => {
    response.status(200).json(bookingroom);
});


app.post('/api/bookroom', (request, response) => {
    bookingroom= bookingroom.concat(request.body);
    response.status(201).json({ message: 'node created successfullt successfully' })
})

app.get('/api/roomdetails',(request,response)=>{
    let output=[];
    let data = bookingroom;
    data.forEach((bookingdata)=>{
        let roomdata= room.find(id=>room.id==bookingdata.id);
        let object={
            "Room name":roomdata.roomName,
            "Booked Status":bookingdata.status,
            "customer name":bookingdata.customerName,
            "date":bookingdata.date,
            "start time":bookingdata.startTime,
            "end time":bookingdata.endTime

        }
        output.push(object);
    });
   response.status(200).json(output);
})
// // fetch a single resource based on id

// app.get('/api/allroom',(request,response)=>{
//     let object=[];

//     response.status(200).json()
// })

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
const PORT = 3002;
app.listen(PORT, () => {
    console.log(`server running port ${PORT}`);
});

