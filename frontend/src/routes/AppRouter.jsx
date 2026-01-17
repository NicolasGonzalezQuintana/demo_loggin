import { Routes, Route, Navigate } from "react-router-dom";

import Login from "@/pages/Login";
import RoleLayout from "@/layouts/RoleLayout";

import TeacherHome from "@/pages/teacher/TeacherHome";
import TeacherCourses from "@/pages/teacher/TeacherCourses";
import TeacherAnnouncements from "@/pages/teacher/TeacherAnnouncements";
import TeacherStudents from "@/pages/teacher/TeacherStudents";

import StudentHome from "@/pages/student/StudentHome";
import StudentCourses from "@/pages/student/StudentCourses";
import StudentAnnouncements from "@/pages/student/StudentAnnouncements";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* Profesor */}
      <Route path="/teacher" element={<RoleLayout role="teacher" />}>
        <Route index element={<TeacherHome />} />
        <Route path="courses" element={<TeacherCourses />} />
        <Route path="announcements" element={<TeacherAnnouncements />} />
        <Route path="students" element={<TeacherStudents />} />
      </Route>

      {/* Estudiante */}
      <Route path="/student" element={<RoleLayout role="student" />}>
        <Route index element={<StudentHome />} />
        <Route path="courses" element={<StudentCourses />} />
        <Route path="announcements" element={<StudentAnnouncements />} />
      </Route>

      {/* Default */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
