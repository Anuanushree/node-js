const http = require('http');

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
const app = http.createServer((request, response) => {
    response.writeHead(200, { 'content-Type': 'application/json' })
    response.end(JSON.stringify(notes));
});
const PORT = 3001;
app.listen(PORT);
console.log(`server running port ${PORT}`)
