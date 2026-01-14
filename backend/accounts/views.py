from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated
from .permissions import IsTeacher, IsStudent

@ensure_csrf_cookie
@api_view(["GET"])
@permission_classes([AllowAny])
def csrf(request):
    return JsonResponse({"detail": "CSRF cookie set"})


@api_view(["POST"])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get("username") or request.data.get("email")
    password = request.data.get("password")

    if not username or not password:
        return JsonResponse({"detail": "Faltan credenciales"}, status=400)

    user = authenticate(request, username=username, password=password)
    if user is None:
        return JsonResponse({"detail": "Credenciales inválidas"}, status=401)

    login(request, user)
    return JsonResponse({"detail": "ok"})


@api_view(["POST"])
def logout_view(request):
    logout(request)
    return JsonResponse({"detail": "ok"})


@api_view(["GET"])
@permission_classes([IsAuthenticated])

def me(request):
    user = request.user

    groups = set(user.groups.values_list("name", flat=True))
    role = (
        "teacher" if "Profesores" in groups
        else "student" if "Estudiantes" in groups
        else "unknown"
    )

    return JsonResponse({
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "role": role,
    })

@api_view(["GET"])
@permission_classes([IsAuthenticated, IsStudent])
def student_area(request):
    return JsonResponse({
        "detail": "OK estudiante",
        "user": request.user.username
    })


@api_view(["GET"])
@permission_classes([IsAuthenticated, IsTeacher])
def teacher_area(request):
    return JsonResponse({
        "detail": "OK profesor",
        "user": request.user.username
    })
