import apiClient from "../apiClient";

const API = "http://localhost:3000/api/admin/rubrics";

function authHeaders() {
    const token = localStorage.getItem("token");
    return {
        headers: { Authorization: `Bearer ${token}` }
    };
}

// Ejercicios enchufados
export const getAllRubrics = () =>
    apiClient.get(API, authHeaders());

export const getRubric = (id) =>
    apiClient.get(`${API}/${id}`, authHeaders());

export const createRubric = (data) =>
    apiClient.post(API, data, authHeaders());

export const updateRubric = (id, data) =>
    apiClient.put(`${API}/${id}`, data, authHeaders());

export const deleteRubric = (id) =>
    apiClient.delete(`${API}/${id}`, authHeaders());

export const importRubrics = (formData) =>
    apiClient.post(`${API}/import`, formData, authHeaders());

export const exportRubrics = () =>
    apiClient.get(`${API}/export`, {
        ...authHeaders(),
        responseType: "blob",
    });
