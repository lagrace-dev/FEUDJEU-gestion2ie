import createCrudService from "./createCrudService";

const ParcoursService = createCrudService("http://localhost:8000/api/parcours");

export default ParcoursService;
