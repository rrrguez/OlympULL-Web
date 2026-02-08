import axios from "axios";

const API = "http://localhost:3000/api/admin/unplugged-exercises";

function authHeaders() {
    const token = localStorage.getItem("token");
    return {
        headers: { Authorization: `Bearer ${token}` }
    };
}

// Ejercicios desenchufados
export const getAllUnpluggedExercises = () => axios.get(API, authHeaders());
export const getUnpluggedExercise = (id) => axios.get(`${API}/${id}`, authHeaders());
export const createUnpluggedExercise = (data) => axios.post(API, data, authHeaders());
export const updateUnpluggedExercise = (id, data) => axios.put(`${API}/${id}`, data, authHeaders());
export const deleteUnpluggedExercise = (id) => axios.delete(`${API}/${id}`, authHeaders());
export const importUnpluggedExercises = (formData) => axios.post(`${API}/import`, formData, authHeaders());
export const exportUnpluggedExercises = () => axios.get(`${API}/export`, {
    ...authHeaders(),
    responseType: "blob",
});
