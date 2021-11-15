const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require('dotenv').config()
const mongoose = require('mongoose');
// const itemsModel = require('./models/Items.model').itemsModel;

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors());

app.use('/api/books', require('./routes/books.route'));

mongoose.connect('mongodb://localhost/dbBooks', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Connected to DB');
});
app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));
