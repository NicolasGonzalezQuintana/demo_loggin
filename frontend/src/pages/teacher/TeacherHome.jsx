import { useEffect, useState } from "react";
import { getTeacherDashboard } from "@/services/dashboard";

export default function TeacherHome() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const d = await getTeacherDashboard();
        setData(d);
      } catch {
        setErr("No autorizado o sesión inválida.");
      }
    })();
  }, []);

  if (err) return <p className="rounded border bg-white p-4 text-red-600">{err}</p>;
  if (!data) return <p className="rounded border bg-white p-4">Cargando...</p>;

  return (
    <div className="space-y-4">
      <div className="rounded-lg border bg-white p-4">
        <h2 className="text-lg font-semibold">Resumen</h2>
        <p className="mt-1 text-sm text-slate-600">
          Bienvenido, {data.summary.username}.
        </p>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <div className="rounded-lg border p-4">
            <p className="text-sm text-slate-600">Cursos a cargo</p>
            <p className="text-2xl font-semibold">{data.summary.courses_count}</p>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-sm text-slate-600">Anuncios recientes</p>
            <p className="text-2xl font-semibold">{data.summary.recent_announcements}</p>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-sm text-slate-600">Rol</p>
            <p className="text-2xl font-semibold">Profesor</p>
          </div>
        </div>
      </div>
    </div>
  );
}
