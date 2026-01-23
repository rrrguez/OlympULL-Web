import axios from "axios";

const API = "http://localhost:3000/api/admin/organizers";

function authHeaders() {
    const token = localStorage.getItem("token");
    return {
        headers: { Authorization: `Bearer ${token}` }
    };
}

export const getAllOrganizers = () => axios.get(API, authHeaders());
export const getOrganizer = (id) => axios.get(`${API}/${id}`, authHeaders());
export const createOrganizer = (data) => axios.post(API, data, authHeaders());
export const updateOrganizer = (id, data) => axios.put(`${API}/${id}`, data, authHeaders());
export const deleteOrganizer = (id) => axios.delete(`${API}/${id}`, authHeaders());
