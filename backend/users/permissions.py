from rest_framework.permissions import BasePermission

class IsStudentUser(BasePermission):
    """
    Allows access only to authenticated users with the 'student' role.
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role == 'student')