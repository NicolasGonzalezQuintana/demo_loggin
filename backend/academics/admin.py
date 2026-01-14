from django.contrib import admin
from .models import Course, Enrollment, Announcement


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ("code", "name", "teacher")
    search_fields = ("code", "name", "teacher__username")


@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    list_display = ("student", "course")
    search_fields = ("student__username", "course__code", "course__name")


@admin.register(Announcement)
class AnnouncementAdmin(admin.ModelAdmin):
    list_display = ("course", "title", "created_at")
    search_fields = ("course__code", "title")
