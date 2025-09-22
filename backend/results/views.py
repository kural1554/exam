from rest_framework import viewsets, mixins
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .models import Feedback
from .serializers import FeedbackCreateSerializer, FeedbackAdminListSerializer
from users.permissions import IsStudentUser


class StudentFeedbackViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    """
    Allows students to submit feedback for an exam they have completed.
    """
    queryset = Feedback.objects.all()
    serializer_class = FeedbackCreateSerializer
    permission_classes = [IsAuthenticated, IsStudentUser]

    def perform_create(self, serializer):
        
        exam_result = serializer.validated_data['exam_result']
        serializer.save(student=self.request.user, exam=exam_result.exam)



class AdminFeedbackViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Allows admins to view all feedback submitted by students.
    """
    queryset = Feedback.objects.select_related(
        'student', 'exam__exam_title_ref', 'exam__category_ref', 
        'exam__sub_category_ref', 'exam__child_category_ref'
    ).order_by('-created_at')
    serializer_class = FeedbackAdminListSerializer
    permission_classes = [IsAdminUser]