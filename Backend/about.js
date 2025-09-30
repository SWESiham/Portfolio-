const express = require('express')
const route = express.Router()
const mongoose = require('mongoose')
const uploads = require('./uploadsMiddleware');
const Aboutschema = new mongoose.Schema({
    title:  {
        type: String,
        required:true
    },
    description:  {
        type: String,
        required:true
    },
    yearsOfExperience:  {
        type: Number,
        required:true
    },
    jobTitle:  {
        type: String,
        required:true
    },
    imgURL: {
        type: String,
        required:true
    }
}, {
    timestamps:true
});
const About = mongoose.model('about', Aboutschema);

route.get('/', async (req, res) => {
    try {
        const about = await About.find({});
        res.status(200).json(about);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});
route.post('/',uploads.single('jobTitleImage'), async (req, res) => {
    try {
        let { title, description, imgURL, yearsOfExperience, jobTitle } = req.body;
        imgURL = req.file.filename;
        const newAbout = await About.create({ title, description, imgURL, yearsOfExperience, jobTitle });
        res.status(200).json(newAbout);

    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});

route.put('/:id',uploads.single('jobTitleImage'), async (req, res) => {
    try {
        let { title, description, imgURL, yearsOfExperience, jobTitle } = req.body;
        imgURL = req.file.filename;
        const updatedAbout = await About.findByIdAndUpdate
            (req.params.id, { title: title, description: description,imgURL:imgURL,yearsOfExperience:yearsOfExperience,jobTitle:jobTitle }, { new: true })
        res.status(200).json(updatedAbout);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});

module.exports = route;