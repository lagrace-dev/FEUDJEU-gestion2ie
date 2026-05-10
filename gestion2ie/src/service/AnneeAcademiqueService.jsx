import createCrudService from "./createCrudService";

const AnneeAcademiqueService = createCrudService(
    "http://localhost:8000/api/annees-academiques"
);

export default AnneeAcademiqueService;
