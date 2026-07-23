import db from './db.js';

// 1. Traer todos los proyectos
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

// 2. Traer proyectos de una organización
export const getProjectsByOrganizationId = async (organizationId) => {
      const query = `
        SELECT
          project_id,
          organization_id,
          title,
          description,
          location,
          date
        FROM service_projects
        WHERE organization_id = $1
        ORDER BY date;
      `;
      const queryParams = [organizationId];
      const result = await db.query(query, queryParams);
      return result.rows;
};

// 3. Traer UN solo proyecto (para la página de detalles)
export const getProjectById = async (projectId) => {
    try {
        const query = `
            SELECT sp.project_id, sp.title, sp.description, sp.location, sp.date, o.name AS organization_name
            FROM service_projects sp
            INNER JOIN organization o ON sp.organization_id = o.organization_id
            WHERE sp.project_id = $1;
        `;
        const result = await db.query(query, [projectId]);
        return result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
        console.error("Error al buscar el proyecto:", error);
        throw error;
    }
};

// 4. Traer las categorías (etiquetas) de UN proyecto
export const getCategoriesByProjectId = async (projectId) => {
    try {
        const query = `
            SELECT c.category_id, c.name
            FROM categories c
            INNER JOIN project_categories pc ON c.category_id = pc.category_id
            WHERE pc.project_id = $1;
        `;
        const result = await db.query(query, [projectId]);
        return result.rows;
    } catch (error) {
        console.error("Error al cargar las etiquetas del proyecto:", error);
        throw error;
    }
};

// Traer los próximos "X" proyectos
export const getUpcomingProjects = async (numberOfProjects) => {
    try {
        const query = `
            SELECT sp.project_id, sp.title, sp.description, sp.location, sp.date, o.name AS organization_name
            FROM service_projects sp
            INNER JOIN organization o ON sp.organization_id = o.organization_id
            WHERE sp.date >= CURRENT_DATE
            ORDER BY sp.date ASC
            LIMIT $1;
        `;
        const result = await db.query(query, [numberOfProjects]);
        return result.rows;
    } catch (error) {
        console.error("Error al cargar los próximos proyectos:", error);
        throw error;
    }
};

export const createProject = async (title, description, location, date, organizationId) => {
    const query = `
      INSERT INTO service_projects (title, description, location, date, organization_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING project_id;
    `;

    const queryParams = [title, description, location, date, organizationId];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to create project');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new project with ID:', result.rows[0].project_id);
    }

    return result.rows[0].project_id;
}