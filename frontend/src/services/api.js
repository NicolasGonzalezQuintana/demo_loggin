import axios from "axios";

// Lee una cookie por nombre (csrftoken)
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

export const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true, // IMPORTANTÍSIMO para enviar cookies (sessionid, csrftoken)
});

// Interceptor: agrega X-CSRFToken en métodos "unsafe"
api.interceptors.request.use((config) => {
  const method = (config.method || "get").toLowerCase();
  const unsafe = ["post", "put", "patch", "delete"].includes(method);

  if (unsafe) {
    const csrf = getCookie("csrftoken");
    if (csrf) {
      config.headers = config.headers || {};
      config.headers["X-CSRFToken"] = csrf;
    }
  }
  return config;
});
