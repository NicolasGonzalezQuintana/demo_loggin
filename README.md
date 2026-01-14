# Demo Login (Django API + React/Vite)

Proyecto demo Full Stack con frontend y backend desacoplados:
- **Backend**: Django + DRF + Auth por **sesión (cookie HttpOnly)** + **CSRF**
- **Frontend**: React + Vite + Tailwind + shadcn/ui
- **Roles**: `Profesores` y `Estudiantes` definidos en **Django Groups**
- **Seguridad**: CORS + CSRF + endpoints protegidos por rol (backend)

## Arquitectura
- `frontend/` (SPA React) consume al backend como API.
- `backend/` (Django) expone endpoints REST y controla autenticación/autorización.

```
Browser (React) ---> http://localhost:8000
                      (Django API)
cookies (sessionid HttpOnly) + csrf header (X-CSRFToken)
```

## Requisitos
- Python 3.13+
- Node.js 18+ (recomendado)
- Git

---

## 🚀 Instalación y Setup

### 0) Clonar el repositorio
```bat
git clone <url-del-repo>
cd demo_loggin
```

---

## Backend (Django)

### 1) Crear y activar entorno virtual (CMD)
```bat
cd backend
python -m venv .venv
.venv\Scripts\activate
```

### 2) Instalar dependencias (CMD)
```bat
cd backend
.venv\Scripts\activate
```

### 2) Instalar dependencias (CMD)
```bat
pip install -r requirements.txt
```

### 3) Variables de entorno (VS Code)

**Archivo**: `backend/.env`

```env
DJANGO_DEBUG=1
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1
DJANGO_CORS_ALLOWED_ORIGINS=http://localhost:5173
DJANGO_CSRF_TRUSTED_ORIGINS=http://localhost:5173
```

**Nota**: `backend/.env` no debe subirse a git.

### 4) Migraciones + superuser (CMD)
```bat
python manage.py migrate
python manage.py createsuperuser
```

### 5) Crear grupos y asignar usuarios (Admin)

**Admin**: http://localhost:8000/admin

Crear grupos:
- `Profesores`
- `Estudiantes`

Asignar usuarios a los grupos

### 6) Correr backend (CMD - Terminal 1)
```bat
python manage.py runserver
```

**Backend corriendo en**: http://localhost:8000

⚠️ **Importante**: Mantén esta terminal abierta

---

## Frontend (React/Vite)

### 1) Abrir nueva terminal y navegar (CMD - Terminal 2)
```bat
cd frontend
```

### 2) Instalar dependencias (CMD)
```bat
npm install
```

### 3) Correr frontend (CMD)
```bat
npm run dev
```

**Frontend corriendo en**: http://localhost:5173

⚠️ **Importante**: Ambos servidores (backend y frontend) deben estar corriendo simultáneamente

---

## Endpoints principales (Backend)

**Auth:**
- `GET /api/auth/csrf/` -> setea cookie `csrftoken`
- `🧪 Pruebas manuales (flujo esperado)

1. Abrir navegador en http://localhost:5173
2. Intentar acceder a `/student` sin sesión -> redirige a `/login`
3. Login con usuario Estudiante -> redirige a `/student`
4. Intentar ir a `/teacher` como estudiante -> bloquea con error
5. Logout -> vuelve a `/login`
6. Login con usuario Profesor -> acceso a `/teacher`

### Credenciales de prueba
Crear usuarios en el Admin de Django (http://localhost:8000/admin) y asignarlos a los grupos correspondientesrequiere grupo `Estudiantes`
- `GET /api/teacher/area/` -> requiere grupo `Profesores`

---

## Pruebas manuales (flujo esperado)

1. Abrir `/student` sin sesión -> redirige a `/login`
2. Login Estudiante -> `/student`
3. Ir a `/teacher` como estudiante -> bloquea
4. Logout -> vuelve a `/login`

---

## Seguridad (resumen)

- No se usan tokens en `localStorage`.
- Sesión en cookie `HttpOnly` (más resistente a XSS).
- CSRF activo y token enviado en header `X-CSRFToken`.
- CORS restringido a `http://localhost:5173`.
- Autorización real por rol se aplica en el backend (403).
