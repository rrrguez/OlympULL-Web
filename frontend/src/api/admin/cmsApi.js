import apiClient from "../apiClient";

const API = `${import.meta.env.VITE_BACKEND_URL}/admin/cms`;

function authHeaders() {
    const token = localStorage.getItem("token");
    return {
        headers: { Authorization: `Bearer ${token}` }
    };
}

export const deployToCms = async (commandVariant, olympiadId) => {
    return await apiClient.post(`${API}/deploy/${commandVariant}/${olympiadId}`, null, authHeaders());
}
