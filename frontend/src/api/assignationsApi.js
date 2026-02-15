import apiClient from "./apiClient";

const API = "http://localhost:3000/api/admin/assignations";

function authHeaders() {
    const token = localStorage.getItem("token");
    return {
        headers: { Authorization: `Bearer ${token}` }
    };
}

export const getAllAssignations = () =>
    apiClient.get(API, authHeaders());

export const getAssignationsOlympiads = (exercise) =>
    apiClient.get(`${API}/olympiads/${exercise}`, authHeaders());

export const getAssignationsItineraries = (exercise, olympiad) =>
    apiClient.get(`${API}/itineraries/${exercise}/${olympiad}`, authHeaders());

export const createAssignation = (data) =>
    apiClient.post(API, data, authHeaders());

export const deleteAssignation = (exercise, olympiad, itinerary) =>
    apiClient.delete(`${API}/${exercise}/${olympiad}/${itinerary}`, authHeaders());

export const importAssignations = (formData) =>
    apiClient.post(`${API}/import`, formData, authHeaders());

export const exportAssignations = () =>
    apiClient.get(`${API}/export`, {
        ...authHeaders(),
        responseType: "blob",
    });
