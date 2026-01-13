import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <Card className="w-[360px]">
        <CardHeader>
          <CardTitle>Login Demo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="correo@ejemplo.com" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input id="password" type="password" placeholder="••••••••" />
          </div>

          <Button className="w-full">Ingresar</Button>
        </CardContent>
      </Card>
    </div>
  );
}
