import apiClient from "./apiClient";

const API = "http://localhost:3000/api/monitors";

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

export const deleteAssignation = (id, exercise, olympiad, itinerary) =>
    apiClient.delete(`${API}/${id}/${exercise}/${olympiad}/${itinerary}`, authHeaders());

export const importMonitors = (formData) =>
    apiClient.post(`${API}/import`, formData, authHeaders());

export const exportMonitors = () =>
    apiClient.get(`${API}/export`, {
        ...authHeaders(),
        responseType: "blob",
    });
