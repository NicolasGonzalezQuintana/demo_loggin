import { useEffect, useState } from "react";
import { getTeacherEnrollments } from "@/services/dashboard";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function TeacherStudents() {
  const [enrollments, setEnrollments] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const d = await getTeacherEnrollments();
        setEnrollments(d);
      } catch {
        setErr("No autorizado o sesión inválida.");
      }
    })();
  }, []);

  if (err) return <p className="rounded border bg-white p-4 text-red-600">{err}</p>;
  if (!enrollments) return <p className="rounded border bg-white p-4">Cargando...</p>;

  return (
    <div className="rounded-lg border bg-white p-4">
      <h2 className="text-lg font-semibold">Alumnos</h2>
      <p className="mt-1 text-sm text-slate-600">
        Listado de estudiantes inscritos por curso.
      </p>

      <div className="mt-4">
        <Accordion type="single" collapsible>
          {enrollments.courses.map((item) => (
            <AccordionItem key={item.course.id} value={String(item.course.id)}>
              <AccordionTrigger>
                {item.course.code} — {item.course.name} ({item.count})
              </AccordionTrigger>

              <AccordionContent>
                {item.students.length === 0 ? (
                  <p className="text-sm text-slate-600">No hay estudiantes inscritos.</p>
                ) : (
                  <div className="space-y-2">
                    {item.students.map((s) => (
                      <div key={s.id} className="rounded border p-2">
                        <p className="font-medium">{s.username}</p>
                        <p className="text-xs text-slate-600">{s.email || "sin email"}</p>
                      </div>
                    ))}
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
