import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { Button } from "@/components/ui/button";

function Item({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block rounded-md px-3 py-2 text-sm ${
          isActive
            ? "bg-slate-900 text-white"
            : "text-slate-700 hover:bg-slate-100"
        }`
      }
      end
    >
      {children}
    </NavLink>
  );
}

export default function RoleLayout({ role }) {
  const { user, signOut } = useAuth();
  const nav = useNavigate();

  async function handleLogout() {
    await signOut();
    nav("/login");
  }

  // Evita “flash” si aún carga user
  if (!user) return null;

  // Si alguien entra al layout equivocado
  if (user.role !== role) return null;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div>
            <p className="text-sm text-slate-600">Sesión</p>
            <p className="font-semibold">
              {user.username} · {user.role}
            </p>
          </div>
          <Button onClick={handleLogout}>Cerrar sesión</Button>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl grid-cols-12 gap-4 p-4">
        <aside className="col-span-12 rounded-lg border bg-white p-3 md:col-span-3">
          <p className="mb-2 text-xs font-medium uppercase text-slate-500">
            Menú
          </p>

          {role === "teacher" && (
            <div className="flex flex-col gap-1">
              <Item to="/teacher">Resumen</Item>
              <Item to="/teacher/courses">Mis cursos</Item>
              <Item to="/teacher/announcements">Anuncios</Item>
              <Item to="/teacher/students">Alumnos</Item>
            </div>
          )}

          {role === "student" && (
            <div className="flex flex-col gap-1">
              <Item to="/student">Resumen</Item>
              <Item to="/student/courses">Mis cursos</Item>
              <Item to="/student/announcements">Anuncios</Item>
            </div>
          )}
        </aside>

        <main className="col-span-12 md:col-span-9">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
