import createCrudService from "./createCrudService";

const DecisionService = createCrudService("http://localhost:8000/api/decisions");

export default DecisionService;
