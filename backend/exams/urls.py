# exams/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (ExamTitleViewSet, CategoryViewSet, SubCategoryViewSet,
                     ChildCategoryViewSet,ExamViewSet,
                     StudentExamViewSet,StudentResultsViewSet,)

router = DefaultRouter()
router.register(r'titles', ExamTitleViewSet, basename='examtitle')
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'subcategories', SubCategoryViewSet, basename='subcategory')
router.register(r'childcategories', ChildCategoryViewSet, basename='childcategory')
router.register(r'manage-exams', ExamViewSet, basename='manage-exam')

router.register(r'student/exams', StudentExamViewSet, basename='student-exam')
router.register(r'student/results', StudentResultsViewSet, basename='student-result')
urlpatterns = [
    path('', include(router.urls)),
]