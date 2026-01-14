import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { getStudentDashboard } from "@/services/dashboard";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function StudentDashboard() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const d = await getStudentDashboard();
        setData(d);
      } catch (e) {
        setErr("No autorizado o sesión inválida.");
      }
    })();
  }, []);

  return (
    <DashboardLayout title="Portal Estudiante">
      {err && <p className="rounded border bg-white p-4 text-red-600">{err}</p>}

      {data && (
        <Tabs defaultValue="resumen" className="rounded-lg border bg-white p-4">
          <TabsList>
            <TabsTrigger value="resumen">Resumen</TabsTrigger>
            <TabsTrigger value="cursos">Cursos</TabsTrigger>
            <TabsTrigger value="anuncios">Anuncios</TabsTrigger>
          </TabsList>

          <TabsContent value="resumen" className="mt-4 space-y-3">
            <div className="flex flex-wrap gap-3">
              <div className="rounded-lg border p-4">
                <p className="text-sm text-slate-600">Usuario</p>
                <p className="text-lg font-semibold">{data.summary.username}</p>
              </div>
              <div className="rounded-lg border p-4">
                <p className="text-sm text-slate-600">Cursos inscritos</p>
                <p className="text-lg font-semibold">{data.summary.courses_count}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="cursos" className="mt-4">
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
          </TabsContent>

          <TabsContent value="anuncios" className="mt-4 space-y-3">
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
          </TabsContent>
        </Tabs>
      )}
    </DashboardLayout>
  );
}
