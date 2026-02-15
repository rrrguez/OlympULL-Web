import axios from "axios";
import { logout } from "../services/authService";
import { toast } from "react-toastify";

const apiClient = axios.create({
    baseURL: "http://localhost:3000",
});

// Attach token automatically
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// Catch expired/invalid tokens globally
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            logout();
            toast.info("La sesión ha expirado. Por favor, vuelve a iniciar sesión.");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default apiClient;
