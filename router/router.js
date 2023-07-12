const express = require('express');
const router = express.Router();
const fs = require('fs');


router.get("/create", async (request, response) => {
    try {
        const date = new Date()
        const currentDate = new Date().toLocaleDateString("de-DE");
        let currentTime = date.getHours() + "-" + date.getMinutes() + "-" + date.getSeconds();
        console.log(currentDate);
        console.log(currentTime);
        fs.writeFile(`/Users/anuab/OneDrive/Documents/react-be/testdir/${currentDate} (${currentTime}).txt`, `current date ${currentDate} and time ${currentTime}`, err => {
            if (err) {
                console.error(err);
                return;
            }
            console.log('content written in the file')
        });
        response.send("file created")
    } catch {
        response.send({
            statusCode: 500,
            msg: "Internal server error"
        });
    }
})

router.get('/list', (request, response) => {
    try {
        const path = require('path');
        let fileslist = [];
        const folderName = '/Users/anuab/OneDrive/Documents/react-be/testdir/'
        fs.readdir(folderName, (err, files) => {
            if (err) {
                console.error(err);
                return;
            }
            const extension = '.txt';
            files.forEach(file => {
                if (path.extname(file) === extension)
                    fileslist.push(file);
            })
            response.send(fileslist)
        })
    } catch {
        response.send({
            statusCode: 500,
            msg: "Internal server error"
        });
    }
})
module.exports = router; 