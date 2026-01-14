import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/lib/AuthContext";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
  const nav = useNavigate();
  const { signIn, user } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // 🔹 Redirección basada en estado real (correcto)
  useEffect(() => {
    if (user?.role === "teacher") nav("/teacher");
    if (user?.role === "student") nav("/student");
  }, [user, nav]);

  // 🔹 Submit SOLO hace login (no redirige)
  async function handleSubmit(e) {
    e.preventDefault();
    await signIn(username, password);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <Card className="w-[360px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Usuario</Label>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="nombre de usuario"
              />
            </div>

            <div className="space-y-2">
              <Label>Contraseña</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <Button className="w-full" type="submit">
              Ingresar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
