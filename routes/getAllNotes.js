const router = require('express').Router();
const Note = require('../models/note');

// endpoint to get all the notes
router.get('/', (request, response) => {
    Note.find({}, {})
        .then(notes => {
            response.status(200).json(notes);
        });
}
);

module.exports = router;