const express = require('express');

const app = express();

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
app.get('/api/notes',(request,response)=>{
    response.json(notes);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`server running port ${PORT}`);
});

