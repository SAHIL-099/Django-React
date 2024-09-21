
# Create your views here.

# from rest_framework.decorators import APIView
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.hashers import check_password
from .models import Customer, Product,Cart,CartItem
from .serializers import CustomerSerializer,ProductSerializer,CartSerializer,CartItemSerializer

from django.contrib.auth.hashers import make_password
from django.shortcuts import get_object_or_404
from rest_framework import status,permissions
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated


class CheckAuthView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request:
            print("")
        else:
            print("can not find header")
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
    
    
    
class CustomerView(APIView):
    serializer_class = CustomerSerializer
    def get(self,request): 
         print("Received data:", request.data) 
         users=[{"fullname":user.fullname,"gender":user.gender,"address":user.address,"mobile":user.mobile,"email":user.email,"password":user.password,"img":user.img.url if user.img else None} for user in Customer.objects.all()]
        
         return Response(users)
     
    def post(self, request):
        print("Received data:",request.data) 
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = serializer.save()  # Save the new user

            # Generate JWT tokens for the newly registered user
            refresh = RefreshToken.for_user(user)
            return Response({
                'user': serializer.data,
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
    
class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        try:
            user = Customer.objects.get(email=email)
            if password==user.password:
                refresh = RefreshToken.for_user(user)
                return Response({
                    'refresh':str(refresh),
                    'access': str(refresh.access_token),
                })
            else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        except Customer.DoesNotExist:
            return Response({'error': 'User does not exist'}, status=status.HTTP_404_NOT_FOUND)
            
class CustomerProfileView(APIView):
    # authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user=request.user
        try:
            profile = Customer.objects.get(id=user.id)
            # Assuming user ID matches Customer ID
            user_data = {
                'fullname': profile.fullname,
                'email': profile.email,
                'address': profile.address, 
                'gender': profile.gender,
            }
            return Response(user_data)
        except Customer.DoesNotExist:
            return Response({'error': 'User profile not found.'}, status=status.HTTP_404_NOT_FOUND)
        
class LogoutView(APIView):
    def post(self, request):
        # try:
        #     refresh_token = request.data.get('refresh')
        #     if refresh_token:
        #         token = RefreshToken(refresh_token)
        #         token.blacklist()
        #     return Response({'message': 'Successfully logged out.'}, status=status.HTTP_200_OK)
        # except TokenError as e:
        #     return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return("logout")
          
        
class CartView(APIView):
    def get(self, request, customer_id):
        customer_id=request.user
        try:
            # Fetch the cart for the customer based on customer_id
            cart = Cart.objects.get(customer_id=customer_id.id)
        except Cart.DoesNotExist:
            return Response({"detail": "Cart not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = CartSerializer(cart)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, customer_id):
        product_id = request.data.get('product_id')
        quantity = request.data.get('quantity', 1)

        # Get or create a cart for the customer
        cart, created = Cart.objects.get_or_create(customer_id=customer_id)

        # Get the product to add to the cart
        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({"detail": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

        # Check if the item already exists in the cart
        cart_item, item_created = CartItem.objects.get_or_create(cart=cart, product=product)
        if not item_created:
            cart_item.quantity += quantity  # Increment quantity if it already exists
        else:
            cart_item.quantity = quantity  # Set initial quantity

        cart_item.save()

        return Response({"detail": "Item added to cart"}, status=status.HTTP_200_OK)


# API View to remove items from the cart
class CartItemRemoveView(APIView):
    def post(self, request, cart_item_id):
        try:
            cart_item = CartItem.objects.get(id=cart_item_id)
        except CartItem.DoesNotExist:
            return Response({"detail": "CartItem not found"}, status=status.HTTP_404_NOT_FOUND)

        cart_item.delete()
        return Response({"detail": "Item removed from cart"}, status=status.HTTP_200_OK)