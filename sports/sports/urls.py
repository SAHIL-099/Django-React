"""
URL configuration for sports project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from CricketBats.views import ProductView,CustomerView,LoginView,CustomerProfileView,CheckAuthView,LogoutView,CartView,CartItemRemoveView,OrderDetailView,OrderListView,OrderView,ClearCartView,ContactView


from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)


urlpatterns = [
    path('admin/',admin.site.urls),
    path('check-auth/',CheckAuthView.as_view(),name='check-auth'),
    path('product/',ProductView.as_view(),name='product'),
    path('contact/', ContactView.as_view(), name='contact'),
    path('register/',CustomerView.as_view(),name="register"),
    path('login/',LoginView.as_view(),name="login"),
    path('logout/',LogoutView.as_view(),name='logout'),
    path('profile/',CustomerProfileView.as_view(),name='user-profile'),
    path('product/<int:id>/',ProductView.as_view(),name='product-detail'),
    path('cart/<int:customer_id>/', CartView.as_view(), name='cart-item'),
    path('cart/clear/',ClearCartView.as_view(), name='clear-cart'),
    path('cart/remove-item/<int:cart_item_id>/', CartItemRemoveView.as_view(), name='cart-item-remove'),
    path('orders/', OrderListView.as_view(), name='order-list'),  # List all orders
    path('orders/create/',OrderView.as_view(), name='order-create'),  # Create a new order
    path('orders/<int:order_id>/', OrderDetailView.as_view(), name='order-detail'),  # Get specific order
    path('token/', TokenObtainPairView.as_view(),name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(),name='token_refresh'),
    
]+ static (settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
