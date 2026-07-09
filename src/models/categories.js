import db from './db.js';

// Recuperar TODAS las categorías
export const getAllCategories = async () => {
    try {
        const query = `SELECT * FROM categories ORDER BY name;`;
        const result = await db.query(query);
        return result.rows;
    } catch (error) {
        console.error("Error al cargar categorías:", error);
        throw error;
    }
};

// Recuperar una sola categoría por su ID
export const getCategoryById = async (categoryId) => {
    try {
        const query = `SELECT * FROM categories WHERE category_id = $1;`;
        const result = await db.query(query, [categoryId]);
        return result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
        console.error("Error al buscar la categoría:", error);
        throw error;
    }
};

// Recuperar todos los proyectos de UNA categoría
export const getProjectsByCategory = async (categoryId) => {
    try {
        const query = `
            SELECT sp.project_id, sp.title, sp.description, sp.location, sp.date
            FROM service_projects sp
            INNER JOIN project_categories pc ON sp.project_id = pc.project_id
            WHERE pc.category_id = $1
            ORDER BY sp.date;
        `;
        const result = await db.query(query, [categoryId]);
        return result.rows;
    } catch (error) {
        console.error("Error al cargar proyectos de la categoría:", error);
        throw error;
    }
};