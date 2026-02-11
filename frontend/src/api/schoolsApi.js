import axios from "axios";

const API = "http://localhost:3000/api/admin/schools";

function authHeaders() {
    const token = localStorage.getItem("token");
    return {
        headers: { Authorization: `Bearer ${token}` }
    };
}

export const getAllSchools = () => axios.get(API, authHeaders());
export const getSchool = (id) => axios.get(`${API}/${id}`, authHeaders());
export const createSchool = (data) => axios.post(API, data, authHeaders());
export const updateSchool = (id, data) => axios.put(`${API}/${id}`, data, authHeaders());
export const deleteSchool = (id) => axios.delete(`${API}/${id}`, authHeaders());
export const importSchools = (formData) => axios.post(`${API}/import`, formData, authHeaders());
export const exportSchools = () => axios.get(`${API}/export`, {
    ...authHeaders(),
    responseType: "blob",
});
