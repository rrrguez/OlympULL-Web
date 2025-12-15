import axios from "axios";

const API = "http://localhost:3000/api/admin/rubrics";

function authHeaders() {
    const token = localStorage.getItem("token");
    return {
        headers: { Authorization: `Bearer ${token}` }
    };
}

// Ejercicios enchufados
export const getAllRubrics = () => axios.get(API, authHeaders());
export const getRubric = (id) => axios.get(`${API}/${id}`, authHeaders());
export const createRubric = (data) => axios.post(API, data, authHeaders());
export const updateRubric = (id, data) => axios.put(`${API}/${id}`, data, authHeaders());
export const deleteRubric = (id) => axios.delete(`${API}/${id}`, authHeaders());
