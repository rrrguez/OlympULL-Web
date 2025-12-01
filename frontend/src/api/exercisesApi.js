import axios from "axios";

const API = "http://localhost:3000/api/exercises";

// Ejercicios enchufados
export const getAllPluggedInExercises = () => axios.get(API);
export const getPluggedInExercise = (id) => axios.get(`${API}/${id}`);
export const createPluggedInExercise = (data) => axios.post(API, data);
export const updatePluggedInExercise = (id, data) => axios.put(`${API}/${id}`, data);
export const deletePluggedInExercise = (id) => axios.delete(`${API}/${id}`);

// Ejercicios desenchufados
export const getAllUnpluggedExercises = () => axios.get(API);
export const getUnpluggedExercise = (id) => axios.get(`${API}/${id}`);
export const createUnpluggedExercise = (data) => axios.post(API, data);
export const updateUnpluggedExercise = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteUnpluggedExercise = (id) => axios.delete(`${API}/${id}`);
