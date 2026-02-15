import apiClient from "./apiClient";

const API = "http://localhost:3000/api/admin/participants";

function authHeaders() {
    const token = localStorage.getItem("token");
    return {
        headers: { Authorization: `Bearer ${token}` }
    };
}

export const getAllParticipants = () =>
    apiClient.get(API, authHeaders());

export const getParticipant = (id) =>
    apiClient.get(`${API}/${id}`, authHeaders());

export const createParticipant = (data) =>
    apiClient.post(API, data, authHeaders());

//export const updateParticipant = (id, data) => apiClient.put(`${API}/${id}`, data, authHeaders());

export const deleteParticipant = (id, school, itinerary) =>
    apiClient.delete(`${API}/${id}/${school}/${itinerary}`, authHeaders());

export const importParticipants = (formData) =>
    apiClient.post(`${API}/import`, formData, authHeaders());

export const exportParticipants = () =>
    apiClient.get(`${API}/export`, {
        ...authHeaders(),
        responseType: "blob",
    });
