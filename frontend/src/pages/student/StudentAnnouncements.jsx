import { useEffect, useState } from "react";
import { getStudentDashboard } from "@/services/dashboard";
import { Badge } from "@/components/ui/badge";

export default function StudentAnnouncements() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const d = await getStudentDashboard();
        setData(d);
      } catch {
        setErr("No autorizado o sesión inválida.");
      }
    })();
  }, []);

  if (err) return <p className="rounded border bg-white p-4 text-red-600">{err}</p>;
  if (!data) return <p className="rounded border bg-white p-4">Cargando...</p>;

  return (
    <div className="rounded-lg border bg-white p-4">
      <h2 className="text-lg font-semibold">Anuncios</h2>

      <div className="mt-4 space-y-3">
        {data.announcements.length === 0 && (
          <p className="text-sm text-slate-600">No hay anuncios todavía.</p>
        )}

        {data.announcements.map((a) => (
          <div key={a.id} className="rounded-lg border p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="font-semibold">{a.title}</p>
              <Badge variant="secondary">{a.course_code}</Badge>
            </div>
            <p className="mt-2 text-sm text-slate-700">{a.body}</p>
            <p className="mt-2 text-xs text-slate-500">{a.created_at}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
