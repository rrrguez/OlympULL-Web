import apiClient from "./apiClient";

const API = "http://localhost:3000/api/users";

function authHeaders() {
    const token = localStorage.getItem("token");

    return {
        headers: { Authorization: `Bearer ${token}` }
    };
}

export const getAllUsers = () =>
    apiClient.get(API, authHeaders());

export const getUser = (id) =>
    apiClient.get(`${API}/${id}`, authHeaders());

export const getUserByType = (type) =>
    apiClient.get(`${API}/type/${type}`, authHeaders());

export const createUser = (data) =>
    apiClient.post(API, data, authHeaders());

export const updateUser = (id, data) =>
    apiClient.put(`${API}/${id}`, data, authHeaders());

export const updateUserPassword = (id, data) =>
    apiClient.put(`${API}/${id}/password`, data, authHeaders());

export const deleteUser = (id) =>
    apiClient.delete(`${API}/${id}`, authHeaders());

export const importUsers = (formData) =>
    apiClient.post(`${API}/import`, formData, authHeaders());

export const exportUsers = () =>
    apiClient.get(`${API}/export`, {
        ...authHeaders(),
        responseType: "blob",
    });
