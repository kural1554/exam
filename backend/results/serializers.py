from rest_framework import serializers
from .models import ExamResult, StudentAnswer, Feedback
from exams.models import Question, Option

class StudentAnswerInputSerializer(serializers.Serializer):
    question_id = serializers.IntegerField()
    selected_option_id = serializers.IntegerField()

class ExamSubmissionSerializer(serializers.Serializer):
    answers = StudentAnswerInputSerializer(many=True)

class StudentAnswerReviewSerializer(serializers.ModelSerializer):
    
    question_text = serializers.CharField(source='question.question_text', read_only=True)
    
   
    selected_option_text = serializers.CharField(source='selected_option.option_text', read_only=True)
    
   
    correct_option_text = serializers.SerializerMethodField()

    class Meta:
        model = StudentAnswer
        fields = [
            'id', 
            'question_text', 
            'selected_option_text', 
            'correct_option_text', 
            'is_correct'
        ]

    def get_correct_option_text(self, obj):
        """
        அந்தக் கேள்விக்கான சரியான விருப்பத்தைக் கண்டுபிடித்து அதன் உரையைத் திருப்பி அனுப்புகிறது.
        """
        try:
            
            correct_option = Option.objects.get(question=obj.question, is_correct=True)
            return correct_option.option_text
        except Option.DoesNotExist:
            return "N/A"
        
class ExamResultDetailSerializer(serializers.ModelSerializer):
    exam = serializers.StringRelatedField()
    student = serializers.StringRelatedField()
    student_answers = StudentAnswerReviewSerializer(many=True, read_only=True)
    
    class Meta:
        model = ExamResult
        fields = ['id', 'student', 'exam', 'score', 'total_marks', 'percentage', 'completed_at','student_answers']

class FeedbackCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = ['exam_result', 'rating', 'comments']
    
    def validate(self, data):
       
        if self.context['request'].user != data['exam_result'].student:
            raise serializers.ValidationError("You can only submit feedback for your own exam results.")
        return data
    
class FeedbackAdminListSerializer(serializers.ModelSerializer):
    student_email = serializers.EmailField(source='student.email', read_only=True)
    exam_title = serializers.CharField(source='exam.exam_title_ref.name', read_only=True)
    category = serializers.CharField(source='exam.category_ref.name', read_only=True)
    sub_category = serializers.CharField(source='exam.sub_category_ref.name', read_only=True)
    child_category = serializers.CharField(source='exam.child_category_ref.name', read_only=True)

    class Meta:
        model = Feedback
        fields = [
            'id', 
            'student_email',
            'exam_title', 
            'category', 
            'sub_category', 
            'child_category',
            'rating', 
            'comments', 
            'created_at'
        ]

