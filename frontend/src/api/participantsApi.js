import axios from "axios";

const API = "http://localhost:3000/api/admin/monitors";

function authHeaders() {
    const token = localStorage.getItem("token");
    return {
        headers: { Authorization: `Bearer ${token}` }
    };
}

export const getAllParticipants = () => axios.get(API, authHeaders());
export const getParticipant = (id) => axios.get(`${API}/${id}`, authHeaders());
export const createParticipant = (data) => axios.post(API, data, authHeaders());
export const updateParticipant = (id, data) => axios.put(`${API}/${id}`, data, authHeaders());
export const deleteParticipant = (id) => axios.delete(`${API}/${id}`, authHeaders());
export const importParticipants = (formData) => axios.post(`${API}/import`, formData, authHeaders());
export const exportParticipants = () => axios.post(`${API}/export`, {
    ...authHeaders(),
    responseType: "blob",
});
