
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const session = require('express-session');
const app = express();
app.use(cors({
    origin: 'http://localhost:3001',
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true
}))

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

const db = mongoose.connection
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(express.json());
app.use(session({
    secret: 'archivalstreamingbase',
    resave: false,
    saveUninitialized: false,
}));

const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const moviesRouter = require('./routes/movies');
const usersRouter = require('./routes/users');
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/movies', moviesRouter);
app.use('/users', usersRouter);

connectDB().then(() => {
    app.listen(3000, () => console.log('Server Started'));
})