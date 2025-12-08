import axios from "axios";

const API = "http://localhost:3000/api/admin/plugged-in-exercises";

function authHeaders() {
    const token = localStorage.getItem("token");
    console.log(token);
    return {
        headers: { Authorization: `Bearer ${token}` }
    };
}

// Ejercicios enchufados
export const getAllPluggedInExercises = () => axios.get(API, authHeaders());
export const getPluggedInExercise = (id) => axios.get(`${API}/${id}`, authHeaders());
export const createPluggedInExercise = (data) => axios.post(API, data, authHeaders());
export const updatePluggedInExercise = (id, data) => axios.put(`${API}/${id}`, data, authHeaders());
export const deletePluggedInExercise = (id) => axios.delet(`${API}/${id}`, authHeaders());
