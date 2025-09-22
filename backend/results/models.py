from django.db import models
from django.conf import settings
from exams.models import Exam, Question, Option

class ExamResult(models.Model):
    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE)
    score = models.FloatField()
    total_marks = models.IntegerField()
    percentage = models.FloatField()
    completed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student.email} - {self.exam.generated_exam_name}"

class StudentAnswer(models.Model):
    exam_result = models.ForeignKey(ExamResult, related_name='student_answers', on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    selected_option = models.ForeignKey(Option, on_delete=models.CASCADE, null=True, blank=True)
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return f"Answer for Q: {self.question.id} in {self.exam_result.id}"
    

class Feedback(models.Model):
    RATING_CHOICES = (
        (1, 'Poor'),
        (2, 'Fair'),
        (3, 'Average'),
        (4, 'Good'),
        (5, 'Excellent'),
    )
    
    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE)
    exam_result = models.OneToOneField(ExamResult, on_delete=models.CASCADE, null=True, blank=True, help_text="Link to the specific exam attempt.")
    rating = models.IntegerField(choices=RATING_CHOICES, help_text="Rate the exam experience from 1 to 5.")
    comments = models.TextField(blank=True, null=True, help_text="Any additional comments or suggestions.")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Feedback from {self.student.email} for {self.exam.generated_exam_name}"

    class Meta:
        
        unique_together = ('student', 'exam_result')