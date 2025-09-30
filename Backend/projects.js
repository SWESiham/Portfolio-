const express = require('express');
const mongoose = require('mongoose');
const uploads = require('./uploadsMiddleware');
const route = express.Router();

const Projectschema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    language: {
        type: [String],
        required: true
    },
    imgURL: {
        type: String,
        unique: false,
        required: true
    },
    githubUrl: {
        type: String,
        required: true
    },
    demo: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["completed", "in_progress", "soon", "private"],
        default: "in_progress",
        required: true
    },
    category: {
        type: String,
        required: true
    },
}, {
    timestamps: true,
});

const Project = mongoose.model('projects', Projectschema);

route.get('/', async (req, res) => {
    try {
        const projects = await Project.find({});
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ err: "Projects not found" });
    }

});

route.get('/:id', async (req, res) => {

    try {
        const id = req.params.id;
        const projects = await Project.findById(id);
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ err: "Project not found" });

    }

});

route.post('/', uploads.single('projectImage'), async (req, res) => {
   
    try {
        let { title, description, language, imgURL, status, category, githubUrl, demo } = req.body;
        language = JSON.parse(language);
        imgURL = req.file.filename;
        const newProject = await Project.create({ title, description, language, imgURL, status, category, githubUrl, demo });
        res.status(200).json(newProject);

    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});



route.put('/:id', uploads.single('projectImage'), async (req, res) => {
    try {
        let { title, description, language, imgURL, status, category, githubUrl, demo } = req.body;
        language = JSON.parse(language);
    
        imgURL = req.file.filename;
        const updatedProject = await Project.findByIdAndUpdate
            (req.params.id, { title: title, description: description, language: language, imgURL: imgURL, githubUrl: githubUrl, demo: demo, status: status, category: category }, { new: true })
        res.status(200).json(updatedProject);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});

route.delete('/:id', uploads.single('projectImage'), async (req, res) => {
    try {
        const id = req.params.id;
        const deletedProject = await Project.findByIdAndDelete(id)
        const allProjects = await Project.find();
        res.status(200).json(allProjects);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});





module.exports = route;