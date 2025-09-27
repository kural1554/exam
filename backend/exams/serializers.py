# exams/serializers.py
from rest_framework import serializers
from .models import (ExamTitle, Category, SubCategory, ChildCategory,
                     Exam,Question,Option)
from users.models import CustomUser

class ExamTitleSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExamTitle
        fields = ['id', 'name', 'row_order']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'exam_title']

class SubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubCategory
        fields = ['id', 'name', 'category']

class ChildCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ChildCategory
        fields = ['id', 'name', 'sub_category']

class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = ['id', 'option_text', 'is_correct']

class QuestionSerializer(serializers.ModelSerializer):
    
    options = OptionSerializer(many=True)

    class Meta:
        model = Question
        fields = ['id', 'question_text', 'question_image', 'marks', 'options']


class ExamSerializer(serializers.ModelSerializer):
    
    questions = QuestionSerializer(many=True, default=[])

    class Meta:
        model = Exam
       
        fields = [
            'id', 'exam_title_ref', 'category_ref', 'sub_category_ref', 'child_category_ref',
             'difficulty', 'description', 'exam_image',
            'time_limit_minutes', 'is_paid', 'negative_mark',  'meta_title', 'meta_keywords',
            'meta_description', 'questions','generated_exam_name', 'question_count',     
            'total_marks',  'created_at'
        ]

        read_only_fields = ['generated_exam_name', 'created_at','question_count', 'total_marks']
        
        extra_kwargs = {
            'difficulty': {'required': False, 'allow_null': True, 'allow_blank': True},
            'sub_category_ref': {'required': False, 'allow_null': True},
            'child_category_ref': {'required': False, 'allow_null': True},
            # You can add others here if they are also optional
        }

    def create(self, validated_data):

        questions_data = validated_data.pop('questions',[])
        
        num_questions = len(questions_data)
        
        total_exam_marks = 0
        for question_data in questions_data:
          
            total_exam_marks += question_data.get('marks', 1) 
            
       
        validated_data['question_count'] = num_questions
        validated_data['total_marks'] = total_exam_marks
              
       
        exam = Exam.objects.create(**validated_data)
        
       
        for question_data in questions_data:
            options_data = question_data.pop('options')
            question = Question.objects.create(exam=exam, **question_data)
            
            for option_data in options_data:
                Option.objects.create(question=question, **option_data)
                
        return exam
    
    def update(self, instance, validated_data):
        # 1. Pop the nested questions data
        questions_data = validated_data.pop('questions', [])

        # 2. Update the simple fields on the Exam instance
        # super().update() handles this efficiently
        instance = super().update(instance, validated_data)

        # 3. Handle the nested questions: Delete old and create new
        # This is a simple and robust strategy for updates.
        instance.questions.all().delete() # Deletes all old questions and their options (due to CASCADE)

        total_exam_marks = 0
        for question_data in questions_data:
            options_data = question_data.pop('options')
            total_exam_marks += question_data.get('marks', 1)
            question = Question.objects.create(exam=instance, **question_data)
            
            # Create the new options for this question
            for option_data in options_data:
                Option.objects.create(question=question, **option_data)
        
        # 4. Recalculate and save the counts and marks for the instance
        instance.question_count = len(questions_data)
        instance.total_marks = total_exam_marks
        instance.save()

        return instance
    
class ExamListSerializer(serializers.ModelSerializer):
    """
    A simplified serializer for the exam list view.
    Shows related names instead of IDs.
    """
  
    exam_name = serializers.StringRelatedField(source='exam_title_ref')
    category = serializers.StringRelatedField(source='category_ref')

    class Meta:
        model = Exam
        fields = [
            'id',
            'exam_name', 
            'category',  
            'question_count',
            'status',
            'created_at'
        ]

class StudentExamDetailSerializer(serializers.ModelSerializer):
    """
    Serializer to show exam details to a student before they start.
    Does NOT include questions.
    """
    exam_title = serializers.StringRelatedField(source='exam_title_ref')
    category = serializers.StringRelatedField(source='category_ref')

    class Meta:
        model = Exam
        fields = [
            'id', 'generated_exam_name', 'exam_title', 'category', 'description',
            'time_limit_minutes', 'question_count', 'total_marks', 'is_paid'
        ]

class OptionForStudentSerializer(serializers.ModelSerializer):
    """
    Option serializer for students - does NOT reveal is_correct.
    """
    class Meta:
        model = Option
        fields = ['id', 'option_text']

class QuestionForStudentSerializer(serializers.ModelSerializer):
    """
    Question serializer for students.
    """
    options = OptionForStudentSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = ['id', 'question_text', 'question_image', 'marks', 'options']
