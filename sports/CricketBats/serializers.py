from rest_framework import serializers
from .models import Customer,Product,Cart,CartItem,Order,OrderItem,Contact

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
        
        
        
class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['id','product', 'quantity', 'price']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, required=False)
    class Meta:
        model = Order
        fields = ['id', 'customer', 'order_date', 'total_amount', 'shipping_address', 'status', 'items']

    def create(self, validated_data):
        items_data = validated_data.pop('items', [])
        order = Order.objects.create(**validated_data)
        for item_data in items_data:
            OrderItem.objects.create(order=order, **item_data)
        return order
        
  
class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'