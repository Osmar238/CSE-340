import { getAllOrganizations } from '../models/organizations.js';
import { getProjectsByOrganizationId } from '../models/projects.js';

const organizationsPage = async (req, res) => {
    try {
        const title = 'Organizations';
        const organizations = await getAllOrganizations();
        console.log("Organizaciones obtenidas de la BD:", organizations);
        res.render('organizations', { title, organizations });
    } catch (error) {
        console.error("Error al cargar las organizaciones:", error);
        res.status(500).send("Error interno del servidor");
    }
};

const showOrganizationDetailsPage = async (req, res) => {
    const organizationId = req.params.id;
    const organizationDetails = await getOrganizationDetails(organizationId);
    const projects = await getProjectsByOrganizationId(organizationId);
    const title = 'Organization Details';

    res.render('organization', {title, organizationDetails, projects});
};

export { organizationsPage, showOrganizationDetailsPage };