import createCrudService from "./createCrudService";

const CycleService = createCrudService("http://localhost:8000/api/cycles");

export default CycleService;
