import apiClient from "./apiClient";

const API = "http://localhost:3000/api/itineraries";

function authHeaders() {
    const token = localStorage.getItem("token");
    return {
        headers: { Authorization: `Bearer ${token}` }
    };
}

export const getAllItineraries = () =>
    apiClient.get(API, authHeaders());

export const getItinerary = (id) =>
    apiClient.get(`${API}/${id}`, authHeaders());

export const getItineraryByOlympiad = (olympiadId) =>
    apiClient.get(`${API}/olympiad/${olympiadId}`, authHeaders());

export const createItinerary = (data) =>
    apiClient.post(API, data, authHeaders());

export const updateItinerary = (id, data) =>
    apiClient.put(`${API}/${id}`, data, authHeaders());

export const deleteItinerary = (id) =>
    apiClient.delete(`${API}/${id}`, authHeaders());

export const importItineraries = (formData) =>
    apiClient.post(`${API}/import`, formData, authHeaders());

export const exportItineraries = () =>
    apiClient.get(`${API}/export`, {
        ...authHeaders(),
        responseType: "blob",
    });
