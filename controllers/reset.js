const config = require('../utils/config');
const resetRouter = require('express').Router();
const User = require('../models/user');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

resetRouter.post('/', async (request, response) => {
    try {
        const { email } = request.body;

        const user = await User.findOne({ email });

        if (!user)
            return response.status(404).json({ error: "user not found" });

        const randomstring = Math.random().toString(20).substring(4, 15)


        const link = `https://silver-concha-7e61b5.netlify.app/reset/${randomstring}`;

        user.resetToken = randomstring;
        await user.save();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.EMAIL,
                pass: config.PASS
            }
        });
        async function sendMail() {
            const info = await transporter.sendMail({
                from: `"Anushree" <${config.EMAIL}>`,
                to: user.email,
                subject: "Reset password",
                text: link,
            });
            console.log("message send:%s", info.messageId);

        }
        sendMail().catch(console.error);
        response.status(200).json({ substring: randomstring, user: user })
    } catch (error) {
        response.status(200).json({ message: "user not found" })
    }
})
module.exports = resetRouter;
