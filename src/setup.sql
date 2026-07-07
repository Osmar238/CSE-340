-- 1. ORGANIZATION TABLE (Created in the previous activity)
CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    email VARCHAR(150),
    logo_path VARCHAR(100)
);

-- Sample data for Organizations
INSERT INTO organization (organization_id, name, description, email, logo_path) VALUES
(1, 'BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
(2, 'GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
(3, 'UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png')
ON CONFLICT (organization_id) DO NOTHING;


-- 2. SERVICE PROJECTS TABLE (Team Activity)
CREATE TABLE service_projects (
    project_id SERIAL PRIMARY KEY,
    organization_id INT REFERENCES organization(organization_id),
    title VARCHAR(250),
    description TEXT,
    location VARCHAR(250),
    date DATE
);

-- Sample data for Projects
INSERT INTO service_projects (organization_id, title, description, location, date) VALUES
-- BrightFuture Builders (ID: 1)
(1, 'Playground Renovation', 'Rebuilding and painting the local park playground structures for child safety.', 'City Park', '2026-07-20'),
(1, 'Community Center Roof Repair', 'Installing new sustainable solar shingles on the local community center.', 'Downtown Community Center', '2026-07-25'),
(1, 'Wheelchair Ramp Installation', 'Building accessible wooden ramps for elderly residents in the neighborhood.', 'Southside Neighborhood', '2026-08-01'),
(1, 'Library Shelving Build', 'Constructing new bookshelves using recycled wood for the public library expansion.', 'Main Public Library', '2026-08-10'),
(1, 'Sidewalk Restoration', 'Repairing cracked sidewalks to improve pedestrian safety and mobility.', 'Elm Street', '2026-08-18'),

-- GreenHarvest Growers (ID: 2)
(2, 'Community Garden Planting', 'Sowing seasonal vegetables and herbs in the neighborhood shared garden.', 'Westside Green Space', '2026-07-22'),
(2, 'Composting Workshop', 'Teaching local residents how to build and maintain home compost bins.', 'GreenHarvest Headquarters', '2026-07-28'),
(2, 'Farmers Market Setup', 'Assisting with the setup, logistics, and operation of the weekend organic market.', 'Central Square', '2026-08-05'),
(2, 'School Greenhouse Construction', 'Assembling a small greenhouse for educational purposes at an elementary school.', 'Lincoln Elementary', '2026-08-12'),
(2, 'Harvest Festival Volunteer', 'Harvesting ripe crops and packaging them for distribution to local families.', 'Eastside Urban Farm', '2026-08-20'),

-- UnityServe Volunteers (ID: 3)
(3, 'Food Bank Sorting', 'Sorting, inspecting, and boxing donated non-perishable food items.', 'Regional Food Bank', '2026-07-24'),
(3, 'Senior Center Game Night', 'Hosting a board game night and socializing with elderly community residents.', 'Sunrise Senior Living', '2026-07-30'),
(3, 'Winter Coat Drive', 'Organizing, cleaning, and distributing winter coats to families in need.', 'City Hall Annex', '2026-08-08'),
(3, 'Charity 5K Run Staffing', 'Managing registration tables, giving directions, and running water stations.', 'Riverfront Trail', '2026-08-15'),
(3, 'After-School Tutoring', 'Providing reading and basic math assistance to middle school students.', 'Youth Center', '2026-08-22');


-- 3. CATEGORIES TABLE (Individual Assignment)
CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

--Categories
INSERT INTO categories (name) VALUES
('Environmental'),
('Educational'),
('Community Service'),
('Health and Wellness');


-- 4. JUNCTION TABLE - MANY TO MANY
CREATE TABLE project_categories (
    project_id INT REFERENCES service_projects(project_id),
    category_id INT REFERENCES categories(category_id),
    PRIMARY KEY (project_id, category_id)
);

--Projects to Categories
INSERT INTO project_categories (project_id, category_id) VALUES
(1, 3), (2, 3), (3, 3), (3, 4), (4, 2), (4, 3), (5, 3), -- Projects 1-5
(6, 1), (6, 3), (7, 1), (7, 2), (8, 1), (9, 1), (9, 2), (10, 3), -- Projects 6-10
(11, 3), (12, 3), (12, 4), (13, 3), (14, 3), (14, 4), (15, 2); -- Projects 11-15