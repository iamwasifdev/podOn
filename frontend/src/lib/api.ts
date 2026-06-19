import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5000",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;

export type LoginData = { email: string; password: string };
export type SignupData = { username: string; email: string; password: string };
export type AuthResponse = { token: string; user: { id: string; username: string; email: string } };

export const authApi = {
  login: (data: LoginData) =>
    api.post<AuthResponse>("/api/auth/login", data).then((r) => r.data),
  signup: (data: SignupData) =>
    api.post<AuthResponse>("/api/auth/signup", data).then((r) => r.data),
};
