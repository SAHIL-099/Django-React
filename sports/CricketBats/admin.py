from django.contrib import admin
from CricketBats.models import Customer,Product,Accessories,Cart,CartItem
# Register your models here.

admin.site.register(Customer)
admin.site.register(Product)
admin.site.register(Accessories)
admin.site.register(CartItem)
admin.site.register(Cart)