import { getAllCategories } from '../models/categories.js';

const categoriesPage = async (req, res) => {
    try {
        const title = 'Service Project Categories';
        const categories = await getAllCategories();
        console.log("Categorías obtenidas de la BD:", categories);
        res.render('categories', { title, categories });

    } catch (error) {
        console.error("Error al cargar las categorías:", error);
        res.status(500).send("Error interno del servidor");
    }
};

export { categoriesPage };