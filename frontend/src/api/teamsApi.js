import axios from "axios";

const API = "http://localhost:3000/api/admin/teams";

function authHeaders() {
    const token = localStorage.getItem("token");
    return {
        headers: { Authorization: `Bearer ${token}` }
    };
}

// Ejercicios enchufados
export const getAllTeams = () => axios.get(API, authHeaders());
export const getTeam = (id) => axios.get(`${API}/${id}`, authHeaders());
export const createTeam = (data) => axios.post(API, data, authHeaders());
export const updateTeam = (id, data) => axios.put(`${API}/${id}`, data, authHeaders());
export const deleteTeam = (id) => axios.delete(`${API}/${id}`, authHeaders());
