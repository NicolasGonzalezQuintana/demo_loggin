import { api } from "@/services/api";

/**
 * Obtiene el valor de una cookie por nombre
 */
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
  return null;
}

/**
 * Asegura que exista la cookie CSRF y devuelve su valor
 */
export async function ensureCsrf() {
  // Llama al endpoint que setea la cookie csrftoken
  await api.get("/api/auth/csrf/");
  return getCookie("csrftoken");
}
