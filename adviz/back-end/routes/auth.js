const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const verifyToken = require('../middleware/auth')

const User = require('../models/User')
const Contact = require('../models/Contact')

// @route GET api/auth
// @desc Check if user is logged in
// @access Public
router.get('/', verifyToken, async (req, res) => {
	try {
		const user = await User.findById(req.userId).select('-password')
		if (!user)
			return res.status(400).json({ success: false, message: 'User not found' })
		res.json({ success: true, user })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

// @route POST api/auth/register
// @desc Register user
// @access Public
router.post('/register', async (req, res) => {
	const { username, password ,isAdmin } = req.body

	// Simple validation
	if (!username || !password)
		return res
			.status(400)
			.json({ success: false, message: 'Missing username and/or password' })

	try {
		// Check for existing user
		const user = await User.findOne({ username })

		if (user)
			return res
				.status(400)
				.json({ success: false, message: 'Username already taken' })

		// All good
		const hashedPassword = await argon2.hash(password)
		const newUser = new User({ username, password: hashedPassword ,isAdmin})
		await newUser.save()

		

		res.json({
			success: true,
			message: 'User created successfully',
			
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

// @route POST api/auth/login
// @desc Login user
// @access Public
router.post('/login', async (req, res) => {
	const { username, password } = req.body

	// Simple validation
	if (!username || !password)
		return res
			.status(400)
			.json({ success: false, message: 'Missing username and/or password' })

	try {
		// Check for existing user
		const user = await User.findOne({ username })
		if (!user)
			return res
				.status(400)
				.json({ success: false, message: 'Incorrect username or password' })

		// Username found
		const passwordValid = await argon2.verify(user.password, password)
		if (!passwordValid)
			return res
				.status(400)
				.json({ success: false, message: 'Incorrect username or password' })

		// All good
		// Return token
		

		res.json({
			success: true,
			message: 'User logged in successfully',
			user
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})
router.post('/contact', async (req, res) => {
	const { firstName,lastName,streetNumber,zip,city,state,country,isPublic,lat,long,owerID } = req.body

	// Simple validation
	if (!firstName || !lastName)
		return res
			.status(400)
			.json({ success: false, message: 'Missing Infor4mation' })

	try {
		const newContact = new Contact({ firstName,lastName,streetNumber,zip,city,state,country,isPublic,lat,long,owerID})
		await newContact.save()
		
		res.json({
			success: true,
			message: 'Create Contact successfully',
			newContactID: newContact._id,
			contact: newContact
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})
router.get('/contact', async (req, res) => {
	try {
		const contacts = await Contact.find()
		res.json({ success: true, contacts })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})
router.get('/contact/:contactsId',async (req, res) => {
	try {
		const contacts = await Contact.findById(req.params.contactsId)
		res.json({ success: true, contacts })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})
router.delete('/contact/:id',async (req, res) => {
	try {
		const ContactDeleteCondition = { _id: req.params.id }
		const deletedContact = await Contact.findOneAndDelete(ContactDeleteCondition)

		// User not authorised or post not found
		if (!deletedContact)
			return res.status(401).json({
				success: false,
				message: 'Contact not found'
			})

		res.status(204).json({ success: true, contact: deletedContact })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})
router.put('/contact/:id', async (req, res) => {
	const { firstName,lastName,streetNumber,zip,city,state,country,isPublic,lat,long,owerID } = req.body


	try {
		let updatedPost = {
			firstName,lastName,streetNumber,zip,city,state,country,isPublic,lat,long,owerID
		}

		const postUpdateCondition = { _id: req.params.id }

		updatedContact = await Contact.findOneAndUpdate(postUpdateCondition,updatedPost,
			{ new: true })
		// User not authorised to update post or post not found
		if (!updatedContact)
			return res.status(401).json({
				success: false,
				message: 'Contact not found'
			})

		res.status(204).json({
			success: true,
			message: 'Excellent progress!',
			contact: updatedContact
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

module.exports = router