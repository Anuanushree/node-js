const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

usersRouter.post('/', async (request, response) => {
    const { username, email, password } = request.body;

    // convert the plaintext password to hashed password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // prepare the user object to store in the database
    const user = new User({
        username,
        email,
        passwordHash,
      
    });

    // store it in the database
    const savedUser = await user.save();

    response.status(201).json(savedUser);
});
usersRouter.get('/', async (request, response) => {
    const users = await User.find({}, {});

    response.json(users);
});


module.exports = usersRouter;