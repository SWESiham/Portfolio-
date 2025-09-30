const express = require('express')
const mongoose = require('mongoose')
const uploads = require('./uploadsMiddleware');
const route = express.Router()
const Experienceschema = new mongoose.Schema({
    companyName: {
        type: String,
        required:true
    },
    companyURL:  {
        type: String,
        required:true
    },
    companyImgURL: {
        type: String,
        required: true,
        unique:false
    },
    companyJobTitle:  {
        type: String,
        required:true
    },
    startDate:  {
        type: String,
        required:true
    },
    endDate: {
        type: String,
        required:true
    }
}, {
    timestamps:true
});
const Experience = mongoose.model('experience', Experienceschema);

route.get('/', async (req, res) => {
    try {
    const experience = await Experience.find({});
        res.status(200).json(experience);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});


route.post('/', uploads.single('companyImgURL'), async (req, res) => {
    try {
        let { companyName, companyURL,companyImgURL, companyJobTitle, startDate, endDate } = req.body;
        companyImgURL = req.file.filename;
        const newExperience = await Experience.create({companyName,companyURL,companyImgURL,companyJobTitle,startDate, endDate});
        res.status(200).json(newExperience);

    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});

route.put('/:id',uploads.single('companyImgURL'), async (req, res) => {
    try {
        let { companyName, companyURL,companyImgURL, companyJobTitle, startDate, endDate } = req.body;
        companyImgURL = req.file.filename;
        const updatedExperience = await Experience.findByIdAndUpdate
            (req.params.id, {companyName:companyName,companyURL:companyURL,companyImgURL:companyImgURL,companyJobTitle:companyJobTitle,startDate:startDate, endDate:endDate}, { new: true })
        res.status(200).json(updatedExperience);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});

route.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedExperience = await Experience.findByIdAndDelete(id)
        const allExperiences = await Experience.find();
        res.status(200).json(allExperiences);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});

module.exports = route;