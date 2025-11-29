import axios from "axios";

const API = "http://localhost:3000/api/exercises";

export const getAllExercises = () => axios.get(API);
export const getExercise = (id) => axios.get(`${API}/${id}`);
export const createExercise = (data) => axios.post(API, data);
export const updateExercise = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteExercise = (id) => axios.delete(`${API}/${id}`);
