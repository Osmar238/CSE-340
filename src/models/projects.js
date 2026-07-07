import db from './db.js';

export async function getAllProjects() {
    try {
        const sql = `
            SELECT sp.project_id, sp.title, sp.description, sp.location, sp.date, o.name AS organization_name
            FROM service_projects sp
            INNER JOIN organization o ON sp.organization_id = o.organization_id
        `;
        const result = await db.query(sql); 
        return result.rows; 
    } catch (error) {
        console.error("Error en getAllProjects model:", error);
        throw error;
    }
}