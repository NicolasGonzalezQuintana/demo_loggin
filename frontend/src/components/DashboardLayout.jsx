import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/lib/AuthContext";

export default function DashboardLayout({ title, children }) {
  const nav = useNavigate();
  const { user, signOut } = useAuth();

  async function handleLogout() {
    await signOut();
    nav("/login");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Topbar */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div>
            <h1 className="text-lg font-semibold">{title}</h1>
            {user && (
              <p className="text-sm text-slate-600">
                {user.username} · {user.role}
              </p>
            )}
          </div>
          <Button onClick={handleLogout}>Cerrar sesión</Button>
        </div>
      </header>

      {/* Body */}
      <div className="mx-auto grid max-w-6xl grid-cols-12 gap-4 p-4">
        {/* Sidebar */}
        <aside className="col-span-12 rounded-lg border bg-white p-3 md:col-span-3">
          <p className="mb-2 text-xs font-medium uppercase text-slate-500">
            Navegación
          </p>
          <Separator className="my-2" />

          {user?.role === "student" && (
            <div className="flex flex-col gap-2">
              <Button variant="secondary" onClick={() => nav("/student")}>
                Panel Estudiante
              </Button>
            </div>
          )}

          {user?.role === "teacher" && (
            <div className="flex flex-col gap-2">
              <Button variant="secondary" onClick={() => nav("/teacher")}>
                Panel Profesor
              </Button>
            </div>
          )}
        </aside>

        {/* Content */}
        <main className="col-span-12 md:col-span-9">{children}</main>
      </div>
    </div>
  );
}
