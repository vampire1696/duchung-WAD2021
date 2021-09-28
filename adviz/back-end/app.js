require("dotenv").config();
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var path = require('path');
var createError = require('http-errors');

const authRouter = require('./routes/auth')
var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use('/', authRouter)

const connectDB = async () => {
	try {
		await mongoose.connect(
			`mongodb+srv://admina:1234@cluster0.lpjjv.mongodb.net/WAD?retryWrites=true&w=majority`
		)

		console.log('MongoDB connected')
	} catch (error) {
		console.log(error.message)
		process.exit(1)
	}
}

connectDB()

module.exports = app;