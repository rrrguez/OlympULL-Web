import apiClient from "../apiClient";

const API = "http://localhost:3000/api/monitor";

function authHeaders() {
    const token = localStorage.getItem("token");

    return {
        headers: { Authorization: `Bearer ${token}` }
    };
}

export const getAllExercises = (monitor) =>
    apiClient.get(`${API}/exercises/${monitor}`, authHeaders());

export const getAllTeams = (itinerary) =>
    apiClient.get(`${API}/teams/${itinerary}`, authHeaders());

export const getRubric = (exercise) =>
    apiClient.get(`${API}/rubric/${exercise}`, authHeaders());

export const getAllPunctuations = (monitor) =>
    apiClient.get(`${API}/punctuations/${monitor}`, authHeaders());
