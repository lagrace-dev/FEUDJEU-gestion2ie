import axios from "axios";

/**
 * Crée un service CRUD axios pour une ressource.
 *  ex: createCrudService("http://localhost:8000/api/pays")
 */
export default function createCrudService(baseUrl) {
    return {
        getAll: () => axios.get(baseUrl),
        getById: (id) => axios.get(`${baseUrl}/${id}`),
        create: (data) => axios.post(baseUrl, data),
        update: (id, data) => axios.put(`${baseUrl}/${id}`, data),
        remove: (id) => axios.delete(`${baseUrl}/${id}`),
    };
}
