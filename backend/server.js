const express = require('express');
const dotenv = require('dotenv');

const usersRoute = require('./routes/usersRoutes');
const error = require('./middlewares/errorMiddlewareHandler');
const booksRoute = require('./routes/booksRoute');

dotenv.config();
require('./config/dbConnect')(); //connect db

const app = express();

//passing body data
app.use(express.json());

//Routes
app.use('/api/users', usersRoute);
app.use('/api/books', booksRoute);
//Error middleware
app.use(error.errorMiddlewareHandler);


//Server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`)
})