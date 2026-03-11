import apiClient from "../apiClient";

const API = `${import.meta.env.VITE_BACKEND_URL}/admin/schools`;

function authHeaders() {
    const token = localStorage.getItem("token");
    return {
        headers: { Authorization: `Bearer ${token}` }
    };
}

export const getAllSchools = () =>
    apiClient.get(API, authHeaders());

export const getSchool = (id) =>
    apiClient.get(`${API}/${id}`, authHeaders());

export const createSchool = (data) =>
    apiClient.post(API, data, authHeaders());

export const duplicateSchool = (id) =>
    apiClient.post(`${API}/${id}/duplicate`, authHeaders());

export const updateSchool = (id, data) =>
    apiClient.put(`${API}/${id}`, data, authHeaders());

export const deleteSchool = (id) =>
    apiClient.delete(`${API}/${id}`, authHeaders());

export const importSchools = (formData) =>
    apiClient.post(`${API}/import`, formData, authHeaders());

export const exportSchools = () =>
    apiClient.get(`${API}/export`, {
        ...authHeaders(),
        responseType: "blob",
    });
