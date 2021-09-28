const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ContactSchema = new Schema({
	firstName: {
		type: String,
		required: true,
		unique: true
	},
	lastName: {
		type: String,
		required: true
	},
	streetNumber: {
		type: String,
		required: true
	},
    zip: {
		type: String,
		required: true
	},
	city: {
		type: String,
		required: true
	},
    state: {
		type: String,
		required: true
	},
    country: {
		type: String,
		required: true
	},
    isPublic: {
		type: Boolean,
		required: true
	},
	lat: {
		type: String,
		required: false
	},
	long: {
		type: String,
		required: false
	},
    owerID: {
		type: String,
		required: true
	}
})

module.exports = mongoose.model('contact', ContactSchema)