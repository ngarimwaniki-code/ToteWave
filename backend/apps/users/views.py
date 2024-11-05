from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import get_user_model
from .serializers import UserSerializer, UserProfileSerializer
from rest_framework.exceptions import PermissionDenied
from django.utils.crypto import get_random_string
from django.core.mail import send_mail
from webauthn import (generate_registration_options, verify_registration_response,
                      generate_authentication_options, verify_authentication_response)
from base64 import b64decode
from django.conf import settings
from .models import WebAuthnCredential
from django.urls import reverse

User = get_user_model()

class UserViewSet(viewsets.GenericViewSet):
    queryset = User.objects.all()
    permission_classes = [AllowAny]

    def get_serializer_class(self):
        if self.action == 'create':
            return UserSerializer
        return UserProfileSerializer
    
    @action(detail=False, methods=['get', 'put', 'patch'], permission_classes=[IsAuthenticated])
    def profile(self, request):
        """Handle user profile retrieval and updates."""
        if request.method == 'GET':
            serializer = UserProfileSerializer(request.user)
            return Response(serializer.data)
        
        serializer = UserProfileSerializer(request.user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated])
    def register_webauthn(self, request):
        """Register a WebAuthn device for the user."""
        if not request.user.is_superuser:
            raise PermissionDenied("Only superusers can register admin devices.")
        
        options = generate_registration_options(
            rp_name='ToteWave',
            rp_id=settings.WEBAUTHN_RP_ID,
            user_id=str(request.user.id),
            user_name=request.user.email,
            user_display_name=request.user.get_full_name() or request.user.email,
        )
        
        request.session['registration_challenge'] = options.challenge
        return Response(options._asdict())

    @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated])
    def verify_webauthn_registration(self, request):
        """Verify WebAuthn device registration."""
        if not request.user.is_superuser:
            raise PermissionDenied("Only superusers can register admin devices.")
        
        challenge = request.session.get('registration_challenge')
        if not challenge:
            return Response({'error': 'Registration challenge not found'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            verification = verify_registration_response(
                credential=request.data,
                expected_challenge=b64decode(challenge),
                expected_rp_id=settings.WEBAUTHN_RP_ID,
                expected_origin=settings.WEBAUTHN_ORIGIN,
            )
            
            WebAuthnCredential.objects.create(
                user=request.user,
                credential_id=verification.credential_data.credential_id,
                public_key=verification.credential_data.public_key,
                sign_count=verification.sign_count,
                name=request.data.get('name', 'Admin Device')
            )
            
            request.user.is_admin_device = True
            request.user.webauthn_verified = True
            request.user.save()
            
            del request.session['registration_challenge']
            return Response({'message': 'WebAuthn device registered successfully'})
            
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated])
    def verify_webauthn_auth(self, request):
        """Verify WebAuthn authentication."""
        if not request.user.webauthn_verified:
            return Response({'error': 'WebAuthn verification required'}, status=status.HTTP_403_FORBIDDEN)
        
        challenge = request.session.get('auth_challenge')
        if not challenge:
            return Response({'error': 'Authentication challenge not found'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            credential = WebAuthnCredential.objects.get(user=request.user)
            verification = verify_authentication_response(
                credential=request.data,
                expected_challenge=b64decode(challenge),
                expected_rp_id=settings.WEBAUTHN_RP_ID,
                expected_origin=settings.WEBAUTHN_ORIGIN,
                expected_public_key=credential.public_key,
                expected_sign_count=credential.sign_count,
            )
            
            # Update sign count
            credential.sign_count = verification.new_sign_count
            credential.save()
            
            del request.session['auth_challenge']
            return Response({'message': 'Admin status verified successfully'})
            
        except WebAuthnCredential.DoesNotExist:
            return Response({'error': 'No WebAuthn credential found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated])
    def verify_admin_status(self, request):
        """Initiate the verification of admin status via WebAuthn."""
        if not request.user.webauthn_verified:
            return Response({'error': 'WebAuthn verification required'}, status=status.HTTP_403_FORBIDDEN)
        
        try:
            credential = WebAuthnCredential.objects.get(user=request.user)
            options = generate_authentication_options(
                rp_id=settings.WEBAUTHN_RP_ID,
                allow_credentials=[{
                    'type': 'public-key',
                    'id': credential.credential_id,
                }],
            )
            
            request.session['auth_challenge'] = options.challenge
            return Response(options._asdict())
            
        except WebAuthnCredential.DoesNotExist:
            return Response({'error': 'No WebAuthn credential found'}, status=status.HTTP_404_NOT_FOUND)

    def create(self, request):
        """Create a new user and send a verification email."""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        # Generate verification token
        token = get_random_string(length=32)
        user.verification_token = token  # Ensure this field is present in your model
        user.save()

        # Create verification link using the frontend URL
        verification_link = f"{settings.FRONTEND_URL}/verify-email/{token}/"

        try:
            # Send verification email
            send_mail(
                'Verify your email address',
                f'Click the link to verify your email: {verification_link}',
                settings.DEFAULT_FROM_EMAIL,
                [user.email],
                fail_silently=False,
            )
        except Exception:
            user.delete()  # Clean up if the email fails
            return Response(
                {'error': 'User created, but failed to send verification email. Please try again.'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        return Response({
            'user': UserSerializer(user).data,
            'message': 'User created successfully. Please check your email to verify.'
        }, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated])
    def resend_verification_email(self, request):
        """Resend the verification email to the user."""
        user = request.user
        
        if user.is_verified:
            return Response({'error': 'Email is already verified.'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Generate a new verification token
        token = get_random_string(length=32)
        user.verification_token = token
        user.save()

        # Create verification link using the frontend URL
        verification_link = f"{settings.FRONTEND_URL}/verify-email/{token}/"

        try:
            # Send verification email
            send_mail(
                'Verify your email address',
                f'Click the link to verify your email: {verification_link}',
                settings.DEFAULT_FROM_EMAIL,
                [user.email],
                fail_silently=False,
            )
        except Exception:
            return Response({'error': 'Failed to send verification email. Please try again.'},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({'message': 'Verification email sent successfully. Please check your inbox.'},
                        status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'], permission_classes=[AllowAny])
    def verify_email(self, request, token=None):
        """Verify the user's email using the token."""
        try:
            # Ensure unique token retrieval
            user = User.objects.get(verification_token=token)
            user.is_verified = True
            user.verification_token = None  # Clear the token
            user.save()
            return Response({'message': 'Email verified successfully!'}, status=status.HTTP_200_OK)
        except User.MultipleObjectsReturned:
            return Response({'error': 'Multiple users found with this verification token!'}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({'error': 'Invalid token!'}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def check_verification(self, request):
        """Check if the user's email is verified."""
        if not request.user.is_verified:
            raise PermissionDenied("Email verification required.")
        return Response({'message': 'User is verified.'}, status=status.HTTP_200_OK)
