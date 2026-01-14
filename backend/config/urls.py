from django.contrib import admin
from django.urls import path
from accounts.views import csrf, login_view, logout_view, me, student_area, teacher_area


urlpatterns = [
    path("admin/", admin.site.urls),

    path("api/auth/csrf/", csrf),
    path("api/auth/login/", login_view),
    path("api/auth/logout/", logout_view),
    path("api/auth/me/", me),
    path("api/student/area/", student_area),
    path("api/teacher/area/", teacher_area),

]
