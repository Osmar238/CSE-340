// src/routes.js
import express from 'express';
import { showHomePage } from './controllers/index.js';
import { organizationsPage } from './controllers/organizations.js';
import { projectsPage } from './controllers/projects.js'; // Asumiendo que le pusiste este nombre
import { categoriesPage } from './controllers/categories.js'; // Asumiendo que le pusiste este nombre
import { testErrorPage } from './controllers/errors.js';
import { categoryDetailPage } from './controllers/categories.js';
import { projectDetailPage } from './controllers/projects.js';
import {
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    processNewOrganizationForm,
    organizationValidation,
    showEditOrganizationForm,
    processEditOrganizationForm
} from './controllers/organizations.js';
import { 
    // tus otras funciones...,
    showNewProjectForm, 
    processNewProjectForm, 
    projectValidation 
} from './controllers/projects.js';
import { showAssignCategoriesForm, processAssignCategoriesForm } from './controllers/categories.js';

const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', organizationsPage);
router.get('/projects', projectsPage);
router.get('/categories', categoriesPage);
router.get('/test-error', testErrorPage);
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/category/:id', categoryDetailPage);
router.get('/project/:id', projectDetailPage);
router.get('/new-organization', showNewOrganizationForm);
router.post('/new-organization', organizationValidation, processNewOrganizationForm);
router.get('/edit-organization/:id', showEditOrganizationForm);
router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm);
// Route for new project page
router.get('/new-project', showNewProjectForm);

// Route to handle new project form submission
router.post('/new-project', projectValidation, processNewProjectForm);
// Rutas para asignar categorías a un proyecto
router.get('/assign-categories/:projectId', showAssignCategoriesForm);
router.post('/assign-categories/:projectId', processAssignCategoriesForm);
export default router;