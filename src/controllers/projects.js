import * as projectsModel from '../models/projects.js';

const NUMBER_OF_UPCOMING_PROJECTS = 5;

const projectsPage = async (req, res, next) => {
    try {
        const title = 'Upcoming Service Projects'; 
        
        const projects = await projectsModel.getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS); 
        
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