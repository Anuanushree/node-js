// load mongoose since we need it to define a model
var mongoose = require('mongoose');

var NoteSchema = new mongoose.Schema({
    content: String,
    important: Boolean
});

// export the model
module.exports = mongoose.model('Note', NoteSchema);