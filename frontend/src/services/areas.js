import { api } from "@/services/api";

export async function getStudentArea() {
  const res = await api.get("/api/student/area/");
  return res.data;
}

export async function getTeacherArea() {
  const res = await api.get("/api/teacher/area/");
  return res.data;
}
