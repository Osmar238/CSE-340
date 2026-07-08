import * as projectsModel from '../models/projects.js';

const projectsPage = async (req, res, next) => {
    try {
        const title = 'Service Projects';
        // Aquí es donde Node.js lloraba porque no encontraba a projectsModel
        const projects = await projectsModel.getAllProjects(); 
        console.log("Proyectos obtenidos de la BD:", projects);
        res.render('projects', { title, projects }); 
        
    } catch (error) {
        console.error("Error al cargar los proyectos:", error);
        error.status = 500;
        next(error);
    }
};

export { projectsPage };