from django.contrib import admin
from CricketBats.models import Customer,Product,Cart,CartItem,Order,OrderItem,Contact
# Register your models here.

admin.site.register(Customer)
admin.site.register(Product)
admin.site.register(CartItem)
admin.site.register(Cart)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(Contact)