from celery import shared_task
from django.core.mail import send_mail
from django.conf import settings
from users.models import CustomUser

@shared_task
def send_new_exam_notification_task(exam_id, exam_name, exam_category, exam_url):
    """
    ஒரு புதிய தேர்வு வெளியிடப்பட்டதும் அனைத்து மாணவர்களுக்கும் மின்னஞ்சல் அனுப்பும் பின்னணிப் பணி.
    """
   
    students = CustomUser.objects.filter(role='student', is_active=True)
    student_emails = [student.email for student in students]

    if not student_emails:
        print("No active students found to notify.")
        return

    subject = f"📢 New Exam Published: {exam_name}"
    message = f"""
    Hi Student,

    A new exam has just been published on our platform!

    Exam Name: {exam_name}
    Category: {exam_category}

    You can take the exam by visiting the link below:
    {exam_url}

    All the best!
    The Examplify Team
    """

   
    send_mail(
        subject,
        message,
        settings.DEFAULT_FROM_EMAIL, 
        student_emails,
        fail_silently=False,
    )

    return f"Notification sent to {len(student_emails)} students for exam ID {exam_id}."