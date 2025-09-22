from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StudentFeedbackViewSet, AdminFeedbackViewSet

router = DefaultRouter()
# Student URL
router.register(r'student/feedback', StudentFeedbackViewSet, basename='student-feedback')
# Admin URL
router.register(r'admin/feedback', AdminFeedbackViewSet, basename='admin-feedback')

urlpatterns = [
    path('', include(router.urls)),
]