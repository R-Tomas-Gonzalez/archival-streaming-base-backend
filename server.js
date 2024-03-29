
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const app = express();
app.set('trust proxy', 1);
app.use(cors({
    origin: ['https://archival-streaming-base.netlify.app', 'http://localhost:3001'],
    methods: ['POST', 'PUT', 'PATCH', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true
}))

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
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
    proxy: true,
    secret: 'archivalstreamingbase',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: false,
        sameSite: 'none',
        secure: true
    },
    store: MongoStore.create({
        mongoUrl: process.env.DATABASE_URL,
        client: db.getClient(),
    })
}));

const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const usersRouter = require('./routes/users');
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/users', usersRouter);

connectDB().then(() => {
    app.listen(3000, () => console.log('Server Started'));
})