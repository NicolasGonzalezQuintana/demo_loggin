import { useEffect, useState } from "react";
import { getTeacherArea } from "@/services/areas";
import Navbar from "@/components/Navbar";

export default function TeacherDashboard() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const d = await getTeacherArea();
        setData(d);
      } catch (e) {
        setErr("No autorizado o sesión inválida (esperado si no eres profesor).");
      }
    })();
  }, []);

  return (
  <div className="min-h-screen">
    <Navbar />

    <main className="mx-auto max-w-5xl p-6">
      <h1 className="text-2xl font-bold">Dashboard Profesor</h1>

      {err && <p className="mt-4 text-red-600">{err}</p>}

      {data && (
        <pre className="mt-4 rounded bg-slate-100 p-4 text-sm">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </main>
  </div>
  );
}
