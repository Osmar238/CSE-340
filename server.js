import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import { testConnection } from './src/models/db.js';
import { getAllOrganizations } from './src/models/organizations.js';
import * as projectsModel from './src/models/projects.js';
import { getAllCategories } from './src/models/categories.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the application environment
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';

// Define the port number the server will listen on
const PORT = process.env.PORT || 3000;

const app = express();

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Tell Express where to find your templates
app.set('views', path.join(__dirname, 'src/views'));


/**
  * Configure Express middleware
  */

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));


/**
 * Routes
 */
app.get('/', async (req, res) => {
    const title = 'Home';
    res.render('home', { title });
});

app.get('/projects', async (req, res) => {
    try {
        const title = 'Service Projects';
        const projects = await projectsModel.getAllProjects();
        console.log("Proyectos obtenidos de la BD:", projects);
        res.render('projects', { title, projects }); 
        
    } catch (error) {
        console.error("Error al cargar los proyectos:", error);
        res.status(500).send("Error interno del servidor");
    }
});

app.get('/organizations', async (req, res) => {
    try {
        const title = 'Organizations';
        const organizations = await getAllOrganizations();
        console.log("Organizaciones obtenidas de la BD:", organizations);
        res.render('organizations', { title, organizations });
    } catch (error) {
        console.error("Error al cargar las organizaciones:", error);
        res.status(500).send("Error interno del servidor");
    }
});

app.get('/categories', async (req, res) => {
    try {
        const title = 'Service Project Categories';
        const categories = await getAllCategories();
        console.log("Categorías obtenidas de la BD:", categories);
        res.render('categories', { title, categories });

    } catch (error) {
        console.error("Error al cargar las categorías:", error);
        res.status(500).send("Error interno del servidor");
    }
});

app.listen(PORT, async () => {
  try {
    await testConnection();
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
});

