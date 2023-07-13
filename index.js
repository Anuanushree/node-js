const express = require('express');
const room = require('./Room');
// const bookingroom = require('./bookingRoom');
const app = express();

// middlewhere

app.use(express.json());
// let room = [

//     {
//         id: 1,
//         roomName: "The Spiral Gardens",
//         numberOfSeatsAvailaible: 100,
//         amenties: ["ac,fan,generator"],
//         chargeForPerHour: 5000,
//     },
//     {
//         id: 2,
//         roomName: "La Maria",
//         numberOfSeatsAvailaible: 50,
//         amenties: ["ac,fan,generator,homet theater"],
//         chargeForPerHour: 7000,
//     },
//     {
//         id: 3,
//         roomName: "Acacia Gardens",
//         numberOfSeatsAvailaible: 150,
//         amenties: ["ac,fan,generator"],
//         chargeForPerHour: 8000,
//     },
//     {
//         id: 4,
//         roomName: "Elliot",
//         numberOfSeatsAvailaible: 70,
//         amenties: ["ac,fan,generator,lightning"],
//         chargeForPerHour: 6000,
//     },
//     {
//         id: 5,
//         roomName: "Bloom Function Halls",
//         numberOfSeatsAvailaible: 200,
//         amenties: ["ac,fan,generator"],
//         chargeForPerHour: 9000,
//     },
//     {
//         id: 6,
//         roomName: "Bloom Function Halls",
//         numberOfSeatsAvailaible: 100,
//         amenties: ["ac,fan,generator"],
//         hargeForPerHour: 7000,
//     },
// ];

let roombooking = [
    {
        roomid: 1,
        customerName: "anu",
        date: new Date().toLocaleDateString(),
        startTime: "12.00 pm",
        endTime: "5.00 pm",
        status: "booked"
    },
    {
        roomid: 2,
        customerName: "anu",
        date: new Date().toLocaleDateString(),
        startTime: "5.00 pm",
        endTime: "8.00 pm",
        status: " not-booked"
    },
];

app.get('/', (request, response) => {
    response.send(`
    => for add the room and get the details= /api/room;
    => for booking the room and the details=/api/roombooking,
    => for list all the room with data =/api/roomdetails,
    => for list all customer with data = /api/customerdetails,
    => for list how many times a customer has booked = /api/customer

    `)
})
// 1.create a room with data :

app.get('/api/room', (request, response) => {
    response.status(200).json(room);
});

app.get('/api/room/:id', (request, response) => {
    const id = request.params.id;
    const data = room.find(rooms => rooms.id == id);
    if (data)
        response.status(200).json(data)
    else
        response.status(200).json({ message: 'id doest not exists' })
});

app.post('/api/room', (request, response) => {
    room = room.concat(request.body);
    console.log(request.body);
    response.status(201).json({ message: 'node created successfullt successfully' })
});

app.put('/api/room/:id', (request, response) => {
    const id = request.params.id;
    const roomreplaced = request.body;
    const data = room.find(rooms => rooms.id == id);
    room = room.map(rooms => rooms.id == id ? roomreplaced : rooms);
    if (data)
        response.status(200).json(data)
    else
        response.status(200).json({ message: 'id doest not exists' })

});
app.delete('/api/room/:id', (request, response) => {
    const id = request.params.id;
    const data = room.find(rooms => rooms.id == id);
    room = room.filter(rooms => rooms.id != id);
    if (data)
        response.status(200).json(data)
    else
        response.status(200).json({ message: 'id doest not exists' })

});

// 2. booking a room with data 

app.get('/api/roombooking', (request, response) => {
    response.status(200).json(roombooking);
});

app.get('/api/roombooking/:id', (request, response) => {
    const id = request.params.id;
    const data = roombooking.find(book => book.roomid == id);
    if (data)
        response.status(200).json(data)
    else
        response.status(200).json({ message: 'id doest not exists' })
})
app.post('/api/roombooking', (request, response) => {
    roombooking.forEach(data => {
        if (data.startTime == request.body.startTime && data.endTime == request.body.endTime) {
            response.status(201).json({ message: "select other slot because your slot time already booked" })
        }
    })

    roombooking = roombooking.concat(request.body);
    response.status(201).json({ message: 'node created successfullt successfully' })

})


app.put('/api/roombooking/:id', (request, response) => {
    const id = request.params.id;
    const bookingreplaced = request.body;
    const data = roombooking.find(rooms => rooms.id == id);
    roombooking = roombooking.map(rooms => rooms.roomid == id ? bookingreplaced : rooms);
    if (data)
        response.status(200).json(data)
    else
        response.status(200).json({ message: 'id doest not exists' })

});
app.delete('/api/roombooking/:id', (request, response) => {
    const id = request.params.id;
    const data = roombooking.find(rooms => rooms.roomid == id);
    roombooking = roombooking.filter(rooms => rooms.roomid != id);
    if (data)
        response.status(200).json(data)
    else
        response.status(200).json({ message: 'id doest not exists' })

});

// 3 . list all rooms with booked data: 

app.get('/api/roomdetails', (request, response) => {
    let output = [];
    room.forEach((roomdata) => {
        let bookingdata = roombooking.find(id => id.roomid == roomdata.id);
        if (bookingdata) {
            let object = {
                "Room name": roomdata.roomName,
                "Booked Status": bookingdata.status,
                "customer name": bookingdata.customerName,
                "date": bookingdata.date,
                "startTime": bookingdata.startTime,
                "endTime": bookingdata.endTime

            }
            output.push(object);
        } else {
            let object = {
                "Room name": roomdata.roomName,
                "Booked Status": "not booked",

            }
            output.push(object);
        }

    });
    response.status(200).json(output);
})

// 4. list all customer with booked data:

app.get('/api/customerdetails', (request, response) => {
    let output = [];
    let data = roombooking;
    data.forEach((bookingdata) => {
        let roomdata = room.find(id => id.id == bookingdata.roomid);
        if (roomdata) {
            let object = {
                "customer name": bookingdata.customerName,
                "Room name": roomdata.roomName,
                "date": bookingdata.date,
                "startTime": bookingdata.startTime,
                "endTime": bookingdata.endTime

            }
            output.push(object);
        }

    });
    response.status(200).json(output);
})

/// 5 .list how many times a customer has booked :

app.get('/api/customer', (request, response) => {
    let output = [];
    let data = roombooking.filter(datas => datas.customerName != roombooking.customerName)
    data.forEach(datas => {
        let object = {
            "customer name": datas.customerName,
            "Room name": room.roomName,
            "date": datas.date,
            "startTime": datas.startTime,
            "endTime": datas.endTime,
            "booking status": datas.status
        }
        output.push(object)
    })

    response.status(200).json(output);
})

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`server running port ${PORT}`);
});

