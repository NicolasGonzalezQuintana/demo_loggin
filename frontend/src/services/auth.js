import { api } from "@/services/api";
import { ensureCsrf } from "@/services/csrf";

export async function login(email, password) {
  const csrf = await ensureCsrf();
  await api.post(
    "/api/auth/login/",
    { email, password },
    { headers: { "X-CSRFToken": csrf } }
  );
}

export async function logout() {
  const csrf = await ensureCsrf();
  await api.post(
    "/api/auth/logout/",
    null,
    { headers: { "X-CSRFToken": csrf } }
  );
}

export async function me() {
  const res = await api.get("/api/auth/me/");
  return res.data;
}
