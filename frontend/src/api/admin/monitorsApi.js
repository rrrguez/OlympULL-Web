import apiClient from "../apiClient";

const API = `${import.meta.env.VITE_BACKEND_URL}/admin/monitors`;

function authHeaders() {
    const token = localStorage.getItem("token");
    return {
        headers: { Authorization: `Bearer ${token}` }
    };
}

export const getAllMonitors = () =>
    apiClient.get(API, authHeaders());

export const getMonitor = (id) =>
    apiClient.get(`${API}/${id}`, authHeaders());

export const createMonitor = (data) =>
    apiClient.post(API, data, authHeaders());

//export const updateMonitor = (id, data) => axios.put(`${API}/${id}`, data, authHeaders());

export const deleteAssignation = (id, exercise, itinerary) =>
    apiClient.delete(`${API}/${id}/${exercise}/${itinerary}`, authHeaders());

export const importMonitors = (formData) =>
    apiClient.post(`${API}/import`, formData, authHeaders());

export const exportMonitors = () =>
    apiClient.get(`${API}/export`, {
        ...authHeaders(),
        responseType: "blob",
    });
