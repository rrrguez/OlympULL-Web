import apiClient from "./apiClient";

const API = "http://localhost:3000/api/unplugged-exercises";

function authHeaders() {
    const token = localStorage.getItem("token");
    return {
        headers: { Authorization: `Bearer ${token}` }
    };
}

// Ejercicios desenchufados
export const getAllUnpluggedExercises = () =>
    apiClient.get(API, authHeaders());

export const getUnpluggedExercise = (id) =>
    apiClient.get(`${API}/${id}`, authHeaders());

export const createUnpluggedExercise = (data) =>
    apiClient.post(API, data, authHeaders());

export const updateUnpluggedExercise = (id, data) =>
    apiClient.put(`${API}/${id}`, data, authHeaders());

export const deleteUnpluggedExercise = (id) =>
    apiClient.delete(`${API}/${id}`, authHeaders());

export const importUnpluggedExercises = (formData) =>
    apiClient.post(`${API}/import`, formData, authHeaders());

export const exportUnpluggedExercises = () =>
    apiClient.get(`${API}/export`, {
        ...authHeaders(),
        responseType: "blob",
    });
