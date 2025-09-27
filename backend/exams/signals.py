from django.db.models.signals import pre_save
from django.dispatch import receiver
from .models import Exam
from .tasks import send_new_exam_notification_task

@receiver(pre_save, sender=Exam)
def on_exam_publish(sender, instance, **kwargs):
    """
    ஒரு தேர்வு 'published' நிலைக்கு மாறும்போது இந்த சிக்னல் இயங்கும்.
    """

    if not instance.pk:
        return

    try:
       
        old_instance = sender.objects.get(pk=instance.pk)
    except sender.DoesNotExist:
        return

    
    if old_instance.status != 'published' and instance.status == 'published':
        print(f"Exam {instance.id} is being published. Triggering notification task.")
        
       
        frontend_url = f"http://localhost:3000/exams/{instance.id}" 

       
        send_new_exam_notification_task.delay(
            exam_id=instance.id,
            exam_name=instance.generated_exam_name,
            exam_category=instance.category_ref.name,
            exam_url=frontend_url
        )