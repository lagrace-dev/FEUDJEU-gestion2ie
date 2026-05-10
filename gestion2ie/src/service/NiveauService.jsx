import createCrudService from "./createCrudService";

const NiveauService = createCrudService("http://localhost:8000/api/niveaux");

export default NiveauService;
