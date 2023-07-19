require('dotenv').config();
const MONGODB_URL=process.env.MONGODB_URL;
const PORT = process.env.PORT;
const EMAIL = process.env.EMAIL;
const PASS = process.env.PASS
module.exports={
    MONGODB_URL,
    PORT,
    EMAIL,
    PASS
}