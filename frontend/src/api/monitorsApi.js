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
//export const updateMonitor = (id, data) => axios.put(`${API}/${id}`, data, authHeaders());
export const deleteAssignation = (id, exercise, olympiad, itinerary) => axios.delete(`${API}/${id}/${exercise}/${olympiad}/${itinerary}`, authHeaders());
export const importMonitors = (formData) => axios.post(`${API}/import`, formData, authHeaders());
export const exportMonitors = () => axios.get(`${API}/export`, {
    ...authHeaders(),
    responseType: "blob",
});
