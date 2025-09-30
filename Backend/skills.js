const express = require('express')
const route = express.Router()
const mongoose = require('mongoose')
const uploads = require('./uploadsMiddleware');
const Skillschema = new mongoose.Schema({
    title:  {
        type: String,
        required:true
    },
    imgURL: {
        type: String,
        required: true,
        unique:false
    }
}, {
    timestamps:true
});
const Skills = mongoose.model('skill', Skillschema);

route.get('/', async (req, res) => {
    try {
        const skills = await Skills.find({});
        res.status(200).json(skills);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});

route.post('/', uploads.single('skillImage'), async (req, res) => {
   
    try {
        let { title,imgURL } = req.body;
        imgURL = req.file.filename;
        const newSkill = await Skills.create({title,imgURL});
        res.status(200).json(newSkill);

    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});


route.put('/:id',uploads.single('skillImage'), async (req, res) => {
    try {
        let { title, imgURL } = req.body;
        imgURL = req.file.filename;
        const updatedSkill = await Skills.findByIdAndUpdate
            (req.params.id, { title: title,imgURL:imgURL }, { new: true })
        res.status(200).json(updatedSkill);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});


route.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedSkill = await Skills.findByIdAndDelete(id)
        const allSkills = await Skills.find();
        res.status(200).json(allSkills);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});

module.exports = route;