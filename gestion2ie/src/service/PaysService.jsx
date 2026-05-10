import createCrudService from "./createCrudService";

const PaysService = createCrudService("http://localhost:8000/api/pays");

export default PaysService;
