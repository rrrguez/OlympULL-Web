import axios from "axios";

const API = "http://localhost:3000/api/admin/assignations";

function authHeaders() {
    const token = localStorage.getItem("token");
    return {
        headers: { Authorization: `Bearer ${token}` }
    };
}

export const getAllAssignations = () => axios.get(API, authHeaders());
export const getAssignationsOlympiads = (exercise) => axios.get(`${API}/olympiads/${exercise}`, authHeaders());
export const getAssignationsItineraries = (exercise, olympiad) => axios.get(`${API}/itineraries/${exercise}/${olympiad}`, authHeaders());
export const createAssignation = (data) => axios.post(API, data, authHeaders());
export const deleteAssignation = (id) => axios.delete(`${API}/${id}`, authHeaders());
export const importAssignations = (formData) => axios.post(`${API}/import`, formData, authHeaders());
export const exportAssignations = () => axios.post(`${API}/export`, {
    ...authHeaders(),
    responseType: "blob",
});
