from rest_framework.permissions import BasePermission

def _in_group(user, group_name: str) -> bool:
    return user.is_authenticated and user.groups.filter(name=group_name).exists()

class IsTeacher(BasePermission):
    def has_permission(self, request, view):
        return _in_group(request.user, "Profesores")

class IsStudent(BasePermission):
    def has_permission(self, request, view):
        return _in_group(request.user, "Estudiantes")
