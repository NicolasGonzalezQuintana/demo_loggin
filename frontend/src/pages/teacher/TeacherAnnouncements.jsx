import { useEffect, useMemo, useState } from "react";
import { createTeacherAnnouncement, getTeacherDashboard } from "@/services/dashboard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function TeacherAnnouncements() {
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
      } catch {
        setErr("No autorizado o sesión inválida.");
      }
    })();
  }, []);

  const courses = useMemo(() => data?.courses ?? [], [data]);

  async function handleCreate(e) {
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
      await reload();
    } catch {
      setErr("No se pudo crear el anuncio.");
    } finally {
      setSaving(false);
    }
  }

  if (err) return <p className="rounded border bg-white p-4 text-red-600">{err}</p>;
  if (!data) return <p className="rounded border bg-white p-4">Cargando...</p>;

  return (
    <div className="space-y-4">
      <div className="rounded-lg border bg-white p-4">
        <h2 className="text-lg font-semibold">Crear anuncio</h2>

        <form onSubmit={handleCreate} className="mt-4 space-y-3">
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

          <div className="space-y-2">
            <Label>Título</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>Contenido</Label>
            <Textarea value={body} onChange={(e) => setBody(e.target.value)} rows={4} />
          </div>

          <Button disabled={saving || !courseId || !title || !body} type="submit">
            {saving ? "Guardando..." : "Publicar"}
          </Button>
        </form>
      </div>

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
    </div>
  );
}
