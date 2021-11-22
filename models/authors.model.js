const mongoose = require('mongoose');

const authorsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    }
});

const authors = mongoose.model('authors', authorsSchema);

module.exports = {
    authors
}
