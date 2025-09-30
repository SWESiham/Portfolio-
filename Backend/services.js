const express = require('express')
const route = express.Router()
const mongoose = require('mongoose')
const uploads = require('./uploadsMiddleware');
const Serviceschema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }, description: {
        type: String,
        required: true
    }, imgURL: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
const Service = mongoose.model('service', Serviceschema);

route.get('/', async (req, res) => {
    try {
        const services = await Service.find({});
        res.status(200).json(services);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});

route.post('/', uploads.single('serviceImage'), async (req, res) => {

    try {
        let { title, description, imgURL } = req.body;
        imgURL = req.file.filename;
        const newService = await Service.create({ title, description, imgURL });
        res.status(200).json(newService);

    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});


route.put('/:id', uploads.single('serviceImage'), async (req, res) => {
    try {
        let { title, description, imgURL } = req.body;
        imgURL = req.file.filename;
        const updatedService = await Service.findByIdAndUpdate
            (req.params.id, { title: title, description: description, imgURL: imgURL }, { new: true })
        res.status(200).json(updatedService);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});


route.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedService = await Service.findByIdAndDelete(id)
        const allServices = await Service.find();
        res.status(200).json(allServices);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});

module.exports = route;