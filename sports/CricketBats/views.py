
# Create your views here.

# from rest_framework.decorators import APIView
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.hashers import check_password
from .models import UserProfile, Product
from .serializers import UserProfileSerializer,ProductSerializer
from django.contrib.auth.hashers import make_password
from django.shortcuts import get_object_or_404
from rest_framework import status,permissions
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.exceptions import  TokenError,InvalidToken
from django.http import JsonResponse

from django.conf import settings
import jwt
from datetime import datetime, timedelta, timezone


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }



def create_custom_token(user_profile):
    access_payload = {
        'user_id': user_profile.id,
        'exp': datetime.now(timezone.utc) + timedelta(hours=24),  # Access token validity
        'iat': datetime.now(timezone.utc),
        'token_class':'AccessToken'
    }
    refresh_payload = {
        'user_id': user_profile.id,
        'exp': datetime.now(timezone.utc) + timedelta(days=30),  # Refresh token validity
        'iat': datetime.now(timezone.utc),  
        'token_class': 'AccessToken'
    }

    # Generate tokens
    access_token = jwt.encode(access_payload, settings.SECRET_KEY, algorithm='HS256')
    refresh_token = jwt.encode(refresh_payload, settings.SECRET_KEY, algorithm='HS256')

    return access_token, refresh_token

def decode_custom_token(token):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        return payload
    except jwt.ExpiredSignatureError:
        print("Token has expired")
    except jwt.InvalidTokenError:
        print("Invalid token")
  
      
# class CheckAuthView(APIView):
#     permission_classes = [IsAuthenticated]
#     authentication_classes = [JWTAuthentication]


#     def get(self, request):
#         auth_header = request.headers.get('Authorization', '')
#         print(f"Authorization Header: {auth_header}")

#         if not auth_header:
#             return Response({'detail':'Token not provided'}, status=401)

#         parts = auth_header.split()
#         print(f"Header Parts: {parts}")

#         if len(parts) != 2 or parts[0] != 'Bearer':
#             return Response({'detail': 'Invalid token header. No credentials provided.'}, status=401)

#         token = parts[1]
#         try:
#             payload = decode_custom_token(token)
#             print(f"Decoded Payload: {payload}")

#             if payload:
#                 return Response({"status": "Authenticated"}, status=200)
#             else:
#                 return Response({'detail': 'Invalid token'}, status=401)
#         except jwt.ExpiredSignatureError:
#             return Response({'detail': 'Token has expired'}, status=401)
#         except jwt.InvalidTokenError:
#             return Response({'detail': 'Invalid token'}, status=401)
        
        
        
class CheckAuthView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        auth_header = request.headers.get('Authorization','')
        if auth_header:
            print(f"Authorization header: {auth_header}")
            token = auth_header.split(' ')[1]  # Extract token
            print(f"Extracted token: {token}")
        else:
            print("No Authorization header found")
        return Response({"message": "Authenticated"})

    
class ProductView(APIView):
    serializer_class = ProductSerializer

    def get(self,request,id=None):
        if id:
            product = get_object_or_404(Product,id=id)
            product_data = {
                "id": product.id,
                "category": product.category,
                "img": product.img.url,
                "name": product.name,
                "description": product.description,
                "price": product.price,
                "size": product.size,
                "weight": product.weight,
                "width": product.width,
            }
            return Response(product_data)
        else:
            product = [{"id":product.id,"category":product.category,"img":product.img.url,"name": product.name,"product": product.description, "price": product.price,"size":product.size,"weight":product.weight,"width":product.width} for product in Product.objects.all()]
            return Response(product) 
        
        
    def post(self,request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            
            # return JsonResponse()
            return Response(serializer.data)

        return  Response(serializer.errors)
    
    
    
class UserProfileView(APIView):
     serializer_class = UserProfileSerializer
     def get(self,request): 
         print("Received data:", request.data) 
         users=[{"fullname":user.fullname,"gender":user.gender,"address":user.address,"mobile":user.mobile,"email":user.email,"password":user.password,"img":user.img.url if user.img else None} for user in UserProfile.objects.all()]
        
         return Response(users)
     
     def post(self,request):
        print("Received data:",request.data) 
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            # password = make_password(serializer.validated_data['password'])
            # serializer.validated_data['password'] = password
            users=serializer.save()
            access_token,refresh_token = create_custom_token(users)

            return Response({
                'user': serializer.data,
                'access': access_token,
                'refresh': refresh_token,
            }, status=status.HTTP_201_CREATED)
            # return Response(serializer.data)
        
         
        print("Serializer Errors:", serializer.errors)  # Debugging line
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
       
class LoginView(APIView):
    def post(self, request):
        email = request.POST.get('email')
        password = request.POST.get('password')
        print(email)
        print(password)

        try:
            user_profile = UserProfile.objects.get(email=email)
            print(user_profile.password)
            if password==user_profile.password:
                access_token, refresh_token = create_custom_token(user_profile)
                return Response({
                    'user': UserProfileSerializer(user_profile).data,
                    'access': access_token,
                    'refresh': refresh_token,
                }, status=status.HTTP_200_OK)
            else:
                return Response({'detail': 'Invalid credentials...'}, status=status.HTTP_401_UNAUTHORIZED)
        except UserProfile.DoesNotExist:
            return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class UserDataView(APIView):
     permission_classes = [IsAuthenticated]  # Ensure only authenticated users can access this view

     def post(self, request):
        
        try:
            token = request.headers.get("Authorization")
            
            data = decode_custom_token(token)
            profile = UserProfile.objects.get(id=data["user_id"])
            user_data = {
                'fullname': profile.fullname,
                'email': profile.email,
                'address': profile.address,
                'gender': profile.gender,
            }
            return Response(user_data)
        except UserProfile.DoesNotExist:
            return Response({'error': 'User profile not found.'}, status=404)
        
        
class LogoutView(APIView):
    def post(self, request):
        try:
            refresh_token = request.data.get('refresh')
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()
            return Response({'message': 'Successfully logged out.'}, status=status.HTTP_200_OK)
        except TokenError as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
          
        
    # class CartView(APIView):

    # def get(self, request):
    #     # Get or create the user's cart
    #     cart, created = Cart.objects.get_or_create(user=request.user)
    #     cart_items = CartItem.objects.filter(cart=cart)
    #     serializer = CartItemSerializer(cart_items, many=True)
    #     return Response(serializer.data)

    # def post(self, request):
    #     product_id = request.data.get('product_id')
    #     quantity = request.data.get('quantity', 1)
        
    #     # Get or create the user's cart
    #     cart, created = Cart.objects.get_or_create(user=request.user)
    #     product = Product.objects.get(id=product_id)
        
    #     # Check if the product already exists in the cart
    #     cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
    #     if not created:
    #         cart_item.quantity += quantity
    #         cart_item.save()
    #     else:
    #         cart_item.quantity = quantity
    #         cart_item.save()
        
    #     return Response({'status': 'Product added to cart'})
