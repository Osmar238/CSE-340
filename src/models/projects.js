import db from './db.js';

// 1. Exportamos la primera función directamente en su declaración
export const getAllProjects = async () => {
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
};

// 2. Exportamos la segunda función exactamente de la misma manera
export const getProjectsByOrganizationId = async (organizationId) => {
      const query = `
        SELECT
          project_id,
          organization_id,
          title,
          description,
          location,
          date
        FROM project
        WHERE organization_id = $1
        ORDER BY date;
      `;
      
      const queryParams = [organizationId];
      const result = await db.query(query, queryParams);

      return result.rows;
};

// ¡Ya no necesitamos ninguna lista de exportación aquí abajo!