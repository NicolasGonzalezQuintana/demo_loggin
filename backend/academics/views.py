import json
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from accounts.permissions import IsStudent, IsTeacher
from .models import Course, Enrollment, Announcement


def _course_to_dict(c: Course):
    return {
        "id": c.id,
        "code": c.code,
        "name": c.name,
        "teacher": c.teacher.username,
    }


def _announcement_to_dict(a: Announcement):
    return {
        "id": a.id,
        "course_code": a.course.code,
        "title": a.title,
        "body": a.body,
        "created_at": a.created_at.isoformat(),
    }


@api_view(["GET"])
@permission_classes([IsAuthenticated, IsStudent])
def student_dashboard(request):
    # cursos donde el estudiante está inscrito
    courses_qs = Course.objects.filter(enrollments__student=request.user).distinct()

    # anuncios de esos cursos (últimos 10)
    announcements_qs = Announcement.objects.filter(course__in=courses_qs).order_by("-created_at")[:10]

    return JsonResponse({
        "summary": {
            "role": "student",
            "username": request.user.username,
            "courses_count": courses_qs.count(),
        },
        "courses": [_course_to_dict(c) for c in courses_qs],
        "announcements": [_announcement_to_dict(a) for a in announcements_qs],
    })


@api_view(["GET"])
@permission_classes([IsAuthenticated, IsTeacher])
def teacher_dashboard(request):
    courses_qs = Course.objects.filter(teacher=request.user).order_by("code")
    announcements_qs = Announcement.objects.filter(course__teacher=request.user).order_by("-created_at")[:10]

    return JsonResponse({
        "summary": {
            "role": "teacher",
            "username": request.user.username,
            "courses_count": courses_qs.count(),
            "recent_announcements": announcements_qs.count(),
        },
        "courses": [_course_to_dict(c) for c in courses_qs],
        "announcements": [_announcement_to_dict(a) for a in announcements_qs],
    })


@api_view(["POST"])
@permission_classes([IsAuthenticated, IsTeacher])
def teacher_create_announcement(request):
    """
    Crea un anuncio para un curso del profesor.
    Body JSON:
      { "course_id": 1, "title": "...", "body": "..." }
    """
    course_id = request.data.get("course_id")
    title = request.data.get("title")
    body = request.data.get("body")

    if not course_id or not title or not body:
        return JsonResponse({"detail": "course_id, title, body son requeridos"}, status=400)

    try:
        course = Course.objects.get(id=course_id, teacher=request.user)
    except Course.DoesNotExist:
        return JsonResponse({"detail": "Curso no existe o no te pertenece"}, status=403)

    ann = Announcement.objects.create(course=course, title=title, body=body)
    return JsonResponse({"detail": "ok", "announcement": _announcement_to_dict(ann)}, status=201)
