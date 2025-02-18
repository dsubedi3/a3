const projectData = require("../data/projectData");
const sectorData = require("../data/sectorData");

let projects = [];

function initialize() {
    return new Promise((resolve, reject) => {
        try {
            projects = [];
            projectData.forEach(project => {
                let sector = sectorData.find(s => s.id === project.sector_id);
                projects.push({ ...project, sector: sector ? sector.sector_name : "Unknown" });
            });
            resolve();
        } catch (err) {
            reject("Error initializing project data");
        }
    });
}

function getAllProjects() {
    return new Promise((resolve, reject) => {
        projects.length ? resolve(projects) : reject("No projects available");
    });
}

function getProjectById(projectId) {
    return new Promise((resolve, reject) => {
        let project = projects.find(p => p.id === projectId);
        project ? resolve(project) : reject("Project not found");
    });
}

function getProjectsBySector(sector) {
    return new Promise((resolve, reject) => {
        let filteredProjects = projects.filter(p => p.sector.toLowerCase().includes(sector.toLowerCase()));
        filteredProjects.length ? resolve(filteredProjects) : reject("No projects found for this sector");
    });
}

module.exports = { initialize, getAllProjects, getProjectById, getProjectsBySector };
