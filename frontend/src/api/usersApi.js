import axios from "axios";

const API = "http://localhost:3000/api/admin/users";

function authHeaders() {
    const token = localStorage.getItem("token");

    return {
        headers: { Authorization: `Bearer ${token}` }
    };
}

export const getAllUsers = () => axios.get(API, authHeaders());
export const getUser = (id) => axios.get(`${API}/${id}`, authHeaders());
export const createUser = (data) => axios.post(API, data, authHeaders());
export const updateUser = (id, data) => axios.put(`${API}/${id}`, data, authHeaders());
export const deleteUser = (id) => axios.delete(`${API}/${id}`, authHeaders());
