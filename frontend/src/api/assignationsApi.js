import axios from "axios";

const API = "http://localhost:3000/api/admin/assignations";

function authHeaders() {
    const token = localStorage.getItem("token");
    return {
        headers: { Authorization: `Bearer ${token}` }
    };
}

export const getAllAssignations = () => axios.get(API, authHeaders());
export const getAssignationById = (id) => axios.get(`${API}/${id}`, authHeaders());
export const createAssignation = (data) => axios.post(API, data, authHeaders());
export const updateAssignation = (id, data) => axios.put(`${API}/${id}`, data, authHeaders());
export const deleteAssignation = (id) => axios.delete(`${API}/${id}`, authHeaders());
