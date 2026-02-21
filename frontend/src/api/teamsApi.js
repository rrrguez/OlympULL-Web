import apiClient from "./apiClient";

const API = "http://localhost:3000/api/teams";

function authHeaders() {
    const token = localStorage.getItem("token");
    return {
        headers: { Authorization: `Bearer ${token}` }
    };
}

export const getAllTeams = () =>
    apiClient.get(API, authHeaders());

export const getTeam = (id) =>
    apiClient.get(`${API}/${id}`, authHeaders());

export const createTeam = (data) =>
    apiClient.post(API, data, authHeaders());

export const updateTeam = (id, data) =>
    apiClient.put(`${API}/${id}`, data, authHeaders());

export const deleteTeam = (id) =>
    apiClient.delete(`${API}/${id}`, authHeaders());

export const importTeams = (formData) =>
    apiClient.post(`${API}/import`, formData, authHeaders());

export const exportTeams = () =>
    apiClient.get(`${API}/export`, {
        ...authHeaders(),
        responseType: "blob",
    });
