# users/urls.py

from django.urls import path
from .views import ( RegisterView, VerifyEmailView, 
                    CustomTokenObtainPairView,PasswordResetRequestView, 
                    PasswordResetConfirmView, UserListView)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('verify-email/<str:uidb64>/<str:token>/', VerifyEmailView.as_view(), name='verify-email'),
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('password-reset-request/', PasswordResetRequestView.as_view(), name='password-reset-request'),
    path('password-reset-confirm/', PasswordResetConfirmView.as_view(), name='password-reset-confirm'),
    path('users/', UserListView.as_view(), name='user-list'), 
]