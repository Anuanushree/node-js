const expresss= require('express');
const router = express.Router();

const date = new Date()
const currentDate = new Date().toLocaleDateString("de-DE");
let currentTime = date.getHours() + "-" + date.getMinutes() + "-" + date.getSeconds();
console.log(currentDate);
console.log(currentTime);
const fs = require('fs');

router.get("/create",async(request,response)=>{
    try{
        fs.writeFile(`/Users/anuab/OneDrive/Document/react-be/testdir/${currentDate} (${currentTime}).txt`, `current date ${currentDate} and time ${currentTime}`, err => {
            if (err) {
                console.error(err);
                return;
            }
            console.log('content written in the file')
        });
    }catch{
        res.send({
            statusCode: 500,
            msg: "Internal server error"
        });
    }
})
export default router;