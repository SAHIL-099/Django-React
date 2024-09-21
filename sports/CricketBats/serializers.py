from rest_framework import serializers
from .models import Customer,Product,Cart,CartItem

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'
        
        
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product 
        fields = '__all__'
        
       
class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)  # Nested product details

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'quantity']

# Serializer for Cart
class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)  # Nested cart items

    class Meta:
        model = Cart
        fields = ['id', 'customer', 'created_at', 'items']
        
  