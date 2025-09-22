import django_filters
from .models import Exam

class ExamFilter(django_filters.FilterSet):

    payment_status = django_filters.CharFilter(method='filter_by_payment_status')
    fields = ['difficulty', 'exam_title_ref']

    def filter_by_payment_status(self, queryset, name, value):
        if value.lower() == 'free':
               
            return queryset.filter(is_paid=False)
       
        elif value.lower() == 'paid':
            return queryset.filter(is_paid=True)
        
        return queryset