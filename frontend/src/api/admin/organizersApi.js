import apiClient from "../apiClient";

const API = "http://localhost:3000/api/admin/organizers";

function authHeaders() {
    const token = localStorage.getItem("token");
    return {
        headers: { Authorization: `Bearer ${token}` }
    };
}

export const getAllOrganizers = () =>
    apiClient.get(API, authHeaders());

export const getOrganizer = (id) =>
    apiClient.get(`${API}/${id}`, authHeaders());

export const createOrganizer = (data) =>
    apiClient.post(API, data, authHeaders());

//export const updateOrganizer = (id, data) => apiClient.put(`${API}/${id}`, data, authHeaders());

export const deleteOrganizer = (id, itinerary) =>
    apiClient.delete(`${API}/${id}/${itinerary}`, authHeaders());

export const importOrganizers = (formData) =>
    apiClient.post(`${API}/import`, formData, authHeaders());

export const exportOrganizers = () =>
    apiClient.get(`${API}/export`, {
        ...authHeaders(),
        responseType: "blob",
    });
