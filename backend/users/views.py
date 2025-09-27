from rest_framework.permissions import IsAdminUser
from django.core.mail import send_mail
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.urls import reverse
# from django.contrib.sites.shortcuts import get_current_site  # Itha thevai illa local ku
from django.contrib.auth.tokens import default_token_generator # Intha import correct ah iruku

from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import CustomUser
from .serializers import (UserRegisterSerializer, PasswordResetRequestSerializer,
                          PasswordResetConfirmSerializer, CustomTokenObtainPairSerializer)
from .tokens import account_activation_token


class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = UserRegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Create the user but set is_active=False
        user = serializer.save(is_active=False)
        
        # Send verification email
        #current_site = get_current_site(request).domain
        frontend_domain = 'localhost:9002' 
        uidb64 = urlsafe_base64_encode(force_bytes(str(user.pk)))
        token = account_activation_token.make_token(user)
        
        verification_path = reverse('verify-email', kwargs={'uidb64': uidb64, 'token': token})
        verification_link = f"http://{frontend_domain}/verify-email/{uidb64}/{token}"
        
        subject = 'Activate Your Examplify Account'
        message = f'Hi {user.name},\n\nPlease click the link below to verify your account:\n{verification_link}\n\nThanks,\nThe Examplify Team'
        
        send_mail(
            subject,
            message,
            'bharathbharathkumar807@gmail.com', # From email
            [user.email], # To email
            fail_silently=False,
        )
        
        return Response(
            {"message": "User registered successfully. Please check your email to verify your account."},
            status=status.HTTP_201_CREATED
        )
    
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import force_str
from rest_framework.views import APIView

class VerifyEmailView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, uidb64, token):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = CustomUser.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, CustomUser.DoesNotExist):
            user = None
        
        if user is not None and account_activation_token.check_token(user, token):
            user.is_active = True
            user.save()
            # Redirect to your frontend login page
            return Response({"message": "Email verified successfully. You can now log in."})
        else:
            return Response({"error": "Activation link is invalid!"}, status=status.HTTP_400_BAD_REQUEST)
        

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class PasswordResetRequestView(generics.GenericAPIView):
    """
    Takes an email and sends a password reset link if the user exists.
    """
    permission_classes = [AllowAny]
    serializer_class = PasswordResetRequestSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']

        try:
            user = CustomUser.objects.get(email=email)
            
            # Generate token and UID
            uidb64 = urlsafe_base64_encode(force_bytes(str(user.pk)))
            token = default_token_generator.make_token(user)

            # Build the password reset link for the FRONTEND
            frontend_reset_url = 'http://localhost:9002' # Your frontend URL
            reset_link = f'{frontend_reset_url}/reset-password/{uidb64}/{token}/'

            # Send the email
            subject = 'Reset Your Password for Examplify'
            message = f'Hi {user.first_name},\n\nPlease click the link below to reset your password:\n{reset_link}\n\nIf you did not request this, please ignore this email.'
            
            send_mail(subject, message, 'your-email@gmail.com', [user.email])

        except CustomUser.DoesNotExist:
            # IMPORTANT: Don't reveal that the user does not exist for security reasons.
            # Silently pass, and the user will still see a success message.
            pass

        return Response(
            {"message": "If an account with this email exists, a password reset link has been sent."},
            status=status.HTTP_200_OK
        )
    

class PasswordResetConfirmView(generics.GenericAPIView):
    """
    Verifies the token & uid and sets a new password for the user.
    """
    permission_classes = [AllowAny]
    serializer_class = PasswordResetConfirmSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        try:
            uid = force_str(urlsafe_base64_decode(data['uidb64']))
            user = CustomUser.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, CustomUser.DoesNotExist):
            user = None

        if user is not None and default_token_generator.check_token(user, data['token']):
            # If the token is valid, set the new password
            user.set_password(data['password'])
            user.save()
            return Response({"message": "Password has been reset successfully."}, status=status.HTTP_200_OK)
        else:
            # If the token is invalid
            return Response({"error": "Reset link is invalid or has expired!"}, status=status.HTTP_400_BAD_REQUEST)
        

class UserListView(generics.ListAPIView):
    """
    Returns a list of all users. Only accessible by admin users.
    """
    queryset = CustomUser.objects.all()
    serializer_class = UserRegisterSerializer # Namma register panna use panna athey serializer ah use pannikalam
    permission_classes = [IsAdminUser] 