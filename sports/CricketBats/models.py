from django.db import models
from django.contrib.auth.models import User
# register model


class Customer(models.Model):
    img=models.ImageField(upload_to='CricketBats/images/user',blank=True, null=True)
    fullname= models.CharField(max_length=50, null=False)
    gender = models.CharField(max_length=1, choices=[('M', 'Male'),('F', 'Female'), ('O', 'Other')], null=True)
    mobile=models.CharField(max_length=11,null=False,unique=True,default="")
    email = models.EmailField(max_length=200, unique=True, null=False)
    password = models.CharField(max_length=100,null=False)
    address = models.TextField(null=False)


    def __str__(self):
        return self.fullname
       
class Product(models.Model):
    category=models.CharField(max_length=3,choices=[('ST','SoftTennis'),('HT','HardTennis'),('SB','SeasonBat'),('AC','Accessories')],null=False,default="")
    img = models.ImageField(upload_to='CricketBats/images/product')
    name = models.CharField(max_length=100)
    description = models.TextField(null=True) 
    price=models.IntegerField(null=False,default=0) 
    size = models.FloatField(null=False, default=0.0)  
    weight = models.IntegerField(null=False, default=0) 
    width = models.FloatField(null=False, default=0.0) 

    def __str__(self):
        return self.name
    
    

class Cart(models.Model):
    customer = models.ForeignKey(Customer,on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Cart for {self.customer.fullname}'

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product,on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f'{self.quantity} x {self.product.name} in {self.cart.customer.fullname}\'s cart'
    
    
    
class Order(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Delivered', 'Delivered')
    ]

    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    order_date = models.DateTimeField(auto_now_add=True)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    shipping_address = models.TextField(null=False)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='Pending')

    def __str__(self):
        return f'Order {self.id} by {self.customer.fullname}'

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f'{self.quantity} x {self.product.name} in Order {self.order.id}'
    
    
    
class Contact(models.Model):
    name = models.CharField(max_length=100)
    mobile_no = models.CharField(max_length=15)
    email = models.EmailField()
    query = models.TextField()
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Query from {self.name}'