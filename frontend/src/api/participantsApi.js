import axios from "axios";

const API = "http://localhost:3000/api/admin/participants";

function authHeaders() {
    const token = localStorage.getItem("token");
    return {
        headers: { Authorization: `Bearer ${token}` }
    };
}

export const getAllParticipants = () => axios.get(API, authHeaders());
export const getParticipant = (id) => axios.get(`${API}/${id}`, authHeaders());
export const createParticipant = (data) => axios.post(API, data, authHeaders());
//export const updateParticipant = (id, data) => axios.put(`${API}/${id}`, data, authHeaders());
export const deleteParticipant = (id, school, itinerary) => axios.delete(`${API}/${id}/${school}/${itinerary}`, authHeaders());
export const importParticipants = (formData) => axios.post(`${API}/import`, formData, authHeaders());
export const exportParticipants = () => axios.get(`${API}/export`, {
    ...authHeaders(),
    responseType: "blob",
});
