import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const nav = useNavigate();
  const { user, signOut } = useAuth();

  async function handleLogout() {
    await signOut();
    nav("/login");
  }

  return (
    <header className="w-full border-b bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold">Demo Login</span>
          {user && (
            <span className="text-sm text-slate-600">
              {user.username} · {user.role}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
            {user?.role === "student" && (
                <Button variant="secondary" onClick={() => nav("/student")}>
                Estudiante
                </Button>
            )}

            {user?.role === "teacher" && (
                <Button variant="secondary" onClick={() => nav("/teacher")}>
                Profesor
                </Button>
            )}

            <Button onClick={handleLogout}>Cerrar sesión</Button>
        </div>
      </div>
    </header>
  );
}
