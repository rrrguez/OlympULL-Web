import axios from "axios";

const API = "http://localhost:3000/api/admin/monitors";

function authHeaders() {
    const token = localStorage.getItem("token");
    return {
        headers: { Authorization: `Bearer ${token}` }
    };
}

export const getAllMonitors = () => axios.get(API, authHeaders());
export const getMonitor = (id) => axios.get(`${API}/${id}`, authHeaders());
export const createMonitor = (data) => axios.post(API, data, authHeaders());
export const updateMonitor = (id, data) => axios.put(`${API}/${id}`, data, authHeaders());
export const deleteMonitor = (id) => axios.delete(`${API}/${id}`, authHeaders());
export const importMonitors = (formData) => axios.post(`${API}/import`, formData, authHeaders());
export const exportMonitors = () => axios.post(`${API}/export`, {
    ...authHeaders(),
    responseType: "blob",
});
