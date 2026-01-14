import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { createTeacherAnnouncement, getTeacherDashboard } from "@/services/dashboard";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function TeacherDashboard() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");

  const [courseId, setCourseId] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [saving, setSaving] = useState(false);

  async function reload() {
    const d = await getTeacherDashboard();
    setData(d);
  }

  useEffect(() => {
    (async () => {
      try {
        await reload();
      } catch (e) {
        setErr("No autorizado o sesión inválida.");
      }
    })();
  }, []);

  const courses = useMemo(() => data?.courses ?? [], [data]);

  async function handleCreateAnnouncement(e) {
    e.preventDefault();
    setSaving(true);
    setErr("");
    try {
      await createTeacherAnnouncement({
        course_id: Number(courseId),
        title,
        body,
      });
      setTitle("");
      setBody("");
      await reload(); // refresca anuncios
    } catch (e) {
      setErr("No se pudo crear el anuncio (¿curso válido y tuyo?).");
    } finally {
      setSaving(false);
    }
  }

  return (
    <DashboardLayout title="Portal Profesor">
      {err && <p className="mb-4 rounded border bg-white p-4 text-red-600">{err}</p>}

      {data && (
        <Tabs defaultValue="resumen" className="rounded-lg border bg-white p-4">
          <TabsList>
            <TabsTrigger value="resumen">Resumen</TabsTrigger>
            <TabsTrigger value="cursos">Mis cursos</TabsTrigger>
            <TabsTrigger value="anuncios">Anuncios</TabsTrigger>
          </TabsList>

          <TabsContent value="resumen" className="mt-4 space-y-3">
            <div className="flex flex-wrap gap-3">
              <div className="rounded-lg border p-4">
                <p className="text-sm text-slate-600">Usuario</p>
                <p className="text-lg font-semibold">{data.summary.username}</p>
              </div>
              <div className="rounded-lg border p-4">
                <p className="text-sm text-slate-600">Cursos a cargo</p>
                <p className="text-lg font-semibold">{data.summary.courses_count}</p>
              </div>
              <div className="rounded-lg border p-4">
                <p className="text-sm text-slate-600">Anuncios recientes</p>
                <p className="text-lg font-semibold">{data.summary.recent_announcements}</p>
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
                {courses.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="font-medium">{c.code}</TableCell>
                    <TableCell>{c.name}</TableCell>
                    <TableCell>{c.teacher}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="anuncios" className="mt-4 space-y-4">
            <form onSubmit={handleCreateAnnouncement} className="rounded-lg border p-4">
              <p className="mb-3 font-semibold">Crear anuncio</p>

              <div className="space-y-2">
                <Label>Curso</Label>
                <select
                  className="w-full rounded-md border px-3 py-2 text-sm"
                  value={courseId}
                  onChange={(e) => setCourseId(e.target.value)}
                >
                  <option value="">Selecciona un curso…</option>
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.code} — {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-3 space-y-2">
                <Label>Título</Label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>

              <div className="mt-3 space-y-2">
                <Label>Contenido</Label>
                <Textarea value={body} onChange={(e) => setBody(e.target.value)} rows={4} />
              </div>

              <Button className="mt-4" type="submit" disabled={saving || !courseId || !title || !body}>
                {saving ? "Guardando..." : "Publicar"}
              </Button>
            </form>

            <div className="space-y-3">
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
          </TabsContent>
        </Tabs>
      )}
    </DashboardLayout>
  );
}
