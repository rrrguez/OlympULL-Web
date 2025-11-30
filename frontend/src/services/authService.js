const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function login(username, password) {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || "Error de login");
  }

  const data = await response.json();
  localStorage.setItem("token", data.token);
  localStorage.setItem("type", data.type);
  localStorage.setItem("username", data.username);

  return data;
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("type");
  localStorage.removeItem("username");
}

export function getToken() {
  return localStorage.getItem("token");
}

export function getUserType() {
  return localStorage.getItem("type");
}
