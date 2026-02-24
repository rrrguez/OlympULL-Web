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

export const getPunctuation = (team, exercise, itinerary) =>
    apiClient.get(`${API}/punctuations/${team}/${exercise}/${itinerary}`, authHeaders());

export const punctuateTeam = (data) =>
    apiClient.post(API, data, authHeaders())

export const editPunctuation = ({team, exercise, itinerary, score}) =>
    apiClient.put(`${API}/${team}/${exercise}/${itinerary}`, {score}, authHeaders())

export const removePunctuation = (team, exercise, itinerary) =>
    apiClient.delete(`${API}/${team}/${exercise}/${itinerary}`, authHeaders())
