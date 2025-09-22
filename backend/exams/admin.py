from django.contrib import admin
from .models import ExamTitle, Category, SubCategory, ChildCategory, Exam, Question, Option

admin.site.register(ExamTitle)
admin.site.register(Category)
admin.site.register(SubCategory)
admin.site.register(ChildCategory)
admin.site.register(Exam) 
admin.site.register(Question)
admin.site.register(Option)