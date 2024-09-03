from django.db import models
# register model


class User(models.Model):
    img=models.ImageField(upload_to='CricketBats/images/user')
    fullname= models.CharField(max_length=50, null=False)
    gender = models.CharField(max_length=1, choices=[('M', 'Male'),('F', 'Female'), ('O', 'Other')], null=True)
    address = models.TextField(null=False)
    mobile=models.CharField(max_length=11,null=False,unique=True,default="")
    email = models.EmailField(max_length=200, unique=True, null=False)
    password = models.CharField(max_length=100,null=False)
    


    def __str__(self):
        return self.fullname
       
class Product(models.Model):
    category=models.CharField(max_length=3,choices=[('ST','SoftTennis'),('HT','HardTennis'),('SB','SeasonBat')],null=False,default="")
    img = models.ImageField(upload_to='CricketBats/images/product')
    name = models.CharField(max_length=100)
    description = models.TextField(null=True) 
    price=models.IntegerField(null=False,default=0) 
    size = models.FloatField(null=False, default=0.0)  
    weight = models.IntegerField(null=False, default=0) 
    width = models.FloatField(null=False, default=0.0) 

    def __str__(self):
        return self.name
    
    
class Accessories(models.Model):
    img = models.ImageField(upload_to='CricketBats/images/product')
    name = models.CharField(max_length=100)
    price = models.IntegerField()
    description = models.TextField()
    
    def __str__(self):
        return self.name
     
    
# class Cart(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)    
#     item = models.ForeignKey(Product, on_delete=models.CASCADE)
#     quantity = models.IntegerField()
#     total_price = models.IntegerField()
#     def __str__(self):
#         return self.user.fullname
    

