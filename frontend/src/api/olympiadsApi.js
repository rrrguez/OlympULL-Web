import axios from "axios";

const API = "http://localhost:3000/api/olympiads";

export const getAllOlympiads = () => axios.get(API);
export const getOlympiad = (id) => axios.get(`${API}/${id}`);
export const createOlympiad = (data) => axios.post(API, data);
export const updateOlympiad = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteOlympiad = (id) => axios.delete(`${API}/${id}`);
