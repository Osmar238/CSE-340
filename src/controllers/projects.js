import * as projectsModel from '../models/projects.js';

const projectsPage = async (req, res, next) => {
    try {
        const title = 'Service Projects';
        const projects = await projectsModel.getAllProjects(); 
        res.render('projects', { title, projects }); 
    } catch (error) {
        next(error);
    }
};

const projectDetailPage = async (req, res, next) => {
    try {
        const projectId = req.params.id;
        const project = await projectsModel.getProjectById(projectId);
        
        if (!project) {
            const err = new Error('Project not found');
            err.status = 404;
            return next(err);
        }

        // Traemos las etiquetas de este proyecto
        const categories = await projectsModel.getCategoriesByProjectId(projectId);

        res.render('project', { title: project.title, project, categories });
        
    } catch (error) {
        next(error);
    }
};

export { projectsPage, projectDetailPage };