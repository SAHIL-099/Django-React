from rest_framework import serializers
from .models import UserProfile,Product

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'
        
        
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product 
        fields = '__all__'
        
       
# class CartItemSerializer(serializers.ModelSerializer):
#     product = ProductSerializer()

#     class Meta:
#         model = CartItem
#         fields = ['product', 'quantity']

# class CartSerializer(serializers.ModelSerializer):
#     items = CartItemSerializer(many=True, read_only=True)

#     class Meta:
#         model = Cart
#         fields = ['id', 'user', 'created_at', 'items']