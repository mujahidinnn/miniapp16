import axios from "axios";

export const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 100000,
});

request.interceptors.request.use((config) => {
  if (!config.headers) {
    config.headers = {};
  }

  const token = localStorage.getItem("token");

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
    config.headers["Accept-Language"] = "application/json";
  }

  return config;
});

request.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    const errorResponse = err.response.data;
    const errorStatusCode = err.response.status;

    const isInternalError = [400, 422, 409];

    if (isInternalError.includes(errorStatusCode)) {
      alert(errorResponse?.message?.errors || errorResponse?.message);
    }

    if (errorStatusCode === 500) {
      alert(
        "Terjadi kesalahan dari internal server, silakan coba lagi nanti !"
      );
    }

    return Promise.reject(err);
  }
);
