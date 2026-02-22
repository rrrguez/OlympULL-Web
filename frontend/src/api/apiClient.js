import axios from "axios";
import { logout } from "../services/authService";
import { toast } from "react-toastify";
import { redirectToLogin } from "../utils/redirect";

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
        if (error.response?.status === 401) {
            document.body.style.cursor = "wait";
            logout();
            toast.info("La sesión ha expirado. Vuelve a iniciar sesión.");
            redirectToLogin();
        } else if (error.response?.status === 403) {
            toast.info("No tienes permisos para acceder a esta información")
        }
        return Promise.reject(error);
    }
);

export default apiClient;
