const config = require('../utils/config');
const resetpassword = require('express').Router();
const User = require('../models/user');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

resetpassword.post('/', async (request, response) => {
    const { resetToken, password } = request.body;

    const user = await User.findOne({ resetToken });
    if (!user)
        response.status(404).json({ message: "invalid code" });

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, 10);
    user.passwordHash = passwordHash
    await user.save();
    response.status(200).json({ message: "note replaced successfully" })
})
module.exports = resetpassword;