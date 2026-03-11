import apiClient from "../apiClient";

const API = `${import.meta.env.VITE_BACKEND_URL}/organizer/exercises`;

function authHeaders() {
    const token = localStorage.getItem("token");
    return {
        headers: { Authorization: `Bearer ${token}` }
    };
}

// Ejercicios desenchufados
export const getAllUnpluggedExercises = () =>
    apiClient.get(`${API}/unplugged`, authHeaders());

// Ejercicios enchufados
export const getAllPluggedInExercises = () =>
    apiClient.get(`${API}/plugged-in`, authHeaders());
