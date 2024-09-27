
# Create your views here.
# from rest_framework.decorators import APIView
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Customer, Product, Cart, CartItem, Order, OrderItem
from .serializers import CustomerSerializer, ProductSerializer, CartSerializer, OrderSerializer, ContactSerializer
from django.contrib.auth.hashers import make_password
from django.shortcuts import get_object_or_404
from rest_framework import status
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

    def get(self, request, id=None):
        if id:
            product = get_object_or_404(Product, id=id)
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
            product = [{"id": product.id, "category": product.category, "img": product.img.url, "name": product.name, "product": product.description,
                        "price": product.price, "size": product.size, "weight": product.weight, "width": product.width} for product in Product.objects.all()]
            return Response(product)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()

            # return JsonResponse()
            return Response(serializer.data)

        return Response(serializer.errors)


class CustomerView(APIView):
    serializer_class = CustomerSerializer

    def get(self, request):
        print("Received data:", request.data)
        users = [{"fullname": user.fullname, "gender": user.gender, "address": user.address, "mobile": user.mobile,
                  "email": user.email, "password": user.password, "img": user.img.url if user.img else None} for user in Customer.objects.all()]

        return Response(users)

    def post(self, request):
        print("Received data:", request.data)
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
            if password == user.password:
                refresh = RefreshToken.for_user(user)
                return Response({
                    'refresh': str(refresh),
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
        user = request.user
        try:
            profile = Customer.objects.get(id=user.id)
            # Assuming user ID matches Customer ID
            user_data = {
                'id': profile.id,
                'fullname': profile.fullname,
                'mobile':profile.mobile,
                'email': profile.email,
                'address': profile.address,
                'gender': profile.gender,
            }
            return Response(user_data)
        except Customer.DoesNotExist:
            return Response({'error': 'User profile not found.'}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request):
        user = request.user
        try:
            profile = Customer.objects.get(id=user.id)
            data = request.data  # Get the updated data from the request

            # Update profile fields
            profile.fullname = data.get('fullname', profile.fullname)
            profile.email = data.get('email', profile.email)
            profile.address = data.get('address', profile.address)
            profile.gender = data.get('gender', profile.gender)

            # Save updated profile
            profile.save()

            return Response({
                'message': 'Profile updated successfully!',
                'fullname': profile.fullname,
                'email': profile.email,
                'address': profile.address,
                'gender': profile.gender,
            })
        except Customer.DoesNotExist:
            return Response({'error': 'User profile not found.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class CartView(APIView):
    def get(self, request, customer_id):
        customer_id = request.user
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
        cart_item, item_created = CartItem.objects.get_or_create(
            cart=cart, product=product)
        if not item_created:
            cart_item.quantity += quantity  # Increment quantity if it already exists
        else:
            cart_item.quantity = quantity  # Set initial quantity

        cart_item.save()

        return Response({"detail": "Item added to cart"}, status=status.HTTP_200_OK)


# API View to remove items from the cart
class CartItemRemoveView(APIView):
    def delete(self, request, cart_item_id):
        try:
            cart_item = CartItem.objects.get(id=cart_item_id)
        except CartItem.DoesNotExist:
            return Response({"detail": "CartItem not found"}, status=status.HTTP_404_NOT_FOUND)

        cart_item.delete()
        return Response({"detail": "Item removed from cart"}, status=status.HTTP_204_NO_CONTENT)

class ClearCartView(APIView):
    permission_classes = [IsAuthenticated]
    def delete(self, request):
        customer = request.user.id
        try:
            cart = Cart.objects.get(customer=customer)
            cart.items.all().delete()  # Deletes all items in the cart
            return Response({"detail": "All items removed from cart"}, status=status.HTTP_204_NO_CONTENT)
        except Cart.DoesNotExist:
            return Response({"detail": "Cart not found"}, status=status.HTTP_404_NOT_FOUND)

class OrderView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Get the custom user instance
      
        customer = Customer.objects.get(id=request.user.id)  

        # Use the user's address from the profile as the shipping address
        shipping_address = customer.address  
        
        # Calculate the total amount from the items
        items = request.data.get('items', [])
        total_amount = sum(item.get('quantity', 0) * item.get('price', 0) for item in items)

        # Create an order based on the received data
        order = Order.objects.create(
            customer=customer,
            shipping_address=shipping_address,  # Use the user's address
            total_amount=total_amount  # Set the total amount
        )

        # Iterate over items in the request
        for item in items:
            product_id = item.get('product')  
            quantity = item.get('quantity')
            price = item.get('price')   

            # Create order items with the necessary details
            OrderItem.objects.create(
                order=order,
                product_id=product_id,
                quantity=quantity,
                price=price  
            )

        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)



class OrderListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Get orders for the authenticated customer using user ID
        customer_id = request.user.id
        orders = Order.objects.filter(customer_id=customer_id).order_by('-order_date')
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class OrderDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, order_id):
        try:
            order = Order.objects.get(id=order_id, customer=request.user.id)
            order_items = order.items.all()

            order_data = {
                "id": order.id,
                "status":order.status,
                "shipping_address": order.shipping_address,
                "total_amount": order.total_amount,
                "items": [
                    {
                        "product": {
                            "name": item.product.name,
                            "price": item.price,
                        },
                        "quantity": item.quantity,
                    }
                    for item in order_items
                ],
            }
            return Response(order_data, status=status.HTTP_200_OK)
        except Order.DoesNotExist:
            return Response({"detail": "Order not found"}, status=status.HTTP_404_NOT_FOUND)
        
        
class ContactView(APIView):
    def post(self, request):
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"detail": "Query submitted successfully!"}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

