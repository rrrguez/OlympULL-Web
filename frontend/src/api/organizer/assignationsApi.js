import apiClient from "../apiClient";

const API = `${import.meta.env.VITE_BACKEND_URL}/organizer/assignations`;

function authHeaders() {
    const token = localStorage.getItem("token");
    return {
        headers: { Authorization: `Bearer ${token}` }
    };
}

export const getAllAssignations = (organizer) =>
    apiClient.get(`${API}/${organizer}`, authHeaders());

/**
export const getAssignationsOlympiads = (exercise) =>
    apiClient.get(`${API}/olympiads/${exercise}`, authHeaders());
*/

export const getAssignationsItineraries = (organizer) =>
    apiClient.get(`${API}/itineraries/${organizer}`, authHeaders());

export const createAssignation = (data) =>
    apiClient.post(API, data, authHeaders());

export const deleteAssignation = (exercise, olympiad, itinerary) =>
    apiClient.delete(`${API}/${exercise}/${olympiad}/${itinerary}`, authHeaders());
