const mongoose = require('mongoose');

const booksSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    // author: ObjectId,
    author: [{
        type: mongoose.Schema.Types.ObjectId, ref: "authors",
        required: false,
    }],
    yearPublication: {
        type: Number,
        required: true,
        validate: [
            {
                validator: (y) => {
                    const date = new Date().getFullYear();
                    return ((y <= date) && (y >= 1500))
                }, msg: 'must be an integer in [ 1500, 2021 ]'
            },
            { validator: Number.isInteger, msg: '{VALUE} is not an integer value' }
        ]
    },
    language: {
        type: String,
        required: true,
        maxLength: 2
    },
    rating: {
        type: Number,
        required: true,
        validate: {
            validator: (r) => {
                return ((r <= 5) && (r >= 0))
            }
        },
    }
});
const Book = mongoose.model('books', booksSchema);

module.exports = {
    Book
}

