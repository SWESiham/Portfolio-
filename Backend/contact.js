const express = require('express')
const mongoose = require('mongoose')
const route = express.Router()

const Contactschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        validate: {
            validator: (value) => {
                return /^\+[1-9]\d{7,14}$/.test(value);
            },
            message: 'Invalid phone number format',
        },
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: (value) => {
                return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);
            },
            message: 'Invalid email format',
        },
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Contact = mongoose.model('contacts', Contactschema);

route.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find({});
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ err: "contacts not found" });
    }
});

route.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const contacts = await Contact.findById(id);
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ err: "contacts not found" });
    }
});
// send a response for the sender
route.post('/',async (req, res) => {
    try {
        console.log(req. body);
        let { name, phoneNumber, email, subject, message } = req.body;
       
        
        const newContact = await Contact.create({ name, phoneNumber, email, subject, message });
        res.status(200).json(newContact);

    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});


route.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedContact = await Contact.findByIdAndDelete(id)
        const allContacts = await Contact.find();
        res.status(200).json(allContacts);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});


module.exports = route;