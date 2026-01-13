import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUser } from "@/lib/auth";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(role) {
    // MOCK: luego esto será una llamada real al backend
    setUser({ email: email || "demo@demo.com", role });
    nav(role === "teacher" ? "/teacher" : "/student");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <Card className="w-[360px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Button className="w-full" onClick={() => handleLogin("student")}>
              Entrar como Estudiante (mock)
            </Button>
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => handleLogin("teacher")}
            >
              Entrar como Profesor (mock)
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
