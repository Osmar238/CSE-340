import db from './db.js';

export async function getAllCategories() {
    try {
        const sql = 'SELECT category_id, name FROM categories ORDER BY name ASC';
        const result = await db.query(sql);
        return result.rows;
    } catch (error) {
        console.error("Error en getAllCategories model:", error);
        throw error;
    }
}