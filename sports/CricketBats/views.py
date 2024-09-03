from django.shortcuts import render
from django.http import JsonResponse

# Create your views here.

from rest_framework.decorators import APIView
from rest_framework.response import Response
from .models import User, Product
from .serializers import UserSerializer, ProductSerializer

class ProductView(APIView):
    serializer_class = ProductSerializer

    def get(self,request):
        product = [ {"img":product.img,"name": product.name,"product": product.description, "price": product.price,"size":product.size,"weight":product.weight,"width":product.width} for product in Product.objects.all()]
        return Response(product) 
    def post(self,request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            
            # return JsonResponse()
            return Response(serializer.data)

        return  Response(serializer.errors)


    
