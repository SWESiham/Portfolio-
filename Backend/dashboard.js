const express = require('express')
const mongoose = require('mongoose');
const route = express.Router()
const uploads = require('./uploadsMiddleware');
const Dashbordschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    }, title: {
        type: String,
        required: true,

    },
    description: {
        type: String,
        required: true,
    },
    githubURL: {
        type: String,
        required: true,
    }, linkedin: {
        type: String,
        required: true,
    }, email: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: (value) => {
                return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);
            },
            message: 'Invalid email format',
        },
    }, CV: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

const Dashboard = mongoose.model('dashboard', Dashbordschema);

route.get('/', async (req, res) => {
    try {
        const dashboard = await Dashboard.findOne({});
        res.status(200).json(dashboard);
    } catch (error) {
        res.status(500).json({ err: "profile not found" });
    }
});

route.post('/', uploads.single('cvfile'), async (req, res) => {
    try {
        let { name, title, description, email, githubURL, linkedin, CV } = req.body;
        CV = req.file.path;
        const newDashboard = await Dashboard.create({ name, title, description, email, githubURL, linkedin, CV });
        res.status(200).json(newDashboard);

    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});


route.put('/:id', uploads.single('cvfile'), async (req, res) => {
    try {
        let { name, title, description, email, githubURL, linkedin, CV } = req.body;
        if (req.file) {
            CV = req.file.path;
          }
        const updatedInfo = await Dashboard.findByIdAndUpdate
            (req.params.id, { name: name, title: title, description: description, email: email, githubURL: githubURL, linkedin: linkedin, ...(req.file && {CV})}, { new: true })
        res.status(200).json(updatedInfo);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});


route.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedInfo = await Dashboard.findByIdAndDelete(id)
        const allInfo = await Dashboard.find();
        res.status(200).json(allInfo);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});


module.exports = route;