import apiClient from "../apiClient";

const API = "http://localhost:3000/api/admin/schools";

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
