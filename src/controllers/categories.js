import { getAllCategories, getCategoryById, getProjectsByCategory, updateCategoryAssignments } from '../models/categories.js';
// AQUÍ agregamos getCategoriesByProjectId
import { getProjectById, getCategoriesByProjectId } from '../models/projects.js';

const categoriesPage = async (req, res) => {
    try {
        const title = 'Service Project Categories';
        const categories = await getAllCategories();
        res.render('categories', { title, categories });
    } catch (error) {
        console.error("Error al cargar las categorías:", error);
        res.status(500).send("Error interno del servidor");
    }
};

const categoryDetailPage = async (req, res, next) => {
    try {
        const categoryId = req.params.id;
        const category = await getCategoryById(categoryId);
        
        if (!category) {
            const err = new Error('Category not found');
            err.status = 404;
            return next(err);
        }

        const projects = await getProjectsByCategory(categoryId);
        res.render('category', { title: category.name, category, projects });
        
    } catch (error) {
        next(error);
    }
};

const showAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;

    // Obtenemos todos los datos necesarios
    const projectDetails = await getProjectById(projectId); 
    const categories = await getAllCategories();
    
    // AQUÍ usamos el nombre correcto de tu función
    const assignedCategories = await getCategoriesByProjectId(projectId);

    const title = 'Assign Categories to Project';

    res.render('assign-categories', { title, projectId, projectDetails, categories, assignedCategories });
};

const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const selectedCategoryIds = req.body.categoryIds || [];
    
    // Nos aseguramos de que sea un arreglo (por si el usuario solo selecciona 1 checkbox)
    const categoryIdsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];
    
    await updateCategoryAssignments(projectId, categoryIdsArray);
    
    req.flash('success', 'Categories updated successfully.');
    res.redirect(`/project/${projectId}`);
};

export { categoriesPage, categoryDetailPage, showAssignCategoriesForm, processAssignCategoriesForm };