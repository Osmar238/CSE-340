import * as projectsModel from '../models/projects.js';
// Importamos funciones del modelo de proyectos
import { createProject /* y las demás que ya tengas */ } from '../models/projects.js';
// Importamos la función para obtener organizaciones (para el menú desplegable)
import { getAllOrganizations } from '../models/organizations.js';
// Importamos el validador
import { body, validationResult } from 'express-validator';

const projectValidation = [
    body('title')
        .trim()
        .notEmpty().withMessage('Title is required')
        .isLength({ min: 3, max: 200 }).withMessage('Title must be between 3 and 200 characters'),
    body('description')
        .trim()
        .notEmpty().withMessage('Description is required')
        .isLength({ max: 1000 }).withMessage('Description must be less than 1000 characters'),
    body('location')
        .trim()
        .notEmpty().withMessage('Location is required')
        .isLength({ max: 200 }).withMessage('Location must be less than 200 characters'),
    body('date')
        .notEmpty().withMessage('Date is required')
        .isISO8601().withMessage('Date must be a valid date format'),
    body('organizationId')
        .notEmpty().withMessage('Organization is required')
        .isInt().withMessage('Organization must be a valid integer')
];

const showNewProjectForm = async (req, res) => {
    // Obtenemos las organizaciones para el dropdown
    const organizations = await getAllOrganizations();
    const title = 'Add New Service Project';
    res.render('new-project', { title, organizations });
};

const processNewProjectForm = async (req, res) => {
    // 1. Revisamos si hay errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        errors.array().forEach((error) => {
            req.flash('error', error.msg);
        });
        return res.redirect('/new-project');
    }

    // 2. Extraemos los datos
    const { title, description, location, date, organizationId } = req.body;
    
    try {
        // 3. Creamos el proyecto
        const newProjectId = await createProject(title, description, location, date, organizationId);
        req.flash('success', 'New service project created successfully!');
        res.redirect(`/project/${newProjectId}`); // Asegúrate de que esta ruta coincida con tu vista de detalles de proyecto
    } catch (error) {
        console.error('Error creating new project:', error);
        req.flash('error', 'There was an error creating the service project.');
        res.redirect('/new-project');
    }
};

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

export { projectsPage, projectDetailPage, createProject, showNewProjectForm, processNewProjectForm, projectValidation };