const booksModel = require('../models/books.model');


const getAllBooks = async (req, res) => {
    const data = await booksModel.Book.find({});
    return res.status(200).send(data)
}
const getAllBooksByYear = async (req, res) => {
    const { year } = req.params
    booksModel.Book.find( { yearPublication: { $eq: year } } , (err, data) => {
        if (err) return res.status(404).send(err);
        return res.status(200).send(data);
    });
}
const addNewBook = (req, res) => {
    const {name , author , yearPublication, language , rating } = req.body;
    const book = new booksModel.Book({
        name: name,
        author: author,
        yearPublication: yearPublication,
        language: language,
        rating: rating
    })

    book.save((err, data) => {
        if (err) return res.status(404).send(err);
        return res.status(200).send(data);
    });
}

const deleteBook = (req,res)=>{
    const {id} = req.params;
    booksModel.Book.findByIdAndDelete(id, (err, data) => {
        if (err) return res.status(404).send(err);
        return res.status(200).send(data);
    });
}
const updateBook = (req,res)=>{
    const {id} = req.params;
    const {name , author , yearPublication, language , rating } = req.body;
    booksModel.Book.findByIdAndUpdate(id,{ name: name, author: author, yearPublication: yearPublication ,language:language , rating:rating },{new:true, runValidators: true}, (err, data) => {
        if (err) return res.status(404).send(err);
        return res.status(200).send(data);
    });
}
module.exports = {
    getAllBooks,
    addNewBook,
    deleteBook,
    getAllBooksByYear,
    updateBook
}