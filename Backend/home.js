const express = require("express");
const projects = require('./projects');
const about = require('./about');
const experience = require('./experiences');
const service = require('./services');
const skill = require('./skills');
const contact = require('./contact');
const dashboard = require('./dashboard');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;
mongoose.connect(('mongodb://localhost:27017/portfolio')).then(_ => {
    console.log("DB is Connected sucessfully");
});
app.use(cors()); 
app.use(express.json());
app.use('/uploads', express.static('./uploads'));

app.use('/api/projects', projects);
app.use('/api/about', about);
app.use('/api/services', service);
app.use('/api/experience', experience);
app.use('/api/contact', contact);
app.use('/api/dashboard', dashboard);
app.use('/api/skills', skill);

app.listen(PORT, _ => {
    console.log(`server is running on Port ${PORT}`);
});