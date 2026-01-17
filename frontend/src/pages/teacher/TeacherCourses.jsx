import { useEffect, useState } from "react";
import { getTeacherDashboard } from "@/services/dashboard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function TeacherCourses() {
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
    <div className="rounded-lg border bg-white p-4">
      <h2 className="text-lg font-semibold">Mis cursos</h2>

      <div className="mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Profesor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.courses.map((c) => (
              <TableRow key={c.id}>
                <TableCell className="font-medium">{c.code}</TableCell>
                <TableCell>{c.name}</TableCell>
                <TableCell>{c.teacher}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {data.courses.length === 0 && (
          <p className="mt-3 text-sm text-slate-600">No tienes cursos asignados todavía.</p>
        )}
      </div>
    </div>
  );
}
