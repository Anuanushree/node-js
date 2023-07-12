const express = require('express');
const fs = require('fs');
const app = express();
const router = require('./router/router');
const cors = require('cors');

// middlewhere
app.use(cors);
app.use(express.json());

app.get('/', (request, response) => {
    response.send('to create a file give the path name as /create')
})
app.use(router);
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`server running port ${PORT}`);
});

