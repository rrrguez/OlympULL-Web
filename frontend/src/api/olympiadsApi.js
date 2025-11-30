import axios from "axios";

const API = "http://localhost:3000/api/admin/olympiads";

function authHeaders() {
    const token = localStorage.getItem("token");
    console.log(token);
    return {
        headers: { Authorization: `Bearer ${token}` }
    };
}

export const getAllOlympiads = () => axios.get(API, authHeaders());
export const getOlympiad = (id) => axios.get(`${API}/${id}`, authHeaders());
export const createOlympiad = (data) => axios.post(API, data, authHeaders());
export const updateOlympiad = (id, data) => axios.put(`${API}/${id}`, data, authHeaders());
export const deleteOlympiad = (id) => axios.delete(`${API}/${id}`, authHeaders());
