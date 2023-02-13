
require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')


const connectDB = async () => {
    try {
        mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}


const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const moviesRouter = require('./routes/movies')
app.use('/movies', moviesRouter)

connectDB().then(() => {
    app.listen(3000, () => console.log('Server Started'))
})