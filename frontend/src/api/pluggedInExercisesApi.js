import apiClient from "./apiClient";

const API = "http://localhost:3000/api/plugged-in-exercises";

function authHeaders() {
    const token = localStorage.getItem("token");
    return {
        headers: { Authorization: `Bearer ${token}` }
    };
}

// Ejercicios enchufados
export const getAllPluggedInExercises = () =>
    apiClient.get(API, authHeaders());

export const getPluggedInExercise = (id) =>
    apiClient.get(`${API}/${id}`, authHeaders());

export const createPluggedInExercise = (data) => {
    if (data instanceof FormData) {
        return apiClient.post(API, data, {
            headers: {
                ...authHeaders().headers
            }
        });
    }
    return apiClient.post(API, data, authHeaders());
}

export const updatePluggedInExercise = (id, data) => {
    if (data instanceof FormData) {
        return apiClient.put(`${API}/${id}`, data, {
            headers: {
                ...authHeaders().headers
            }
        });
    }
    return apiClient.put(`${API}/${id}`, data, authHeaders());
}

export const deletePluggedInExercise = (id) =>
    apiClient.delete(`${API}/${id}`, authHeaders());

export const importPluggedInExercises = (formData) =>
    apiClient.post(`${API}/import`, formData, authHeaders());

export const exportPluggedInExercises = () =>
    apiClient.get(`${API}/export`, {
        ...authHeaders(),
        responseType: "blob",
    });
