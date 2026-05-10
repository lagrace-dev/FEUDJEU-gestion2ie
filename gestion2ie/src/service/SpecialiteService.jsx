import createCrudService from "./createCrudService";

const SpecialiteService = createCrudService("http://localhost:8000/api/specialites");

export default SpecialiteService;
