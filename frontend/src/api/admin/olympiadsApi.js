import apiClient from "../apiClient";

const API = `${import.meta.env.VITE_BACKEND_URL}/admin/olympiads`;

function authHeaders() {
    const token = localStorage.getItem("token");

    return {
        headers: { Authorization: `Bearer ${token}` }
    };
}

export const getAllOlympiads = () =>
    apiClient.get(API, authHeaders());

export const getOlympiad = (id) =>
    apiClient.get(`${API}/${id}`, authHeaders());

export const createOlympiad = (data) =>
    apiClient.post(API, data, authHeaders());

export const duplicateOlympiad = (id) =>
    apiClient.post(`${API}/${id}/duplicate`, authHeaders());

export const updateOlympiad = (id, data) =>
    apiClient.put(`${API}/${id}`, data, authHeaders());

export const deleteOlympiad = (id) =>
    apiClient.delete(`${API}/${id}`, authHeaders());

export const importOlympiads = (formData) =>
    apiClient.post(`${API}/import`, formData, authHeaders());

export const exportOlympiads = () =>
    apiClient.get(`${API}/export`, {
        ...authHeaders(),
        responseType: "blob",
    });
