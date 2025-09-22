
from rest_framework import viewsets,status
from rest_framework.decorators import action
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.permissions import IsAdminUser , IsAuthenticated
from rest_framework.response import Response
from decimal import Decimal

from users.permissions import IsStudentUser
from results.models import ExamResult, StudentAnswer
from .models import (ExamTitle, Category, 
                     SubCategory, ChildCategory,
                     Exam,Option,Question)
from django_filters.rest_framework import DjangoFilterBackend 
from .filters import ExamFilter

from .serializers import (
    ExamTitleSerializer, CategorySerializer, 
    SubCategorySerializer, ChildCategorySerializer,
    ExamSerializer,ExamListSerializer,
    StudentExamDetailSerializer, QuestionForStudentSerializer

)
from results.serializers import ExamResultDetailSerializer, ExamSubmissionSerializer
 


class ExamTitleViewSet(viewsets.ModelViewSet):
    queryset = ExamTitle.objects.all()
    serializer_class = ExamTitleSerializer
    permission_classes = [IsAdminUser] 

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAdminUser] 

class SubCategoryViewSet(viewsets.ModelViewSet):
    queryset = SubCategory.objects.all()
    serializer_class = SubCategorySerializer
    permission_classes = [IsAdminUser] 

class ChildCategoryViewSet(viewsets.ModelViewSet):
    queryset = ChildCategory.objects.all()
    serializer_class = ChildCategorySerializer
    permission_classes = [IsAdminUser] 

class ExamViewSet(viewsets.ModelViewSet):
    queryset = Exam.objects.all()
    
    # permission_classes = [IsAdminUser] 

    filter_backends = [DjangoFilterBackend,SearchFilter, OrderingFilter]
    
    filterset_class = ExamFilter
    
    search_fields = [
        'generated_exam_name', 
        'description', 
        'exam_title_ref__name', 
        'category_ref__name',
        'sub_category_ref__name',
        'child_category_ref_name'
    ]
    ordering_fields = ['created_at', 'question_count']
    ordering = ['-created_at'] 
    
    def get_serializer_class(self):
       
        if self.action == 'list':
            return ExamListSerializer
       
        return ExamSerializer
    
    def perform_destroy(self, instance):
        
        instance.delete()

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)

        return Response(
            {"message": "Exam has been archived and will not be published."}, 
            status=status.HTTP_204_NO_CONTENT
        )
    
class StudentExamViewSet(viewsets.ReadOnlyModelViewSet):
    """
    A viewset for students to view, start, and submit exams.
    """
    permission_classes = [IsAuthenticated, IsStudentUser]

    def get_queryset(self):
       
        return Exam.objects.filter(status='published', is_deleted=False)

    def get_serializer_class(self):
        if self.action == 'list':
            return ExamListSerializer  # பட்டியலுக்கு எளிமையான சீரியலைசர்
        if self.action == 'retrieve':
            return StudentExamDetailSerializer # விவரங்களுக்கு இந்த சீரியலைசர்
        if self.action == 'start_exam':
            return QuestionForStudentSerializer
        if self.action == 'submit_exam':
            return ExamSubmissionSerializer
        return ExamListSerializer

    @action(detail=True, methods=['get'], url_path='start')
    def start_exam(self, request, pk=None):
       
        exam = self.get_object()
        questions = exam.questions.all().order_by('id')
        serializer = self.get_serializer(questions, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'], url_path='submit')
    def submit_exam(self, request, pk=None):
        
        exam = self.get_object()
        student = request.user

       
        if ExamResult.objects.filter(student=student, exam=exam).exists():
            return Response(
                {"error": "You have already attempted this exam."},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        answers_data = serializer.validated_data['answers']

        score = Decimal('0.00') 
        total_marks = exam.total_marks
        negative_mark_per_question = exam.negative_mark
       
       
       
        correct_options = {
            option.question_id: option.id
            for option in Option.objects.filter(question__exam=exam, is_correct=True)
        }
        
       
        question_marks = {q.id: Decimal(str(q.marks)) for q in Question.objects.filter(exam=exam)}

        answered_question_ids = {answer['question_id'] for answer in answers_data}
        
        for answer in answers_data:
            question_id = answer['question_id']
            selected_option_id = answer['selected_option_id']
            
            if correct_options.get(question_id) == selected_option_id:
                score += question_marks.get(question_id, Decimal('0.0')) # கேள்விக்கான மதிப்பெண்ணைக் கூட்டவும்

            else:
                score -= negative_mark_per_question
        if score < 0:
            score = Decimal('0.00')

        
        percentage = (float(score) / total_marks) * 100 if total_marks > 0 else 0
        
       
        result = ExamResult.objects.create(
            student=student,
            exam=exam,
            score=round(float(score), 2), # score-ஐ float ஆக மாற்றி சேமிக்கிறோம்
            total_marks=total_marks,
            percentage=round(percentage, 2)
        )
        
       
        for answer in answers_data:
            question = Question.objects.get(id=answer['question_id'])
            selected_option = Option.objects.get(id=answer['selected_option_id'])
            StudentAnswer.objects.create(
                exam_result=result,
                question=question,
                selected_option=selected_option,
                is_correct=(correct_options.get(question.id) == selected_option.id)
            )

       
        result_serializer = ExamResultDetailSerializer(result)
        return Response(result_serializer.data, status=status.HTTP_201_CREATED)


class StudentResultsViewSet(viewsets.ReadOnlyModelViewSet):
    """
    A viewset for students to see their past exam results.
    """
    serializer_class = ExamResultDetailSerializer
    permission_classes = [IsAuthenticated, IsStudentUser]

    def get_queryset(self):
       
        user = self.request.user
        return ExamResult.objects.filter(student=user).prefetch_related(
            'student_answers__question',
            'student_answers__selected_option'
        ).order_by('-completed_at')
    
    def get_serializer_class(self):
        
        if self.action == 'retrieve':
            return ExamResultDetailSerializer