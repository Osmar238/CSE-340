import { getAllCategories, getCategoryById, getProjectsByCategory } from '../models/categories.js';

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

export { categoriesPage, categoryDetailPage };