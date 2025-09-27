from django.db import models
from django.utils import timezone
from users.models import CustomUser

class ExamTitle(models.Model):
    name = models.CharField(max_length=100, unique=True)
    row_order = models.IntegerField(default=0)

    def __str__(self):
        return self.name

class Category(models.Model):

    exam_title = models.ForeignKey(ExamTitle, related_name='categories', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.exam_title.name} - {self.name}"

class SubCategory(models.Model):
   
    category = models.ForeignKey(Category, related_name='subcategories', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.category.name} - {self.name}"

class ChildCategory(models.Model):
    
    sub_category = models.ForeignKey(SubCategory, related_name='childcategories', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.sub_category.name} - {self.name}"
class ExamManager(models.Manager):
    def get_queryset(self):
    
        return super().get_queryset().filter(is_deleted=False)

class Exam(models.Model):
    # Relationships from previous models
    exam_title_ref = models.ForeignKey(ExamTitle, on_delete=models.SET_NULL, null=True)
    category_ref = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    sub_category_ref = models.ForeignKey(SubCategory, on_delete=models.SET_NULL, null=True)
    child_category_ref = models.ForeignKey(ChildCategory, on_delete=models.SET_NULL, null=True)

    STATUS_CHOICES = (
        ('published', 'Published'),
        ('draft', 'Draft'),
        ('archived', 'Archived'), # This will be our "soft deleted" status
    )
   
    difficulty = models.CharField(max_length=20,blank=True, null=True) # From "Select difficulty"
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='draft')
    is_deleted = models.BooleanField(default=False)
    description = models.TextField(blank=True, null=True)
    exam_image = models.ImageField(upload_to='exam_images/', blank=True, null=True)
    time_limit_minutes = models.IntegerField(blank=True, null=True)
    is_paid = models.BooleanField(default=False)
    question_count = models.IntegerField(default=0)
    total_marks = models.IntegerField(default=0)
    negative_mark = models.DecimalField(
        max_digits=4, 
        decimal_places=2, 
        default=0.0,
        help_text="Mark to be deducted for each wrong answer (e.g., 0.25)."
    )
    # SEO for Exam
    meta_title = models.CharField(max_length=255, blank=True, null=True)
    meta_keywords = models.TextField(blank=True, null=True)
    meta_description = models.TextField(blank=True, null=True)
    objects = ExamManager() 
    all_objects = models.Manager() 
    # Auto-generated field
    generated_exam_name = models.CharField(max_length=500, unique=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        # Generate the custom exam name before saving
        if not self.generated_exam_name:
            date_str = self.created_at.strftime('%Y-%m-%d') if self.created_at else timezone.now().strftime('%Y-%m-%d')
            self.generated_exam_name = (
                f"{self.exam_title_ref.name}_"
                f"{self.category_ref.name}_"
                f"{self.sub_category_ref.name}_"
                f"{self.child_category_ref.name}_"
                f"{self.difficulty}_"
                f"{date_str}"
            )
        super().save(*args, **kwargs)

    def __str__(self):
        return self.generated_exam_name
    
    def delete(self, *args, **kwargs):
       
        self.is_deleted = True
        self.status = 'archived'
        self.save()

class Question(models.Model):
    exam = models.ForeignKey(Exam, related_name='questions', on_delete=models.CASCADE)
    question_text = models.TextField()
    question_image = models.ImageField(upload_to='question_images/', blank=True, null=True)
    marks = models.IntegerField(default=1)

    def __str__(self):
        return self.question_text[:50]

class Option(models.Model):
    question = models.ForeignKey(Question, related_name='options', on_delete=models.CASCADE)
    option_text = models.CharField(max_length=255)
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return self.option_text
