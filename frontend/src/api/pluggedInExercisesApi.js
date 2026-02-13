import axios from "axios";

const API = "http://localhost:3000/api/admin/plugged-in-exercises";

function authHeaders() {
    const token = localStorage.getItem("token");
    return {
        headers: { Authorization: `Bearer ${token}` }
    };
}

// Ejercicios enchufados
export const getAllPluggedInExercises = () => axios.get(API, authHeaders());
export const getPluggedInExercise = (id) => axios.get(`${API}/${id}`, authHeaders());
export const createPluggedInExercise = (data) => {
    if (data instanceof FormData) {
        return axios.post(API, data, {
            headers: {
                ...authHeaders().headers
            }
        });
    }
    return axios.post(API, data, authHeaders());
}
export const updatePluggedInExercise = (id, data) => {
    if (data instanceof FormData) {
        return axios.put(`${API}/${id}`, data, {
            headers: {
                ...authHeaders().headers
            }
        });
    }
    return axios.put(`${API}/${id}`, data, authHeaders());
}
export const deletePluggedInExercise = (id) => axios.delete(`${API}/${id}`, authHeaders());
export const importPluggedInExercises = (formData) => axios.post(`${API}/import`, formData, authHeaders());
export const exportPluggedInExercises = () => axios.get(`${API}/export`, {
    ...authHeaders(),
    responseType: "blob",
});
