/********************************************************************************
*  WEB322 – Assignment 03
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Dipsan Subedi Student ID: 178752234 Date: 02/18/025
*
********************************************************************************/
const express = require("express");
const projectData = require("./modules/projects");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public')); 
app.use(express.json()); 

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/home.html"));
});

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/about.html"));
});

app.get("/solutions/projects", async (req, res) => {
    try {
        const { sector } = req.query;
        let projects;
        
        if (sector) {
            projects = await projectData.getProjectsBySector(sector);
        } else {
            projects = await projectData.getAllProjects();
        }

        res.json({
            student: "Dipsan Subedi",
            id: "178752234",
            timestamp: new Date(),
            projects,
        });
    } catch (error) {
        res.status(404).json({
            error: error.message
        });
    }
});

app.get("/solutions/projects/:id", async (req, res) => {
    try {
        const project = await projectData.getProjectById(parseInt(req.params.id));
        res.json({
            student: "Dipsan Subedi",
            id: "178752234",
            timestamp: new Date(),
            project,
        });
    } catch (error) {
        res.status(404).json({
            error: error.message,
        });
    }
});

app.post("/post-request", (req, res) => {
    res.json({
        requestBody: req.body,
        student: "Dipsan Subedi",
        id: "178752234",
        timestamp: new Date()
    });
});

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "/views/404.html"));
});

projectData.initialize().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
    console.error("Failed to initialize project data", err);
});