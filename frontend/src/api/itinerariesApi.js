import axios from "axios";

const API = "http://localhost:3000/api/admin/itineraries";

function authHeaders() {
    const token = localStorage.getItem("token");
    return {
        headers: { Authorization: `Bearer ${token}` }
    };
}

export const getAllItineraries = () => axios.get(API, authHeaders());
export const getItinerary = (id) => axios.get(`${API}/${id}`, authHeaders());
export const getItineraryByOlympiad = (olympiadId) =>
    axios.get(`${API}/olympiad/${olympiadId}`, authHeaders());
export const createItinerary = (data) => axios.post(API, data, authHeaders());
export const updateItinerary = (id, data) => axios.put(`${API}/${id}`, data, authHeaders());
export const deleteItinerary = (id) => axios.delete(`${API}/${id}`, authHeaders());
export const importItineraries = (formData) => axios.post(`${API}/import`, formData, authHeaders());
export const exportItineraries = () => axios.get(`${API}/export`, {
    ...authHeaders(),
    responseType: "blob",
});
