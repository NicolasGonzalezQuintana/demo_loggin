import { api } from "@/services/api";

export async function getStudentDashboard() {
  const res = await api.get("/api/student/dashboard/");
  return res.data;
}

export async function getTeacherDashboard() {
  const res = await api.get("/api/teacher/dashboard/");
  return res.data;
}

export async function createTeacherAnnouncement(payload) {
  const res = await api.post("/api/teacher/announcements/", payload);
  return res.data;
}
