const booksModel = require('../models/books.model');
const AuthorsModel = require('../models/authors.model');

const getAllBooks = (req, res) => {
    booksModel.Book.find({}).populate('author').exec((err, data) => {
        if (err) console.log(err);
        return res.send(data)
    })
    // return res.status(200).send(data)
}
const getAllBooksByYear = async (req, res) => {
    const { year } = req.params
    booksModel.Book.find({ yearPublication: { $eq: year } }, (err, data) => {
        if (err) return res.status(404).send(err);
        return res.status(200).send(data);
    });
}
const createAuthor = (req, res) => {
    const { name, age, gender } = req.body;
    const author = new AuthorsModel.authors({
        name: name,
        age: age,
        gender: gender
    })
    author.save((err, data) => {
        if (err) return res.status(404).send(err);
        return res.status(200).send(data);
    });
};
const addNewBook = (req, res) => {
    // const { id } = req.params
    const { name, author, yearPublication, language, rating } = req.body;
    const book = new booksModel.Book({
        name: name,
        author: [...author],
        yearPublication: yearPublication,
        language: language,
        rating: rating
    })
    book.save((err, data) => {
        if (err) return res.status(404).send(err);
        return res.status(200).send(data);
    });
}
const deleteAuthor = async (req, res) => {
    const { id } = req.params
    try {
        const books = await booksModel.Book.find({})
        books.forEach(async book => {
            book.author = book.author.filter(author => author.toString() !== id)
            await booksModel.Book.findByIdAndUpdate(book._id, book)
        })
        const deletedUser = await AuthorsModel.authors.findByIdAndDelete(id)
        res.status(200).json(deletedUser)
    } catch (e) {
        res.status(400).send(e)
    }
}

const deleteBook = (req, res) => {
    const { id } = req.params;
    booksModel.Book.findByIdAndDelete(id, (err, data) => {
        if (err) return res.status(404).send(err);
        return res.status(200).send(data);
    });
}
const updateBook = (req, res) => {
    const { id } = req.params;
    const { name, author, yearPublication, language, rating } = req.body;
    booksModel.Book.findByIdAndUpdate(id, { name: name, author: author, yearPublication: yearPublication, language: language, rating: rating }, { new: true, runValidators: true }, (err, data) => {
        if (err) return res.status(404).send(err);
        return res.status(200).send(data);
    });
}
module.exports = {
    getAllBooks,
    addNewBook,
    deleteBook,
    getAllBooksByYear,
    updateBook,
    createAuthor,
    deleteAuthor
}